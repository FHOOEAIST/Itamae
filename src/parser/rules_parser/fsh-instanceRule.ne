#Copyright (c) 2020 the original author or authors.
#DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
#
#This Source Code Form is subject to the terms of the Mozilla Public
#License, v. 2.0. If a copy of the MPL was not distributed with this
#file, You can obtain one at https://mozilla.org/MPL/2.0/.

@{%
const myLexer = require("./lexer");
// build parser, type in cmd(location in the folder of the two files) following:
// nearleyc fsh-instanceRule.ne -o fsh-instanceRule.js
%}

@lexer myLexer

# {% id %} returns the data it gets without changeing anything

# information for some written rules:
# in the official documentation its shown that you can work with whole words to match,
# but because there is a NONWS token in our lexer you have to write every letter in an own string to match right
doc
    -> rules:*

rules
    -> fixedValueRule
    | insertRule

fixedValueRule
    -> _ "*" _ path _ %KW_UNITS:? _ %EQUAL _ values _ exactly:? _ %NL

insertRule
    -> _ "*" _ %KW_INSERT _ sequence _ %NL

path
    -> %KW_SYSTEM
    | sequence


values
    -> %STRING
    | reference
    | code
    | quantity
    | ratio
    | number
    | bool
    | sequence
#TODO: complete other values

code
    -> sequence:? "#" sequence _ %STRING:?

quantity
    -> number _ unit

ratio
    -> ratioPart _ ":" _ ratioPart

ratioPart
    -> number
    | quantity

bool
    -> %KW_TRUE
    | %KW_FALSE

reference
    -> kwReference _ "(" _ sequence moreReferences:* _ ")" _ %STRING:?

sequence
    -> %NONWS:*

moreReferences
    -> _ referenceSeperator _ sequence

referenceSeperator
    ->  "o" "r" %WS
    | "|"

exactly
    -> "(" _ %KW_EXACTLY _ ")"

kwReference
    -> "R" "e" "f" "e" "r" "e" "n" "c" "e"

unit
    -> "'" %NONWS:* "'"

number
    -> sign:? DIGIT:+ decimals:?

decimals
    -> "." DIGIT:+

sign
    -> "+"
    | "-"

DIGIT
    -> "0"
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"

_ -> %WS:*