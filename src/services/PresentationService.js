import Constants from "../utils/constants/Constants";
import { fetchData, options } from "./utils";

const { GET_ALL, DELETE } = Constants.API_ROUTES.PRESENTATION;

export default class PresentationService {
	static getAll() {
		return fetchData(options("GET"), GET_ALL);
	}

	static delete(id) {
		return fetchData(options("DELETE"), DELETE(id));
	}
}
