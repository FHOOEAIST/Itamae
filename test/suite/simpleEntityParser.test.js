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
import TestErrorListener from '../TestErrorListener';

const testListener = new TestErrorListener();

describe('Parse alias test', () => {
    it('one correct alias', () => {
		assert.doesNotThrow(() => {
			//reference took from https://github.com/HL7Austria/HL7-AT-FHIR-Core-R4/blob/main/input/fsh/Alias.fsh (02 march 2021, Shorthand v. 1.1.0)
			const input = "Alias: HL7V2 = http://terminology.hl7.org/CodeSystem/v2-0203 \n";
			const chars = new antlr4.InputStream(input);
			const lexer = new FSHLexer(chars);
			const tokens  = new antlr4.CommonTokenStream(lexer);
			const parser = new FSHParser(tokens);
			parser.buildParseTrees = true;
			parser.removeErrorListeners();
			parser.addErrorListener(testListener);
			const tree = parser.alias();
		});
    });
	it('two correct alias', () => {
		assert.doesNotThrow(() => {
			//reference took from https://github.com/HL7Austria/HL7-AT-FHIR-Core-R4/blob/main/input/fsh/Alias.fsh (02 march 2021, Shorthand v. 1.1.0)
			const input = "Alias: HL7V2 = http://terminology.hl7.org/CodeSystem/v2-0203 \n" + 
			"Alias: HL7AustriaReligionVS = http://hl7.at/fhir/HL7ATCoreProfiles/4.0.1/ValueSet/VS-ELGA-ReligiousAffiliation \n";
			const chars = new antlr4.InputStream(input);
			const lexer = new FSHLexer(chars);
			const tokens  = new antlr4.CommonTokenStream(lexer);
			const parser = new FSHParser(tokens);
			parser.buildParseTrees = true;
			parser.removeErrorListeners();
			parser.addErrorListener(testListener);
			const tree = parser.doc();
		});
    });
	it('one incorrect alias', () => {
		assert.throws(() =>{
			//reference took from https://github.com/HL7Austria/HL7-AT-FHIR-Core-R4/blob/main/input/fsh/Alias.fsh (02 march 2021, Shorthand v. 1.1.0)
			const input = "Aliasss: HL7V2 = http://terminology.hl7.org/CodeSystem/v2-0203 \n";
			const chars = new antlr4.InputStream(input);
			const lexer = new FSHLexer(chars);
			const tokens  = new antlr4.CommonTokenStream(lexer);
			const parser = new FSHParser(tokens);
			parser.buildParseTrees = true;
			parser.removeErrorListeners();
			parser.addErrorListener(testListener);
			const tree = parser.alias();
		}, SyntaxError);
    });
	it('two incorrect alias', () => {
		assert.throws(() =>{
			//reference took from https://github.com/HL7Austria/HL7-AT-FHIR-Core-R4/blob/main/input/fsh/Alias.fsh (02 march 2021, Shorthand v. 1.1.0)
			const input = "Alias: HL7V2 := http://terminology.hl7.org/CodeSystem/v2-0203 \n" + 
			"Alias: HL7AustriaReligionVS = http://hl7.at/fhir/HL7ATCoreProfiles/4.0.1/ValueSet/VS-ELGA-ReligiousAffiliation try \n";
			const chars = new antlr4.InputStream(input);
			const lexer = new FSHLexer(chars);
			const tokens  = new antlr4.CommonTokenStream(lexer);
			const parser = new FSHParser(tokens);
			parser.buildParseTrees = true;
			parser.removeErrorListeners();
			parser.addErrorListener(testListener);
			const tree = parser.alias();
		}, SyntaxError);
    });
});

describe('Parse profile test', () => {
    it('one correct profile without rules - first test', () => {
		assert.doesNotThrow(() => {
			//reference took from https://github.com/HL7Austria/HL7-AT-FHIR-Core-R4/blob/main/input/fsh/AustrianAddress.fsh (02 march 2021, Shorthand v. 1.1.0)
			const input = 
			"Profile:		 AustrianAddress \n" +
			"Parent:         Address \n" +
			"Id:             AustrianRepresentationOfAddress \n" +
			"Title:          \"Austrian Representation of an Address\" \n" +
			"Description:    \"HL7 Austria FHIR Core Profile for Address Data in Austria.\" \n";
			const chars = new antlr4.InputStream(input);
			const lexer = new FSHLexer(chars);
			const tokens  = new antlr4.CommonTokenStream(lexer);
			const parser = new FSHParser(tokens);
			parser.buildParseTrees = true;
			parser.removeErrorListeners();
			parser.addErrorListener(testListener);
			const tree = parser.profile();
		});
    });
	it('one correct profile without rules - second test', () => {
		assert.doesNotThrow(() => {
			//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#defining-profiles (03 march 2021, Shorthand v. 1.1.0)
			const input = 
			"Profile:        KnownExposureSetting \n" +
			"Parent:         Observation \n" +
			"Id:             known-exposure-setting \n" +
			"Title:          \"Known Exposure Setting Profile\" \n" +
			"Description:    \"The setting where an individual was exposed to a contagion.\" \n";
			const chars = new antlr4.InputStream(input);
			const lexer = new FSHLexer(chars);
			const tokens  = new antlr4.CommonTokenStream(lexer);
			const parser = new FSHParser(tokens);
			parser.buildParseTrees = true;
			parser.removeErrorListeners();
			parser.addErrorListener(testListener);
			const tree = parser.profile();
		});
    });
});

