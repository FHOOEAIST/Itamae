/*
 * Copyright (c) 2020 the original author or authors.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const vscode = require("vscode");

/**
 * completion for smaller, often used words based on FHIR Shorthand specification
 * @param {vscode.CompletionList} completionList
 */
function addSimpleCompletions(completionList){
    completionList.items.push(new vscode.CompletionItem('alias', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('profile', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('instance', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('ivairant', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('ruleSet', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('mapping', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('id', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('title', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('description', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('expression', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('xPath', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('severity', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('usage', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('source', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('target', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('from', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('example' , vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('preffered' , vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('extensible' , vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('required' , vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('contains' , vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('named' , vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('and' , vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('only' , vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('or' , vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('obeys' , vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('true' , vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('false' , vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('include' , vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('exclude' , vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('codes' , vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('where' , vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('valueSet' , vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('system' , vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('units' , vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('exactly' , vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('insert' , vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('Reference' , vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('extension' , vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('code' , vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('value' , vscode.CompletionItemKind.Text));
}

/**
 * completion for main keywords with additional information
 * @param {vscode.CompletionList} completionList
 */
function addKeywordCompletions(completionList){
    const aliasKW = new vscode.CompletionItem('Alias:', vscode.CompletionItemKind.Keyword);
    aliasKW.detail = "Alias details";
    aliasKW.documentation = "An alias allows to replace a lenghty url or oid with a short string "+
    "and there are global for the whole FSH project.\n"+
    "Alias statements stand alone, and cannot be mixed into rule sets of other items.\n"+
    "For more information look at the HL7 FHIR Shorthand language reference.";

    const parentKW = new vscode.CompletionItem('Parent:', vscode.CompletionItemKind.Keyword);
    parentKW.detail = "Parent details";
    parentKW.documentation = "Specifies the base class for a profile or extension.\n\n"+
    "For more information look at the HL7 FHIR Shorthand language reference.";

    const idKW = new vscode.CompletionItem('Id:', vscode.CompletionItemKind.Keyword);
    idKW.detail = "Id details";
    idKW.documentation = "An identifier for an item.\n\n"+
    "For more information look at the HL7 FHIR Shorthand language reference.";

    const titleKW = new vscode.CompletionItem('Title:', vscode.CompletionItemKind.Keyword);
    titleKW.detail = "Title details";
    titleKW.documentation = "Short human-readable name.\n\n"+
    "For more information look at the HL7 FHIR Shorthand language reference.";
    titleKW.insertText = new vscode.SnippetString('Title: "$1"');

    const descriptionKW = new vscode.CompletionItem('Description:', vscode.CompletionItemKind.Keyword);
    descriptionKW.detail = "Description details";
    descriptionKW.documentation = "Provides a human-readable description.\n\n"+
    "For more information look at the HL7 FHIR Shorthand language reference.";
    descriptionKW.insertText = new vscode.SnippetString('Description: "$1"');

    const expressionKW = new vscode.CompletionItem('Expression:', vscode.CompletionItemKind.Keyword);
    expressionKW.detail = "Expression details";
    expressionKW.documentation = "The FHIR path expression in an invariant.\n\n"+
    "For more information look at the HL7 FHIR Shorthand language reference.";
    expressionKW.insertText = new vscode.SnippetString('Expression: "$1"');

    const xpathKW = new vscode.CompletionItem('XPath:', vscode.CompletionItemKind.Keyword);
    xpathKW.detail = "XPath details";
    xpathKW.documentation = "the XPath in an invariant.\n\n"+
    "For more information look at the HL7 FHIR Shorthand language reference.";
    xpathKW.insertText = new vscode.SnippetString('XPath: "$1"');

    const severityKW = new vscode.CompletionItem('Severity:', vscode.CompletionItemKind.Keyword);
    severityKW.detail = "Severity details";
    severityKW.documentation = "whether violation of an invariant represents an error or a warning.\n\n"+
    "For more information look at the HL7 FHIR Shorthand language reference.";

    const instanceOfKW = new vscode.CompletionItem('InstanceOf:', vscode.CompletionItemKind.Keyword);
    instanceOfKW.detail = "InstaneOf details";
    instanceOfKW.documentation = "The profile or resource an instance instantiates.\n\n"+
    "For more information look at the HL7 FHIR Shorthand language reference.";

    const usageKW = new vscode.CompletionItem('Usage:', vscode.CompletionItemKind.Keyword);
    usageKW.detail = "Usage details";
    usageKW.documentation = "Specifies how an instance is intended to be used in the IG.\n\n"+
    "For more information look at the HL7 FHIR Shorthand language reference.";

    const mixinsKW = new vscode.CompletionItem('Mixins:', vscode.CompletionItemKind.Keyword);
    mixinsKW.detail = "Mixins details";
    mixinsKW.documentation = "For more information look at the HL7 FHIR Shorthand language reference.";

    const sourceKW = new vscode.CompletionItem('Source: ', vscode.CompletionItemKind.Keyword);
    sourceKW.detail = "Source details";
    sourceKW.documentation = "The profile the mapping applies to.\n\n"+
    "For more information look at the HL7 FHIR Shorthand language reference.";

    const targetKW = new vscode.CompletionItem('Target: ', vscode.CompletionItemKind.Keyword);
    targetKW.detail = "Target details";
    targetKW.documentation = "The standard being mapped to.\n\n"+
    "For more information look at the HL7 FHIR Shorthand language reference.";
    targetKW.insertText = new vscode.SnippetString('Target: "$1"');

    completionList.items.push(
        aliasKW,parentKW,idKW,titleKW,descriptionKW,expressionKW,xpathKW,
        severityKW,instanceOfKW,usageKW,mixinsKW,sourceKW,targetKW
    );
}

/**
 * completion for already defined resources based on: https://www.hl7.org/fhir/resourcelist.html
 * the completionItems are bundled according to their category and subcatgory
 * @param {vscode.CompletionList} completionList
 */
function addResources (completionList) {
    //foundation
    completionList.items.push(new vscode.CompletionItem('CapabilityStatement', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('StructureDefinition', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('ImplementationGuide', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('SearchParameter', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('MessageDefinition', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('OperationDefinition', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('CompartmentDefinition', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('StructureMap', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('GraphDefinition', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('ExampleScenario', vscode.CompletionItemKind.Reference));

    completionList.items.push(new vscode.CompletionItem('CodeSystem', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('ValueSet', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('ConceptMap', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('NamingSystem', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('TerminologyCapabilities', vscode.CompletionItemKind.Reference));

    completionList.items.push(new vscode.CompletionItem('Provenance', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('AuditEvent', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('Consent', vscode.CompletionItemKind.Reference));

    completionList.items.push(new vscode.CompletionItem('Composition', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('DocumentManifest', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('DocumentReference', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('CatalogEntry', vscode.CompletionItemKind.Reference));

    completionList.items.push(new vscode.CompletionItem('Basic', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('Binary', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('Bundle', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('Linkage', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('MessageHeader', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('OperationOutcome', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('Parameters', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('Subscription', vscode.CompletionItemKind.Reference));


    //base
    completionList.items.push(new vscode.CompletionItem('Patient', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('Practitioner', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('PractitionerRole', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('RelatedPerson', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('Person', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('Group', vscode.CompletionItemKind.Reference));

    completionList.items.push(new vscode.CompletionItem('Organization', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('OrganizationAffiliation', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('HealthcareService', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('Endpoint', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('Location', vscode.CompletionItemKind.Reference));

    completionList.items.push(new vscode.CompletionItem('Substance', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('BiologicallyDerivedProduct', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('Device', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('DeviceMetric', vscode.CompletionItemKind.Reference));

    completionList.items.push(new vscode.CompletionItem('Task', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('Appointment', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('AppointmentResponse', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('Schedule', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('Slot', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('VerificationResult', vscode.CompletionItemKind.Reference));

    completionList.items.push(new vscode.CompletionItem('Encounter', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('EpisodeOfCare', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('Flag', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('List', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('Library', vscode.CompletionItemKind.Reference));


    //clinical
    completionList.items.push(new vscode.CompletionItem('AllergyIntolerance', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('AdverseEvent', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('Condition', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('Procedure', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('FamilyMemberHistory', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('ClinicalImpression', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('DetectedIssue', vscode.CompletionItemKind.Reference));

    completionList.items.push(new vscode.CompletionItem('Observation', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('Media', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('DiagnosticReport', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('Specimen', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('BodyStructure', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('ImagingStudy', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('QuestionnaireResponse', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('MolecularSequence', vscode.CompletionItemKind.Reference));

    completionList.items.push(new vscode.CompletionItem('MedicationRequest', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('MedicationAdministration', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('MedicationDispense', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('MedicationStatement', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('Medication', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('MedicationKnowledge', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('Immunization', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('ImmunizationEvaluation', vscode.CompletionItemKind.Reference));

    completionList.items.push(new vscode.CompletionItem('CarePlan', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('CareTeam', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('Goal', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('ServiceRequest', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('NutritionOrder', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('VisionPrescription', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('RiskAssessment', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('RequestGroup', vscode.CompletionItemKind.Reference));

    completionList.items.push(new vscode.CompletionItem('Communication', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('CommunicationRequest', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('DeviceRequest', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('DeviceUseStatement', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('GuidanceResponse', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('SupplyRequest', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('SupplyDelivery', vscode.CompletionItemKind.Reference));


    //financial
    completionList.items.push(new vscode.CompletionItem('Coverage', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('CoverageEligibilityRequest', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('CoverageEligibilityResponse', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('EnrollmentRequest', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('EnrollmentResponse', vscode.CompletionItemKind.Reference));

    completionList.items.push(new vscode.CompletionItem('Claim', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('ClaimResponse', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('Invoice', vscode.CompletionItemKind.Reference));

    completionList.items.push(new vscode.CompletionItem('PaymentNotice', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('PaymentReconciliation', vscode.CompletionItemKind.Reference));

    completionList.items.push(new vscode.CompletionItem('Account', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('ChargeItem', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('ChargeItemDefinition', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('Contract', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('ExplanationOfBenefit', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('InsurancePlan', vscode.CompletionItemKind.Reference));


    //spezialized
    completionList.items.push(new vscode.CompletionItem('ResearchStudy', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('ResearchSubject', vscode.CompletionItemKind.Reference));

    completionList.items.push(new vscode.CompletionItem('ActivityDefinition', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('DeviceDefinition', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('EventDefinition', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('ObservationDefinition', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('PlanDefinition', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('Questionnaire', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('SpecimenDefinition', vscode.CompletionItemKind.Reference));

    completionList.items.push(new vscode.CompletionItem('ResearchDefinition', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('ResearchElementDefinition', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('Evidence', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('EvidenceVariable', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('EffectEvidenceSynthesis', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('RiskEvidenceSynthesis', vscode.CompletionItemKind.Reference));

    completionList.items.push(new vscode.CompletionItem('Measure', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('MeasureReport', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('TestScript', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('TestReport', vscode.CompletionItemKind.Reference));

    completionList.items.push(new vscode.CompletionItem('MedicinalProduct', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('MedicinalProductAuthorization', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('MedicinalProductContraindication', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('MedicinalProductIndication', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('MedicinalProductIngredient', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('MedicinalProductInteraction', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('MedicinalProductManufactured', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('MedicinalProductPackaged', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('MedicinalProductPharmaceutical', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('MedicinalProductUndesirableEffect', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('SubstanceNucleicAcid', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('SubstancePolymer', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('SubstanceProtein', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('SubstanceReferenceInformation', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('SubstanceSpecification', vscode.CompletionItemKind.Reference));
    completionList.items.push(new vscode.CompletionItem('SubstanceSourceMaterial', vscode.CompletionItemKind.Reference));
}

/**
 * completionItems for the Datatypes of FHIR: https://www.hl7.org/fhir/R4/datatypes.html#2.24.0
 * @param {vscode.CompletionList} completionList
 */
function addDataTypes (completionList) {
    //insert primitive datatypes
    completionList.items.push(new vscode.CompletionItem('boolean', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('integer', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('string', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('decimal', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('uri', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('url', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('canonical', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('base64Binary', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('instant', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('date', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('dateTime', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('time', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('code', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('oid', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('id', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('markdown', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('unsignedInt', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('positiveInt', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('uuid', vscode.CompletionItemKind.Text));

    //insert general-purpose datatypes
    //normative
    completionList.items.push(new vscode.CompletionItem('Ratio', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('Period', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('Rage', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('Attachment', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('Identifier', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('HumanName', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('ContactPoint', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('Adress', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('SimpleQuantity', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('MoneyQuantity', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('Quantity', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('Duration', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('BackboneElement', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('Timing', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('Money', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('Coding', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('CodeableConcept', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('Annotation', vscode.CompletionItemKind.Text));
    //trial use
    completionList.items.push(new vscode.CompletionItem('Signature', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('SampleData', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('Cout', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('Distance', vscode.CompletionItemKind.Text));
    completionList.items.push(new vscode.CompletionItem('Age', vscode.CompletionItemKind.Text));
}

module.exports = {
    addSimpleCompletions,
    addKeywordCompletions,
    addResources,
    addDataTypes
}