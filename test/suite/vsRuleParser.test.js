/*
 * Copyright (c) 2020 the original author or authors.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const assert = require('assert');
const vscode = require('vscode');

//import nearley for parser tests
const nearley = require('nearley');
const ruleGrammar = require('../../src/parser/rules_parser/fsh-vsRule');
//parser has to be created for each test separate, otherwise the error will cause other tests to fail

suite('vsRuleParser Test Suite', () => {
	test('Parse vsComponent test', parseVsComponent);
	test('Parse caretValueRule test', parseCaretValueRule);
	test('Parse insertRule test', parseInsertRule);
});

function parseVsComponent(){
	const parser = new nearley.Parser(nearley.Grammar.fromCompiled(ruleGrammar));

	//parse vsComponent - reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#defining-value-sets (03 march 2021, Shorthand v. 1.1.0)
	assert.doesNotThrow(() => {
		parser.feed("* SCT#971000205103 \"Wearing street clothes with shoes\" \n");
		parser.feed("* SCT#961000205106 \"Wearing street clothes, no shoes\" \n");
		parser.feed("* SCT#951000205108 \"Wearing underwear or less\" \n");
		parser.feed("* include codes from system SCT where concept is-a #367651003 \"Malignant neoplasm of primary, secondary, or uncertain origin (morphologic abnormality)\" \n");
		parser.feed("* include codes from system SCT where concept is-a #399919001 \"Carcinoma in situ - category (morphologic abnormality)\" \n");
		parser.feed("* include codes from system SCT where concept is-a #399983006 \"In situ adenomatous neoplasm - category (morphologic abnormality)\" \n");
		parser.feed("* exclude codes from system SCT where concept is-a #450893003 \"Papillary neoplasm, pancreatobiliary-type, with high grade intraepithelial neoplasia (morphologic abnormality)\" \n");
		parser.feed("* exclude codes from system SCT where concept is-a #128640002 \"Glandular intraepithelial neoplasia, grade III (morphologic abnormality)\" \n");
		parser.feed("* exclude codes from system SCT where concept is-a #450890000 \"Glandular intraepithelial neoplasia, low grade (morphologic abnormality)\" \n");
		parser.feed("* exclude codes from system SCT where concept is-a #703548001 \"Endometrioid intraepithelial neoplasia (morphologic abnormality)\" \n");
	});
}

function parseCaretValueRule(){
	const parser = new nearley.Parser(nearley.Grammar.fromCompiled(ruleGrammar));
	
	//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#contains-rules-for-slicing (03 march 2021, Shorthand v. 1.1.0) 
	//parser cannot handle an inline comments -> TODO: correct parser
	assert.doesNotThrow(() => {
		parser.feed("* component ^slicing.discriminator.type = #pattern \n");
		parser.feed("* component ^slicing.discriminator.path = \"code\" \n");
		parser.feed("* component ^slicing.rules = #open \n");
		parser.feed("* component ^slicing.ordered = false   // can be omitted, since false is the default \n");
		parser.feed("* component ^slicing.description = \"Slice based on the component.code patternẞ\" \n");
	});
}

function parseInsertRule(){
	const parser = new nearley.Parser(nearley.Grammar.fromCompiled(ruleGrammar));
	
	//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#insert-rules (03 march 2021, Shorthand v. 1.1.0)
	//parser has some issues with the whitespace in the bracket term -> TODO: correct parser
	assert.doesNotThrow(() => {
		parser.feed("* insert RuleSet1 \n");
		parser.feed("* insert USObservationRuleSet \n");
		parser.feed("* insert FranceObservationRuleSet \n");
		parser.feed("* insert Name(Bob, Smith) \n");
		parser.feed("* insert Name(Robert, Smith) \n");
		parser.feed("* insert Name(Robert, Smith) \n");
	});
}