import userService from '../services/usersService'

const handleUserCreationResponse = (ctx, next, response) => {
    if (response.status === "success") {
        next()
    } else if (response.status === "conflict") {
        ctx.res = {
            body: "Conflict: Username or email taken",
            status: 409
        }
        ctx.done()
    } else {
        ctx.done(null, {status: 500})
    }
}

const createUser = async (ctx, next) => {
    const username = ctx.req.query.username
    const password = ctx.req.query.password
    const email = ctx.req.query.email
    
    const response = await userService.createUser({username: username, password: password, email: email})
    
    handleUserCreationResponse(ctx, next, response)
}

export default createUser