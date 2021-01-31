import { CosmosClient } from "@azure/cosmos";
import { match } from "assert";
import { sign } from "crypto";
import { hashPass, comparePass } from '../helpers/hashHandler';
import { signToken, verifyToken } from '../helpers/tokenHandler'
import { validateUser, validateUsername} from '../helpers/validationHandler'

// Set connection string from CONNECTION_STRING value in local.settings.json
const CONNECTION_STRING = process.env.CONNECTION_STRING;


const userService = {
  init() {
    try {
      this.client = new CosmosClient(CONNECTION_STRING);
      this.database = this.client.database("eksaminator");
      this.container = this.database.container("users");
      this.responses = {
        success: {
          status: 200,
          body: "sucess"
        },
        usernameOrEmailTaken: {
          status: 409,
          body: "username-or-email-taken"
        }, 
        emailOrPasswordWrong: {
          status: 401,
          body: "incorrect-email-or-password"
        },
        invalidInput: {
          status: 422,
          body: "invalid-input"
        },
      }
    } catch (err) {
      console.log(err.message);
    }
  },
  async matchUserInDB(search: {email?, username?} | any , options: {returnResource: boolean} = {returnResource: false}) {
    let queryEmailAndUsername = Object.keys(search).length === 1 ? false : true 
    let query

    if (queryEmailAndUsername) {
      query = {
        query: `SELECT * FROM c WHERE c.username = @username OR c.email = @email`,
        parameters: [
          {name: "@username", value: search.username},
          {name: "@email", value: search.email}
        ]
      }  
    } else {
      let inputType = search.email ? "email" : "username"
      query = {
        query: `SELECT * FROM c WHERE c.${inputType} = @searchItem`,
        parameters: [
          {name: "@searchItem", value: search.email || search.username}
        ]
      }  
    }

    const { resources } = await this.container.items
    .query(query)
    .fetchAll()

    if (resources.length === 0) {
        return options.returnResource ? {matchFound: false, resources: resources} : false
     } else {
        return options.returnResource ? {matchFound: true, resources: resources} : true
    }
  },
  async createUser(user: {username: string, email: string, password: any}) {
    const isUsernameTaken = await this.matchUserInDB({username: user.username, email: user.email})

    if (!isUsernameTaken) {
      user.password = await hashPass(user.password)

      const { resource } = await this.container.items.create(user);
      return this.responses.success
    } else {
      return this.responses.usernameOrEmailTaken
    }
  },
  async register(userInput: {username: string, email: string, password: any}) {
    const valid = validateUser(userInput.email, userInput.password) && validateUsername(userInput.username)
    let response

    if (!valid) {
      return this.responses.invalidInput
    } else {
      const result = await this.createUser({username: userInput.username, email: userInput.email, password: userInput.password})
      return result
    }
  },
  async getAuthToken(userInput: {email: string, password: string}) {
    const userMatchResults = await this.matchUserInDB({email: userInput.email}, {returnResource: true})

    if (userMatchResults.matchFound) {
      let userMatch = userMatchResults.resources[0]

      // check hash
      let hashMatch = comparePass(userInput.password, userMatch.password)

      // generate token
      if (hashMatch) {
        let payload = {
         username: userMatch.username 
        }
        
        let JWT = await signToken(payload)

        return { cookies: [{name: "JWT", value: JWT}], body: JWT }
      } else {
        return this.responses.emailOrPasswordWrong
      }
    } else {
      return this.responses.emailOrPasswordWrong
    }
  },
  async login(userInput: {email: string, password: string}) {
    const valid = validateUser(userInput.email, userInput.password)    
    let response
    
    if (!valid) {
      return this.responses.invalidInput 
    } else {
      const result = await this.getAuthToken({email: userInput.email, password: userInput.password})
      return result
    }
  }
};

userService.init();

export default userService;
