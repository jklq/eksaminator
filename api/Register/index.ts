import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import userService from '../services/usersService'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    let response
    try {
        const queryUsername = req.query.username || "."
        const queryPassword = req.query.password || "."
        const queryEmail = req.query.email || "."

        const result = await userService.register({username: queryUsername, email: queryEmail, password: queryPassword})
        response = result 

    } catch(err) {
        response = {
            status: 500,
            body: "HTTP Error 500: An unexpected condition was encountered while the server was attempting to fulfil the request." + err
        }
    }
    context.res = response
};

export default httpTrigger;