class PriceMissingError extends Error {
    constructor() {
      super('O campo price é obrigatório');
      this.name = 'ValidationError';
      this.statusCode = 400;
    }
}

module.exports = PriceMissingError