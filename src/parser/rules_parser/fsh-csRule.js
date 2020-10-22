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
// nearleyc fsh-csRule.ne -o fsh-csRule.js
var grammar = {
    Lexer: myLexer,
    ParserRules: [
    {"name": "doc$ebnf$1", "symbols": []},
    {"name": "doc$ebnf$1", "symbols": ["doc$ebnf$1", "rules"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "doc", "symbols": ["doc$ebnf$1"]},
    {"name": "rules", "symbols": ["concept"]},
    {"name": "rules", "symbols": ["insertRule"]},
    {"name": "rules", "symbols": ["caretValueRule"]},
    {"name": "caretValueRule$ebnf$1", "symbols": ["path"], "postprocess": id},
    {"name": "caretValueRule$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "caretValueRule", "symbols": ["_", {"literal":"*"}, "_", "caretValueRule$ebnf$1", "_", "caretPath", "_", (myLexer.has("EQUAL") ? {type: "EQUAL"} : EQUAL), "_", "values", "_", (myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "insertRule", "symbols": ["_", {"literal":"*"}, "_", (myLexer.has("KW_INSERT") ? {type: "KW_INSERT"} : KW_INSERT), "_", "sequence", "_", (myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "concept", "symbols": ["_", {"literal":"*"}, "_", "code", "_", (myLexer.has("NL") ? {type: "NL"} : NL), "_", (myLexer.has("STRING") ? {type: "STRING"} : STRING), "_", (myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "path", "symbols": [(myLexer.has("KW_SYSTEM") ? {type: "KW_SYSTEM"} : KW_SYSTEM)]},
    {"name": "path", "symbols": ["sequence"]},
    {"name": "caretPath$ebnf$1", "symbols": [(myLexer.has("NONWS") ? {type: "NONWS"} : NONWS)]},
    {"name": "caretPath$ebnf$1", "symbols": ["caretPath$ebnf$1", (myLexer.has("NONWS") ? {type: "NONWS"} : NONWS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "caretPath", "symbols": [{"literal":"^"}, "caretPath$ebnf$1"]},
    {"name": "values", "symbols": [(myLexer.has("STRING") ? {type: "STRING"} : STRING)]},
    {"name": "values", "symbols": ["reference"]},
    {"name": "values", "symbols": ["code"]},
    {"name": "values", "symbols": ["quantity"]},
    {"name": "values", "symbols": ["ratio"]},
    {"name": "values", "symbols": ["number"]},
    {"name": "values", "symbols": ["bool"]},
    {"name": "values", "symbols": ["sequence"]},
    {"name": "code$ebnf$1", "symbols": ["sequence"], "postprocess": id},
    {"name": "code$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "code$ebnf$2", "symbols": [(myLexer.has("STRING") ? {type: "STRING"} : STRING)], "postprocess": id},
    {"name": "code$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "code", "symbols": ["code$ebnf$1", {"literal":"#"}, "sequence", "_", "code$ebnf$2"]},
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
    {"name": "sequence$ebnf$1", "symbols": []},
    {"name": "sequence$ebnf$1", "symbols": ["sequence$ebnf$1", (myLexer.has("NONWS") ? {type: "NONWS"} : NONWS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "sequence", "symbols": ["sequence$ebnf$1"]},
    {"name": "moreReferences", "symbols": ["_", "referenceSeperator", "_", "sequence"]},
    {"name": "referenceSeperator", "symbols": [{"literal":"o"}, {"literal":"r"}, (myLexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "referenceSeperator", "symbols": [{"literal":"|"}]},
    {"name": "kwReference", "symbols": [{"literal":"R"}, {"literal":"e"}, {"literal":"f"}, {"literal":"e"}, {"literal":"r"}, {"literal":"e"}, {"literal":"n"}, {"literal":"c"}, {"literal":"e"}]},
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
