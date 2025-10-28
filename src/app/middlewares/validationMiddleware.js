import { ApiError } from '../../utils/apiResponse.js';
export const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const errors = error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message
            }));

            throw new ApiError(400, 'Validation error', errors);
        }

        next();
    };
};