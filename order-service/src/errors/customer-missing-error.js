class CustomerMissingError extends Error {
    constructor() {
      super('O campo customer é obrigatório');
      this.name = 'ValidationError';
      this.statusCode = 400;
    }
}

module.exports = CustomerMissingError