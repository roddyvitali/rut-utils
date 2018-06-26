const expect = require('chai').expect
// const RutUtils = require('..').default
const { IsValid, Calculate, Clean, Format, Digits, Verifier } = require('..')
describe('#rut-utils', function (){
    it("if the rut is valid.", function() {
        const valid = IsValid("2.454.168-1");
        expect(valid).to.equal(true);
    })
    it("if the rut is invalid.", function() {
        const valid = IsValid("2.454.168-8");
        expect(valid).to.equal(false);
    })

    it("Calculate the verifier digit.", function() {
        const calculate = Calculate("2454168");
        const calculate2 = Calculate("2454168-1");
        const calculate3 = Calculate("2.454.168-1");
        const calculate4 = Calculate("2.454.168");
        expect(calculate).to.equal("1");
        expect(calculate2).to.equal("1");
        expect(calculate3).to.equal("1");
        expect(calculate4).to.equal("1");
    })

    it("Clean the invalids characters RUT.", function() {
        const clean = Clean("2.454.168-1");
        expect(clean).to.equal("24541681");
    })

    it("Give Format a RUT with dots.", function() {
        const format = Format("24541681", true);
        expect(format).to.equal("2.454.168-1");
    })

    it("Give Format a RUT without dots.", function() {
        const format = Format("24541681");
        expect(format).to.equal("2454168-1");
    })

    it("Get the number of 8 digits from the RUT.", function() {
        const digits = Digits("24541681");
        const digits2 = Digits("2454168-1");
        const digits3 = Digits("2.454.168-1");
        expect(digits).to.equal("2454168");
        expect(digits2).to.equal("2454168");
        expect(digits3).to.equal("2454168");
    })

    it("Get the verifier digit from the RUT.", function() {
        const verifier = Verifier("24541681");
        const verifier2 = Verifier("2454168-1");
        const verifier3 = Verifier("2.454.168-1");
        expect(verifier).to.equal("1");
        expect(verifier2).to.equal("1");
        expect(verifier3).to.equal("1");
    })
});