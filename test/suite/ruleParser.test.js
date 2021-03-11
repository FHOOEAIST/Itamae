import assert from 'assert';
import antlr4 from 'antlr4';
import FSHLexer from '../../src/parser/FSHLexer.js';
import FSHParser from '../../src/parser/FSHParser';
import TestErrorListener from '../TestErrorListener';

const testListener = new TestErrorListener();

describe('Parse cardRule test', () => {
    it('correct cardRules', () => {
		assert.doesNotThrow(() => {
			//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#cardinality-rules (03 march 2021, Shorthand v. 1.1.0)
			const input = 
            "* subject 1..1 \n" +
			"* subject 1..1 MS \n" +
			"* component.referenceRange 0..0 \n" +
			"* category 1.. \n" +
			"* category ..1 \n";
			const chars = new antlr4.InputStream(input);
			const lexer = new FSHLexer(chars);
			const tokens  = new antlr4.CommonTokenStream(lexer);
			const parser = new FSHParser(tokens);
			parser.buildParseTrees = true;
			parser.removeErrorListeners();
			parser.addErrorListener(testListener);
			const tree = parser.cardRule();
		});
    });
});

describe('Parse caretValueRule test', () => {
    it('correct caretValueRules', () => {
		assert.doesNotThrow(() => {
			//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#contains-rules-for-slicing (03 march 2021, Shorthand v. 1.1.0) 
	        const input = 
            "* component ^slicing.discriminator.type = #pattern \n" +
		    "* component ^slicing.discriminator.path = \"code\" \n" +
		    "* component ^slicing.rules = #open \n" +
		    "* component ^slicing.ordered = false   // can be omitted, since false is the default \n" +
		    "* component ^slicing.description = \"Slice based on the component.code patternẞ\" \n";
	        const chars = new antlr4.InputStream(input);
			const lexer = new FSHLexer(chars);
			const tokens  = new antlr4.CommonTokenStream(lexer);
			const parser = new FSHParser(tokens);
			parser.buildParseTrees = true;
			parser.removeErrorListeners();
			parser.addErrorListener(testListener);
			const tree = parser.caretValueRule();
		});
    });
});

describe('Parse concept test', () => {
    it('correct concepts oneliner-rules', () => {
		assert.doesNotThrow(() => {
			//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#defining-code-systems (03 march 2021, Shorthand v. 1.1.0) 
	        const input = 
            "* #Sirsasana \"Headstand\" \"An inverted asana, also called mudra in classical hatha yoga, involves standing on one's head.\" \n" +
            "* #Halasana \"Plough Pose\" \"Halasana or Plough pose is an inverted asana in hatha yoga and modern yoga as exercise. Its variations include Karnapidasana with the knees by the ears, and Supta Konasana with the feet wide apart.\" \n" +
            "* #Matsyasana \"Fish Pose\" \"Matsyasana is a reclining back-bending asana in hatha yoga and modern yoga as exercise. It is commonly considered a counterasana to Sarvangasana, or shoulder stand, specifically within the context of the Ashtanga Vinyasa Yoga Primary Series.\" \n" +
            "* #Bhujangasana \"Cobra Pose\" \"Bhujangasana, or Cobra Pose is a reclining back-bending asana in hatha yoga and modern yoga as exercise. It is commonly performed in a cycle of asanas in Surya Namaskar (Salute to the Sun) as an alternative to Urdhva Mukha Svanasana (Upwards Dog Pose).\" \n";
			const chars = new antlr4.InputStream(input);
			const lexer = new FSHLexer(chars);
			const tokens  = new antlr4.CommonTokenStream(lexer);
			const parser = new FSHParser(tokens);
			parser.buildParseTrees = true;
			parser.removeErrorListeners();
			parser.addErrorListener(testListener);
			const tree = parser.concept();
		});
    });
    it('correct concepts multiliner-rules', () => {
		assert.doesNotThrow(() => {
			//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#defining-code-systems (03 march 2021, Shorthand v. 1.1.0) 
	        const input = 
            "* #Sirsasana \"Headstand\" \n" +
		    "\"An inverted asana, also called mudra in classical hatha yoga, involves standing on one's head.\" \n" +
		    "* #Halasana \"Plough Pose\" \n" +
		    "\"Halasana or Plough pose is an inverted asana in hatha yoga and modern yoga as exercise. Its variations include Karnapidasana with the knees by the ears, and Supta Konasana with the feet wide apart.\" \n" +
		    "* #Matsyasana \"Fish Pose\" \n" +
		    "\"Matsyasana is a reclining back-bending asana in hatha yoga and modern yoga as exercise. It is commonly considered a counterasana to Sarvangasana, or shoulder stand, specifically within the context of the Ashtanga Vinyasa Yoga Primary Series.\" \n" +
		    "* #Bhujangasana \"Cobra Pose\" \n" +
		    "\"Bhujangasana, or Cobra Pose is a reclining back-bending asana in hatha yoga and modern yoga as exercise. It is commonly performed in a cycle of asanas in Surya Namaskar (Salute to the Sun) as an alternative to Urdhva Mukha Svanasana (Upwards Dog Pose).\" \n";
	        const chars = new antlr4.InputStream(input);
			const lexer = new FSHLexer(chars);
			const tokens  = new antlr4.CommonTokenStream(lexer);
			const parser = new FSHParser(tokens);
			parser.buildParseTrees = true;
			parser.removeErrorListeners();
			parser.addErrorListener(testListener);
			const tree = parser.concept();
		});
    });
});

