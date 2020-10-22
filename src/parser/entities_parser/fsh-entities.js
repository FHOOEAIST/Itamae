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
// nearleyc fsh-entities.ne -o fsh-entities.js
var grammar = {
    Lexer: myLexer,
    ParserRules: [
    {"name": "doc$ebnf$1", "symbols": []},
    {"name": "doc$ebnf$1", "symbols": ["doc$ebnf$1", "entity"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "doc", "symbols": ["doc$ebnf$1"], "postprocess": id},
    {"name": "entity", "symbols": ["alias"], "postprocess": id},
    {"name": "entity", "symbols": ["profile"], "postprocess": id},
    {"name": "entity", "symbols": ["extension"], "postprocess": id},
    {"name": "entity", "symbols": ["instance"], "postprocess": id},
    {"name": "entity", "symbols": ["invariant"], "postprocess": id},
    {"name": "entity", "symbols": ["valueSet"], "postprocess": id},
    {"name": "entity", "symbols": ["codeSystem"], "postprocess": id},
    {"name": "entity", "symbols": ["ruleSet"], "postprocess": id},
    {"name": "entity", "symbols": ["mapping"], "postprocess": id},
    {"name": "entity", "symbols": ["_", (myLexer.has("NL") ? {type: "NL"} : NL)], "postprocess": function (data) { return {type: "newline"} }},
    {"name": "alias", "symbols": [(myLexer.has("KW_ALIAS") ? {type: "KW_ALIAS"} : KW_ALIAS), "_", "sequence", "_", {"literal":"="}, "_", "sequence", "_", (myLexer.has("NL") ? {type: "NL"} : NL)], "postprocess":
        function(data) {
            return{
                type: data[0].text.substring(0,data[0].text.length-1),
                name: data[2].join(""),
                value: [data[6].join("")]
            }
        }
            },
    {"name": "profile$ebnf$1", "symbols": ["profileMetadata"]},
    {"name": "profile$ebnf$1", "symbols": ["profile$ebnf$1", "profileMetadata"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "profile", "symbols": [(myLexer.has("KW_PROFILE") ? {type: "KW_PROFILE"} : KW_PROFILE), "_", "sequence", "_", (myLexer.has("NL") ? {type: "NL"} : NL), "profile$ebnf$1"], "postprocess":
        function(data) {
            return {
                type: data[0].text.substring(0,data[0].text.length-1),
                name: data[2].join(""),
                value: data[5]
            }
        }
            },
    {"name": "profileMetadata", "symbols": ["parent"], "postprocess": id},
    {"name": "profileMetadata", "symbols": ["id"], "postprocess": id},
    {"name": "profileMetadata", "symbols": ["title"], "postprocess": id},
    {"name": "profileMetadata", "symbols": ["description"], "postprocess": id},
    {"name": "profileMetadata", "symbols": ["mixins"], "postprocess": id},
    {"name": "extension$ebnf$1", "symbols": []},
    {"name": "extension$ebnf$1", "symbols": ["extension$ebnf$1", "extensionMetadata"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "extension", "symbols": [(myLexer.has("KW_EXTENSION") ? {type: "KW_EXTENSION"} : KW_EXTENSION), "_", "sequence", "_", (myLexer.has("NL") ? {type: "NL"} : NL), "extension$ebnf$1"], "postprocess":
        function(data) {
            return {
                type: data[0].text.substring(0,data[0].text.length-1),
                name: data[2].join(""),
                value: data[5]
            }
        }
            },
    {"name": "extensionMetadata", "symbols": ["parent"], "postprocess": id},
    {"name": "extensionMetadata", "symbols": ["id"], "postprocess": id},
    {"name": "extensionMetadata", "symbols": ["title"], "postprocess": id},
    {"name": "extensionMetadata", "symbols": ["description"], "postprocess": id},
    {"name": "extensionMetadata", "symbols": ["mixins"], "postprocess": id},
    {"name": "instance$ebnf$1", "symbols": []},
    {"name": "instance$ebnf$1", "symbols": ["instance$ebnf$1", "instanceMetadata"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "instance", "symbols": [(myLexer.has("KW_INSTANCE") ? {type: "KW_INSTANCE"} : KW_INSTANCE), "_", "sequence", "_", (myLexer.has("NL") ? {type: "NL"} : NL), "instance$ebnf$1"], "postprocess":
        function(data) {
             return {
                type: data[0].text.substring(0,data[0].text.length-1),
                name: data[2].join(""),
                value: data[5]
            }
        }
            },
    {"name": "instanceMetadata", "symbols": ["instanceOf"], "postprocess": id},
    {"name": "instanceMetadata", "symbols": ["title"], "postprocess": id},
    {"name": "instanceMetadata", "symbols": ["description"], "postprocess": id},
    {"name": "instanceMetadata", "symbols": ["usage"], "postprocess": id},
    {"name": "instanceMetadata", "symbols": ["mixins"], "postprocess": id},
    {"name": "invariant$ebnf$1", "symbols": ["invariantMetadata"]},
    {"name": "invariant$ebnf$1", "symbols": ["invariant$ebnf$1", "invariantMetadata"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "invariant", "symbols": [(myLexer.has("KW_INVARIANT") ? {type: "KW_INVARIANT"} : KW_INVARIANT), "_", "sequence", "_", (myLexer.has("NL") ? {type: "NL"} : NL), "invariant$ebnf$1"], "postprocess":
        function(data) {
             return {
                type: data[0].text.substring(0,data[0].text.length-1),
                name: data[2].join(""),
                value: data[5]
            }
        }
            },
    {"name": "invariantMetadata", "symbols": ["description"], "postprocess": id},
    {"name": "invariantMetadata", "symbols": ["expression"], "postprocess": id},
    {"name": "invariantMetadata", "symbols": ["xpath"], "postprocess": id},
    {"name": "invariantMetadata", "symbols": ["severity"], "postprocess": id},
    {"name": "valueSet$ebnf$1", "symbols": []},
    {"name": "valueSet$ebnf$1", "symbols": ["valueSet$ebnf$1", "vsMetadata"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "valueSet", "symbols": [(myLexer.has("KW_VALUESET") ? {type: "KW_VALUESET"} : KW_VALUESET), "_", "sequence", "_", (myLexer.has("NL") ? {type: "NL"} : NL), "valueSet$ebnf$1"], "postprocess":
        function(data) {
             return {
                type: data[0].text.substring(0,data[0].text.length-1),
                name: data[2].join(""),
                value: data[5]
            }
        }
            },
    {"name": "vsMetadata", "symbols": ["id"], "postprocess": id},
    {"name": "vsMetadata", "symbols": ["title"], "postprocess": id},
    {"name": "vsMetadata", "symbols": ["description"], "postprocess": id},
    {"name": "codeSystem$ebnf$1", "symbols": []},
    {"name": "codeSystem$ebnf$1", "symbols": ["codeSystem$ebnf$1", "csMetadata"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "codeSystem", "symbols": [(myLexer.has("KW_CODESYSTEM") ? {type: "KW_CODESYSTEM"} : KW_CODESYSTEM), "_", "sequence", "_", (myLexer.has("NL") ? {type: "NL"} : NL), "codeSystem$ebnf$1"], "postprocess":
        function(data) {
             return {
                type: data[0].text.substring(0,data[0].text.length-1),
                name: data[2].join(""),
                value: data[5]
            }
        }
            },
    {"name": "csMetadata", "symbols": ["id"], "postprocess": id},
    {"name": "csMetadata", "symbols": ["title"], "postprocess": id},
    {"name": "csMetadata", "symbols": ["description"], "postprocess": id},
    {"name": "ruleSet", "symbols": [(myLexer.has("KW_RULESET") ? {type: "KW_RULESET"} : KW_RULESET), "_", "sequence", "_", (myLexer.has("NL") ? {type: "NL"} : NL)], "postprocess":
        function(data) {
             return {
                type: data[0].text.substring(0,data[0].text.length-1),
                name: data[2].join(""),
                value: data[5]
            }
        }
            },
    {"name": "mapping$ebnf$1", "symbols": []},
    {"name": "mapping$ebnf$1", "symbols": ["mapping$ebnf$1", "mappingMetadata"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "mapping", "symbols": [(myLexer.has("KW_MAPPING") ? {type: "KW_MAPPING"} : KW_MAPPING), "_", "sequence", "_", (myLexer.has("NL") ? {type: "NL"} : NL), "mapping$ebnf$1"], "postprocess":
        function(data) {
             return {
                type: data[0].text.substring(0,data[0].text.length-1),
                name: data[2].join(""),
                value: data[5]
            }
        }
            },
    {"name": "mappingMetadata", "symbols": ["id"], "postprocess": id},
    {"name": "mappingMetadata", "symbols": ["source"], "postprocess": id},
    {"name": "mappingMetadata", "symbols": ["target"], "postprocess": id},
    {"name": "mappingMetadata", "symbols": ["description"], "postprocess": id},
    {"name": "mappingMetadata", "symbols": ["title"], "postprocess": id},
    {"name": "parent", "symbols": ["_", (myLexer.has("KW_PARENT") ? {type: "KW_PARENT"} : KW_PARENT), "_", "sequence", "_", (myLexer.has("NL") ? {type: "NL"} : NL)], "postprocess":
        function(data){
            return {
                type: data[1].text.substring(0,data[1].text.length-1),
                name: data[3].join("")
            }
        }
        },
    {"name": "id", "symbols": ["_", (myLexer.has("KW_ID") ? {type: "KW_ID"} : KW_ID), "_", "sequence", "_", (myLexer.has("NL") ? {type: "NL"} : NL)], "postprocess":
        function(data) {
            return{
                type: data[1].text.substring(0,data[1].text.length-1),
                name: data[3].join("")
            }
        }
        },
    {"name": "title", "symbols": ["_", (myLexer.has("KW_TITLE") ? {type: "KW_TITLE"} : KW_TITLE), "_", (myLexer.has("STRING") ? {type: "STRING"} : STRING), "_", (myLexer.has("NL") ? {type: "NL"} : NL)], "postprocess":
        function(data) {
            return{
                type: data[1].text.substring(0,data[1].text.length-1),
                name: data[3].text
            }
        }
        },
    {"name": "description", "symbols": ["_", (myLexer.has("KW_DESCRIPTION") ? {type: "KW_DESCRIPTION"} : KW_DESCRIPTION), "_", (myLexer.has("STRING") ? {type: "STRING"} : STRING), "_", (myLexer.has("NL") ? {type: "NL"} : NL)], "postprocess":
        function(data) {
            return{
                type: data[1].text.substring(0,data[1].text.length-1),
                name: data[3].text
            }
        }
        },
    {"name": "expression", "symbols": ["_", (myLexer.has("KW_EXPRESSION") ? {type: "KW_EXPRESSION"} : KW_EXPRESSION), "_", (myLexer.has("STRING") ? {type: "STRING"} : STRING), "_", (myLexer.has("NL") ? {type: "NL"} : NL)], "postprocess":
        function(data) {
            return{
                type: data[1].text.substring(0,data[1].text.length-1),
                name: data[3].text
            }
        }
        },
    {"name": "xpath", "symbols": ["_", (myLexer.has("KW_XPATH") ? {type: "KW_XPATH"} : KW_XPATH), "_", (myLexer.has("STRING") ? {type: "STRING"} : STRING), "_", (myLexer.has("NL") ? {type: "NL"} : NL)], "postprocess":
        function(data) {
            return{
                type: data[1].text.substring(0,data[1].text.length-1),
                name: data[3].text
            }
        }
        },
    {"name": "severity", "symbols": ["_", (myLexer.has("KW_SEVERITY") ? {type: "KW_SEVERITY"} : KW_SEVERITY), "_", "code", "_", (myLexer.has("NL") ? {type: "NL"} : NL)], "postprocess":
        function(data) {
            return{
                type: data[1].text.substring(0,data[1].text.length-1),
                name: data[3]
            }
        }
        },
    {"name": "instanceOf", "symbols": ["_", (myLexer.has("KW_INSTANCEOF") ? {type: "KW_INSTANCEOF"} : KW_INSTANCEOF), "_", "sequence", "_", (myLexer.has("NL") ? {type: "NL"} : NL)], "postprocess":
        function(data) {
            return{
                type: data[1].text.substring(0,data[1].text.length-1),
                name: data[3].join("")
            }
        }
        },
    {"name": "usage", "symbols": ["_", (myLexer.has("KW_USAGE") ? {type: "KW_USAGE"} : KW_USAGE), "_", "code", "_", (myLexer.has("NL") ? {type: "NL"} : NL)], "postprocess":
        function(data) {
            return{
                type: data[1].text.substring(0,data[1].text.length-1),
                name: data[3]
            }
        }
            },
    {"name": "mixins", "symbols": ["_", (myLexer.has("KW_MIXINS") ? {type: "KW_MIXINS"} : KW_MIXINS), "mixinsPossibilities", "_", (myLexer.has("NL") ? {type: "NL"} : NL)], "postprocess":
        function(data) {
            return{
                type: data[1].text.substring(0,data[1].text.length-1),
                value: data[2]
            }
        }
        },
    {"name": "mixinsPossibilities$ebnf$1", "symbols": []},
    {"name": "mixinsPossibilities$ebnf$1", "symbols": ["mixinsPossibilities$ebnf$1", "sequenceAnd"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "mixinsPossibilities", "symbols": ["mixinsPossibilities$ebnf$1", "_", "sequence"], "postprocess":
        function(data){
            return data[0].join("") + " " + data[2].join("")
        }
            },
    {"name": "mixinsPossibilities$ebnf$2", "symbols": ["sequenceComma"]},
    {"name": "mixinsPossibilities$ebnf$2", "symbols": ["mixinsPossibilities$ebnf$2", "sequenceComma"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "mixinsPossibilities", "symbols": ["mixinsPossibilities$ebnf$2", "_", "sequence"], "postprocess":
        function(data){
            return data[0].join("") + " " + data[2].join("")
        }
            },
    {"name": "source", "symbols": ["_", (myLexer.has("KW_SOURCE") ? {type: "KW_SOURCE"} : KW_SOURCE), "_", "sequence", "_", (myLexer.has("NL") ? {type: "NL"} : NL)], "postprocess":
        function(data) {
            return{
                type: data[1].text.substring(0,data[1].text.length-1),
                name: data[3].join("")
            }
        }
        },
    {"name": "target", "symbols": ["_", (myLexer.has("KW_TARGET") ? {type: "KW_TARGET"} : KW_TARGET), "_", (myLexer.has("STRING") ? {type: "STRING"} : STRING), "_", (myLexer.has("NL") ? {type: "NL"} : NL)], "postprocess":
        function(data) {
            return{
                type: data[1].text.substring(0,data[1].text.length-1),
                name: data[3].text
            }
        }
        },
    {"name": "code$ebnf$1", "symbols": ["sequence"], "postprocess": id},
    {"name": "code$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "code", "symbols": ["code$ebnf$1", {"literal":"#"}, "sequence"], "postprocess":
        function(data){
            if (data[0] != undefined){
                return {
                type: "code",
                value: data[0].join("") + data[1].value + data[2].join("")
                }
            }
            else {
               return {
                type: "code",
                value: data[1].value + data[2].join("")
                }
            }
        }
            },
    {"name": "sequence$ebnf$1", "symbols": []},
    {"name": "sequence$ebnf$1", "symbols": ["sequence$ebnf$1", (myLexer.has("NONWS") ? {type: "NONWS"} : NONWS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "sequence", "symbols": ["sequence$ebnf$1"], "postprocess": id},
    {"name": "sequenceAnd", "symbols": ["_", "sequence", "_", "kwAnd"], "postprocess":
        function(data) {
            return " " + data[1].join("") + " and"
        }
            },
    {"name": "sequenceComma", "symbols": ["_", "sequence", "_", {"literal":","}], "postprocess":
        function(data) {
            return " "+ data[1].join("") + " ,"
        }
            },
    {"name": "moreSequences", "symbols": ["_", "kwAnd", "_", "sequence"]},
    {"name": "kwAnd", "symbols": [{"literal":"a"}, {"literal":"n"}, {"literal":"d"}]},
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
