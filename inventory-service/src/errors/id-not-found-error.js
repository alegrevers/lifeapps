class IdNotFoundError extends Error {
    constructor() {
      super('Id não encontrado');
      this.name = 'ValidationError';
      this.statusCode = 404;
    }
}

module.exports = IdNotFoundError