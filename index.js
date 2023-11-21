const example = `<!DOCTYPE html>
<html>
    <head></head>
    <body>
        <p id="msg">Hello</p>
        <img src="/image.png" />
    </body>
</html>
`

const TOKEN_TYPE = {
            EOF: 0,
       DOC_OPEN: 1,
           OPEN: 2,
          CLOSE: 3,
     OPEN_CLOSE: 4,
 SELF_CLOSE_TAG: 5,
         STRING: 6,
}

class Token {
    constructor({ type, lexeme, literal, line }) {
        this.type = type
        this.lexeme = lexeme
        this.literal = literal
        this.line = line
    }

    toString() {
        return this.type + " " + this.lexeme + " " + this.literal
    }
}

class Scanner {
    source = null
    tokens = []
    start = 0
    current = 0
    line = 1

    constructor(source) {
        this.source = source
    }

    scanTokens() {
        while(!this.isAtEnd()) {
            this.start = this.current
            this.scanToken()
        }

        this.tokens.push(new Token({
            type: TOKEN_TYPE.EOF,
            lexeme: "", 
            literal: null,
            line: this.line
        }))

        return this.tokens
    }

    isAtEnd() {
        return this.current >= this.source.length
    }

    scanToken() {
        let c = this.advance()

        switch(c) {
            case "<": {
                if(this.match("!")) {
                    this.addToken(TOKEN_TYPE.DOC_OPEN)
                    this.start += 2
                } else if(this.match("/")) {
                    this.addToken(TOKEN_TYPE.OPEN_CLOSE)
                    this.start += 2
                } else {
                    this.addToken(TOKEN_TYPE.OPEN)
                    this.start++
                }

                this.getTag()

                break
            }
            case "/": {
                if(this.match(">")) {
                    this.addToken(TOKEN_TYPE.SELF_CLOSE_TAG)
                    break
                }
            }
            case ">": this.addToken(TOKEN_TYPE.CLOSE); break;
            case "\n": this.line++; break;
            default: {
                //console.log("SCAN ERROR AT LINE %i", this.line); break
            }
        }
    }

    add(type, literal) {
        let text = this.source.substring(this.start, this.current)
        this.tokens.push(new Token({
            type: type,
            lexeme: text,
            literal: literal,
            line: this.line
        }))
    }

    addToken(type) {
        this.add(type, null) 
    }

    advance() {
        return this.source.charAt(this.current++)
    }

    match(expected) {
        if(this.isAtEnd()) return false
        if(this.source.charAt(this.current) != expected) return false

        this.current++
        return true
    }

    getTag() {
        while(this.advance() !== ">") {}

        if(this.source.charAt(this.current - 2) === "/") {
            this.current -= 2
        } else {
            this.current--
        }

        this.add(TOKEN_TYPE.STRING, null) 
    }
}

const scanner = new Scanner(example)

const tokens = scanner.scanTokens()

console.log(tokens)
