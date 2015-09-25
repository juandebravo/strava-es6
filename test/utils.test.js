const util = require('../dist/utils');
const ass = require('ass-ert');

describe('utils', function () {

  describe('enum', function () {
    const _values = {MONDAY: 0, TUESDAY: 1, WEDNESDAY: 2, THURSDAY: 3, FRIDAY: 4, SATURDAY: 5, SUNDAY: 6};
    const DAYS_OF_WEEK = util.Enum(_values);

    it('should inject the keys in the new object', function () {
      for (var v in _values) {
        ass(DAYS_OF_WEEK[v]).to.equal(_values[v]);
      }
    });

    describe('parse', function () {
      it('should return the key that contains the received value', function () {
        ass(DAYS_OF_WEEK.parse(0)).to.equal('MONDAY');
        ass(DAYS_OF_WEEK.parse(6)).to.equal('SUNDAY');
      });

      it('should return null if no key contains the received value', function () {
        ass(DAYS_OF_WEEK.parse(7)).to.equal(null);
      });
    });

    describe('check', function () {
      it('should return true if the value is valid in the enum', function () {
        for (var i of [0, 1, 2, 3, 4, 5, 6]) {
          ass(DAYS_OF_WEEK.check(i)).to.be.true;
        }
      });

      it('should return false if the value is NOT valid in the enum', function () {
        for (var i of [-1, '0', 7, null, undefined]) {
          ass(DAYS_OF_WEEK.check(i)).to.be.false;
        }
      });
    });

    describe('assert', function () {
      it('should return the received value if the value is valid in the enum', function () {
        ass(DAYS_OF_WEEK.assert(0)).to.equal(0);
      });

      it('should raise Error if the received value is NOT valid in the enum', function () {
        ass(function () {
          DAYS_OF_WEEK.assert(-1);
        }).raises(Error);
      });
    });

  });

});
