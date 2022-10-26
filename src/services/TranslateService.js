import Constants from "../constants/Constants";

const { TRANSLATE } = Constants.API_ROUTES;
export default class TranslateService {
	static async getAll() {
		const response = await fetch(TRANSLATE);
		const json = await response.json();
		return json.data;
	}
}
