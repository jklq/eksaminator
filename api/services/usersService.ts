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
    } catch (err) {
      console.log(err.message);
    }
  },
  async matchUser(search: {email?, username?} | any , options: {returnResource: boolean} = {returnResource: false}) {
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
  async create(user: {username: string, email: string, password: any}) {
    const isUsernameTaken = await this.matchUser({username: user.username, email: user.email})

    if (!isUsernameTaken) {
      user.password = await hashPass(user.password)

      const { resource } = await this.container.items.create(user);
      return {
        status: 200,
        body: "success"
      };
    } else {
      return {
        status: 200,
        body: "username-or-email-taken"
      };
    }
  },
  async register(userInput: {username: string, email: string, password: any}) {
    const valid = validateUser(userInput.email, userInput.password) && validateUsername(userInput.username)
    let response

    if (!valid) {
      return "invalid-input"
    } else {
      const result = await this.userService.create({username: userInput.username, email: userInput.email, password: userInput.password})
      return result
    }
  },
  async getAuthToken(inputtedEmail: string, inputtedPassword: string) {
    const userMatcher = await this.matchUser(inputtedEmail, {emailMode: true, returnResource: true})

    if (userMatcher.matchFound) {
      let userMach = userMatcher.resources[0]

      // check hash
      let hashMatch = comparePass(inputtedPassword, userMach.password)

      // generate token
      if (hashMatch) {
        let payload = {
         username: userMach.username 
        }
        
        let JWT = await signToken(payload)
        return JWT
      } else {
        return {
          status: 403,
          body: "Credentials provided are incorrect."
        }
      }
    } else {
      return {
        status: 403,
        body: "Credentials provided are incorrect."
      }
    }
  },
  async read(): Promise<string> {
    const iterator = this.container.items.readAll();
    const { resources } = await iterator.fetchAll();
    return JSON.stringify(resources);
  },
  async update(product) {
    const { resource } = await this.container.item(
      product.id,
      product.brand.name,
    )
      .replace(product);
    return resource;
  },
  async delete(id, brandName) {
    const result = await this.container.item(id, brandName).delete();
  },
};

userService.init();

export default userService;
