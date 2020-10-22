/*
 * Copyright (c) 2020 the original author or authors.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const nearley = require("nearley");
const grammar = require("./fsh-sdRule");

try {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    parser.feed(
`* period 0..0
* district 0..0
* line ^slicing.rule = #open
* line ^slicing.discriminator.type = #value
`
);
    if (parser.results.length > 1){
        console.log("more possibilities");
    } else if ( parser.results.length == 1){
        console.log("one possibilities");
    }
    else {
        console.log("no parser found");
    }
    console.log("finished");
} catch (err){
    console.log("ERROR at character " + err.stack)
}

