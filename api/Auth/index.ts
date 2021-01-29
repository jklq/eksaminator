import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const queryUsername = req.query.username
    const queryPassword = req.query.password
    
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: req 
    };

};

export default httpTrigger;