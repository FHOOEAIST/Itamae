# Itamae

Itamae is a [Visual Studio Code](https://code.visualstudio.com/) 
[Plugin](https://code.visualstudio.com/docs/editor/extension-gallery) to edit 
[HL7® FHIR® Shorthand](http://hl7.org/fhir/uv/shorthand/STU1/). Currently, it supports the STU1 version of Shorthand. 
It's core features are: 

- Codestyling
- Autocomplete
- Syntax Checking

The project is not yet published as extension to VS Code, so you have to install it manually. Feature requests and 
suggestions are welcome, as are your contributions ;)

## Getting Started

### Install
#### receiving a vsix file:
Type in command prompt: code --install-extension fsh-editor-0.0.4.vsix

#### no vsix file:
To load an extension, you need to copy the files to your VS Code extensions folder .vscode/extensions. 

Depending on your platform, it is located in the following folders:
* Windows %USERPROFILE%\.vscode\extensions
* macOS ~/.vscode/extensions
* Linux ~/.vscode/extensions


### Activate
The editor will start automatically, if the language fsh is identified

### Features
#### Codestyling 
Different coloring for declaration keywords, additional keyword, comments, and todos.

[Used Keywords](https://build.fhir.org/ig/HL7/fhir-shorthand/reference.html#defining-items)


#### Known "Bugs"
These bugs will be fixed in the future:
* there has to be two lines between entities for the coloring to work properly, if the previous one has a line 
comment at the end
* coloring/scope isn't right for usage & severity (all instances with CODE), only if a correct syntax is typed the 
coloring is correct, but the lines underneath are not colored correct
* Todos must have a space or text after the keyword, otherwise the next line is also marked as a todo

#### Colortheme
Right now there is only a dark colortheme available.
*Maybe expand in the future.*

### Autocomplete
Structure of the language server is based on [vsCode LSP sample](https://code.visualstudio.com/api/language-extensions/language-server-extension-guide#lsp-sample-a-simple-language-server-for-plain-text-files)


Completion provider is based on [vsCode extension samples](https://github.com/microsoft/vscode-extension-samples)

Snippets were used for the autocompletion of the entities (CodeSystem, Extension, Instance, Invariant, Mapping, Profile, 
RuleSet, ValueSet). The autocompletion of the additional keywords and other smaller words for defining rules are handled 
by the completion provider.

#### Activation
* Each fsh file has to be clicked once to connected them to the workspace, then the profiles,extensions and other 
structures will be suggested if you need to reference one

#### Known "Bugs"
These bugs will be fixed in the future:


### SyntaxChecking
A lexer created by the lexer generator [moo](https://github.com/no-context/moo) splits the whole text in different tokens. 
A parser created by [nearley](https://nearley.js.org/) parses the text and recognizes the grammar. The syntax checking is 
divided into two parts: 1. Metatdata of the entities 2. Rules of the entities. Right now only the first parser is working 
and checking for the correct grammar.

#### Known "Bugs"
These bugs will be fixed in the future:
* only marking the first error they found
##### Metadataparser:
* An entities at the end will only be recognize if there is an empty line at the end of the file
* no support for multiline comments
* no support for multiline strings
##### Ruleparser:
* after a reference "Reference(actualReference)" there are no other characters allowed
* no support for multiline comments
* no support for multiline strings

## FAQ

If you have any questions, please checkout our [FAQ](https://fhooeaist.github.io/seshat/faq.html) section.

## Contributing

**First make sure to read our [general contribution guidelines](https://fhooeaist.github.io/CONTRIBUTING.html).**
   
## Licence

Copyright (c) 2020 the original author or authors.
DO NOT ALTER OR REMOVE COPYRIGHT NOTICES.

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.

## Research

If you are going to use this project as part of a research paper, we would ask you to reference this project by citing
it. TODO zenodo doi