describe('Parse containsRule test', () => {
    it('correct containsExtensionsRules', () => {
		assert.doesNotThrow(() => {
			//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#contains-rules-for-extensions (03 march 2021, Shorthand v. 1.1.0) 
			const input = 
            "* extension contains http://hl7.org/fhir/StructureDefinition/patient-disability named disability 0..1 MS and http://hl7.org/fhir/StructureDefinition/patient-genderIdentity named genderIdentity 0..1 MS \n" +
			"* extension contains $Disability named disability 0..1 MS and $GenderIdentity named genderIdentity 0..1 MS \n" +
			"* bodySite.extension contains Laterality named laterality 0..1 \n" +
			"*extension contains ombCategory 0..5 MS and detailed 0..* and text 1..1 MS \n";
			const chars = new antlr4.InputStream(input);
			const lexer = new FSHLexer(chars);
			const tokens  = new antlr4.CommonTokenStream(lexer);
			const parser = new FSHParser(tokens);
			parser.buildParseTrees = true;
			parser.removeErrorListeners();
			parser.addErrorListener(testListener);
			const tree = parser.containsRule();
		});
    });
	it('correct containsSlicingRules oneliner', () => {
		assert.doesNotThrow(() => {
			//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#contains-rules-for-slicing (03 march 2021, Shorthand v. 1.1.0) 
			const input = 
            "* component contains systolicBP 1..1 MS and diastolicBP 1..1 MS \n" +
			"* component contains pulseScore 0..3 and grimaceScore 0..3 and activityScore 0..3 and respirationScore 0..3 \n" +
			"* component[respirationScore] contains oneMinuteScore 0..1 and fiveMinuteScore 0..1 and tenMinuteScore 0..1 \n";
			const chars = new antlr4.InputStream(input);
			const lexer = new FSHLexer(chars);
			const tokens  = new antlr4.CommonTokenStream(lexer);
			const parser = new FSHParser(tokens);
			parser.buildParseTrees = true;
			parser.removeErrorListeners();
			parser.addErrorListener(testListener);
			const tree = parser.containsRule();
		});
    });
	it('correct containsSlicingRules multiliner', () => {
		assert.doesNotThrow(() => {
			//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#contains-rules-for-slicing (03 march 2021, Shorthand v. 1.1.0) 
			const input = 
            "* component contains \n" +
			"pulseScore 0..3 and \n" +
			"grimaceScore 0..3 and \n" +
			"activityScore 0..3 and \n" +
			"respirationScore 0..3 \n" +
			"* component[respirationScore] contains \n" +
			"oneMinuteScore 0..1 and \n" +
			"fiveMinuteScore 0..1 and \n" +
			"tenMinuteScore 0..1 \n";
			const chars = new antlr4.InputStream(input);
			const lexer = new FSHLexer(chars);
			const tokens  = new antlr4.CommonTokenStream(lexer);
			const parser = new FSHParser(tokens);
			parser.buildParseTrees = true;
			parser.removeErrorListeners();
			parser.addErrorListener(testListener);
			const tree = parser.containsRule();
		});
    });
});

