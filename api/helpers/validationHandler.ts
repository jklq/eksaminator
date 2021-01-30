import validator from 'validator'

export const validateUser = (email:string, password: string) => {
    return true &&
        validator.isEmail(email) &&
        validator.isLength(password, {max: 35}) &&
        validator.isStrongPassword(password, {minSymbols: 0, maxLength: 30})
}

export const validateUsername = (username:string) => {
    return validator.matches(username, '^(?=[a-zA-Z0-9._\-]{3,20}$)(?!.*[-.]{2})[^_.].*[^_.]$', 'i')
}
