import * as jwt from 'jsonwebtoken'
import * as Cryptr from 'cryptr'

const crypter = new Cryptr("shhhhh")

export const signToken = (payload) => {
    payload.secrets ? payload.secrets = crypter.encrypt(JSON.stringify(payload.secrets)): 0 ;

    return jwt.sign(payload, 'shhhhh', {algorithm: "HS512", expiresIn: '10d'});
}

export const verifyToken = (token) => {
    try {
        let payload = jwt.verify(token, 'shhhhh', {algorithms: ["HS512"]});
        //payload.secrets ? payload.secrets = JSON.parse(crypter.decrypt(payload.secrets)): 0
        return {valid: true, payload: payload}
    } catch (err) {
        return {valid: false, payload: null}
    }
}