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
const ruleGrammar = require('../../src/parser/rules_parser/fsh-sdRule');
//parser has to be created for each test separate, otherwise the error will cause other tests to fail

suite('sdRule Parser Test Suite', () => {
	test('Parse cardRule test', parseCardRule);
	test('Parse flagRule test', parseFlagRule);
	test('Parse valueSetRule test', parseValueSetRule);
	test('Parse fixedValueRule test', parseFixedValueRule);
	test('Parse caretValueRule test', parseCaretValueRule);
	test('Parse containsRule for extensions test', parseContainsExtensionsRule);
	test('Parse containsRule for extensions multiline test', parseContainsExtensionsRuleMultiline);
	test('Parse containsRule for slicing test', parseContainsSlicingRule);
	test('Parse containsRule for slicing multiline test', parseContainsSlicingRuleMultiline);
	test('Parse onlyRule test', parseOnlyRule);
	test('Parse mappingRule test', parseMappingRule);
	test('Parse insertRule test', parseInsertRule);
});

function parseCardRule(){
	const parser = new nearley.Parser(nearley.Grammar.fromCompiled(ruleGrammar));
	
	//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#cardinality-rules (03 march 2021, Shorthand v. 1.1.0)
	assert.doesNotThrow(() => {
		parser.feed("* subject 1..1 \n");
		parser.feed("* subject 1..1 MS \n");
		parser.feed("* component.referenceRange 0..0 \n");
		parser.feed("* category 1.. \n");
		parser.feed("* category ..1 \n");
	});
}

function parseFlagRule(){
	const parser = new nearley.Parser(nearley.Grammar.fromCompiled(ruleGrammar));
	
	//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#flag-rules (03 march 2021, Shorthand v. 1.1.0)
	//parser does not work right with flag rules -> TODO: correct parser
	assert.doesNotThrow(() => {	
		parser.feed("* communication MS SU \n");
		parser.feed("* identifier and identifier.system and identifier.value and name and name.family MS \n");
	});
}

function parseValueSetRule(){
	const parser = new nearley.Parser(nearley.Grammar.fromCompiled(ruleGrammar));

	//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#binding-rules (03 march 2021, Shorthand v. 1.1.0)
	assert.doesNotThrow(() => {
		parser.feed("* telecom.system from http://hl7.org/fhir/ValueSet/contact-point-system (required) \n");
		parser.feed("* gender from http://hl7.org/fhir/ValueSet/administrative-gender \n");
		parser.feed("* address.state from USPSTwoLetterAlphabeticCodes (extensible) \n");
	});
}

function parseFixedValueRule(){
	const parser = new nearley.Parser(nearley.Grammar.fromCompiled(ruleGrammar));
	
	//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#assignment-rules (03 march 2021, Shorthand v. 1.1.0) 
	assert.doesNotThrow(() => {
		parser.feed("* code = LNC#69548-6 \n");
		parser.feed("* code = LNC#69548-6 \"Genetic variant assessment\" \n");
		parser.feed("* code = LNC#69548-6 (exactly) \n");
	});
}

function parseCaretValueRule(){
	const parser = new nearley.Parser(nearley.Grammar.fromCompiled(ruleGrammar));
	
	//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#contains-rules-for-slicing (03 march 2021, Shorthand v. 1.1.0) 
	//parser cannot handle an inline comments -> TODO: correct parser
	assert.doesNotThrow(() => {
		parser.feed("* component ^slicing.discriminator.type = #pattern \n");
		parser.feed("* component ^slicing.discriminator.path = \"code\" \n");
		parser.feed("* component ^slicing.rules = #open \n");
		parser.feed("* component ^slicing.ordered = false   // can be omitted, since false is the default \n");
		parser.feed("* component ^slicing.description = \"Slice based on the component.code patternẞ\" \n");
	});
}

function parseContainsExtensionsRule(){
	const parser = new nearley.Parser(nearley.Grammar.fromCompiled(ruleGrammar));

	//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#contains-rules-for-extensions (03 march 2021, Shorthand v. 1.1.0) 
	assert.doesNotThrow(() => {
		parser.feed("* extension contains http://hl7.org/fhir/StructureDefinition/patient-disability named disability 0..1 MS and http://hl7.org/fhir/StructureDefinition/patient-genderIdentity named genderIdentity 0..1 MS \n");
		parser.feed("* extension contains $Disability named disability 0..1 MS and $GenderIdentity named genderIdentity 0..1 MS \n");
		parser.feed("* bodySite.extension contains Laterality named laterality 0..1 \n");
		parser.feed("*extension contains ombCategory 0..5 MS and detailed 0..* and text 1..1 MS \n");
	});
}

function parseContainsExtensionsRuleMultiline(){
	const parser = new nearley.Parser(nearley.Grammar.fromCompiled(ruleGrammar));

	//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#contains-rules-for-extensions (03 march 2021, Shorthand v. 1.1.0) 
	assert.doesNotThrow(() => {
		parser.feed("* extension contains \n");
		parser.feed("$Disability named disability 0..1 MS and \n");
		parser.feed("$GenderIdentity named genderIdentity 0..1 MS \n");
		parser.feed("*extension contains \n");
		parser.feed("ombCategory 0..5 MS and \n");
		parser.feed("detailed 0..* and \n");
		parser.feed("text 1..1 MS \n");
	});
}

function parseContainsSlicingRule(){
	const parser = new nearley.Parser(nearley.Grammar.fromCompiled(ruleGrammar));

	//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#contains-rules-for-slicing (03 march 2021, Shorthand v. 1.1.0) 
	assert.doesNotThrow(() => {
		parser.feed("* component contains systolicBP 1..1 MS and diastolicBP 1..1 MS \n");
		parser.feed("* component contains pulseScore 0..3 and grimaceScore 0..3 and activityScore 0..3 and respirationScore 0..3 \n");
		parser.feed("* component[respirationScore] contains oneMinuteScore 0..1 and fiveMinuteScore 0..1 and tenMinuteScore 0..1 \n");
	});
}

function parseContainsSlicingRuleMultiline(){
	const parser = new nearley.Parser(nearley.Grammar.fromCompiled(ruleGrammar));

	//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#contains-rules-for-slicing (03 march 2021, Shorthand v. 1.1.0) r
	assert.doesNotThrow(() => {
		parser.feed("* component contains \n");
		parser.feed("pulseScore 0..3 and \n");
		parser.feed("grimaceScore 0..3 and \n");
		parser.feed("activityScore 0..3 and \n");
		parser.feed("respirationScore 0..3 \n");
		parser.feed("* component[respirationScore] contains \n");
		parser.feed("oneMinuteScore 0..1 and \n");
		parser.feed("fiveMinuteScore 0..1 and \n");
		parser.feed("tenMinuteScore 0..1 \n");
	});
}

function parseOnlyRule(){
	const parser = new nearley.Parser(nearley.Grammar.fromCompiled(ruleGrammar));

	//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#type-rules (03 march 2021, Shorthand v. 1.1.0)
	assert.doesNotThrow(() => {
		parser.feed("* valueQuantity only SimpleQuantity \n");
		parser.feed("* onset[x] only dateTime \n");
		parser.feed("* onset[x] only Period or Range \n");
		parser.feed("* onset[x] only Age or AgeRange or DateRange \n");
		parser.feed("* performer only Reference(Practitioner) \n");
		parser.feed("* performer only Reference(Practitioner or PractitionerRole) \n");
		parser.feed("* performer only Reference(PrimaryCarePhysician or EmergencyRoomPhysician) \n");
		parser.feed("* performer[Practitioner] only Reference(PrimaryCareProvider) \n");
	});
}

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