class ProductMissingError extends Error {
    constructor() {
      super('O campo product é obrigatório');
      this.name = 'ValidationError';
      this.statusCode = 400;
    }
}

module.exports = ProductMissingError