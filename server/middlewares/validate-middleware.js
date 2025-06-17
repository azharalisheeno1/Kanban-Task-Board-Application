const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
    return res.status(400).json({
      message: 'Validation Error',
      errors: err.errors.map(e => ({ path: e.path[0], message: e.message })),
    });
  }
};

module.exports = validate;
