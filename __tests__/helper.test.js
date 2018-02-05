const assert = require("assert")

const {
    jsonToString,
    getCurrentTime,
    getJson,
    postJson
} = require("../src/shared/libs/helper")

const {
    sendEmail
} = require('../server/utils/sendEmai')

describe('helper tests', function(){

    describe('#jsonToString()', () => {
        const obj = {
            name:"1",
            id:2
        }
        it('json2String', () => {
            assert.deepEqual(
                jsonToString(obj),
                "name=1&id=2"
            );
        })
    });
    describe('#getCurrentTime()', () => {
        it('get string', () => {
            assert(getCurrentTime() !== "")
        })
    });
})