import ValidationError from "../errors/ValidationError.js";

const validate = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);

        if(!result.success) {
            const errors = result.error.issues.map((issue) => ({
                field: issue.path[0],
                message: issue.message
            }));

            throw new ValidationError(errors);
        }
        req.body = result.data;
        next();
    };
};

export default validate;