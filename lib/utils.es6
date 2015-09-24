
// Helper to create objects enum-alike
// i.e.
//   let Foo = new Enum({BAR: 0, BAZZ: 1});
class Enum {

  constructor(values) {
    this._values = values;

    // Ensure we can access the enum keys directly
    // i.e.
    //   Foo.BAR -> 0
    for (let v in this._values) {
      this[v] = this._values[v];
    }
  }

  // Return the key associated to a value
  // i.e.
  //   Foo.parse(0) -> BAR
  parse (value) {
    for (let v in this._values) {
      if (this._values[v] === value) {
        return v
      }
    }
    return null;
  }

  // Validates if the received value is valid
  // i.e.
  //   Foo.check(0) -> true
  check (value) {
      return !!this.parse(value);
  }

  // Return the received value if it's one of the enum values
  // Throws an exception otherwise
  // i.e.
  //   Foo.assert(0) -> 0
  //   Foo.assert(2) -> throw Error "Invalid value 2 for the Enum"
  assert (value) {
    if (!this.check(value)) {
        throw new Error(`Invalid value ${value} for the Enum`);
    }
    return value;
  }
}

exports.Enum = Enum;
