import * as MiddlewareHandler from 'azure-func-middleware'
import { validateLogin } from "../helpers/validationHandler";
import getAuthToken from '../controllers/getAuthToken'
// const { someFunctionHandler } = require('./handlers');

const Login = new MiddlewareHandler()
    .use(validateLogin)
    .use(getAuthToken)
    .catch((err, ctx) => {
        ctx.done(err)
    })
    .listen();
   
export default Login;