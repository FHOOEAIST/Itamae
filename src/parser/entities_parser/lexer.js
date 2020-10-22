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
    KW_ALIAS:           /Alias[ \t]*:/,
    KW_PROFILE:         /Profile[ \t]*:/,
    KW_EXTENSION:       /Extension[ \t]*:/,
    KW_INSTANCE:        /Instance[ \t]*:/,
    KW_INSTANCEOF:      /InstanceOf[ \t]*:/,
    KW_INVARIANT:       /Invariant[ \t]*:/,
    KW_VALUESET:        /ValueSet[ \t]*:/,
    KW_CODESYSTEM:      /CodeSystem[ \t]*:/,
    KW_RULESET:         /RuleSet[ \t]*:/,
    KW_MAPPING:         /Mapping[ \t]*:/,
    KW_MIXINS:          /Mixins[ \t]*:/,
    KW_PARENT:          /Parent[ \t]*:/,
    KW_ID:              /Id[ \t]*:/,
    KW_TITLE:           /Title[ \t]*:/,
    KW_DESCRIPTION:     /Description[ \t]*:/,
    KW_EXPRESSION:      /Expression[ \t]*:/,
    KW_XPATH:           /XPath[ \t]*:/,
    KW_SEVERITY:        /Severity[ \t]*:/,
    KW_USAGE:           /Usage[ \t]*:/,
    KW_SOURCE:          /Source[ \t]*:/,
    KW_TARGET:          /Target[ \t]*:/,
    STRING:             /"(?:\\["\\]|[^\n"\\])*"/,
    LINE_COMMENT:       /[ \t^]+\/\/.*?$/,
    BLOCK_COMMENT:      /\/\*.*?\*\//,
    WS:                 /[ \t\r]/,
    NONWS:              /[^ \t\n\r]/,
    NONWS_STRING:       /[^ \t\n"]/,
    NL:                 { match: /\n/, lineBreaks: true },
})

module.exports = lexer;