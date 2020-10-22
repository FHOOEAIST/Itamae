/*
 * Copyright (c) 2020 the original author or authors.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const vscode = require("vscode");
const nearley = require("nearley");
const entitieGrammar = require("../parser/entities_parser/fsh-entities");
const instanceRuleGrammar = require("../parser/rules_parser/fsh-instanceRule");
const vsRuleGrammar = require("../parser/rules_parser/fsh-vsRule");
const sdRuleGrammar = require("../parser/rules_parser/fsh-sdRule");
const csRuleGrammar = require("../parser/rules_parser/fsh-csRule");
const ruleSetRuleGrammar = require("../parser/rules_parser/fsh-ruleSetRule");
const mappingEntityRuleGrammar = require("../parser/rules_parser/fsh-mappingEntityRule")

const update = (event, collection) => {
    validateTextDocument(event.document, collection);
}
module.exports = {update}

/**
 * this function is everytime called when a change in the active TextDocument happens
 * @param {vscode.TextDocument} textDocument
 * @param {vscode.DiagnosticCollection} collection
 */
function validateTextDocument(textDocument, collection){
    collection.clear();
    let diagnostics = [];

    // to simplify the parsing stetp, the parsing is seperatet into two parts
    validateEntity(textDocument, diagnostics);
    validateRules(textDocument,diagnostics);

    collection.set(textDocument.uri, diagnostics)
  }

/**
 *
 * @param {vscode.TextDocument} textDocument
 * @param {Array} diagnostics
 */
function validateEntity(textDocument, diagnostics){
  let text = textDocument.getText();
  let lines = text.split(/\n/);
  let entities = getEntities(lines);

  let parser = new nearley.Parser(nearley.Grammar.fromCompiled(entitieGrammar));
  entities.forEach(entity => {
    try {
      parser.feed(entity.value);
    }catch (err ){
      let errorInfo = getErrorInformations(err);

      // to get a right error marking even a line comment is in the block,
      // the comments must be count and added to the position line number
      let additinalLineNumber = countAdditionalLines(Number(errorInfo.errorline), entity.uncleanedvalue);

      let begin = new vscode.Position(entity.beginline + additinalLineNumber + errorInfo.errorline - 1, errorInfo.errorcol - 1);
      let end = new vscode.Position(entity.beginline + additinalLineNumber + errorInfo.errorline, null);
      let diagnostic = {
        range: {
          start: begin,
          end: end
        },
        message: `ERROR: The structure of the entity is not correct.`,
        severity: vscode.DiagnosticSeverity.Error
      }
      let relatedInformation = getRelatedInformations(errorInfo, textDocument, diagnostic);
      diagnostic.relatedInformation = relatedInformation;

      diagnostics.push(diagnostic);
      }

      //prepare a new parser for the next entity
      parser = new nearley.Parser(nearley.Grammar.fromCompiled(entitieGrammar));
  });
}

/**
 * This function returns a array of entities with modified information in order to process them better afterwards
 * @param {Array} lines
 */
function getEntities(lines){
  let entities = [];
  let activeEntity = ``;
  let activeUncleanedEntity = ``;
  let activeLinenumber = undefined;
  let activeLine = undefined;
  let ruleBegin = false;
  let commentRegex = / \/\//;

  for (let linenumber = 0; linenumber < lines.length; linenumber++){
    activeLine = lines[linenumber];
    //if not an empty line process content
    if (! activeLine.match(/^\s*$/)){
      if (activeLine.trim().indexOf("*") == 0) ruleBegin = true;

      //add the line to the unclean entity value if it is still not a rule and the entity already begun
      if (!ruleBegin && activeLinenumber != undefined){
        activeUncleanedEntity += activeLine + "\n";
      }

      //add the line the clean entity value if it is not a commentline and the rule didn't begun
      if(activeLine.trim().indexOf("\/\/") != 0 && !ruleBegin){
        if (activeLinenumber === undefined){
          activeLinenumber = linenumber;
        }
        activeLine.match(commentRegex) ?
          activeEntity += activeLine.substring(0,activeLine.indexOf("\/\/")) + "\n" :
          activeEntity += activeLine + "\n";
      }

    //if it is an empty line and startline is set, add the entity
    } else if (activeLinenumber !== undefined){
      entities.push({
        beginline: activeLinenumber,
        endline: linenumber,
        value: activeEntity,
        uncleanedvalue: activeUncleanedEntity
      });

      activeLinenumber = undefined;
      activeEntity = ``;
      activeUncleanedEntity = ``;
      ruleBegin = false;
    }
  }
  return entities;
}