describe('Parse extension test', () => {
    it('one correct extension without rules - first test', () => {
		assert.doesNotThrow(() => {
			//reference took from https://github.com/HL7Austria/HL7-AT-FHIR-Core-R4/blob/main/input/fsh/AustriaReligion.fsh (02 march 2021, Shorthand v. 1.1.0)
			const input = 
			"Extension:    PatientReligion \n" +
			"Id:           patientReligion \n" +
			"Title:        \"Patient Religion\" \n" +
			"Description:  \"The Religion (registered in Austria) of a Patient\" \n";
			const chars = new antlr4.InputStream(input);
			const lexer = new FSHLexer(chars);
			const tokens  = new antlr4.CommonTokenStream(lexer);
			const parser = new FSHParser(tokens);
			parser.buildParseTrees = true;
			parser.removeErrorListeners();
			parser.addErrorListener(testListener);
			const tree = parser.extension();
		});
    });
	it('one correct extension without rules - second test', () => {
		assert.doesNotThrow(() => {
			//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#defining-extensions (03 march 2021, Shorthand v. 1.1.0)
			const input = 
			"Extension: 	USCoreBirthSexExtension \n" +
			"Id:   			us-core-birthsex \n" +
			"Title:  		\"US Core Birth Sex Extension\" \n" +
			"Description: 	\"A code classifying the person's sex assigned at birth as specified by the [Office of the National Coordinator for Health IT (ONC)](https://www.healthit.gov/newsroom/about-onc). This extension aligns with the C-CDA Birth Sex Observation (LOINC 76689-9).\" \n";
			const chars = new antlr4.InputStream(input);
			const lexer = new FSHLexer(chars);
			const tokens  = new antlr4.CommonTokenStream(lexer);
			const parser = new FSHParser(tokens);
			parser.buildParseTrees = true;
			parser.removeErrorListeners();
			parser.addErrorListener(testListener);
			const tree = parser.extension();
		});
    });
	it('one correct extension without rules - third test', () => {
		assert.doesNotThrow(() => {
			//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#defining-extensions (03 march 2021, Shorthand v. 1.1.0)
			const input = 
			"Extension:      USCoreEthnicityExtension \n" +
			"Id:             us-core-ethnicity \n" +
			"Title:          \"US Core Ethnicity Extension\" \n" +
			"Description: 	\"Concepts classifying the person into a named category of humans sharing common history, traits, geographical origin or nationality. The ethnicity codes used to represent these concepts are based upon the [CDC ethnicity and Ethnicity Code Set Version 1.0](http://www.cdc.gov/phin/resources/vocabulary/index.html) which includes over 900 concepts for representing race and ethnicity of which 43 reference ethnicity.  The ethnicity concepts are grouped by and pre-mapped to the 2 OMB ethnicity categories: - Hispanic or Latino - Not Hispanic or Latino.\" \n";
			const chars = new antlr4.InputStream(input);
			const lexer = new FSHLexer(chars);
			const tokens  = new antlr4.CommonTokenStream(lexer);
			const parser = new FSHParser(tokens);
			parser.buildParseTrees = true;
			parser.removeErrorListeners();
			parser.addErrorListener(testListener);
			const tree = parser.extension();
		});
    });
	it('one correct extension without rules - fourth test', () => {
		assert.doesNotThrow(() => {
			//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#defining-extensions (03 march 2021, Shorthand v. 1.1.0)
			const input = 
			"Extension:      BinaryBirthSexExtension \n" +
			"Parent:         USCoreBirthSexExtension \n" +
			"Id:             binary-birthsex \n" +
			"Title:          \"Binary Birth Sex Extension\" \n" +
			"Description:    \"As of 2019, certain US states only allow M or F on birth certificates.\" \n";
			const chars = new antlr4.InputStream(input);
			const lexer = new FSHLexer(chars);
			const tokens  = new antlr4.CommonTokenStream(lexer);
			const parser = new FSHParser(tokens);
			parser.buildParseTrees = true;
			parser.removeErrorListeners();
			parser.addErrorListener(testListener);
			const tree = parser.extension();
		});
    });
});

