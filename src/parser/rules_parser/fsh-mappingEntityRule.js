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
// nearleyc fsh-mappingEntityRule.ne -o fsh-mappingEntityRule.js
var grammar = {
    Lexer: myLexer,
    ParserRules: [
    {"name": "doc$ebnf$1", "symbols": []},
    {"name": "doc$ebnf$1", "symbols": ["doc$ebnf$1", "rules"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "doc", "symbols": ["doc$ebnf$1"]},
    {"name": "rules", "symbols": ["mappingRule"]},
    {"name": "rules", "symbols": ["insertRule"]},
    {"name": "mappingRule$ebnf$1", "symbols": ["path"], "postprocess": id},
    {"name": "mappingRule$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "mappingRule$ebnf$2", "symbols": [(myLexer.has("STRING") ? {type: "STRING"} : STRING)], "postprocess": id},
    {"name": "mappingRule$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "mappingRule$ebnf$3", "symbols": ["code"], "postprocess": id},
    {"name": "mappingRule$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "mappingRule", "symbols": ["_", {"literal":"*"}, "_", "mappingRule$ebnf$1", "_", (myLexer.has("ARROW") ? {type: "ARROW"} : ARROW), "_", (myLexer.has("STRING") ? {type: "STRING"} : STRING), "_", "mappingRule$ebnf$2", "mappingRule$ebnf$3", "_", (myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "insertRule", "symbols": ["_", {"literal":"*"}, "_", (myLexer.has("KW_INSERT") ? {type: "KW_INSERT"} : KW_INSERT), "_", "sequence", "_", (myLexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "path", "symbols": ["kwSystem"]},
    {"name": "path", "symbols": ["sequence"]},
    {"name": "code$ebnf$1", "symbols": ["sequence"], "postprocess": id},
    {"name": "code$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "code$ebnf$2", "symbols": [(myLexer.has("STRING") ? {type: "STRING"} : STRING)], "postprocess": id},
    {"name": "code$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "code", "symbols": ["code$ebnf$1", {"literal":"#"}, "sequence", "_", "code$ebnf$2"]},
    {"name": "kwSystem", "symbols": [{"literal":"s"}, {"literal":"y"}, {"literal":"s"}, {"literal":"t"}, {"literal":"e"}, {"literal":"m"}]},
    {"name": "sequence$ebnf$1", "symbols": []},
    {"name": "sequence$ebnf$1", "symbols": ["sequence$ebnf$1", (myLexer.has("NONWS") ? {type: "NONWS"} : NONWS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "sequence", "symbols": ["sequence$ebnf$1"]},
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
