/*
 * Copyright (c) 2020 the original author or authors.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const moo = require('moo')

/*
Not all KW from the offical list are used.
If they where also in strings and discriptions they would match and this results in a false parse state.
List: https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#appendix-formal-grammar
*/
let lexer = moo.compile({
    KW_UNITS:           /units/,
    KW_FROM:            /from/,
    KW_CONTAINS:        /contains/,
    KW_INSERT:          /insert/,
    KW_ONLY:            /only/,
    KW_OBEYS:           /obeys/,
    KW_INCLUDE:         /include/,
    KW_EXCLUDE:         /exclude/,
    KW_AND:             /and/,
    KW_CODES:           /codes/,
    KW_TRUE:            /true/,
    KW_FALSE:           /false/,
    KW_WHERE:           /where/,
    KW_NAMED:           /named/,
    KW_EXAMPLE:         /example/,
    KW_PREFERED:        /prefered/,
    KW_EXTENSIBLE:      /extensible/,
    KW_REQUIRED:        /required/,
    KW_EXACTLY:         /exactly/,
    ARROW:              /->/,
    EQUAL:              /=/,
    CARETSYMBOL:        /\\^/,
    STRING:             /"(?:\\["\\]|[^\n"\\])*"/,
    LINE_COMMENT:       /[ \t^]+\/\/.*?$/,
    BLOCK_COMMENT:      /\/\*.*?\*\//,
    WS:                 /[ \t]/,
    NONWS:              /[^ \t\n]/,
    NL:                 { match: /\n/, lineBreaks: true },
})

module.exports = lexer;