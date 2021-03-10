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
const ruleGrammar = require('../../src/parser/rules_parser/fsh-csRule');
//parser has to be created for each test separate, otherwise the error will cause other tests to fail

suite('CsRule Parser Test Suite', () => {
	test('Parse concept test', parseConcept);
	test('Parse caretValueRule test', parseCaretValueRule);
	test('Parse insertRule test', parseInsertRule);
});

function parseConcept(){
	const parser = new nearley.Parser(nearley.Grammar.fromCompiled(ruleGrammar));

	//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#defining-code-systems (03 march 2021, Shorthand v. 1.1.0) 
	//parser cannot handle an second string -> TODO: correct parser
	assert.doesNotThrow(() => {
		parser.feed("* #Sirsasana \"Headstand\" \"An inverted asana, also called mudra in classical hatha yoga, involves standing on one's head.\" \n");
		parser.feed("* #Halasana \"Plough Pose\" \"Halasana or Plough pose is an inverted asana in hatha yoga and modern yoga as exercise. Its variations include Karnapidasana with the knees by the ears, and Supta Konasana with the feet wide apart.\" \n");
		parser.feed("* #Matsyasana \"Fish Pose\" \"Matsyasana is a reclining back-bending asana in hatha yoga and modern yoga as exercise. It is commonly considered a counterasana to Sarvangasana, or shoulder stand, specifically within the context of the Ashtanga Vinyasa Yoga Primary Series.\" \n");
		parser.feed("* #Bhujangasana \"Cobra Pose\" \"Bhujangasana, or Cobra Pose is a reclining back-bending asana in hatha yoga and modern yoga as exercise. It is commonly performed in a cycle of asanas in Surya Namaskar (Salute to the Sun) as an alternative to Urdhva Mukha Svanasana (Upwards Dog Pose).\" \n");
	});

	//parser cannot handle multiline rules -> TODO: correct parser
	assert.doesNotThrow(() => {
		parser.feed("* #Sirsasana \"Headstand\" \n");
		parser.feed("\"An inverted asana, also called mudra in classical hatha yoga, involves standing on one's head.\" \n");
		parser.feed("* #Halasana \"Plough Pose\" \n");
		parser.feed("\"Halasana or Plough pose is an inverted asana in hatha yoga and modern yoga as exercise. Its variations include Karnapidasana with the knees by the ears, and Supta Konasana with the feet wide apart.\" \n");
		parser.feed("* #Matsyasana \"Fish Pose\" \n");
		parser.feed("\"Matsyasana is a reclining back-bending asana in hatha yoga and modern yoga as exercise. It is commonly considered a counterasana to Sarvangasana, or shoulder stand, specifically within the context of the Ashtanga Vinyasa Yoga Primary Series.\" \n");
		parser.feed("* #Bhujangasana \"Cobra Pose\" \n");
		parser.feed("\"Bhujangasana, or Cobra Pose is a reclining back-bending asana in hatha yoga and modern yoga as exercise. It is commonly performed in a cycle of asanas in Surya Namaskar (Salute to the Sun) as an alternative to Urdhva Mukha Svanasana (Upwards Dog Pose).\" \n");
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