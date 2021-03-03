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
const ruleGrammar = require('../../src/parser/rules_parser/fsh-instanceRule');
//parser has to be created for each test separate, otherwise the error will cause other tests to fail

suite('InstanceRule Parser Test Suite', () => {
	test('Parse fixedValueRule test', parseFixedValueRule);
	test('Parse insertRule test', parseInsertRule);
});

function parseFixedValueRule(){
	const parser = new nearley.Parser(nearley.Grammar.fromCompiled(ruleGrammar));
	
	//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#assignment-rules (03 march 2021, Shorthand v. 1.1.0) 
	assert.doesNotThrow(() => {
		parser.feed("* code = LNC#69548-6 \n");
		parser.feed("* code = LNC#69548-6 \"Genetic variant assessment\" \n");
		parser.feed("* code = LNC#69548-6 (exactly) \n");
	});
}

function parseInsertRule(){
	const parser = new nearley.Parser(nearley.Grammar.fromCompiled(ruleGrammar));
	
	//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#insert-rules (03 march 2021, Shorthand v. 1.1.0)
	//parser has some issues with the whitespace in the bracket term -> TODO: correct parser
	assert.doesNotThrow(() => {
		parser.feed("* insert RuleSet1 \n");
		parser.feed("* insert USObservationRuleSet \n");
		parser.feed("* insert FranceObservationRuleSet \n");
		parser.feed("* insert Name(Bob, Smith) \n");
		parser.feed("* insert Name(Robert, Smith) \n");
		parser.feed("* insert Name(Robert, Smith) \n");
	});
}