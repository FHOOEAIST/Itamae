import * as vscode from 'vscode';



// this method is called when the extension is activated
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	vscode.window.showInformationMessage("extension started.");
}
exports.activate = activate;

// this method is called when the extension is deactivated
function deactivate() {
}