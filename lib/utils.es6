
class Enum {
    constructor(values) {
      this._values = values;
      for (let v in this._values) {
        this[v] = this._values[v];
      }
    }

    parse (value) {
      for (let v in this._values) {
        if (this._values[v] === value) {
          return v
        }
      }
      return null;
    }

    check (value) {
        return !!this.parse(value);
    }

    assert (value) {
      if (!this.check(value)) {
          throw new Error(`Invalid value ${value} for the Enum`);
      }
      return value;
    }
}

exports.Enum = Enum;
