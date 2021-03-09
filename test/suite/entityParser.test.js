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

//import everything what is needed
const nearley = require('nearley');
const entityGrammar = require('../../src/parser/entities_parser/fsh-entities');
//parser has to be created for each test separate, otherwise the error will cause other tests to fail

suite('Entity Parser Test Suite', () => {
	test('Parse alias test', parseAlias);
	test('Parse profile test', parseProfile);
	test('Parse extension test', parseExtension);
	test('Parse instance test', parseInstance);
	test('Parse invariant test', parseInvariant);
	test('Parse codeSystem test', parseCodeSystem);
	test('Parse ruleSet test', parseRuleSet);
	test('Parse paramEntities test', parseParamEntities);
	test('Parse mapping test', parseMapping);
});

function parseAlias(){
	//const parser = new nearley.Parser(nearley.Grammar.fromCompiled(entityGrammar));
	const antlr4 = require('antlr4');
	const FSHLexer = require('../../src/parser/FSHLexer');
	const FSHParser = require('../../src/parser/FSHParser');

	const input = 'Alias: HL7V2 = http://terminology.hl7.org/CodeSystem/v2-0203 \n';
	const chars = new antlr4.InputStream(input);
	const lexer = new FSHLexer.FSHLexer(chars);
	
	const tokens = new antlr4.CommonTokenStream(lexer);
	const parser = new FSHParser.FSHParser(tokens);

	const test = parser.alias();



	//reference took from https://github.com/HL7Austria/HL7-AT-FHIR-Core-R4/blob/main/input/fsh/Alias.fsh (02 march 2021, Shorthand v. 1.1.0)
	assert.doesNotThrow(() => {
		//parser.feed("Alias: HL7V2 = http://terminology.hl7.org/CodeSystem/v2-0203 \n");
		//parser.feed("Alias: HL7AustriaReligionVS = http://hl7.at/fhir/HL7ATCoreProfiles/4.0.1/ValueSet/VS-ELGA-ReligiousAffiliation \n");
	});
}

function parseProfile(){
	const parser = new nearley.Parser(nearley.Grammar.fromCompiled(entityGrammar));

	//reference took from https://github.com/HL7Austria/HL7-AT-FHIR-Core-R4/blob/main/input/fsh/AustrianAddress.fsh (02 march 2021, Shorthand v. 1.1.0)
	assert.doesNotThrow(() => {
		parser.feed("Profile:		 AustrianAddress \n");
		parser.feed("Parent:         Address \n");
		parser.feed("Id:             AustrianRepresentationOfAddress \n");
		parser.feed("Title:          \"Austrian Representation of an Address\" \n");
		parser.feed("Description:    \"HL7 Austria FHIR Core Profile for Address Data in Austria.\" \n");
	});
	//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#defining-profiles (03 march 2021, Shorthand v. 1.1.0)
	assert.doesNotThrow(() => {
		parser.feed("Profile:        KnownExposureSetting \n");
		parser.feed("Parent:         Observation \n");
		parser.feed("Id:             known-exposure-setting \n");
		parser.feed("Title:          \"Known Exposure Setting Profile\" \n");
		parser.feed("Description:    \"The setting where an individual was exposed to a contagion.\" \n");
	});
}

