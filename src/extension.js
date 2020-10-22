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

//as soon as the require is called, the providers are registered
const completionProvider = require("./providers/completion");

//this definisions are for the language server
const path = require("path");
const vscode_languageclient = require("vscode-languageclient");
let client;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "fsh-editor" is now active!');

	// The command has been defined in the package.json file
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('fsh-editor.helloWorld', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World from fsh_editor!')
    });

    context.subscriptions.push(disposable);



	//this follow part is to start and validate the language server
	// The server is implemented in node
    let serverModule = context.asAbsolutePath(path.join('language_server', 'server.js'));
    // The debug options for the server
    // --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
    let debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };
    // If the extension is launched in debug mode then the debug server options are used
    // Otherwise the run options are used
    let serverOptions = {
        run: { module: serverModule, transport: vscode_languageclient.TransportKind.ipc },
        debug: {
            module: serverModule,
            transport: vscode_languageclient.TransportKind.ipc,
            options: debugOptions
        }
    };
    // Options to control the language client
    let clientOptions = {
        // Register the server for fsh documents
        documentSelector: [{ scheme: 'file', language: 'fsh' }],
        synchronize: {
            // Notify the server about file changes to '.clientrc files contained in the workspace
            fileEvents: vscode.workspace.createFileSystemWatcher('**/.clientrc')
        }
    };
    // Create the language client and start the client.
    client = new vscode_languageclient.LanguageClient('languageServer', 'Language Server', serverOptions, clientOptions);
    // Start the client. This will also launch the server
    client.start();

    var collection = vscode.languages.createDiagnosticCollection('test');
    const diagnosticProvider = require("./providers/diagnostics");
    vscode.workspace.onDidChangeTextDocument((event) => {
        diagnosticProvider.update(event,collection);
    })

}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}

module.exports = {
	activate,
	deactivate
}

