/*
 * Copyright (c) 2020 the original author or authors.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const assert = require('assert');
const vscode = require('vscode');

//import nearley for parser tests
const nearley = require('nearley');

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Parse entities test', parseEntitiesTest);
	test('Parse rules test', parseRulesTest);
});

function parseEntitiesTest(){
	const entityGrammar = require('../../src/parser/entities_parser/fsh-entities');
	const parser = new nearley.Parser(nearley.Grammar.fromCompiled(entityGrammar));
	
	//parse entity alias
	assert.doesNotThrow(() => {
		parser.feed("Alias: HL7V2 = http://terminology.hl7.org/CodeSystem/v2-0203 \n");
	});
}

function parseRulesTest(){
	const ruleGrammar = require('../../src/parser/rules_parser/fsh-sdRule');
	const parser = new nearley.Parser(nearley.Grammar.fromCompiled(ruleGrammar));

	//parse cardRule
	assert.doesNotThrow(() => {
		parser.feed("* period 0..0 \n");
	});
}