describe('Parse flagRule test', () => {
    it('correct flagRules', () => {
		assert.doesNotThrow(() => {
			//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#flag-rules (03 march 2021, Shorthand v. 1.1.0)
			const input = 
            "* communication MS SU \n" +
			"* identifier and identifier.system and identifier.value and name and name.family MS \n";
			const chars = new antlr4.InputStream(input);
			const lexer = new FSHLexer(chars);
			const tokens  = new antlr4.CommonTokenStream(lexer);
			const parser = new FSHParser(tokens);
			parser.buildParseTrees = true;
			parser.removeErrorListeners();
			parser.addErrorListener(testListener);
			const tree = parser.flagRule();
		});
    });
});

describe('Parse fixedValueRule test', () => {
    it('correct fixedValueRules', () => {
		assert.doesNotThrow(() => {
			//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#assignment-rules (03 march 2021, Shorthand v. 1.1.0) 
			const input = 
            "* code = LNC#69548-6 \n" +
			"* code = LNC#69548-6 \"Genetic variant assessment\" \n" +
			"* code = LNC#69548-6 (exactly) \n";
			const chars = new antlr4.InputStream(input);
			const lexer = new FSHLexer(chars);
			const tokens  = new antlr4.CommonTokenStream(lexer);
			const parser = new FSHParser(tokens);
			parser.buildParseTrees = true;
			parser.removeErrorListeners();
			parser.addErrorListener(testListener);
			const tree = parser.fixedValueRule();
		});
    });
});

describe('Parse insertRule test', () => {
    it('correct insertRules', () => {
		assert.doesNotThrow(() => {
			//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#insert-rules (03 march 2021, Shorthand v. 1.1.0)
			const input = 
            "* insert RuleSet1 \n" +
			"* insert USObservationRuleSet \n" +
			"* insert FranceObservationRuleSet \n" +
			"* insert Name(Bob, Smith) \n" +
			"* insert Name(Robert, Smith) \n" +
			"* insert Name(Robert, Smith) \n";
			const chars = new antlr4.InputStream(input);
			const lexer = new FSHLexer(chars);
			const tokens  = new antlr4.CommonTokenStream(lexer);
			const parser = new FSHParser(tokens);
			parser.buildParseTrees = true;
			parser.removeErrorListeners();
			parser.addErrorListener(testListener);
			const tree = parser.insertRule();
		});
    });
});

