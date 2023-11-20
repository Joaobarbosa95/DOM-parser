const example = `<!DOCTYPE html>
<html>
    <head></head>
    <body>
        <p>Hello</p>
    </body>
</html>
`

const TOKEN_TYPE = {
             OPEN: 0,
            CLOSE: 1,
        DOC_START: 2,
      CLOSE_START: 3,
              EOF: 4,
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
            scanToken()
        }

        tokens.push(new Token(TOKEN_TYPE.EOF, "", null, this.line))
        return this.tokens
    }

    isAtEnd() {
        return this.current >= this.source.length
    }

    scanToken() {
        let c = advance()

        switch(c) {
            case "<": {
                if(this.match("!")) {
                    this.addToken(TOKEN_TYPE.DOC_START)
                    break
                } else if(this.match("/")) {
                    this.addToken(TOKEN_TYPE.CLOSE_START)
                    break
                } else {
                    this.addToken(TOKEN_TYPE.OPEN)
                    break
                }
            }
            case ">": this.addToken(TOKEN_TYPE.GREATER_THAN); break
            default: console.log("SCAN ERROR AT LINE %i", this.line); break
        }
    }

    add(type, literal) {
        let text = this.source.substring(this.start, this.current)
        tokens.push(new Token({
            type: type,
            lexeme: text,
            literal: literal,
            line: this.line
        }))
    }

    addToken(type) {
        add(type, null) 
    }

    advance() {
        this.source.charAt(this.current++)
    }

    match(expected) {
        if(isAtEnd()) return false
        if(this.source.charAt(this.current) != expected) return false

        this.current++
        return true
    }
}





