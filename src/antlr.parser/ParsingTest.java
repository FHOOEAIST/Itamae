package antlr.parser;

import java.io.IOException;

import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.CharStreams;
import org.antlr.v4.runtime.*;

import antlr.parser.FSHParser.DocContext;

class ParsingTest{

    public static void main(String[] args){
        if(args.length != 1){
            System.err.print("Usage: path name");
        }else{
            String pathName = args[0];
            FSHParser parser = getParser(pathName);

            //parse from the start symbol 'doc'
            try{
                DocContext context = parser.doc();
            }catch(RecognitionException e){
                e.printStackTrace();
            }

        }
    }

    //when including this in the language server the filename will be took from the information which file had changed
    private static FSHParser getParser(String fileName){
        FSHParser parser = null;

        try{
            CharStream input = CharStreams.fromFileName(fileName);
            FSHLexer lexer = new FSHLexer(input);
            CommonTokenStream tokens = new CommonTokenStream(lexer);
            parser = new FSHParser(tokens);
            
        }catch (IOException e){
            e.printStackTrace();
        }

        return parser;
    }

}