import { ErrorListener } from '../node_modules/antlr4/src/antlr4/error/ErrorListener';

export default class TestErrorListener extends ErrorListener {
	syntaxError(recognizer, offendingSymbol, line, column, msg, e) {
		throw new SyntaxError("line " + line + ":" + column + " " + msg);
    }
}

