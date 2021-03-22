/*
 * Copyright (c) 2020 the original author or authors.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"use strict";
const vscode = require('vscode');
const workspace = vscode.workspace;
const window = vscode.window;
const StatusBarAlignment = vscode.StatusBarAlignment;
const commands = vscode.commands;
const ViewColumn = vscode.ViewColumn;

//as soon as the require is called, the providers are registered

//these definitions are for the language server
const path = require("path");
const vscode_languageclient = require("vscode-languageclient");
var LanguageClient = vscode_languageclient.LanguageClient;
let languageClient;

// this method is called when the extension is activated
/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
    const fs = require('fs');
    var camelLanguageServerPath = context.asAbsolutePath(path.join('src','jars', 'languageServer-1.0.0-SNAPSHOT-jar-with-dependencies.jar'));
    
    const outputLine = vscode.window.createOutputChannel("Testing");
    
    var serverOptions = {
        command: retrieveJavaExecutable(),
        args: ['-jar', camelLanguageServerPath]
    };
    // Options to control the language client
    var clientOptions = {
        documentSelector: [
            //register the server for fsh files
            {scheme: 'file', language: 'fsh'}],
        synchronize: {
            // Notify the server about file changes to .xml files contain in the workspace
            fileEvents: workspace.createFileSystemWatcher('**/.clientrc')
        }
    };
    
    // Create the language client and start the client.
    var languageClient = new LanguageClient(
        'LanguageServerforFHIRShorthand', 
        'Language Server for FHIR Shorthand', 
        serverOptions, 
        clientOptions
    );

    let disposable = languageClient.start();
	// Push the disposable to the context's subscriptions so that the
	// client can be deactivated on extension deactivation
	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when the extension is deactivated
function deactivate() {
    if (!languageClient) {
        return undefined;
    }
    return languageClient.stop();
}

function retrieveJavaExecutable() {
    var javaHomeSetting = workspace.getConfiguration().get('java.home');
    if (javaHomeSetting) {
        return javaHomeSetting + '/bin/java';
    }
    else {
        return 'java';
    }
}