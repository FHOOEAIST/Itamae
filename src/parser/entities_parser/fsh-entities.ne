#Copyright (c) 2020 the original author or authors.
#DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
#
#This Source Code Form is subject to the terms of the Mozilla Public
#License, v. 2.0. If a copy of the MPL was not distributed with this
#file, You can obtain one at https://mozilla.org/MPL/2.0/.

@{%
const myLexer = require("./lexer");
// build parser, type in cmd(location in the folder of the two files) following:
// nearleyc fsh-entities.ne -o fsh-entities.js
%}

@lexer myLexer

# {% id %} returns the data it gets without changeing anything

# information for some written rules:
# in the official documentation its shown that you can work with whole words to match,
# but because there is a NONWS token in our lexer you have to write every letter in an own string to match right
doc
    -> entity:* {% id %}

entity
    -> alias        {% id %}
    | profile       {% id %}
    | extension     {% id %}
    | instance      {% id %}
    | invariant     {% id %}
    | valueSet      {% id %}
    | codeSystem    {% id %}
    | ruleSet       {% id %}
    | mapping       {% id %}
    | _ %NL           {% function (data) { return {type: "newline"} } %}

alias
    -> %KW_ALIAS _ sequence _ "=" _ sequence _ %NL {%
        function(data) {
            return{
                type: data[0].text.substring(0,data[0].text.length-1),
                name: data[2].join(""),
                value: [data[6].join("")]
            }
        }
    %}


profile
    -> %KW_PROFILE _ sequence _ %NL profileMetadata:+ {%
        function(data) {
            return {
                type: data[0].text.substring(0,data[0].text.length-1),
                name: data[2].join(""),
                value: data[5]
            }
        }
    %}

profileMetadata
    -> parent       {% id %}
    | id            {% id %}
    | title         {% id %}
    | description   {% id %}
    | mixins        {% id %}


extension
    -> %KW_EXTENSION _ sequence _ %NL extensionMetadata:* {%
        function(data) {
            return {
                type: data[0].text.substring(0,data[0].text.length-1),
                name: data[2].join(""),
                value: data[5]
            }
        }
    %}

extensionMetadata
    -> parent       {% id %}
    | id            {% id %}
    | title         {% id %}
    | description   {% id %}
    | mixins        {% id %}


instance
    -> %KW_INSTANCE _ sequence _ %NL instanceMetadata:* {%
        function(data) {
             return {
                type: data[0].text.substring(0,data[0].text.length-1),
                name: data[2].join(""),
                value: data[5]
            }
        }
    %}

instanceMetadata
    -> instanceOf   {% id %}
    | title         {% id %}
    | description   {% id %}
    | usage         {% id %}
    | mixins        {% id %}

invariant
    -> %KW_INVARIANT _ sequence _ %NL invariantMetadata:+ {%
        function(data) {
             return {
                type: data[0].text.substring(0,data[0].text.length-1),
                name: data[2].join(""),
                value: data[5]
            }
        }
    %}

invariantMetadata
    -> description  {% id %}
    | expression    {% id %}
    | xpath         {% id %}
    | severity      {% id %}


valueSet
    -> %KW_VALUESET _ sequence _ %NL vsMetadata:* {%
        function(data) {
             return {
                type: data[0].text.substring(0,data[0].text.length-1),
                name: data[2].join(""),
                value: data[5]
            }
        }
    %}

vsMetadata
    -> id           {% id %}
    | title         {% id %}
    | description   {% id %}


codeSystem
    -> %KW_CODESYSTEM _ sequence _ %NL csMetadata:* {%
        function(data) {
             return {
                type: data[0].text.substring(0,data[0].text.length-1),
                name: data[2].join(""),
                value: data[5]
            }
        }
    %}

csMetadata
    -> id           {% id %}
    | title         {% id %}
    | description   {% id %}


