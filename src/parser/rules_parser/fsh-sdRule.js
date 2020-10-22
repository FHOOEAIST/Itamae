/*
 * Copyright (c) 2020 the original author or authors.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

// Generated automatically by nearley, version 2.19.5
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const myLexer = require("./lexer");
// build parser, type in cmd(location in the folder of the two files) following:
// nearleyc fsh-sdRule.ne -o fsh-sdRule.js
var grammar = {
    Lexer: myLexer,
    ParserRules: [
    {"name": "doc$ebnf$1", "symbols": []},
    {"name": "doc$ebnf$1", "symbols": ["doc$ebnf$1", "rules"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "doc", "symbols": ["doc$ebnf$1"]},
    {"name": "rules", "symbols": ["cardRule"]},
    {"name": "rules", "symbols": ["flagRule"]},
    {"name": "rules", "symbols": ["valueSetRule"]},
    {"name": "rules", "symbols": ["fixedValueRule"]},
    {"name": "rules", "symbols": ["containsRule"]},
    {"name": "rules", "symbols": ["onlyRule"]},
    {"name": "rules", "symbols": ["obeysRule"]},
    {"name": "rules", "symbols": ["caretValueRule"]},
    {"name": "rules", "symbols": ["insertRule"]},
    {"name": "cardRule$ebnf$1", "symbols": []},
    {"name": "cardRule$ebnf$1", "symbols": ["cardRule$ebnf$1", "flags"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "cardRule", "symbols": ["_", {"literal":"*"}, "_", "path", "_", "card", "_", "cardRule$ebnf$1", "_", (myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "flagRule$ebnf$1", "symbols": ["flag"]},
    {"name": "flagRule$ebnf$1", "symbols": ["flagRule$ebnf$1", "flag"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "flagRule", "symbols": ["_", {"literal":"*"}, "_", "path", "_", "flagRule$ebnf$1", "_", (myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "valueSetRule$ebnf$1", "symbols": [(myLexer.has("KW_UNITS") ? {type: "KW_UNITS"} : KW_UNITS)], "postprocess": id},
    {"name": "valueSetRule$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "valueSetRule$ebnf$2", "symbols": ["strength"], "postprocess": id},
    {"name": "valueSetRule$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "valueSetRule", "symbols": ["_", {"literal":"*"}, "_", "path", "_", "valueSetRule$ebnf$1", "_", (myLexer.has("KW_FROM") ? {type: "KW_FROM"} : KW_FROM), "_", "sequence", "_", "valueSetRule$ebnf$2", "_", (myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "fixedValueRule$ebnf$1", "symbols": [(myLexer.has("KW_UNITS") ? {type: "KW_UNITS"} : KW_UNITS)], "postprocess": id},
    {"name": "fixedValueRule$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "fixedValueRule$ebnf$2", "symbols": ["exactly"], "postprocess": id},
    {"name": "fixedValueRule$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "fixedValueRule", "symbols": ["_", {"literal":"*"}, "_", "path", "_", "fixedValueRule$ebnf$1", "_", (myLexer.has("EQUAL") ? {type: "EQUAL"} : EQUAL), "_", "values", "_", "fixedValueRule$ebnf$2", "_", (myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "containsRule$ebnf$1", "symbols": []},
    {"name": "containsRule$ebnf$1", "symbols": ["containsRule$ebnf$1", "moreItems"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "containsRule", "symbols": ["_", {"literal":"*"}, "_", "path", "_", (myLexer.has("KW_CONTAINS") ? {type: "KW_CONTAINS"} : KW_CONTAINS), "_", "item", "containsRule$ebnf$1", "_", (myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "onlyRule$ebnf$1", "symbols": []},
    {"name": "onlyRule$ebnf$1", "symbols": ["onlyRule$ebnf$1", "moreTargetTypes"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "onlyRule", "symbols": ["_", {"literal":"*"}, "_", "path", "_", (myLexer.has("KW_ONLY") ? {type: "KW_ONLY"} : KW_ONLY), "_", "targetType", "onlyRule$ebnf$1", "_", (myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "obeysRule$ebnf$1", "symbols": ["path"], "postprocess": id},
    {"name": "obeysRule$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "obeysRule$ebnf$2", "symbols": []},
    {"name": "obeysRule$ebnf$2", "symbols": ["obeysRule$ebnf$2", "moreSequences"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "obeysRule", "symbols": ["_", {"literal":"*"}, "_", "obeysRule$ebnf$1", "_", (myLexer.has("KW_OBEYS") ? {type: "KW_OBEYS"} : KW_OBEYS), "_", "sequence", "obeysRule$ebnf$2", "_", (myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "caretValueRule$ebnf$1", "symbols": ["path"], "postprocess": id},
    {"name": "caretValueRule$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "caretValueRule", "symbols": ["_", {"literal":"*"}, "_", "caretValueRule$ebnf$1", "_", "caretPath", "_", (myLexer.has("EQUAL") ? {type: "EQUAL"} : EQUAL), "_", "values", "_", (myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "insertRule", "symbols": ["_", {"literal":"*"}, "_", (myLexer.has("KW_INSERT") ? {type: "KW_INSERT"} : KW_INSERT), "_", "sequence", "_", (myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "path", "symbols": ["kwSystem"]},
    {"name": "path", "symbols": ["sequence"]},
    {"name": "caretPath$ebnf$1", "symbols": [(myLexer.has("NONWS") ? {type: "NONWS"} : NONWS)]},
    {"name": "caretPath$ebnf$1", "symbols": ["caretPath$ebnf$1", (myLexer.has("NONWS") ? {type: "NONWS"} : NONWS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "caretPath", "symbols": [{"literal":"^"}, "caretPath$ebnf$1"]},
    {"name": "flag", "symbols": [{"literal":"?"}, {"literal":"!"}]},
    {"name": "flag", "symbols": [{"literal":"M"}, {"literal":"S"}]},
    {"name": "flag", "symbols": [{"literal":"S"}, {"literal":"U"}]},
    {"name": "flag", "symbols": [{"literal":"T"}, {"literal":"U"}]},
    {"name": "flag", "symbols": [{"literal":"N"}]},
    {"name": "flag", "symbols": [{"literal":"D"}]},
    {"name": "flags", "symbols": ["_", "flag"]},
    {"name": "strength", "symbols": [{"literal":"("}, "_", (myLexer.has("KW_EXAMPLE") ? {type: "KW_EXAMPLE"} : KW_EXAMPLE), "_", {"literal":")"}]},
    {"name": "strength", "symbols": [{"literal":"("}, "_", (myLexer.has("KW_PREFERED") ? {type: "KW_PREFERED"} : KW_PREFERED), "_", {"literal":")"}]},
    {"name": "strength", "symbols": [{"literal":"("}, "_", (myLexer.has("KW_EXTENSIBLE") ? {type: "KW_EXTENSIBLE"} : KW_EXTENSIBLE), "_", {"literal":")"}]},
    {"name": "strength", "symbols": [{"literal":"("}, "_", (myLexer.has("KW_REQUIRED") ? {type: "KW_REQUIRED"} : KW_REQUIRED), "_", {"literal":")"}]},
    {"name": "values", "symbols": [(myLexer.has("STRING") ? {type: "STRING"} : STRING)]},
    {"name": "values", "symbols": ["reference"]},
    {"name": "values", "symbols": ["code"]},
    {"name": "values", "symbols": ["quantity"]},
    {"name": "values", "symbols": ["ratio"]},
    {"name": "values", "symbols": ["number"]},
    {"name": "values", "symbols": ["bool"]},
    {"name": "values", "symbols": ["sequence"]},
    {"name": "item$ebnf$1", "symbols": [(myLexer.has("NL") ? {type: "NL"} : NL)], "postprocess": id},
    {"name": "item$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "item$ebnf$2", "symbols": ["named"], "postprocess": id},
    {"name": "item$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "item$ebnf$3", "symbols": []},
    {"name": "item$ebnf$3", "symbols": ["item$ebnf$3", "flags"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "item", "symbols": ["item$ebnf$1", "_", "sequence", "_", "item$ebnf$2", "_", "card", "item$ebnf$3"]},
    {"name": "moreItems", "symbols": ["_", (myLexer.has("KW_AND") ? {type: "KW_AND"} : KW_AND), "_", "item"]},
    {"name": "targetType", "symbols": ["reference"]},
    {"name": "targetType", "symbols": ["sequence"]},
    {"name": "moreTargetTypes", "symbols": ["_", {"literal":"o"}, {"literal":"r"}, (myLexer.has("WS") ? {type: "WS"} : WS), "_", "targetType"]},
    {"name": "code$ebnf$1", "symbols": ["sequence"], "postprocess": id},
    {"name": "code$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "code$ebnf$2", "symbols": [(myLexer.has("STRING") ? {type: "STRING"} : STRING)], "postprocess": id},
    {"name": "code$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "code", "symbols": ["code$ebnf$1", {"literal":"#"}, "sequence", "_", "code$ebnf$2"]},
    {"name": "morecode", "symbols": ["code", (myLexer.has("KW_AND") ? {type: "KW_AND"} : KW_AND), "_"]},
    {"name": "commaDelimitedCode$ebnf$1", "symbols": ["codeComma"]},
    {"name": "commaDelimitedCode$ebnf$1", "symbols": ["commaDelimitedCode$ebnf$1", "codeComma"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "commaDelimitedCode", "symbols": ["commaDelimitedCode$ebnf$1", "_", "code"]},
    {"name": "codeComma", "symbols": ["_", "code", "_", {"literal":","}]},
    {"name": "quantity", "symbols": ["number", "_", "unit"]},
    {"name": "ratio", "symbols": ["ratioPart", "_", {"literal":":"}, "_", "ratioPart"]},
    {"name": "ratioPart", "symbols": ["number"]},
    {"name": "ratioPart", "symbols": ["quantity"]},
    {"name": "bool", "symbols": [(myLexer.has("KW_TRUE") ? {type: "KW_TRUE"} : KW_TRUE)]},
    {"name": "bool", "symbols": [(myLexer.has("KW_FALSE") ? {type: "KW_FALSE"} : KW_FALSE)]},
    {"name": "reference$ebnf$1", "symbols": []},
    {"name": "reference$ebnf$1", "symbols": ["reference$ebnf$1", "moreReferences"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "reference$ebnf$2", "symbols": [(myLexer.has("STRING") ? {type: "STRING"} : STRING)], "postprocess": id},
    {"name": "reference$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "reference", "symbols": ["kwReference", "_", {"literal":"("}, "_", "sequence", "reference$ebnf$1", "_", {"literal":")"}, "_", "reference$ebnf$2"]},
    {"name": "card$ebnf$1$subexpression$1$ebnf$1", "symbols": []},
    {"name": "card$ebnf$1$subexpression$1$ebnf$1", "symbols": ["card$ebnf$1$subexpression$1$ebnf$1", "DIGIT"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "card$ebnf$1$subexpression$1", "symbols": ["card$ebnf$1$subexpression$1$ebnf$1"]},
    {"name": "card$ebnf$1", "symbols": ["card$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "card$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "card$ebnf$2$subexpression$1$ebnf$1", "symbols": []},
    {"name": "card$ebnf$2$subexpression$1$ebnf$1", "symbols": ["card$ebnf$2$subexpression$1$ebnf$1", "DIGIT"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "card$ebnf$2$subexpression$1", "symbols": ["card$ebnf$2$subexpression$1$ebnf$1"]},
    {"name": "card$ebnf$2", "symbols": ["card$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "card$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "card", "symbols": ["card$ebnf$1", {"literal":"."}, {"literal":"."}, "card$ebnf$2"]},
    {"name": "card$ebnf$3$subexpression$1$ebnf$1", "symbols": []},
    {"name": "card$ebnf$3$subexpression$1$ebnf$1", "symbols": ["card$ebnf$3$subexpression$1$ebnf$1", "DIGIT"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "card$ebnf$3$subexpression$1", "symbols": ["card$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "card$ebnf$3", "symbols": ["card$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "card$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "card", "symbols": ["card$ebnf$3", {"literal":"."}, {"literal":"."}, {"literal":"*"}]},
    {"name": "sequence$ebnf$1", "symbols": []},
    {"name": "sequence$ebnf$1", "symbols": ["sequence$ebnf$1", (myLexer.has("NONWS") ? {type: "NONWS"} : NONWS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "sequence", "symbols": ["sequence$ebnf$1"]},
    {"name": "sequenceAnd", "symbols": ["_", "sequence", "_", (myLexer.has("KW_AND") ? {type: "KW_AND"} : KW_AND)]},
    {"name": "moreSequences", "symbols": ["_", (myLexer.has("KW_AND") ? {type: "KW_AND"} : KW_AND), "_", "sequence"]},
    {"name": "commaDelimitedSequence$ebnf$1", "symbols": ["sequenceComma"]},
    {"name": "commaDelimitedSequence$ebnf$1", "symbols": ["commaDelimitedSequence$ebnf$1", "sequenceComma"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "commaDelimitedSequence", "symbols": ["commaDelimitedSequence$ebnf$1", "_", "sequence"]},
    {"name": "sequenceComma", "symbols": ["_", "sequence", "_", {"literal":","}]},
    {"name": "moreReferences", "symbols": ["_", "referenceSeperator", "_", "sequence"]},
    {"name": "referenceSeperator", "symbols": [{"literal":"o"}, {"literal":"r"}, (myLexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "referenceSeperator", "symbols": [{"literal":"|"}]},
    {"name": "named", "symbols": [(myLexer.has("KW_NAMED") ? {type: "KW_NAMED"} : KW_NAMED), "_", "sequence"]},
    {"name": "exactly", "symbols": [{"literal":"("}, "_", (myLexer.has("KW_EXACTLY") ? {type: "KW_EXACTLY"} : KW_EXACTLY), "_", {"literal":")"}]},
    {"name": "inExClude", "symbols": [(myLexer.has("KW_EXCLUDE") ? {type: "KW_EXCLUDE"} : KW_EXCLUDE)]},
    {"name": "inExClude", "symbols": [(myLexer.has("KW_INCLUDE") ? {type: "KW_INCLUDE"} : KW_INCLUDE)]},
    {"name": "kwReference", "symbols": [{"literal":"R"}, {"literal":"e"}, {"literal":"f"}, {"literal":"e"}, {"literal":"r"}, {"literal":"e"}, {"literal":"n"}, {"literal":"c"}, {"literal":"e"}]},
    {"name": "kwVsReference", "symbols": [{"literal":"v"}, {"literal":"a"}, {"literal":"l"}, {"literal":"u"}, {"literal":"e"}, {"literal":"s"}, {"literal":"e"}, {"literal":"t"}]},
    {"name": "kwSystem", "symbols": [{"literal":"s"}, {"literal":"y"}, {"literal":"s"}, {"literal":"t"}, {"literal":"e"}, {"literal":"m"}]},
    {"name": "unit$ebnf$1", "symbols": []},
    {"name": "unit$ebnf$1", "symbols": ["unit$ebnf$1", (myLexer.has("NONWS") ? {type: "NONWS"} : NONWS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unit", "symbols": [{"literal":"'"}, "unit$ebnf$1", {"literal":"'"}]},
    {"name": "number$ebnf$1", "symbols": ["sign"], "postprocess": id},
    {"name": "number$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "number$ebnf$2", "symbols": ["DIGIT"]},
    {"name": "number$ebnf$2", "symbols": ["number$ebnf$2", "DIGIT"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "number$ebnf$3", "symbols": ["decimals"], "postprocess": id},
    {"name": "number$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "number", "symbols": ["number$ebnf$1", "number$ebnf$2", "number$ebnf$3"]},
    {"name": "decimals$ebnf$1", "symbols": ["DIGIT"]},
    {"name": "decimals$ebnf$1", "symbols": ["decimals$ebnf$1", "DIGIT"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimals", "symbols": [{"literal":"."}, "decimals$ebnf$1"]},
    {"name": "sign", "symbols": [{"literal":"+"}]},
    {"name": "sign", "symbols": [{"literal":"-"}]},
    {"name": "DIGIT", "symbols": [{"literal":"0"}]},
    {"name": "DIGIT", "symbols": [{"literal":"1"}]},
    {"name": "DIGIT", "symbols": [{"literal":"2"}]},
    {"name": "DIGIT", "symbols": [{"literal":"3"}]},
    {"name": "DIGIT", "symbols": [{"literal":"4"}]},
    {"name": "DIGIT", "symbols": [{"literal":"5"}]},
    {"name": "DIGIT", "symbols": [{"literal":"6"}]},
    {"name": "DIGIT", "symbols": [{"literal":"7"}]},
    {"name": "DIGIT", "symbols": [{"literal":"8"}]},
    {"name": "DIGIT", "symbols": [{"literal":"9"}]},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (myLexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]}
]
  , ParserStart: "doc"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
