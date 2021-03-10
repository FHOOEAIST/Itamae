/*
 * Copyright (c) 2020 the original author or authors.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import assert from 'assert';
import antlr4 from 'antlr4';
import FSHLexer from '../../src/parser/FSHLexer.js';
import FSHParser from '../../src/parser/FSHParser';

describe('parsing alias', () => {
    it('one correct alias', () => {
		assert.doesNotThrow(() => {
			//reference took from https://github.com/HL7Austria/HL7-AT-FHIR-Core-R4/blob/main/input/fsh/Alias.fsh (02 march 2021, Shorthand v. 1.1.0)
			const input = "Alias: HL7V2 = http://terminology.hl7.org/CodeSystem/v2-0203 \n";
			const chars = new antlr4.InputStream(input);
			const lexer = new FSHLexer(chars);
			const tokens  = new antlr4.CommonTokenStream(lexer);
			const parser = new FSHParser(tokens);
			parser.alias();
		});
    });
});

describe('parsing alias', () => {
    it('one correct alias', () => {
		assert.doesNotThrow(() => {
			//reference took from https://github.com/HL7Austria/HL7-AT-FHIR-Core-R4/blob/main/input/fsh/Alias.fsh (02 march 2021, Shorthand v. 1.1.0)
			const input = "Aliasds: HL7V2 = http://terminology.hl7.org/CodeSystem/v2-0203 \n";
			const chars = new antlr4.InputStream(input);
			const lexer = new FSHLexer(chars);
			const tokens  = new antlr4.CommonTokenStream(lexer);
			const parser = new FSHParser(tokens);
			parser.getErrorListenerDispatch().syntaxError
			parser.alias();
		});
    });
});