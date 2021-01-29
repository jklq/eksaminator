import bcrypt = require("bcrypt");
const saltRounds = 10;

export const hashPass = async (plaintextPassword) => {
    return bcrypt.hashSync(plaintextPassword, saltRounds)
}

export const comparePass = (plaintextPassword: string, hash: string) => {
    return bcrypt.compareSync(plaintextPassword, hash)
}
