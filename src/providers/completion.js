/*
 * Copyright (c) 2020 the original author or authors.
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const vscode = require("vscode");
const {
    addSimpleCompletions,
    addKeywordCompletions,
    addResources,
    addDataTypes} = require("../completionList");

/**
 * completion provider for the whole fhs file
 */
vscode.languages.registerCompletionItemProvider('fsh', {
    provideCompletionItems() {
        const completionList = new vscode.CompletionList;

        addSimpleCompletions(completionList);
        addKeywordCompletions(completionList);

        return completionList;
    }
});

/**
 * different completion providers for specific possibilities and certain restrictions
 */


//completion provider for alias
vscode.languages.registerCompletionItemProvider( 'fsh',{
    provideCompletionItems(document, position) {
        const completionList = new vscode.CompletionList;

        // get all text until the "position" and check if it reads "Alias: "
        const linePrefix = document.lineAt(position).text.substr(0, position.character);
        if (!linePrefix.endsWith('Alias: ')) {
            return undefined;
        }

        completionList.items.push(new vscode.CompletionItem('LNC = http://loinc.org', vscode.CompletionItemKind.Text));
        completionList.items.push(new vscode.CompletionItem('LOINC = http://loinc.org', vscode.CompletionItemKind.Text));
        completionList.items.push(new vscode.CompletionItem('SCT = http://snomed.info/sct', vscode.CompletionItemKind.Text));
        completionList.items.push(new vscode.CompletionItem('SNOMED = http://snomed.info/sct', vscode.CompletionItemKind.Text));

        return completionList;
    }
},
" " // triggered whenever a ' ' is being typed
);

//completion provider for parent
vscode.languages.registerCompletionItemProvider( 'fsh',{
        provideCompletionItems(document, position) {
            const completionList = new vscode.CompletionList;

            // get all text until the "position" and check if it reads "Parent: "
            const linePrefix = document.lineAt(position).text.substr(0, position.character);
            if (!linePrefix.endsWith('Parent: ')) {
                return undefined;
            }
            addResources(completionList);

            let profiles = getNames("Profile:");
            profiles.forEach((name) => {
                completionList.items.push(new vscode.CompletionItem(name, vscode.CompletionItemKind.Reference));
            });

            let extensions = getNames("Extension:");
            extensions.forEach((name) => {
                completionList.items.push(new vscode.CompletionItem(name, vscode.CompletionItemKind.Reference));
            });

            return completionList;
        }
},
" " // triggered whenever a ' ' is being typed
);

//completion provider for source
vscode.languages.registerCompletionItemProvider( 'fsh',{
    provideCompletionItems(document, position) {
        const completionList = new vscode.CompletionList;

        // get all text until the "position" and check if it reads "Source: "
        const linePrefix = document.lineAt(position).text.substr(0, position.character);
        if (!linePrefix.endsWith('Source: ')) {
            return undefined;
        }

        addResources(completionList);

        let profiles = getNames("Profile:");
            profiles.forEach((name) => {
                completionList.items.push(new vscode.CompletionItem(name, vscode.CompletionItemKind.Reference));
            });

        return completionList;
    }
},
" " // triggered whenever a ' ' is being typed
);

//completion provider for instanceOf
vscode.languages.registerCompletionItemProvider( 'fsh',{
    provideCompletionItems(document, position) {
        const completionList = new vscode.CompletionList;

        // get all text until the "position" and check if it reads "InstanceOf: "
        const linePrefix = document.lineAt(position).text.substr(0, position.character);
        if (!linePrefix.endsWith('InstanceOf: ')) {
            return undefined;
        }

        addResources(completionList);

        let profiles = getNames("Profile:");
            profiles.forEach((name) => {
                completionList.items.push(new vscode.CompletionItem(name, vscode.CompletionItemKind.Reference));
            });

        return completionList;
    }
},
" " // triggered whenever a ' ' is being typed
);

//completion provider for Id
vscode.languages.registerCompletionItemProvider( 'fsh',{
    provideCompletionItems(document, position) {
        const completionList = new vscode.CompletionList;

        // get all text until the "position" and check if it reads "InstanceOf:  "
        const linePrefix = document.lineAt(position).text.substr(0, position.character);
        if (!linePrefix.endsWith('Id: ')) {
            return undefined;
        }

        const lineabove = document.lineAt(position.line-1);
        //offer the completion only if the line above contains the begin of an entity which can have a id
        const entities = ["CodeSystem:", "Extension:", "Profile:", "ValueSet:"]
        if(!entities.includes(lineabove.text.trim().split(/\s/)[0])){
            return undefined;
        }
        completionList.items.push(new vscode.CompletionItem(lineabove.text.trim().split(/\s/)[1], vscode.CompletionItemKind.Reference));

        return completionList;
    }
},
" " // triggered whenever a ' ' is being typed
);


