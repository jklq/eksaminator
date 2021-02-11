import validator from 'validator'

const validationError = (ctx) => {
    ctx.res = {
        body: "Invalid Credentials",
        status: 422
    }
    ctx.done()
} 
const handleValidBooleon = (ctx, next, valid) => {
    if (valid) {
       next() 
    } else {
        validationError(ctx)
    }
}

export const validateLogin = async (ctx, next) => {
    const email = ctx.req.query.email || "."
    const password = ctx.req.query.password || "."
    const valid = validator.isEmail(email) &&
        validator.isLength(password, {max: 35}) &&
        validator.isStrongPassword(password, {minSymbols: 0, maxLength: 30})
        
    handleValidBooleon(ctx, next, valid) 
}

export const validateRegister = (ctx, next) => {
    const username = ctx.req.query.username
    const valid = exports.validateLogin(ctx) && 
        validator.matches(username, '^(?=[a-zA-Z0-9._\-]{3,20}$)(?!.*[-.]{2})[^_.].*[^_.]$', 'i')

    handleValidBooleon(ctx, next, valid)
}
