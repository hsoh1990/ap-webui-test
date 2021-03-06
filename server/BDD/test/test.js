const should = require('should');
const dashboard = require('../../package/dashboard/dashboard.js');

describe('dashboard function test', () => {
  describe('On success', () => {
    it('바이트수가 1에서 100 사이인가?', function(done) {
      var result = dashboard.i18n_load();
      var string_ = JSON.stringify(result);
      var stringLength = string_.length;
      var stringByteLength = 0;
      stringByteLength = (function(s, b, i, c) {
        for (b = i = 0; c = s.charCodeAt(i++); b += c >> 11 ? 3 : c >> 7 ? 2 : 1);
        return b
      })(string_);
      console.log("byte = " + stringByteLength);
      stringByteLength.should.be.within(1, 100);
      done();
    });

  });
});

// () => 는 function () 로 변경 가능
//TODO sub function test code
