import { CosmosClient } from "@azure/cosmos";
import { match } from "assert";
import { sign } from "crypto";
import { hashPass, comparePass } from '../helpers/hashHandler';
import { signToken, verifyToken } from '../helpers/tokenHandler'
import { validateLogin, validateRegister} from '../helpers/validationHandler'

// Set connection string from CONNECTION_STRING value in local.settings.json
const CONNECTION_STRING = process.env.CONNECTION_STRING;


const userService = {
  init() {
    try {
      this.client = new CosmosClient(CONNECTION_STRING);
      this.database = this.client.database("eksaminator");
      this.container = this.database.container("users");
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
      return {status: "success"}
    } else {
      return {status: "conflict", msg: "An account with that username or email already exist"}
    }
  },
  async getAuthToken(userInput: {email: string, password: string}) {
    console.log(userInput)
    const userMatchResults = await this.matchUserInDB({email: userInput.email}, {returnResource: true})

    if (userMatchResults.matchFound) {
      let userMatch = userMatchResults.resources[0]

      // check hash
      let hashMatch = comparePass(userInput.password, userMatch.password)

      // generate token
      if (hashMatch) {
        let payload = {
         username: userMatch.username,
         secrets: {
           nice: "nice"
         }
        }
        
        let JWT = await signToken(payload)

        return { status: "success", msg: JWT} //TODO: format correctly
      } else {
        console.log("Wrong password")
        return {status: "forbidden", msg: "Wrong email or password"}
      }
    } else {
      console.log("Wrong email")
      return {status: "forbidden", msg: "Wrong email or password"}
    }
  },
};

userService.init();

export default userService;
