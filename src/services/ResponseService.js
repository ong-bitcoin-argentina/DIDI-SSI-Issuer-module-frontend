import Constants from "../constants/Constants";
import { fetchData, options } from "./utils";

const { GET_ALL, GET_DECODED } = Constants.API_ROUTES.RESPONSE;

export default class ResponseService {
	static getAll() {
		return fetchData(options("GET"), GET_ALL);
	}
	static getByIdDecoded(id) {
		return fetchData(options("GET"), GET_DECODED(id));
	}
}