describe('Parse instance test', () => {
    it('one correct instance without rules - first test', () => {
		assert.doesNotThrow(() => {
			//reference took from https://github.com/HL7Austria/HL7-AT-FHIR-Core-R4/blob/main/input/fsh/VS-ELGA-ReligiousAffiliation.fsh (02 march 2021, Shorthand v. 1.1.0)
			const input = 
			"Instance:   VS-ELGA-ReligiousAffiliation \n" +
			"InstanceOf: ValueSet \n" +
			"Usage:      #definition \n";
			const chars = new antlr4.InputStream(input);
			const lexer = new FSHLexer(chars);
			const tokens  = new antlr4.CommonTokenStream(lexer);
			const parser = new FSHParser(tokens);
			parser.buildParseTrees = true;
			parser.removeErrorListeners();
			parser.addErrorListener(testListener);
			const tree = parser.instance();
		});
    });
	it('one correct instance without rules - second test', () => {
		assert.doesNotThrow(() => {
			//reference took from https://github.com/HL7Austria/HL7-AT-FHIR-Core-R4/blob/main/input/fsh/VS-ELGA-ReligiousAffiliation.fsh (02 march 2021, Shorthand v. 1.1.0)
			const input = 
			"Instance:    AustrianPatientExample01 \n" +
			"InstanceOf:  AustrianPatient \n" +
			"Description: \"Example for the usage of the AustrianPatient Profile\" \n" +
			"Usage:       #example \n";
			const chars = new antlr4.InputStream(input);
			const lexer = new FSHLexer(chars);
			const tokens  = new antlr4.CommonTokenStream(lexer);
			const parser = new FSHParser(tokens);
			parser.buildParseTrees = true;
			parser.removeErrorListeners();
			parser.addErrorListener(testListener);
			const tree = parser.instance();
		});
    });
	it('one correct instance without rules - third test', () => {
		assert.doesNotThrow(() => {
			//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#defining-instances (03 march 2021, Shorthand v. 1.1.0)
			const input = 
			"Instance:  	EveAnyperson \n" +
			"InstanceOf: 	http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient \n" +
			"Title:   		\"Eve Anyperson\" \n" +
			"Usage:      	#example \n";
			const chars = new antlr4.InputStream(input);
			const lexer = new FSHLexer(chars);
			const tokens  = new antlr4.CommonTokenStream(lexer);
			const parser = new FSHParser(tokens);
			parser.buildParseTrees = true;
			parser.removeErrorListeners();
			parser.addErrorListener(testListener);
			const tree = parser.instance();
		});
    });
	it('one correct instance without rules - fourth test', () => {
		assert.doesNotThrow(() => {
			//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#defining-instances (03 march 2021, Shorthand v. 1.1.0)
			const input = 
			"Instance:  	EveAnyperson \n" +
			"InstanceOf: 	http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient \n" +
			"Title:   		\"Eve Anyperson\" \n" +
			"Usage:      	#example \n";
			const chars = new antlr4.InputStream(input);
			const lexer = new FSHLexer(chars);
			const tokens  = new antlr4.CommonTokenStream(lexer);
			const parser = new FSHParser(tokens);
			parser.buildParseTrees = true;
			parser.removeErrorListeners();
			parser.addErrorListener(testListener);
			const tree = parser.instance();
		});
    });
	it('one correct instance without rules - fifth test', () => {
		assert.doesNotThrow(() => {
			//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#defining-instances (03 march 2021, Shorthand v. 1.1.0)
			const input = 
			"Instance:   DrDavidAnydoc \n" +
			"InstanceOf: http://hl7.org/fhir/us/core/StructureDefinition/us-core-practitioner \n" +
			"Title:  	 \"Dr. David Anydoc\" \n" +
			"Usage:  	 #inline \n";
			const chars = new antlr4.InputStream(input);
			const lexer = new FSHLexer(chars);
			const tokens  = new antlr4.CommonTokenStream(lexer);
			const parser = new FSHParser(tokens);
			parser.buildParseTrees = true;
			parser.removeErrorListeners();
			parser.addErrorListener(testListener);
			const tree = parser.instance();
		});
    });
	it('one correct instance without rules - sixth test', () => {
		assert.doesNotThrow(() => {
			//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#defining-instances (03 march 2021, Shorthand v. 1.1.0)
			const input = 
			"Instance: 		EvesCondition \n" +
			"InstanceOf: 	Condition \n" +
			"Usage: 		#example \n" +
			"Description: 	\"An example that uses contained\" \n";
			const chars = new antlr4.InputStream(input);
			const lexer = new FSHLexer(chars);
			const tokens  = new antlr4.CommonTokenStream(lexer);
			const parser = new FSHParser(tokens);
			parser.buildParseTrees = true;
			parser.removeErrorListeners();
			parser.addErrorListener(testListener);
			const tree = parser.instance();
		});
    });
	it('one correct instance without rules - seventh test', () => {
		assert.doesNotThrow(() => {
			//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#defining-instances (03 march 2021, Shorthand v. 1.1.0)
			const input = 
			"Instance: 		EveAnyperson \n" +
			"InstanceOf: 	Patient \n" +
			"Usage: 		#inline // #inline means this instance should not be exported as a separate example \n";
			const chars = new antlr4.InputStream(input);
			const lexer = new FSHLexer(chars);
			const tokens  = new antlr4.CommonTokenStream(lexer);
			const parser = new FSHParser(tokens);
			parser.buildParseTrees = true;
			parser.removeErrorListeners();
			parser.addErrorListener(testListener);
			const tree = parser.instance();
		});
    });
});

