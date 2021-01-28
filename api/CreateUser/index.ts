import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import usersService from "../services/usersService";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest,
): Promise<void> {
  let response;

  try {
    const user = req.body;
    // const result = await usersService.create({userId: 1, username: "jklq", email:"mail@seang.xyz"});
    // response = { body: result, status: 200 };
    response = {body: "hello!", status: 200}
  } catch (err) {
    response = { body: err.message, status: 500 };
  }

  context.res = response;
};

export default httpTrigger;