//completion provider for reference
vscode.languages.registerCompletionItemProvider( 'fsh',{
    provideCompletionItems(document, position) {
        const completionList = new vscode.CompletionList;

        // get all text until the "position" and check if it reads "Reference("
        const linePrefix = document.lineAt(position).text.substr(0, position.character);
        if (!linePrefix.endsWith('Reference(')) {
            return undefined;
        }
        addResources(completionList);

        let profiles = getNames("Profile:");
        profiles.forEach((name) => {
            completionList.items.push(new vscode.CompletionItem(name, vscode.CompletionItemKind.Reference));
        });

        let extensions = getNames("Extension:");
        extensions.forEach((name) => {
            completionList.items.push(new vscode.CompletionItem(name, vscode.CompletionItemKind.Reference));
        });

        let aliases = getNames("Alias:");
        aliases.forEach((name) => {
            completionList.items.push(new vscode.CompletionItem(name, vscode.CompletionItemKind.Reference));
        });


        return completionList;
    }
},
"(" // triggered whenever a '(' is being typed
);


/**
 * different completion providers for rules
 */
//completion provider for code rule
vscode.languages.registerCompletionItemProvider( 'fsh',{
        provideCompletionItems(document, position) {
            const completionList = new vscode.CompletionList;

            // get all text until the "position" and check if it reads "code = "
            const linePrefix = document.lineAt(position).text.substr(0, position.character);
            if (!linePrefix.endsWith('code = ')) {
                return undefined;
            }

            let aliases = getNames("Alias:");
            aliases.forEach((name) => {
                completionList.items.push(new vscode.CompletionItem(name+"#", vscode.CompletionItemKind.Reference));
            });

            return completionList;
        }
},
" " // triggered whenever a ' ' is being typed
);


//completion provider for contains rule
vscode.languages.registerCompletionItemProvider( 'fsh',{
    provideCompletionItems(document, position) {
        const completionList = new vscode.CompletionList;

        // get all text until the "position" and check if it reads " contains "
        const linePrefix = document.lineAt(position).text.substr(0, position.character);
        if (!linePrefix.endsWith(' contains ')) {
            return undefined;
        }

        addResources(completionList);

        let extensions = getNames("Extension:");
        extensions.forEach((name) => {
            completionList.items.push(new vscode.CompletionItem(name, vscode.CompletionItemKind.Reference));
        });
        let aliases = getNames("Alias:");
        aliases.forEach((name) => {
            completionList.items.push(new vscode.CompletionItem(name, vscode.CompletionItemKind.Reference));
        });

        return completionList;
    }
},
" " // triggered whenever a ' ' is being typed
);

//completion provider for insert rule
vscode.languages.registerCompletionItemProvider( 'fsh',{
    provideCompletionItems(document, position) {
        const completionList = new vscode.CompletionList;

        // get all text until the "position" and check if it reads "* insert "
        const linePrefix = document.lineAt(position).text.substr(0, position.character);
        if (!linePrefix.endsWith('\t?* insert ')) {
            return undefined;
        }

        let extensions = getNames("RuleSet:");
        extensions.forEach((name) => {
            completionList.items.push(new vscode.CompletionItem(name, vscode.CompletionItemKind.Reference));
        });

        return completionList;
    }
},
" " // triggered whenever a ' ' is being typed
);

//completion provider for binding rule
vscode.languages.registerCompletionItemProvider( 'fsh',{
    provideCompletionItems(document, position) {
        const completionList = new vscode.CompletionList;

        // get all text until the "position" and check if it reads " from "
        const linePrefix = document.lineAt(position).text.substr(0, position.character);
        if (!linePrefix.endsWith(' from ')) {
            return undefined;
        }

        let extensions = getNames("ValueSet:");
        extensions.forEach((name) => {
            completionList.items.push(new vscode.CompletionItem(name, vscode.CompletionItemKind.Reference));
        });
        let aliases = getNames("Alias:");
        aliases.forEach((name) => {
            completionList.items.push(new vscode.CompletionItem(name, vscode.CompletionItemKind.Reference));
        });

        completionList.items.push(new vscode.CompletionItem('valueset', vscode.CompletionItemKind.Text));
        completionList.items.push(new vscode.CompletionItem('system', vscode.CompletionItemKind.Text));

        return completionList;
    }
},
" " // triggered whenever a ' ' is being typed
);

