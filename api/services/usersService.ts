import { CosmosClient } from "@azure/cosmos";
import { match } from "assert";
import { hashPass } from '../helpers/hasher'; 

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
  async matchUsername(username) {
    console.log("username: " + username)
    const resource = await this.container.items
    .query({
      query: "SELECT * FROM c WHERE c.username = @username",
      parameters: [{ name: "@username", value: username}]
    })
    .fetchAll()

    if (resource.resources.length === 0) {
        return false
     } else {
        return true
    }
  },
  async create(user: {username: string, email: string, password: any}) {
    const isUsernameTaken = await this.matchUsername(user.username)

    if (!isUsernameTaken) {
      user.password = await hashPass(user.password)

      const { resource } = await this.container.items.create(user);
      return "success";
    } else {
      return "username-taken";
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
