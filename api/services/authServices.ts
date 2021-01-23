
import { CosmosClient } from "@azure/cosmos";

// Set connection string from CONNECTION_STRING value in local.settings.json
const CONNECTION_STRING = process.env.CONNECTION_STRING;

const productService = {
  init() {
    try {
      this.client = new CosmosClient(CONNECTION_STRING);
      this.database = this.client.database("eksaminator");
      this.container = this.database.container("users");
    } catch (err) {
      console.log(err.message);
    }
  },
  async create(productToCreate) {
    const { resource } = await this.container.items.create(productToCreate);
    return resource;
  }};

productService.init();

export default productService;