function parseExtension(){
	const parser = new nearley.Parser(nearley.Grammar.fromCompiled(entityGrammar));

	//reference took from https://github.com/HL7Austria/HL7-AT-FHIR-Core-R4/blob/main/input/fsh/AustriaReligion.fsh (02 march 2021, Shorthand v. 1.1.0)
	assert.doesNotThrow(() => {
		parser.feed("Extension:    PatientReligion \n");
		parser.feed("Id:           patientReligion \n");
		parser.feed("Title:        \"Patient Religion\" \n");
		parser.feed("Description:  \"The Religion (registered in Austria) of a Patient\" \n");
	});
	//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#defining-extensions (03 march 2021, Shorthand v. 1.1.0)
	assert.doesNotThrow(() => {
		parser.feed("Extension: 	USCoreBirthSexExtension \n");
		parser.feed("Id:   			us-core-birthsex \n");
		parser.feed("Title:  		\"US Core Birth Sex Extension\" \n");
		parser.feed("Description: 	\"A code classifying the person's sex assigned at birth as specified by the [Office of the National Coordinator for Health IT (ONC)](https://www.healthit.gov/newsroom/about-onc). This extension aligns with the C-CDA Birth Sex Observation (LOINC 76689-9).\" \n");
	});
	assert.doesNotThrow(() => {
		parser.feed("Extension:      USCoreEthnicityExtension \n");
		parser.feed("Id:             us-core-ethnicity \n");
		parser.feed("Title:          \"US Core Ethnicity Extension\" \n");
		parser.feed("Description: 	\"Concepts classifying the person into a named category of humans sharing common history, traits, geographical origin or nationality. The ethnicity codes used to represent these concepts are based upon the [CDC ethnicity and Ethnicity Code Set Version 1.0](http://www.cdc.gov/phin/resources/vocabulary/index.html) which includes over 900 concepts for representing race and ethnicity of which 43 reference ethnicity.  The ethnicity concepts are grouped by and pre-mapped to the 2 OMB ethnicity categories: - Hispanic or Latino - Not Hispanic or Latino.\" \n");
	});
	assert.doesNotThrow(() => {
		parser.feed("Extension:      BinaryBirthSexExtension \n");
		parser.feed("Parent:         USCoreBirthSexExtension \n");
		parser.feed("Id:             binary-birthsex \n");
		parser.feed("Title:          \"Binary Birth Sex Extension\" \n");
		parser.feed("Description:    \"As of 2019, certain US states only allow M or F on birth certificates.\" \n");
	});
}

function parseInstance(){
	const parser = new nearley.Parser(nearley.Grammar.fromCompiled(entityGrammar));

	//reference took from https://github.com/HL7Austria/HL7-AT-FHIR-Core-R4/blob/main/input/fsh/VS-ELGA-ReligiousAffiliation.fsh (02 march 2021, Shorthand v. 1.1.0)
	assert.doesNotThrow(() => {
		parser.feed("Instance:   VS-ELGA-ReligiousAffiliation \n");
		parser.feed("InstanceOf: ValueSet \n");
		parser.feed("Usage:      #definition \n");
	});
	//reference took from https://github.com/HL7Austria/HL7-AT-FHIR-Core-R4/blob/main/input/fsh/VS-ELGA-ReligiousAffiliation.fsh (02 march 2021, Shorthand v. 1.1.0)
	assert.doesNotThrow(() => {
		parser.feed("Instance:    AustrianPatientExample01 \n");
		parser.feed("InstanceOf:  AustrianPatient \n");
		parser.feed("Description: \"Example for the usage of the AustrianPatient Profile\" \n");
		parser.feed("Usage:       #example \n");
	});
	//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#defining-instances (03 march 2021, Shorthand v. 1.1.0)
	assert.doesNotThrow(() => {
		parser.feed("Instance:  	EveAnyperson \n");
		parser.feed("InstanceOf: 	http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient \n");
		parser.feed("Title:   		\"Eve Anyperson\" \n");
		parser.feed("Usage:      	#example \n");
	});
	assert.doesNotThrow(() => {
		parser.feed("Instance:   DrDavidAnydoc \n");
		parser.feed("InstanceOf: http://hl7.org/fhir/us/core/StructureDefinition/us-core-practitioner \n");
		parser.feed("Title:  	 \"Dr. David Anydoc\" \n");
		parser.feed("Usage:  	 #inline \n");
	});
	assert.doesNotThrow(() => {
		parser.feed("Instance: 		EvesCondition \n");
		parser.feed("InstanceOf: 	Condition \n");
		parser.feed("Usage: 		#example \n");
		parser.feed("Description: 	\"An example that uses contained\" \n");
	});
	/* parser cannot work with inline comments
	assert.doesNotThrow(() => {
		parser.feed("Instance: 		EveAnyperson \n");
		parser.feed("InstanceOf: 	Patient \n");
		parser.feed("Usage: 		#inline // #inline means this instance should not be exported as a separate example \n");
	});*/
}