describe('Parse invariant test', () => {
    it('one correct invariant - first test', () => {
		assert.doesNotThrow(() => {
			//reference took from https://github.com/HL7Austria/HL7-AT-FHIR-Core-R4/blob/main/input/fsh/AustrianAddress.fsh (02 march 2021, Shorthand v. 1.1.0)
			const input = 
			"Invariant:    at-addr-1 \n" +
			"Description:  \"If the extension for street name is used then the value for line must not be empty\" \n" +
			"Expression:   \"line.all($this.extension('http://hl7.org/fhir/StructureDefinition/iso21090-ADXP-streetName').empty() or $this.hasValue())\" \n" +
			"Severity:     #error \n";
			const chars = new antlr4.InputStream(input);
			const lexer = new FSHLexer(chars);
			const tokens  = new antlr4.CommonTokenStream(lexer);
			const parser = new FSHParser(tokens);
			parser.buildParseTrees = true;
			parser.removeErrorListeners();
			parser.addErrorListener(testListener);
			const tree = parser.invariant();
		});
    });
	it('one correct invariant - second test', () => {
		assert.doesNotThrow(() => {
			//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#defining-invariants (03 march 2021, Shorthand v. 1.1.0)
			const input = 
			"Invariant:  us-core-8 \n" +
			"Description: \"Patient.name.given or Patient.name.family or both SHALL be present\" \n" +
			"Expression: \"family.exists() or given.exists()\" \n" +
			"Severity:   #error \n" +
			"XPath:      \"f:given or f:family\" \n";
			const chars = new antlr4.InputStream(input);
			const lexer = new FSHLexer(chars);
			const tokens  = new antlr4.CommonTokenStream(lexer);
			const parser = new FSHParser(tokens);
			parser.buildParseTrees = true;
			parser.removeErrorListeners();
			parser.addErrorListener(testListener);
			const tree = parser.invariant();
		});
    });
});

describe('Parse valueSet test', () => {
    it('one correct valueSet without rules - first test', () => {
		assert.doesNotThrow(() => {
			//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html (02 march 2021, Shorthand v. 1.1.0)
			const input = 
			"ValueSet: 		BodyWeightPreconditionVS \n" +
			"Title: 		\"Body weight preconditions.\" \n" +
			"Description:  	\"Circumstances for body weight measurement.\" \n";
			const chars = new antlr4.InputStream(input);
			const lexer = new FSHLexer(chars);
			const tokens  = new antlr4.CommonTokenStream(lexer);
			const parser = new FSHParser(tokens);
			parser.buildParseTrees = true;
			parser.removeErrorListeners();
			parser.addErrorListener(testListener);
			const tree = parser.valueSet();
		});
    });
	it('one correct valueSet without rules - second test', () => {
		assert.doesNotThrow(() => {
			//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#defining-value-sets (03 march 2021, Shorthand v. 1.1.0)
			const input = 
			"ValueSet: 		HistologyMorphologyBehaviorVS \n" +
			"Id: 			mcode-histology-morphology-behavior-vs \n" +
			"Title: 		\"Histology Morphology Behavior Value Set\" \n" +
			"Description: 	\"Codes representing the structure, arrangement, and behavioral characteristics of malignant neoplasms, and cancer cells.\" \n";
			const chars = new antlr4.InputStream(input);
			const lexer = new FSHLexer(chars);
			const tokens  = new antlr4.CommonTokenStream(lexer);
			const parser = new FSHParser(tokens);
			parser.buildParseTrees = true;
			parser.removeErrorListeners();
			parser.addErrorListener(testListener);
			const tree = parser.valueSet();
		});
    });
});

