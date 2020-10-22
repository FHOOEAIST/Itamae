#Copyright (c) 2020 the original author or authors.
#DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
#
#This Source Code Form is subject to the terms of the Mozilla Public
#License, v. 2.0. If a copy of the MPL was not distributed with this
#file, You can obtain one at https://mozilla.org/MPL/2.0/.

@{%
const myLexer = require("./lexer");
// build parser, type in cmd(location in the folder of the two files) following:
// nearleyc fsh-mappingEntityRule.ne -o fsh-mappingEntityRule.js
%}

@lexer myLexer

# information for some written rules:
# in the official documentation its shown that you can work with whole words to match,
# but because there is a NONWS token in our lexer you have to write every letter in an own string to match right
doc
    -> rules:*

rules
    -> mappingRule
    | insertRule

mappingRule
    -> _ "*" _ path:? _ %ARROW _ %STRING _ %STRING:? code:? _ %NL

insertRule
    -> _ "*" _ %KW_INSERT _ sequence _ %NL

path
    -> kwSystem
    | sequence

code
    -> sequence:? "#" sequence _ %STRING:?

kwSystem
    -> "s" "y" "s" "t" "e" "m"

sequence
    -> %NONWS:*

_ -> %WS:*