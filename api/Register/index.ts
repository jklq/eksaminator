import * as MiddlewareHandler from 'azure-func-middleware'
import { validateRegister } from "../helpers/validationHandler";
import createUser from '../controllers/createUser'
import getAuthToken from '../controllers/getAuthToken'
// const { someFunctionHandler } = require('./handlers');

const Register = new MiddlewareHandler()
    .use(validateRegister)
    .use(createUser)
    .use(getAuthToken)
    .catch((err, ctx, next) => {
        ctx.done(null, { status: 500 });
    })
    .listen();
   
export default Register;