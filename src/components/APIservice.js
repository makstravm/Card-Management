import axios from "axios";

export default class ApiService {
  static async request(endpoints, requestMethod, requestBody) {
    try {
      const response = await axios({
        method: requestMethod,
        url: `http://localhost:3000/${endpoints}`,
        data: requestBody,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  static async get(endpoints) {
    const resolved = await this.request(endpoints);
    return resolved;
  }

  static async post(endpoints, requestBody) {
    const resolved = await this.request(endpoints, "post", requestBody);
    return resolved;
  }

  static async put(endpoints, requestBody) {
    const resolved = await this.request(endpoints, "put", requestBody);
    return resolved;
  }
}
