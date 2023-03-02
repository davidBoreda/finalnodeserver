class ResponseError {
  origin;
  details;
  constructor(origin, details) {
    this.origin = origin;
    this.details = details;
  }
}

module.exports = ResponseError;