describe('Parse codeSystem test', () => {
    it('one correct codeSystem without rules', () => {
		assert.doesNotThrow(() => {
			//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#defining-code-systems (02 march 2021, Shorthand v. 1.1.0)
			const input = 
			"CodeSystem:  	YogaCS \n" +
			"Id: 			yoga-code-system \n" +
			"Title: 		\"Yoga Code System.\" \n" +
			"Description:  	\"A brief vocabulary of yoga-related terms.\" \n";
			const chars = new antlr4.InputStream(input);
			const lexer = new FSHLexer(chars);
			const tokens  = new antlr4.CommonTokenStream(lexer);
			const parser = new FSHParser(tokens);
			parser.buildParseTrees = true;
			parser.removeErrorListeners();
			parser.addErrorListener(testListener);
			const tree = parser.codeSystem();
		});
    });
});

describe('Parse ruleSet test', () => {
    it('one correct ruleSet', () => {
		assert.doesNotThrow(() => {
			//reference from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#simple-rule-sets (11 march 2021, Shorthand v. 1.1.0)
			const input = 
			"RuleSet: RuleSet1 \n" +
			"* ^status = #draft \n" +
			"* ^experimental = true \n" +
			"* ^publisher = \"Elbonian Medical Society\" \n";
			const chars = new antlr4.InputStream(input);
			const lexer = new FSHLexer(chars);
			const tokens  = new antlr4.CommonTokenStream(lexer);
			const parser = new FSHParser(tokens);
			parser.buildParseTrees = true;
			parser.removeErrorListeners();
			parser.addErrorListener(testListener);
			const tree = parser.ruleSet();
		});
    });
});

describe('Parse paramRuleSet test', () => {
    
	it('one correct paramRuleSet - first test', () => {
		assert.doesNotThrow(() => {
			//reference from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#parameterized-rule-sets (11 march 2021, Shorthand v. 1.1.0)
			const input = 
			"RuleSet: SetContext(path) \n" +
			"* ^context[+].type = #element \n" +
			"* ^context[=].expression = \"{path}\" \n";
			const chars = new antlr4.InputStream(input);
			const lexer = new FSHLexer(chars);
			const tokens  = new antlr4.CommonTokenStream(lexer);
			const parser = new FSHParser(tokens);
			parser.buildParseTrees = true;
			parser.removeErrorListeners();
			parser.addErrorListener(testListener);
			const tree = parser.paramRuleSet();
		});
    });
	it('one correct paramRuleSet - second test', () => {
		assert.doesNotThrow(() => {
			//reference from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#parameterized-rule-sets (11 march 2021, Shorthand v. 1.1.0)
			const input = 
			"RuleSet: Question(linkId, text, type, repeats) \n" +
			"* item[+].linkId = \"{linkId}\"  \n" +
			"* item[=].text = \"{text}\"  \n" +
			"* item[=].type = #{type}  \n" +
			"* item[=].repeats = {repeats}  \n";
			const chars = new antlr4.InputStream(input);
			const lexer = new FSHLexer(chars);
			const tokens  = new antlr4.CommonTokenStream(lexer);
			const parser = new FSHParser(tokens);
			parser.buildParseTrees = true;
			parser.removeErrorListeners();
			parser.addErrorListener(testListener);
			const tree = parser.paramRuleSet();
		});
    });
});

describe('Parse mapping test', () => {
    it('one correct mapping without rules', () => {
		assert.doesNotThrow(() => {
			//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#defining-mappings (02 march 2021, Shorthand v. 1.1.0)
			const input = 
			"Mapping:  USCorePatientToArgonaut \n" +
			"Source:   USCorePatient \n" +
			"Target:   \"http://unknown.org/Argonaut-DQ-DSTU2\" \n" +
			"Title:    \"Argonaut DSTU2\" \n" +
			"Id:       argonaut-dq-dstu2 \n";
			const chars = new antlr4.InputStream(input);
			const lexer = new FSHLexer(chars);
			const tokens  = new antlr4.CommonTokenStream(lexer);
			const parser = new FSHParser(tokens);
			parser.buildParseTrees = true;
			parser.removeErrorListeners();
			parser.addErrorListener(testListener);
			const tree = parser.mapping();
		});
    });
});