//completion provider for type rule
vscode.languages.registerCompletionItemProvider( 'fsh',{
    provideCompletionItems(document, position) {
        const completionList = new vscode.CompletionList;

        // get all text until the "position" and check if it reads " only "
        const linePrefix = document.lineAt(position).text.substr(0, position.character);
        if (!linePrefix.endsWith(' only ')) {
            return undefined;
        }

        completionList.items.push(new vscode.CompletionItem('Reference', vscode.CompletionItemKind.Text));
        addDataTypes(completionList)

        return completionList;
    }
},
" " // triggered whenever a ' ' is being typed
);


/**
 * different completion providers for RuleSet
 */
//completion provider for include ruleset
 vscode.languages.registerCompletionItemProvider( 'fsh',{
    provideCompletionItems(document, position) {
        const completionList = new vscode.CompletionList;

        // get all text until the "position" and check if it reads " include "
        const linePrefix = document.lineAt(position).text.substr(0, position.character);
        if (!linePrefix.endsWith(' include ')) {
            return undefined;
        }

        completionList.items.push(new vscode.CompletionItem('codes from valueset', vscode.CompletionItemKind.Text));
        completionList.items.push(new vscode.CompletionItem('codes from system', vscode.CompletionItemKind.Text));

        let aliases = getNames("Alias:");
        aliases.forEach((name) => {
            completionList.items.push(new vscode.CompletionItem(name, vscode.CompletionItemKind.Reference));
        });


        return completionList;
    }
},
" " // triggered whenever a ' ' is being typed
);

//completion provider for exclude ruleset
vscode.languages.registerCompletionItemProvider( 'fsh',{
    provideCompletionItems(document, position) {
        const completionList = new vscode.CompletionList;

        // get all text until the "position" and check if it reads " exclude "
        const linePrefix = document.lineAt(position).text.substr(0, position.character);
        if (!linePrefix.endsWith(' exclude ')) {
            return undefined;
        }

        completionList.items.push(new vscode.CompletionItem('codes from valueset', vscode.CompletionItemKind.Text));
        completionList.items.push(new vscode.CompletionItem('codes from system', vscode.CompletionItemKind.Text));

        let aliases = getNames("Alias:");
        aliases.forEach((name) => {
            completionList.items.push(new vscode.CompletionItem(name, vscode.CompletionItemKind.Reference));
        });


        return completionList;
    }
},
" " // triggered whenever a ' ' is being typed
);

//completion provider for valueset
vscode.languages.registerCompletionItemProvider( 'fsh',{
    provideCompletionItems(document, position) {
        const completionList = new vscode.CompletionList;

        // get all text until the "position" and check if it reads " valueset "
        const linePrefix = document.lineAt(position).text.substr(0, position.character);
        if (!linePrefix.endsWith(' valueset ')) {
            return undefined;
        }

        let extensions = getNames("ValueSet:");
        extensions.forEach((name) => {
            completionList.items.push(new vscode.CompletionItem(name, vscode.CompletionItemKind.Reference));
        });

        return completionList;
    }
},
" " // triggered whenever a ' ' is being typed
);

//completion provider for system
vscode.languages.registerCompletionItemProvider( 'fsh',{
    provideCompletionItems(document, position) {
        const completionList = new vscode.CompletionList;

        // get all text until the "position" and check if it reads " system "
        const linePrefix = document.lineAt(position).text.substr(0, position.character);
        if (!linePrefix.endsWith(' system ')) {
            return undefined;
        }

        let extensions = getNames("CodeSystem:");
        extensions.forEach((name) => {
            completionList.items.push(new vscode.CompletionItem(name, vscode.CompletionItemKind.Reference));
        });

        return completionList;
    }
},
" " // triggered whenever a ' ' is being typed
);


//completion provider for named
vscode.languages.registerCompletionItemProvider( 'fsh',{
    provideCompletionItems(document, position) {
        const completionList = new vscode.CompletionList;

        // get all text until the "position" and check if it reads " named "
        const linePrefix = document.lineAt(position).text.substr(0, position.character);
        if (!linePrefix.endsWith(' named ')) {
            return undefined;
        }

        const line = document.lineAt(position).text.split(/\s/);
        completionList.items.push(new vscode.CompletionItem(line[line.length-3], vscode.CompletionItemKind.Text));

        return completionList;
    }
},
" " // triggered whenever a ' ' is being typed
);