function parseInvariant(){
	const parser = new nearley.Parser(nearley.Grammar.fromCompiled(entityGrammar));

	//reference took from https://github.com/HL7Austria/HL7-AT-FHIR-Core-R4/blob/main/input/fsh/AustrianAddress.fsh (02 march 2021, Shorthand v. 1.1.0)
	assert.doesNotThrow(() => {
		parser.feed("Invariant:    at-addr-1 \n");
		parser.feed("Description:  \"If the extension for street name is used then the value for line must not be empty\" \n");
		parser.feed("Expression:   \"line.all($this.extension('http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-streetName').empty() or $this.hasValue())\" \n");
		parser.feed("Severity:     #error \n");
	});
	//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#defining-invariants (03 march 2021, Shorthand v. 1.1.0)
	assert.doesNotThrow(() => {
		parser.feed("Invariant:  us-core-8 \n");
		parser.feed("Description: \"Patient.name.given or Patient.name.family or both SHALL be present\" \n");
		parser.feed("Expression: \"family.exists() or given.exists()\" \n");
		parser.feed("Severity:   #error \n");
		parser.feed("XPath:      \"f:given or f:family\" \n");
	});
}

function parseValueSet(){
	const parser = new nearley.Parser(nearley.Grammar.fromCompiled(entityGrammar));

	//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html (02 march 2021, Shorthand v. 1.1.0)
	assert.doesNotThrow(() => {
		parser.feed("ValueSet: 		BodyWeightPreconditionVS \n");
		parser.feed("Title: 		\"Body weight preconditions.\" \n");
		parser.feed("Description:  	\"Circumstances for body weight measurement.\" \n");
	});
	//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#defining-value-sets (03 march 2021, Shorthand v. 1.1.0)
	assert.doesNotThrow(() => {
		parser.feed("ValueSet: 		HistologyMorphologyBehaviorVS \n");
		parser.feed("Id: 			mcode-histology-morphology-behavior-vs \n");
		parser.feed("Title: 		\"Histology Morphology Behavior Value Set\" \n");
		parser.feed("Description: 	\"Codes representing the structure, arrangement, and behavioral characteristics of malignant neoplasms, and cancer cells.\" \n");
	});
}

function parseCodeSystem(){
	const parser = new nearley.Parser(nearley.Grammar.fromCompiled(entityGrammar));

	//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#defining-code-systems (02 march 2021, Shorthand v. 1.1.0)
	assert.doesNotThrow(() => {
		parser.feed("CodeSystem:  	YogaCS \n");
		parser.feed("Id: 			yoga-code-system \n");
		parser.feed("Title: 		\"Yoga Code System.\" \n");
		parser.feed("Description:  	\"A brief vocabulary of yoga-related terms.\" \n");
	});
}

function parseRuleSet(){
	const parser = new nearley.Parser(nearley.Grammar.fromCompiled(entityGrammar));

	//reference from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#defining-rule-sets (03 march 2021, Shorthand v. 1.1.0)
	assert.doesNotThrow(() => {
		parser.feed("RuleSet: RuleSet1 \n");
	});
	assert.doesNotThrow(() => {
		parser.feed("RuleSet: SetContext(path) \n");
	});
	// parser cant handle whitespace in bracket term -> TODO: correct parser
	assert.doesNotThrow(() => {
		parser.feed("RuleSet: Question(linkId, text, type, repeats) \n");
	});
}

//TODO: write Test
function parseParamEntities(){
	const parser = new nearley.Parser(nearley.Grammar.fromCompiled(entityGrammar));

	//parse entity paramruleset 
	//new not in current parser (02 march 2021, Shorthand v. 1.1.0)
}

function parseMapping(){
	const parser = new nearley.Parser(nearley.Grammar.fromCompiled(entityGrammar));
	
	//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#defining-mappings (02 march 2021, Shorthand v. 1.1.0)
	assert.doesNotThrow(() => {
		parser.feed("Mapping:  USCorePatientToArgonaut \n");
		parser.feed("Source:   USCorePatient \n");
		parser.feed("Target:   \"http://unknown.org/Argonaut-DQ-DSTU2\" \n");
		parser.feed("Title:    \"Argonaut DSTU2\" \n");
		parser.feed("Id:       argonaut-dq-dstu2 \n");
	});
}