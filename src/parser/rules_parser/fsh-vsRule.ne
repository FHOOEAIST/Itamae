#Copyright (c) 2020 the original author or authors.
#DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
#
#This Source Code Form is subject to the terms of the Mozilla Public
#License, v. 2.0. If a copy of the MPL was not distributed with this
#file, You can obtain one at https://mozilla.org/MPL/2.0/.

@{%
const myLexer = require("./lexer");
// build parser, type in cmd(location in the folder of the two files) following:
// nearleyc fsh-vsRule.ne -o fsh-vsRule.js
%}

@lexer myLexer

# information for some written rules:
# in the official documentation its shown that you can work with whole words to match,
# but because there is a NONWS token in our lexer you have to write every letter in an own string to match right
doc
    -> rules:*

rules
    -> insertRule
    | caretValueRule
    | vsComponent

caretValueRule
    -> _ "*" _ path:? _ caretPath _ %EQUAL _ values _ %NL

insertRule
    -> _ "*" _ %KW_INSERT _ sequence _ %NL

vsComponent
    -> _ "*" _ inExClude:? _ vsConceptComponent _ %NL
    | _ "*" _ inExClude:? _ vsFilterComponent _ %NL

vsConceptComponent
    -> code _ vsComponentFrom:?
    | morecode:+ code _ vsComponentFrom
    | commaDelimitedCode _ vsComponentFrom

vsFilterComponent
    -> %KW_CODES _ vsComponentFrom _ filter:?

vsComponentFrom
    -> %KW_FROM _ vsFromSystem _ andValueset:?
    | %KW_FROM _ vsFromValueset _ andSystem:?

vsFromSystem
    -> kwSystem _ sequence

vsFromValueset
    -> kwVsReference _ sequenceDecision

sequenceDecision
    -> sequenceAnd:* _ sequence
    | commaDelimitedSequence

andValueset
    -> %KW_AND _ vsFromValueset

andSystem
    -> %KW_AND _ vsFromSystem

vsFilterList
    -> moreFilters:* vsFilterDefinition

vsFilterDefinition
    -> sequence _ vsFilterOperator _ vsFilterValue:?

vsFilterOperator
    -> %KW_EQUAL
    | sequence

vsFilterValue
    -> code
    | %KW_TRUE
    | %KW_FALSE
    | %STRING
    # TODO: REGEX is missing

path
    -> kwSystem
    | sequence


caretPath
    -> "^" %NONWS:+

filter
    -> %KW_WHERE _ vsFilterList

moreFilters
    -> vsFilterDefinition _ %KW_AND _

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

commaDelimitedSequence
    -> sequenceComma:+ _ sequence

sequenceComma
    -> _ sequence _ ","

moreReferences
    -> _ referenceSeperator _ sequence

referenceSeperator
    ->  "o" "r" %WS
    | "|"

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