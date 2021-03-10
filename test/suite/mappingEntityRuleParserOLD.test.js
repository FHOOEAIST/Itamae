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
const ruleGrammar = require('../../src/parser/rules_parser/fsh-mappingEntityRule');
//parser has to be created for each test separate, otherwise the error will cause other tests to fail

suite('MappingEntityRule Parser Test Suite', () => {
	test('Parse mappingRule test', parseMappingRule);
	test('Parse insertRule test', parseInsertRule);
});

function parseMappingRule(){
	const parser = new nearley.Parser(nearley.Grammar.fromCompiled(ruleGrammar));

	//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#defining-mappings (03 march 2021, Shorthand v. 1.1.0)
	assert.doesNotThrow(() => {
		parser.feed("* -> \"Patient\" \"This profile maps to Patient in Argonaut\" \n");
		parser.feed("* identifier.value -> \"Patient.identifier.value\" \n");
		parser.feed("* -> \"Patient\" \n");
		parser.feed("* extension[USCoreRaceExtension] -> \"Patient.extension[http://fhir.org/guides/argonaut/StructureDefinition/argo-race]\" \n");
		parser.feed("* extension[USCoreEthnicityExtension] -> \"Patient.extension[http://fhir.org/guides/argonaut/StructureDefinition/argo-ethnicity]\" \n");
		parser.feed("* extension[USCoreBirthSexExtension] -> \"Patient.extension[http://fhir.org/guides/argonaut/StructureDefinition/argo-birthsex]\" \n");
		parser.feed("* identifier -> \"Patient.identifier\" \n");
		parser.feed("* identifier.system -> \"Patient.identifier.system\" \n");
		parser.feed("* identifier.value -> \"Patient.identifier.value\" \n");
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