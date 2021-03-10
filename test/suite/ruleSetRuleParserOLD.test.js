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
const ruleGrammar = require('../../src/parser/rules_parser/fsh-ruleSetRule');
//parser has to be created for each test separate, otherwise the error will cause other tests to fail

suite('RuleSetRule Parser Test Suite', () => {
	//RuleSetRule includes all sdRules, which are in a separate test suit
	test('Parse concept test', parseConcept);
	test('Parse vsComponent test', parseVsComponent);
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

function parseVsComponent(){
	const parser = new nearley.Parser(nearley.Grammar.fromCompiled(ruleGrammar));

	//parse vsComponent - reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#defining-value-sets (03 march 2021, Shorthand v. 1.1.0)
	assert.doesNotThrow(() => {
		parser.feed("* SCT#971000205103 \"Wearing street clothes with shoes\" \n");
		parser.feed("* SCT#961000205106 \"Wearing street clothes, no shoes\" \n");
		parser.feed("* SCT#951000205108 \"Wearing underwear or less\" \n");
		parser.feed("* include codes from system SCT where concept is-a #367651003 \"Malignant neoplasm of primary, secondary, or uncertain origin (morphologic abnormality)\" \n");
		parser.feed("* include codes from system SCT where concept is-a #399919001 \"Carcinoma in situ - category (morphologic abnormality)\" \n");
		parser.feed("* include codes from system SCT where concept is-a #399983006 \"In situ adenomatous neoplasm - category (morphologic abnormality)\" \n");
		parser.feed("* exclude codes from system SCT where concept is-a #450893003 \"Papillary neoplasm, pancreatobiliary-type, with high grade intraepithelial neoplasia (morphologic abnormality)\" \n");
		parser.feed("* exclude codes from system SCT where concept is-a #128640002 \"Glandular intraepithelial neoplasia, grade III (morphologic abnormality)\" \n");
		parser.feed("* exclude codes from system SCT where concept is-a #450890000 \"Glandular intraepithelial neoplasia, low grade (morphologic abnormality)\" \n");
		parser.feed("* exclude codes from system SCT where concept is-a #703548001 \"Endometrioid intraepithelial neoplasia (morphologic abnormality)\" \n");
	});
}