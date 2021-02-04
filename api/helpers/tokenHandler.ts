import * as jwt from 'jsonwebtoken'
import * as Cryptr from 'cryptr'

const key = "shhhhhhh"

const crypter = new Cryptr(key)

export const signToken = (payload) => {
    payload.secrets ? payload.secrets = crypter.encrypt(JSON.stringify(payload.secrets)): 0 ;

    return jwt.sign(payload, key, {algorithm: "HS256", expiresIn: '10d'});
}

export const verifyToken = (token) => {
    try {
        let payload = jwt.verify(token, key, {algorithms: ["HS256"]});
        payload.secrets ? payload.secrets = JSON.parse(crypter.decrypt(payload.secrets)): 0
        
        return {valid: true, payload: payload}
    } catch (err) {
        return {valid: false, payload: null}
    }
}