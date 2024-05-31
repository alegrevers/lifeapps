class InvalidIdError extends Error {
  constructor() {
    super('Id inválido');
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

module.exports = InvalidIdError