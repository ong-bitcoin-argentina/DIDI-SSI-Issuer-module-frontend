import Constants from "../constants/Constants";
import { fetchData, options, optionsBodyMultipart } from "./utils";

const { DONE } = Constants.STATUS;
const { GET, GET_ALL_BLOCKCHAINS, CREATE, PRESENTATION, GET_PRESENTATION } = Constants.API_ROUTES.REGISTER;
export default class RegisterService {
	static getAll(params = { status: DONE }) {
		const url = new URL(GET);
		Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

		return fetchData(options("GET"), url);
	}

	static getAllBlockchains() {
		return fetchData(options("GET"), GET_ALL_BLOCKCHAINS);
	}

	static create(data) {
		return fetchData(optionsBodyMultipart("POST", data), CREATE);
	}

	static editName(data, did) {
		return fetchData(optionsBodyMultipart("PATCH", data), `${CREATE}/${did}`);
	}

	static retry(did) {
		return fetchData(options("POST"), `${CREATE}/${did}/retry`);
	}

	static refresh(did) {
		return fetchData(options("POST"), `${CREATE}/${did}/refresh`);
	}

	static revoke(did) {
		return fetchData(options("DELETE"), `${CREATE}/${did}`);
	}

	static createPresentation(data, did) {
		return fetchData(optionsBodyMultipart("POST", data), PRESENTATION(did));
	}

	static getPresentationByDid(did) {
		return fetchData(options("GET"), PRESENTATION(did));
	}

	static getPresentationById(did, id) {
		return fetchData(options("GET"), GET_PRESENTATION(did, id));
	}
}
