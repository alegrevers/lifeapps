class ProductIdMissingError extends Error {
    constructor() {
      super('O campo _id de product é obrigatório');
      this.name = 'ValidationError';
      this.statusCode = 400;
    }
}

module.exports = ProductIdMissingError