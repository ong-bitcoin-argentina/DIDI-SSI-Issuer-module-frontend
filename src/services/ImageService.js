import Constants from "../utils/constants/Constants";
import { fetchImage } from "./utils";

const { IMAGE } = Constants.API_ROUTES;

const options = () => ({
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  }
})

export default class RegisterService {
	static async getImage(id) {
    if (id) {
      return await fetchImage(options, IMAGE.GET(id));
    } else {
      return null;
    }
  }
}
