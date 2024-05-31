class OutOfStockError extends Error {
    constructor() {
      super('Produto sem estoque');
      this.name = 'ValidationError';
      this.statusCode = 400;
    }
}

module.exports = OutOfStockError