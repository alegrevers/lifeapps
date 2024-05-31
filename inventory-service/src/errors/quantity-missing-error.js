class QuantityMissingError extends Error {
    constructor() {
      super('O campo quantity é obrigatório');
      this.name = 'ValidationError';
      this.statusCode = 400;
    }
}

module.exports = QuantityMissingError