import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { validateUser } from '../helpers/validationHandler'
import userService from '../services/usersService'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
let response
try {
    const queryEmail = req.query.email || "."
    const queryPassword = req.query.password || "."
    const valid = validateUser(queryEmail, queryPassword)

    if (!valid) {
        response = {
            status: 400,
            body: "Invalid input"
        }
    } else {
        const result = await userService.getAuthToken(queryEmail, queryPassword)
        response = {
            status: 200,
            body: result
        }
    }
} catch (err) {
    response = {
        status: 500,
        body: "HTTP Error 500: An unexpected condition was encountered while the server was attempting to fulfil the request."
    }
}
context.res = response
};
export default httpTrigger;