/**
 *
 * @param {vscode.TextDocument} textDocument
 * @param {Array} diagnostics
 */
function validateRules(textDocument, diagnostics){
  let text = textDocument.getText();
  let lines = text.split(/\n/);
  let rules = getRules(lines);
  let parser = undefined;

  rules.forEach(ruleblock => {
    //the parser has to be different depending on wich entity is processed right now
    switch (ruleblock.entity) {
      case "Profile" :
        parser = new nearley.Parser(nearley.Grammar.fromCompiled(sdRuleGrammar));
        parseRules(parser, ruleblock, diagnostics, textDocument);
        break;
      case "Extension":
        parser = new nearley.Parser(nearley.Grammar.fromCompiled(sdRuleGrammar));
        parseRules(parser, ruleblock, diagnostics, textDocument);
        break;
      case "Instance":
        parser = new nearley.Parser(nearley.Grammar.fromCompiled(instanceRuleGrammar));
        parseRules(parser, ruleblock, diagnostics, textDocument);
        break;
      case "ValueSet":
        parser = new nearley.Parser(nearley.Grammar.fromCompiled(vsRuleGrammar));
        parseRules(parser, ruleblock, diagnostics, textDocument);
        break;
      case "CodeSystem":
        parser = new nearley.Parser(nearley.Grammar.fromCompiled(csRuleGrammar));
        parseRules(parser,ruleblock, diagnostics, textDocument);
        break;
      case "RuleSet":
        parser = new nearley.Parser(nearley.Grammar.fromCompiled(ruleSetRuleGrammar));
        parseRules(parser, ruleblock, diagnostics, textDocument);
        break;
      case "Mapping":
        parser = new nearley.Parser(nearley.Grammar.fromCompiled(mappingEntityRuleGrammar));
        parseRules(parser, ruleblock, diagnostics, textDocument);
        break;
      default :
        parser = undefined;
    }

  });

  return diagnostics;
}

/**
 * This function returns a array of rules with modified information in order to process them better afterwards
 * @param {Array} lines
 */
function getRules(lines){
  let rules = [];
  //this types of entitys are supported to have rules
  let entityTypes = ["Profile:", "Extension:", "Instance:" ,"ValueSet:", "CodeSytem:", "RuleSet:", "Mapping:"];
  let activeEntityType = ``;
  let activeRuleblock = ``;
  let activeUncleanedRuleblock = ``;
  let activeLinenumber = undefined;
  let activeLine = undefined;
  let beginRule = false;
  let commentRegex = / \/\//;

  for (let linenumber = 0; linenumber < lines.length; linenumber++){
    activeLine = lines[linenumber];

    //if not an empty line process content
    if (! activeLine.match(/^\s*$/)){
      if(activeLine.trim().indexOf("*") == 0) beginRule = true;

      //process content if the entity type is supported
      if (entityTypes.includes(activeLine.trim().split(/\s/)[0])){
        activeEntityType = activeLine.trim().split(/\s/)[0];
        activeEntityType = activeEntityType.substring(0,activeEntityType.length-1);
      }
      else {
        if(beginRule){
          //TODO: Rules are started but the entity type don't support rules, show an error message
        }
      }

      //process content if the rule begun for unlceaned ruleblock content
      if(beginRule){
        activeUncleanedRuleblock += activeLine.trim() + "\n";
      }

      //process content if the line is not a comment for cleaned ruleblock content
      if(activeLine.trim().indexOf("\/\/") != 0 && beginRule){
        if (activeLinenumber === undefined){
          activeLinenumber = linenumber;
        }
        activeLine.match(commentRegex) ?
          activeRuleblock += activeLine.trim().substring(0,activeLine.indexOf("\/\/")) + "\n" :
          activeRuleblock += activeLine.trim() + "\n";
      }
    //if the startline is set, add the entity
    } else if (activeLinenumber !== undefined){
        rules.push(
        {beginline: activeLinenumber,
        endline: linenumber,
        entity: activeEntityType,
        value: activeRuleblock,
        uncleanedvalue: activeUncleanedRuleblock
      });

      activeLinenumber = undefined;
      activeRuleblock = ``;
      activeUncleanedRuleblock = ``;
      beginRule = false;
    }
  }
  return rules;
}