//completion provider for CARD with 0
vscode.languages.registerCompletionItemProvider( 'fsh',{
    provideCompletionItems(document, position) {
        const completionList = new vscode.CompletionList;

        // get all text until the "position" and check if it reads " 0 "
        const linePrefix = document.lineAt(position).text.substr(0, position.character);
        if (!linePrefix.endsWith(' 0')) {
            return undefined;
        }

        completionList.items.push(new vscode.CompletionItem('0..0', vscode.CompletionItemKind.Text));
        completionList.items.push(new vscode.CompletionItem('0..1', vscode.CompletionItemKind.Text));
        completionList.items.push(new vscode.CompletionItem('0..*', vscode.CompletionItemKind.Text));
        completionList.items.push(new vscode.CompletionItem('0..', vscode.CompletionItemKind.Text));

        return completionList;
    }
},
"0" // triggered whenever a '0' is being typed
);

//completion provider for CARD with 1
vscode.languages.registerCompletionItemProvider( 'fsh',{
    provideCompletionItems(document, position) {
        const completionList = new vscode.CompletionList;

        // get all text until the "position" and check if it reads " 1 "
        const linePrefix = document.lineAt(position).text.substr(0, position.character);
        if (!linePrefix.endsWith(' 1')) {
            return undefined;
        }

        completionList.items.push(new vscode.CompletionItem('1..1', vscode.CompletionItemKind.Text));
        completionList.items.push(new vscode.CompletionItem('1..*', vscode.CompletionItemKind.Text));
        completionList.items.push(new vscode.CompletionItem('1..', vscode.CompletionItemKind.Text));

        return completionList;
    }
},
"1" // triggered whenever a '1' is being typed
);

//completion provider for bracket term
vscode.languages.registerCompletionItemProvider( 'fsh',{
    provideCompletionItems(document, position) {
        const completionList = new vscode.CompletionList;

        // get all text until the "position" and check if it reads " ("
        const linePrefix = document.lineAt(position).text.substr(0, position.character);
        if (!linePrefix.endsWith(' (')) {
            return undefined;
        }

        completionList.items.push(new vscode.CompletionItem('example', vscode.CompletionItemKind.Text));
        completionList.items.push(new vscode.CompletionItem('prefered', vscode.CompletionItemKind.Text));
        completionList.items.push(new vscode.CompletionItem('extensible', vscode.CompletionItemKind.Text));
        completionList.items.push(new vscode.CompletionItem('required', vscode.CompletionItemKind.Text));
        completionList.items.push(new vscode.CompletionItem('exactly', vscode.CompletionItemKind.Text));

        return completionList;
    }
},
"(" // triggered whenever a '(' is being typed
);

//completion provider for bracket term
vscode.languages.registerCompletionItemProvider( 'fsh',{
    provideCompletionItems(document, position) {
        const completionList = new vscode.CompletionList;

        //get all text until the "position" and check if it reads " ["
        const linePrefix = document.lineAt(position).text.substr(0, position.character);
        if (!linePrefix.endsWith('[')) {
            return undefined;
        }


        //include the extension rule provider here
        if (linePrefix.endsWith('extension[')) {
            addResources(completionList);

            let extensions = getNames("Extension:");
            extensions.forEach((name) => {
                completionList.items.push(new vscode.CompletionItem(name, vscode.CompletionItemKind.Reference));
            });
        }

        //get all rule Lines
        let pos = position;
        let line = document.lineAt(position);
        //difference between ruleLines and commentLines for include step (search the word)
        let ruleLine = line.text.trim()[0] == "*";
        let commentLine = line.text.trim()[0] == "/";
        let allowedLinetype = ruleLine || commentLine;
        let importantLines = [];

        //TODO: maybe change while to do while loop
        while (pos.line >= 0 && allowedLinetype){
            pos = new vscode.Position(pos.line-1,0);
            line = document.lineAt(pos);
            ruleLine = line.text.trim()[0] == "*";
            commentLine = line.text.trim()[0] == "/";
            allowedLinetype = ruleLine || commentLine;

            if (ruleLine) importantLines.push(line.text.trim().split(/\s/));
        }

        //get the word bevor the bracket and return undefined if there is no one
        const splitedline = linePrefix.split(/\s/);
        let importantWord = splitedline[splitedline.length-1];
        importantWord = importantWord.substr(0, importantWord.length-1);
        if (importantWord.length <= 0) {
            return undefined;
        }

        //continue if the word bevor the brackets and if the word "contains" is in a rule above
        let isIn = false;
        let importantLine = [];
        importantLines.forEach(line => {
            if (line.includes("contains") && line.includes(importantWord)){
                isIn = true;
                importantLine = line;
            }
        })
        if (isIn == false){
            return undefined;
        }

        //get all the contains for the completionList
        //IMPORTANT: this completion presupposes that the syntax is correct
        let possibleCompletions = [];
        let previousWord = "";
        importantLine.forEach(word => {
            if (previousWord == "contains" || previousWord == "and") possibleCompletions.push(word);
            previousWord = word;
        })

        possibleCompletions.forEach(completion => {
            completionList.items.push(new vscode.CompletionItem(completion, vscode.CompletionItemKind.Text))
        })


        return completionList;
    }
},
"[" // triggered whenever a '[' is being typed
);