ruleSet
    -> %KW_RULESET _ sequence _ %NL {%
        function(data) {
             return {
                type: data[0].text.substring(0,data[0].text.length-1),
                name: data[2].join(""),
                value: data[5]
            }
        }
    %}

mapping
    -> %KW_MAPPING _ sequence _ %NL mappingMetadata:* {%
        function(data) {
             return {
                type: data[0].text.substring(0,data[0].text.length-1),
                name: data[2].join(""),
                value: data[5]
            }
        }
    %}

mappingMetadata
    -> id           {% id %}
    | source        {% id %}
    | target        {% id %}
    |description    {% id %}
    | title         {% id %}


parent
    -> _ %KW_PARENT _ sequence _ %NL {%
        function(data){
            return {
                type: data[1].text.substring(0,data[1].text.length-1),
                name: data[3].join("")
            }
        }
        %}

id
    -> _ %KW_ID _ sequence _ %NL {%
        function(data) {
            return{
                type: data[1].text.substring(0,data[1].text.length-1),
                name: data[3].join("")
            }
        }
        %}

title
    -> _ %KW_TITLE _ %STRING _ %NL {%
        function(data) {
            return{
                type: data[1].text.substring(0,data[1].text.length-1),
                name: data[3].text
            }
        }
        %}

description
    -> _ %KW_DESCRIPTION _ %STRING _ %NL {%
        function(data) {
            return{
                type: data[1].text.substring(0,data[1].text.length-1),
                name: data[3].text
            }
        }
        %}

expression
    -> _ %KW_EXPRESSION _ %STRING _ %NL {%
        function(data) {
            return{
                type: data[1].text.substring(0,data[1].text.length-1),
                name: data[3].text
            }
        }
        %}

xpath
    -> _ %KW_XPATH _ %STRING _ %NL {%
        function(data) {
            return{
                type: data[1].text.substring(0,data[1].text.length-1),
                name: data[3].text
            }
        }
        %}

severity
    -> _ %KW_SEVERITY _ code _ %NL {%
        function(data) {
            return{
                type: data[1].text.substring(0,data[1].text.length-1),
                name: data[3]
            }
        }
        %}

instanceOf
    -> _ %KW_INSTANCEOF _ sequence _ %NL {%
        function(data) {
            return{
                type: data[1].text.substring(0,data[1].text.length-1),
                name: data[3].join("")
            }
        }
        %}

usage
    -> _ %KW_USAGE _ code _ %NL {%
        function(data) {
            return{
                type: data[1].text.substring(0,data[1].text.length-1),
                name: data[3]
            }
        }
    %}

mixins
    -> _ %KW_MIXINS mixinsPossibilities _ %NL {%
        function(data) {
            return{
                type: data[1].text.substring(0,data[1].text.length-1),
                value: data[2]
            }
        }
        %}

mixinsPossibilities
    -> sequenceAnd:* _ sequence {%
        function(data){
            return data[0].join("") + " " + data[2].join("")
        }
    %}
    | sequenceComma:+ _ sequence {%
        function(data){
            return data[0].join("") + " " + data[2].join("")
        }
    %}

source
    -> _ %KW_SOURCE _ sequence _ %NL {%
        function(data) {
            return{
                type: data[1].text.substring(0,data[1].text.length-1),
                name: data[3].join("")
            }
        }
        %}

target
    -> _ %KW_TARGET _ %STRING _ %NL {%
        function(data) {
            return{
                type: data[1].text.substring(0,data[1].text.length-1),
                name: data[3].text
            }
        }
        %}

code
    -> sequence:? "#" sequence {%
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
    %}

sequence
    -> %NONWS:* {% id %}

sequenceAnd
    -> _ sequence _ kwAnd {%
        function(data) {
            return " " + data[1].join("") + " and"
        }
    %}

sequenceComma
    -> _ sequence _ "," {%
        function(data) {
            return " "+ data[1].join("") + " ,"
        }
    %}

moreSequences
    -> _ kwAnd _ sequence

kwAnd
    -> "a" "n" "d"

_ -> %WS:*