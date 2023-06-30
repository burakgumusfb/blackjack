const validation = (schema) => (req, res, next) => {
    let error = null;
    if (schema.body) {
        error = schema.body.validate(req.body).error;
    }
    if (!error && schema.params) {
        error = schema.params.validate(req.params).error;
    }
    if (!error && schema.query) {
        error = schema.query.validate(req.query).error;
    }

    const valid = error == null;
    if (valid) {
        next();
    } else {
        const message = error.details.map((i) => i.message).join(',');
        res.status(422).json({ error: message });
    }
};

module.exports = validation;