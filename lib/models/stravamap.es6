/*jshint esnext: true */

export class StravaMap {

  constructor (id, summary_polyline, resource_state) {
    this.id = id;
    this.summary_polyline = summary_polyline;
    this.resource_state = resource_state;
  }

  // A class cannot include only the constructor:
  // https://code.google.com/p/v8/issues/detail?id=4450
  static fromStrava(data) {
    // TODO
  };
}
