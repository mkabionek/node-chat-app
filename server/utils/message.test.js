var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = "michal";
        var text = "sample message";
        var message = generateMessage(from, text);

       expect(message.createdAt).toBe.number;
       expect(message).toInclude({ text: text });
    });
});