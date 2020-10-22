#Copyright (c) 2020 the original author or authors.
#DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
#
#This Source Code Form is subject to the terms of the Mozilla Public
#License, v. 2.0. If a copy of the MPL was not distributed with this
#file, You can obtain one at https://mozilla.org/MPL/2.0/.

@{%
const myLexer = require("./lexer");
// build parser, type in cmd(location in the folder of the two files) following:
// nearleyc fsh-sdRule.ne -o fsh-sdRule.js
%}

@lexer myLexer

# information for some written rules:
# in the official documentation its shown that you can work with whole words to match,
# but because there is a NONWS token in our lexer you have to write every letter in an own string to match right
doc
    -> rules:*

rules
    -> cardRule
    | flagRule
    | valueSetRule
    | fixedValueRule
    | containsRule
    | onlyRule
    | obeysRule
    | caretValueRule
    | insertRule

cardRule
    -> _ "*" _ path _ card _ flags:* _ %NL

flagRule
    -> _ "*" _ path _ flag:+ _ %NL

valueSetRule
    -> _ "*" _ path _ %KW_UNITS:? _ %KW_FROM _ sequence _ strength:? _ %NL

fixedValueRule
    -> _ "*" _ path _ %KW_UNITS:? _ %EQUAL _ values _ exactly:? _ %NL

containsRule
    -> _ "*" _ path _ %KW_CONTAINS _ item moreItems:* _ %NL

onlyRule
    -> _ "*" _ path _ %KW_ONLY _ targetType moreTargetTypes:* _ %NL

obeysRule
    -> _ "*" _ path:? _ %KW_OBEYS _ sequence moreSequences:* _ %NL

caretValueRule
    -> _ "*" _ path:? _ caretPath _ %EQUAL _ values _ %NL

insertRule
    -> _ "*" _ %KW_INSERT _ sequence _ %NL

path
    -> kwSystem
    | sequence

caretPath
    -> "^" %NONWS:+

flag
    -> "?" "!"
    | "M" "S"
    | "S" "U"
    | "T" "U"
    | "N"
    | "D"

flags
    -> _ flag

strength
    -> "(" _ %KW_EXAMPLE _ ")"
    | "(" _ %KW_PREFERED _ ")"
    | "(" _ %KW_EXTENSIBLE _ ")"
    | "(" _ %KW_REQUIRED _ ")"

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

item
    -> %NL:? _ sequence _ named:? _ card flags:*

moreItems
    -> _ %KW_AND _ item

targetType
    -> reference
    | sequence

moreTargetTypes
    -> _ "o" "r" %WS _ targetType

code
    -> sequence:? "#" sequence _ %STRING:?

morecode
    -> code %KW_AND _

commaDelimitedCode
    -> codeComma:+ _ code

codeComma
    -> _ code _ ","

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

card
    -> (DIGIT:*):? "." "." (DIGIT:*):?
    | (DIGIT:*):? "." "." "*"

sequence
    -> %NONWS:*

sequenceAnd
    -> _ sequence _ %KW_AND

moreSequences
    -> _ %KW_AND _ sequence

commaDelimitedSequence
    -> sequenceComma:+ _ sequence

sequenceComma
    -> _ sequence _ ","

moreReferences
    -> _ referenceSeperator _ sequence

referenceSeperator
    ->  "o" "r" %WS
    | "|"

named
    -> %KW_NAMED _ sequence

exactly
    -> "(" _ %KW_EXACTLY _ ")"

inExClude
    -> %KW_EXCLUDE
    | %KW_INCLUDE


kwReference
    -> "R" "e" "f" "e" "r" "e" "n" "c" "e"

kwVsReference
    -> "v" "a" "l" "u" "e" "s" "e" "t"

kwSystem
    -> "s" "y" "s" "t" "e" "m"

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