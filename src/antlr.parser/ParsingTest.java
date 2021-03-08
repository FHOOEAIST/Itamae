package antlr.parser;

import java.io.IOException;

import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.CharStreams;
import org.antlr.v4.runtime.*;

import antlr.parser.FSHParser.DocContext;

class ParsingTest{

    public static void main(String[] args){
        parseWithFile(args);
        parseWithString();
    }

    private static void parseWithFile(String[] args){
        if(args.length != 1){
            System.err.print("Usage: path name");
        }else{
            String pathName = args[0];
            FSHParser parser = null;

            try{
                CharStream input = CharStreams.fromFileName(pathName);
                FSHLexer lexer = new FSHLexer(input);
                CommonTokenStream tokens = new CommonTokenStream(lexer);
                parser = new FSHParser(tokens);

            }catch (IOException e){
                e.printStackTrace();
            }

            //parse from the start symbol 'doc'
            try{
                DocContext context = parser.doc();
            }catch(RecognitionException e){
                e.printStackTrace();
            }
        }
    }

    private static void parseWithString(){
        CharStream input = CharStreams.fromString("Alias: HL7V2 = http://hl7.org/fhir/v2/0203");
        FSHLexer lexer = new FSHLexer(input);
        CommonTokenStream tokens = new CommonTokenStream(lexer);
        FSHParser parser = new FSHParser(tokens);

        //parse from the start symbol 'doc'
        DocContext context = parser.doc();

    }

}