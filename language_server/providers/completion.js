/*
 * Copyright (c) 2020 the original author or authors.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const vscode_languageserver = require("vscode-languageserver");

//this function will return initial list of the completion items.
const onCompletion = (_textDocumentPosition) => {
    // The pass parameter contains the position of the text document in which code complete got requested.
    return [
        {
            label: 'Parent:',
            kind : vscode_languageserver.CompletionItemKind.Keyword,
            data: 0
        },{
            label: 'Id:',
            kind : vscode_languageserver.CompletionItemKind.Keyword,
            data: 1
        },{
            label: 'Title:',
            kind : vscode_languageserver.CompletionItemKind.Keyword,
            data: 2
        },{
            label: 'Description:',
            kind : vscode_languageserver.CompletionItemKind.Keyword,
            data: 3
        },{
            label: 'Expression:',
            kind : vscode_languageserver.CompletionItemKind.Keyword,
            data: 4
        },{
            label: 'XPath:',
            kind : vscode_languageserver.CompletionItemKind.Keyword,
            data: 5
        },{
            label: 'Severity:',
            kind : vscode_languageserver.CompletionItemKind.Keyword,
            data: 6
        },{
            label: 'InstanceOf:',
            kind : vscode_languageserver.CompletionItemKind.Keyword,
            data: 7
        },{
            label: 'Usage:',
            kind : vscode_languageserver.CompletionItemKind.Keyword,
            data: 8
        },{
            label: 'Mixins:',
            kind : vscode_languageserver.CompletionItemKind.Keyword,
            data: 9
        },{
            label: 'Source:',
            kind : vscode_languageserver.CompletionItemKind.Keyword,
            data: 10
        },{
            label: 'Target:',
            kind : vscode_languageserver.CompletionItemKind.Keyword,
            data: 11
        },{
            label: 'from',
            kind: vscode_languageserver.CompletionItemKind.Text,
            data: 12
        },{
            label: 'example',
            kind: vscode_languageserver.CompletionItemKind.Text,
            data: 13
        },{
            label: 'preffered',
            kind: vscode_languageserver.CompletionItemKind.Text,
            data: 14
        },{
            label: 'extensible',
            kind: vscode_languageserver.CompletionItemKind.Text,
            data: 15
        },{
            label: 'required',
            kind: vscode_languageserver.CompletionItemKind.Text,
            data: 16
        },{
            label: 'contains',
            kind: vscode_languageserver.CompletionItemKind.Text,
            data: 17
        },{
            label: 'named',
            kind: vscode_languageserver.CompletionItemKind.Text,
            data: 18
        },{
            label: 'and',
            kind: vscode_languageserver.CompletionItemKind.Text,
            data: 19
        },{
            label: 'only',
            kind: vscode_languageserver.CompletionItemKind.Text,
            data: 20
        },{
            label: 'or',
            kind: vscode_languageserver.CompletionItemKind.Text,
            data: 21
        },{
            label: 'obeys',
            kind: vscode_languageserver.CompletionItemKind.Text,
            data: 22
        },{
            label: 'true',
            kind: vscode_languageserver.CompletionItemKind.Text,
            data: 23
        },{
            label: 'false',
            kind: vscode_languageserver.CompletionItemKind.Text,
            data: 24
        },{
            label: 'include',
            kind: vscode_languageserver.CompletionItemKind.Text,
            data: 25
        },{
            label: 'exclude',
            kind: vscode_languageserver.CompletionItemKind.Text,
            data: 26
        },{
            label: 'codes',
            kind: vscode_languageserver.CompletionItemKind.Text,
            data: 27
        },{
            label: 'where',
            kind: vscode_languageserver.CompletionItemKind.Text,
            data: 28
        },{
            label: 'valueSet',
            kind: vscode_languageserver.CompletionItemKind.Text,
            data: 29
        },{
            label: 'system',
            kind: vscode_languageserver.CompletionItemKind.Text,
            data: 30
        },{
            label: 'units',
            kind: vscode_languageserver.CompletionItemKind.Text,
            data: 31
        },{
            label: 'exactly',
            kind: vscode_languageserver.CompletionItemKind.Text,
            data: 32
        },{
            label: 'insert',
            kind: vscode_languageserver.CompletionItemKind.Text,
            data: 33
        },{
            label: 'Reference',
            kind: vscode_languageserver.CompletionItemKind.Text,
            data: 34
        }
    ];
}

//this function will add some additional information for the item selectet in the completion list.
const onCompletionResolve = (item) => {
    if (item.data === 0) {
        item.detail = "Parent details";
        item.documentation = "Specifies the base class for a profile or extension.\n\n"+
        "For more information look at the HL7 FHIR Shorthand language reference.";
    }
    else if (item.data === 1) {
        item.detail = "Id details";
        item.documentation = "An identifier for an item.\n\n"+
        "For more information look at the HL7 FHIR Shorthand language reference.";
    }
    else if (item.data === 2) {
        item.detail = "Title details";
        item.documentation = "Short human-readable name.\n\n"+
        "For more information look at the HL7 FHIR Shorthand language reference.";
    }
    else if (item.data === 3) {
        item.detail = "Description details";
        item.documentation = "Provides a human-readable description.\n\n"+
        "For more information look at the HL7 FHIR Shorthand language reference.";
    }
    else if (item.data === 4) {
        item.detail = "Expression details";
        item.documentation = "The FHIR path expression in an invariant.\n\n"+
        "For more information look at the HL7 FHIR Shorthand language reference.";
    }
    else if (item.data === 5) {
        item.detail = "XPath details";
        item.documentation = "the XPath in an invariant.\n\n"+
        "For more information look at the HL7 FHIR Shorthand language reference.";
    }
    else if (item.data === 6) {
        item.detail = "Severity details";
        item.documentation = "whether violation of an invariant represents an error or a warning.\n\n"+
        "For more information look at the HL7 FHIR Shorthand language reference.";
    }
    else if (item.data === 7) {
        item.detail = "InstanceOf details";
        item.documentation = "The profile or resource an instance instantiates.\n\n"+
        "For more information look at the HL7 FHIR Shorthand language reference.";
    }
    else if (item.data === 8) {
        item.detail = "Usage details";
        item.documentation = "Specifies how an instance is intended to be used in the IG.\n\n"+
        "For more information look at the HL7 FHIR Shorthand language reference.";
    }
    else if (item.data === 9) {
        item.detail = "Mixins details";
        item.documentation = "For more information look at the HL7 FHIR Shorthand language reference.";
    }
    else if (item.data === 10) {
        item.detail = "Source details";
        item.documentation = "The profile the mapping applies to.\n\n"+
        "For more information look at the HL7 FHIR Shorthand language reference.";
    }
    else if (item.data === 11) {
        item.detail = "Target details";
        item.documentation = "The standard being mapped to.\n\n"+
        "For more information look at the HL7 FHIR Shorthand language reference.";
    }

    return item;
}

module.exports = {onCompletion,onCompletionResolve}