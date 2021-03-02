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
	
	//parse entity alias - reference took from https://github.com/HL7Austria/HL7-AT-FHIR-Core-R4/blob/main/input/fsh/Alias.fsh (02 march 2021, Shorthand v. 1.1.0)
	assert.doesNotThrow(() => {
		parser.feed("Alias: HL7V2 = http://terminology.hl7.org/CodeSystem/v2-0203 \n");
	});
	assert.doesNotThrow(() => {
		parser.feed("Alias: HL7AustriaReligionVS = http://hl7.at/fhir/HL7ATCoreProfiles/4.0.1/ValueSet/VS-ELGA-ReligiousAffiliation \n");
	});

	//parse entity profile - reference took from https://github.com/HL7Austria/HL7-AT-FHIR-Core-R4/blob/main/input/fsh/AustrianAddress.fsh (02 march 2021, Shorthand v. 1.1.0)
	assert.doesNotThrow(() => {
		parser.feed("Profile:        AustrianAddress \n");
		parser.feed("Parent:         Address \n");
		parser.feed("Id:             AustrianRepresentationOfAddress \n");
		parser.feed("Title:          \"Austrian Representation of an Address\" \n");
		parser.feed("Description:    \"HL7 Austria FHIR Core Profile for Address Data in Austria.\" \n");
	});

	//parse entity extension - reference took from https://github.com/HL7Austria/HL7-AT-FHIR-Core-R4/blob/main/input/fsh/AustriaReligion.fsh (02 march 2021, Shorthand v. 1.1.0)
	assert.doesNotThrow(() => {
		parser.feed("Extension:    PatientReligion \n");
		parser.feed("Id:           patientReligion \n");
		parser.feed("Title:        \"Patient Religion\" \n");
		parser.feed("Description:  \"The Religion (registered in Austria) of a Patient\" \n");
	});

	//parse entity instance - reference took from https://github.com/HL7Austria/HL7-AT-FHIR-Core-R4/blob/main/input/fsh/VS-ELGA-ReligiousAffiliation.fsh (02 march 2021, Shorthand v. 1.1.0)
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

	//parse entity invariant - reference took from https://github.com/HL7Austria/HL7-AT-FHIR-Core-R4/blob/main/input/fsh/AustrianAddress.fsh (02 march 2021, Shorthand v. 1.1.0)
	assert.doesNotThrow(() => {
		parser.feed("Invariant:    at-addr-1 \n");
		parser.feed("Description:  \"If the extension for street name is used then the value for line must not be empty\" \n");
		parser.feed("Expression:   \"line.all($this.extension('http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-streetName').empty() or $this.hasValue())\" \n");
		parser.feed("Severity:     #error \n");
	});

	//parse entity valueset - reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html (02 march 2021, Shorthand v. 1.1.0)
	assert.doesNotThrow(() => {
		parser.feed("ValueSet: 		BodyWeightPreconditionVS \n");
		parser.feed("Title: 		\"Body weight preconditions.\" \n");
		parser.feed("Description:  	\"Circumstances for body weight measurement.\" \n");
	});

	//parse entity codesystem - reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html (02 march 2021, Shorthand v. 1.1.0)
	assert.doesNotThrow(() => {
		parser.feed("CodeSystem:  	YogaCS \n");
		parser.feed("Id: 			yoga-code-system \n");
		parser.feed("Title: 		\"Yoga Code System.\" \n");
		parser.feed("Description:  	\"A brief vocabulary of yoga-related terms.\" \n");
	});

	//parse entity ruleset - reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html (02 march 2021, Shorthand v. 1.1.0)
	assert.doesNotThrow(() => {
		parser.feed("RuleSet: RuleSet1 \n");
	});

	//parse entity paramruleset 
	//new not in current parser
	//(02 march 2021, Shorthand v. 1.1.0)

	//parse entity mapping  - reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html (02 march 2021, Shorthand v. 1.1.0)
	assert.doesNotThrow(() => {
		parser.feed("Mapping:  USCorePatientToArgonaut \n");
		parser.feed("Source:   USCorePatient \n");
		parser.feed("Target:   \"http://unknown.org/Argonaut-DQ-DSTU2\" \n");
		parser.feed("Title:    \"Argonaut DSTU2\" \n");
		parser.feed("Id:       argonaut-dq-dstu2 \n");
	});
}

function parseRulesTest(){
	const ruleGrammar = require('../../src/parser/rules_parser/fsh-sdRule');
	const parser = new nearley.Parser(nearley.Grammar.fromCompiled(ruleGrammar));

	//parse cardRule - reference took from https://github.com/HL7Austria/HL7-AT-FHIR-Core-R4/blob/main/input/fsh/AustrianAddress.fsh (02 march 2021, Shorthand v. 1.1.0)
	assert.doesNotThrow(() => {
		parser.feed("* period 0..0 \n");
	});

	//parse flagRule - reference took from  (02 march 2021, Shorthand v. 1.1.0)

	//parse valueSetRule - reference took from  (02 march 2021, Shorthand v. 1.1.0)

	//parse containsRule - reference took from  (02 march 2021, Shorthand v. 1.1.0) 

	//parse onlyRule - reference took from  (02 march 2021, Shorthand v. 1.1.0)

	//parse caretValueRule - reference took from  (02 march 2021, Shorthand v. 1.1.0)

	//parse mappingRule - reference took from  (02 march 2021, Shorthand v. 1.1.0)

	//parse insertRule - reference took from  (02 march 2021, Shorthand v. 1.1.0)

}