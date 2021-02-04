
import userService from '../services/usersService'

const handleGetTokenResponse = (ctx, next, response) => {
    console.log("here i am = " + JSON.stringify(response))
    if (response.status === "success") {
        ctx.res = {
            body: response.msg,
            status: 200
        }
        ctx.done()
    } else if (response.status === "forbidden") {
        ctx.res = {
            body: "Forbidden: Wrong email or password",
            status: 403
        }
        ctx.done()
    } else {
        ctx.done(null, {status: 500})
    }

}

const createUser = async (ctx, next) => {
    const password = ctx.req.query.password
    const email = ctx.req.query.email
    
    const response = await userService.getAuthToken({password: password, email: email})
    
    handleGetTokenResponse(ctx, next, response)
}

export default createUser