function parseRules(parser, ruleblock, diagnostics, textDocument) {
  try {
    parser.feed(ruleblock.value.substring(0,ruleblock.value.length-1));
  }catch (err){
    let errorInfo = getErrorInformations(err);

    // to get a a right error marking even if a linecomment is in the block, the comments must be count and added to te linenumber
    let countComment = countAdditionalLines(Number(errorInfo.errorline), ruleblock.uncleanedvalue);

    let begin = new vscode.Position(ruleblock.beginline + countComment + errorInfo.errorline - 1, null);
    let end = new vscode.Position(ruleblock.beginline + countComment + errorInfo.errorline, null);

    let diagnostic = {
      range: {
        start: begin,
        end: end
      },
      message: `ERROR: no supported rule for entity ${ruleblock.entity}.`,
      severity: vscode.DiagnosticSeverity.Error
    }
    let relatedInformation = getRelatedInformations(errorInfo, textDocument, diagnostic);
    diagnostic.relatedInformation = relatedInformation;

    diagnostics.push(diagnostic);
  }

}

/**
 * This function processes the error stack of the function parse feed of the nearley parser
 * @param {*} error
 */
function getErrorInformations(error){
  let errorMessage = error.message.split(/\n/);
  let errorMessageFirstLine = errorMessage[0].split(/ /);
  let errorLine = parseInt(errorMessageFirstLine[4]);
  let errorCol = parseInt(errorMessageFirstLine[6].substring(0,errorMessageFirstLine[6].length-1));
  let errorTokenLine = errorMessage[4].split(/ /);
  let errorToken = errorTokenLine[3];

  let expectedTokens = [];
  // the list of the included tokens is to prevent double tokens
  let includedTokens = [];
  let expectedToken = undefined;
  let basedOn = [];

  errorMessage.forEach(line => {
    if (expectedToken != undefined && line[0] != "A"){
      let linebegin = line.trim().split(/ /)[0];
      if (linebegin.indexOf("$ebnf") == -1 &&  linebegin[0] != "_"){
        basedOn.push(linebegin);
      }

    }

    if(line[0] == "A"){
      if (expectedToken != undefined){
        let tokenElement = {
          token: expectedToken,
          basedOn: basedOn
        }
        if (!includedTokens.includes(expectedToken)){
          expectedTokens.push(tokenElement);
          includedTokens.push(expectedToken);
        }
        basedOn = [];
      }

      expectedToken = line.split(/ /)[1];
    }

  });

  return {
    errorline: errorLine,
    errorcol: errorCol,
    errortoken: errorToken,
    expected: expectedTokens
  }
}

/**
 * This function returns an array of additional Information for a specific diagnostic, based on the errorInfo it gets
 * @param {*} errorInfo
 * @param {vscode.TextDocument} textDocument
 * @param {*} diagnostic
 */
function getRelatedInformations(errorInfo, textDocument, diagnostic){
  let relatedInformation = [];

  //create a additional information for the wrong token
  relatedInformation.push({
    location: {
      uri: textDocument.uri,
      range: Object.assign({}, diagnostic.range)
    },
    message: `unexpected token ${errorInfo.errortoken} `
  });

  //create for each possible token a own additional information an push it to the returning array
  errorInfo.expected.forEach(tokenElement => {
    let basedOnString = "";
    for (let pos = tokenElement.basedOn.length - 3; pos > 0; pos --){
      basedOnString += tokenElement.basedOn[pos] + " -> ";
    }
    basedOnString += tokenElement.basedOn[0];

    relatedInformation.push({
      location: {
        uri: textDocument.uri,
        range: Object.assign({}, diagnostic.range)
      },
      message: `expected token ${tokenElement.token}, based on ${basedOnString}.`
    });

  });

  return relatedInformation;
}

/**
 * This function return the number of lines the errormarking has to add for the right outcome
 * Right now only singl line comments are supportet, if multilines should be supported, this function should be changed
 * @param {Number} linenumber
 * @param {String} text
 */
function countAdditionalLines(linenumber, text){
  let textInLines = text.split(/\n/);
  let activeLine = undefined;
  let counter = 0;

  for(let pos = 0; pos <= linenumber; pos++){
    activeLine = textInLines[pos].trim();
    //chech if its a singleline comment and increase the counter if so
    if (activeLine.length >= 2 && activeLine[0] == "/" && activeLine[1] == "/"){
      counter++;
    }
  }

  return counter;
}