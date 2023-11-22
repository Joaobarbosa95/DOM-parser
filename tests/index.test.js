//const { describe, expect } = require("jest")
const Scanner = require("../index.js")

describe("DOCTYPE tests", () => {
    const tag = `<!DOCTYPE html>`
    const scanner = new Scanner(tag)
    const tokens = scanner.scanTokens()

    test("Scanner", () => {
        expect(tokens[0].lexeme).toBe("<!")
        expect(tokens[1].lexeme).toBe("DOCTYPE html")
        expect(tokens[2].lexeme).toBe(">")
        expect(tokens[3].lexeme).toBe(null)
    })
})

describe("Emtpy tag with no attributes ", () => {
    const tag = `<p></p>`
    const scanner = new Scanner(tag)
    const tokens = scanner.scanTokens()

    test("Scanner", () => {
        expect(tokens[0].lexeme).toBe("<")
        expect(tokens[1].lexeme).toBe("p")
        expect(tokens[2].lexeme).toBe(">")
        expect(tokens[3].lexeme).toBe("</")
        expect(tokens[4].lexeme).toBe("p")
        expect(tokens[5].lexeme).toBe(">")
        expect(tokens[6].lexeme).toBe(null)
    })
})

describe("Empty tag with attributes", () => {
    const tag = `<p id="confirmation"></p>`
    const scanner = new Scanner(tag)
    const tokens = scanner.scanTokens()

    test("Scanner", () => {
        expect(tokens[0].lexeme).toBe("<")
        expect(tokens[1].lexeme).toBe("p id=\"confirmation\"")
        expect(tokens[2].lexeme).toBe(">")
        expect(tokens[3].lexeme).toBe("</")
        expect(tokens[4].lexeme).toBe("p")
        expect(tokens[5].lexeme).toBe(">")
        expect(tokens[6].lexeme).toBe(null)
    })
})

describe("Tag with attributes", () => {
    const tag = `<p id="confirmation">Content from paragraph</p>`
    const scanner = new Scanner(tag)
    const tokens = scanner.scanTokens()

    test("Scanner", () => {
        expect(tokens[0].lexeme).toBe("<")
        expect(tokens[1].lexeme).toBe("p id=\"confirmation\"")
        expect(tokens[2].lexeme).toBe(">")
        expect(tokens[3].lexeme).toBe("Content from paragraph")
        expect(tokens[4].lexeme).toBe("</")
        expect(tokens[5].lexeme).toBe("p")
        expect(tokens[6].lexeme).toBe(">")
        expect(tokens[7].lexeme).toBe(null)
    })
})

describe("Self closing tag with no attributes", () => {
    const tag = `<img />`
    const scanner = new Scanner(tag)
    const tokens = scanner.scanTokens()

    test("Scanner", () => {
        expect(tokens[0].lexeme).toBe("<")
        expect(tokens[1].lexeme).toBe("img ")
        expect(tokens[2].lexeme).toBe("/>")
        expect(tokens[3].lexeme).toBe(null)
    })
})

describe("Self closing tag with attributes", () => {
    const tag = `<img src="" id="image"/>`
    const scanner = new Scanner(tag)
    const tokens = scanner.scanTokens()

    test("Scanner", () => {
        expect(tokens[0].lexeme).toBe("<")
        expect(tokens[1].lexeme).toBe("img src=\"\" id=\"image\"")
        expect(tokens[2].lexeme).toBe("/>")
        expect(tokens[3].lexeme).toBe(null)
    })
})

describe("Basic DOM tree", () => {
    test("Scans tokens correctly", () => {
        const html = `<!DOCTYPE html>
        <html>
            <head></head>
            <body>
                <p id="msg">Hello</p>
                <img src="/image.png" />
            </body>
        </html>`

        const scanner = new Scanner(html)
        const tokens = scanner.scanTokens()

        expect(tokens.length).toBe(32)

        expect(tokens[0].lexeme).toBe("<!")
        expect(tokens[1].lexeme).toBe("DOCTYPE html")
        expect(tokens[2].lexeme).toBe(">")
        expect(tokens[3].lexeme).toBe("<")
        expect(tokens[4].lexeme).toBe("html")
        expect(tokens[5].lexeme).toBe(">")

        expect(tokens[6].lexeme).toBe("<")
        expect(tokens[7].lexeme).toBe("head")
        expect(tokens[8].lexeme).toBe(">")
        expect(tokens[9].lexeme).toBe("</")
        expect(tokens[10].lexeme).toBe("head")
        expect(tokens[11].lexeme).toBe(">")

        expect(tokens[12].lexeme).toBe("<")
        expect(tokens[13].lexeme).toBe("body")
        expect(tokens[14].lexeme).toBe(">")
        expect(tokens[15].lexeme).toBe("<")
        expect(tokens[16].lexeme).toBe("p id=\"msg\"")
        expect(tokens[17].lexeme).toBe(">")
        expect(tokens[18].lexeme).toBe("Hello")
        expect(tokens[19].lexeme).toBe("</")
        expect(tokens[20].lexeme).toBe("p")
        expect(tokens[21].lexeme).toBe(">")
        expect(tokens[22].lexeme).toBe("<")
        expect(tokens[23].lexeme).toBe("img src=\"/image.png\" ")
        expect(tokens[24].lexeme).toBe("/>")
        expect(tokens[25].lexeme).toBe("</")
        expect(tokens[26].lexeme).toBe("body")
        expect(tokens[27].lexeme).toBe(">")

        expect(tokens[28].lexeme).toBe("</")
        expect(tokens[29].lexeme).toBe("html")
        expect(tokens[30].lexeme).toBe(">")
        expect(tokens[31].lexeme).toBe(null)

    })

    test("Ignores initial and ending white space", () => {
        const html = ` 
            <!DOCTYPE html>
        <html>
            <head></head>
            <body>
                <p id="msg">Hello</p>
                <img src="/image.png" />
            </body>
        </html> `

        const scanner = new Scanner(html)
        const tokens = scanner.scanTokens()

        expect(tokens[0].lexeme).not.toBe(" ") 
        expect(tokens[tokens.length - 1].lexeme).not.toBe(" ") 
    })
})