describe('Parse mappingRule test', () => {
    it('correct mappingRules', () => {
		assert.doesNotThrow(() => {
			//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#defining-mappings (03 march 2021, Shorthand v. 1.1.0)
			const input = 
            "* -> \"Patient\" \"This profile maps to Patient in Argonaut\" \n" +
			"* identifier.value -> \"Patient.identifier.value\" \n" +
			"* -> \"Patient\" \n" +
			"* extension[USCoreRaceExtension] -> \"Patient.extension[http://fhir.org/guides/argonaut/StructureDefinition/argo-race]\" \n" +
			"* extension[USCoreEthnicityExtension] -> \"Patient.extension[http://fhir.org/guides/argonaut/StructureDefinition/argo-ethnicity]\" \n" +
			"* extension[USCoreBirthSexExtension] -> \"Patient.extension[http://fhir.org/guides/argonaut/StructureDefinition/argo-birthsex]\" \n" +
			"* identifier -> \"Patient.identifier\" \n" +
			"* identifier.system -> \"Patient.identifier.system\" \n" +
			"* identifier.value -> \"Patient.identifier.value\" \n";
			const chars = new antlr4.InputStream(input);
			const lexer = new FSHLexer(chars);
			const tokens  = new antlr4.CommonTokenStream(lexer);
			const parser = new FSHParser(tokens);
			parser.buildParseTrees = true;
			parser.removeErrorListeners();
			parser.addErrorListener(testListener);
			const tree = parser.mappingRule();
		});
    });
});

describe('Parse onlyRule test', () => {
    it('correct onlyRules', () => {
		assert.doesNotThrow(() => {
			//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#type-rules (03 march 2021, Shorthand v. 1.1.0)
			const input = 
            "* valueQuantity only SimpleQuantity \n" +
			"* onset[x] only dateTime \n" +
			"* onset[x] only Period or Range \n" +
			"* onset[x] only Age or AgeRange or DateRange \n" +
			"* performer only Reference(Practitioner) \n" +
			"* performer only Reference(Practitioner or PractitionerRole) \n" +
			"* performer only Reference(PrimaryCarePhysician or EmergencyRoomPhysician) \n" +
			"* performer[Practitioner] only Reference(PrimaryCareProvider) \n";
			const chars = new antlr4.InputStream(input);
			const lexer = new FSHLexer(chars);
			const tokens  = new antlr4.CommonTokenStream(lexer);
			const parser = new FSHParser(tokens);
			parser.buildParseTrees = true;
			parser.removeErrorListeners();
			parser.addErrorListener(testListener);
			const tree = parser.onlyRule();
		});
    });
});

describe('Parse vsComponent test', () => {
    it('correct vsComponent', () => {
		assert.doesNotThrow(() => {
			//reference took from https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#defining-value-sets (03 march 2021, Shorthand v. 1.1.0)
			const input = 
            "* SCT#971000205103 \"Wearing street clothes with shoes\" \n" +
			"* SCT#961000205106 \"Wearing street clothes, no shoes\" \n" +
			"* SCT#951000205108 \"Wearing underwear or less\" \n" +
			"* include codes from system SCT where concept is-a #367651003 \"Malignant neoplasm of primary, secondary, or uncertain origin (morphologic abnormality)\" \n" +
			"* include codes from system SCT where concept is-a #399919001 \"Carcinoma in situ - category (morphologic abnormality)\" \n" +
			"* include codes from system SCT where concept is-a #399983006 \"In situ adenomatous neoplasm - category (morphologic abnormality)\" \n" +
			"* exclude codes from system SCT where concept is-a #450893003 \"Papillary neoplasm, pancreatobiliary-type, with high grade intraepithelial neoplasia (morphologic abnormality)\" \n" +
			"* exclude codes from system SCT where concept is-a #128640002 \"Glandular intraepithelial neoplasia, grade III (morphologic abnormality)\" \n" +
			"* exclude codes from system SCT where concept is-a #450890000 \"Glandular intraepithelial neoplasia, low grade (morphologic abnormality)\" \n" +
			"* exclude codes from system SCT where concept is-a #703548001 \"Endometrioid intraepithelial neoplasia (morphologic abnormality)\" \n";
			const chars = new antlr4.InputStream(input);
			const lexer = new FSHLexer(chars);
			const tokens  = new antlr4.CommonTokenStream(lexer);
			const parser = new FSHParser(tokens);
			parser.buildParseTrees = true;
			parser.removeErrorListeners();
			parser.addErrorListener(testListener);
			const tree = parser.vsComponent();
		});
    });
});