//completion provider for extension rule
vscode.languages.registerCompletionItemProvider( 'fsh',{
    provideCompletionItems(document, position) {
        const completionList = new vscode.CompletionList;

        // get all text until the "position" and check if it reads "extension["
        const linePrefix = document.lineAt(position).text.substr(0, position.character);
        if (!linePrefix.endsWith('extension[')) {
            return undefined;
        }

        addResources(completionList);

        let extensions = getNames("Extension:");
        extensions.forEach((name) => {
            completionList.items.push(new vscode.CompletionItem(name, vscode.CompletionItemKind.Reference));
        });

        return completionList;
    }
},
"[" // triggered whenever a '[' is being typed
);


//completion provider for equals sign
vscode.languages.registerCompletionItemProvider( 'fsh',{
    provideCompletionItems(document, position) {
        const completionList = new vscode.CompletionList;

        // get all text until the "position" and check if it reads " = "
        const linePrefix = document.lineAt(position).text.substr(0, position.character);
        if (!linePrefix.endsWith(' = ')) {
            return undefined;
        }

        const string = new vscode.CompletionItem('""', vscode.CompletionItemKind.Text);
        string.insertText = new vscode.SnippetString('"$1"');
        completionList.items.push(string);

        completionList.items.push(new vscode.CompletionItem('#', vscode.CompletionItemKind.Text));
        completionList.items.push(new vscode.CompletionItem('true', vscode.CompletionItemKind.Text));
        completionList.items.push(new vscode.CompletionItem('false', vscode.CompletionItemKind.Text));


        return completionList;
    }
},
" " // triggered whenever a ' ' is being typed
);

/**
 * returns the namevalues ​​of the pattern from open fsh files
 * @param {String} pattern
 */
function getNames(pattern){
    //restriction on which types of patterns the function can be processed
    if (pattern != "Profile:" && pattern != "Extension:"
        && pattern != "RuleSet:" && pattern != "ValueSet:"
        && pattern != "Invariant:" && pattern != "CodeSystem:"
        && pattern != "Alias:"){
        return undefined;
    }
    let names = [];
    let documents = vscode.workspace.textDocuments;
    documents.forEach((d) => {
        names = names.concat(getNamesOfFile(pattern, d))
    });
    return names;
}

/**
 * @param {String} pattern
 * @param {vscode.TextDocument} document
 */
function getNamesOfFile(pattern, document) {
    let names = [];
    let filecontent = document.getText();
    const filelengh = filecontent.length;
    let patternBegin = filecontent.search(pattern);

    while (patternBegin < filelengh && patternBegin >= 0){
        let linenumber = document.positionAt(patternBegin);
        let linecontent = document.lineAt(linenumber.line).text;
        let cleanline = linecontent.trim();

        //remove comments from line
        if(cleanline.indexOf("//") > 0){
            cleanline = cleanline.substr(0,cleanline.indexOf("//"));
            cleanline = cleanline.trim();
        }

        //remove ulr or oid if the pattern is an alias
        if(pattern == "Alias:" && cleanline.indexOf("=") > 0){
            cleanline = cleanline.substr(0,cleanline.indexOf("="));
            cleanline = cleanline.trim();
        }

        let words = cleanline.split(new RegExp("\\s"));

        if (words.length >= 2){
            names.push(words[words.length-1]);
        }
        filecontent = document.getText().substr(patternBegin+1);

        if(filecontent.search(pattern) > 0){
            patternBegin = filecontent.search(pattern)+patternBegin+1;
        }else {
            patternBegin = filecontent.search(pattern);
        }
    }
    return names;
}
