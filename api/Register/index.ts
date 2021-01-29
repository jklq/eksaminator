import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { validateUser, validateUsername} from '../helpers/validateUser'
import userService from '../services/usersService'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    let response
    try {
        const queryUsername = req.query.username || "."
        const queryPassword = req.query.password || "."
        const queryEmail = req.query.email || "."
        const valid = validateUser(queryEmail, queryPassword) && validateUsername(queryUsername)

        if (!valid) {
            response = {
                status: 400,
                body: "Invalid input"
            }
        } else {
            const result = await userService.create({username: queryUsername, email: queryEmail, password: queryPassword})
            response = {
                status: 200,
                body: result
            }
        }
    } catch(err) {
        response = {
            status: 500,
            body: "HTTP Error 500: An unexpected condition was encountered while the server was attempting to fulfil the request."
        }
    }
};

export default httpTrigger;