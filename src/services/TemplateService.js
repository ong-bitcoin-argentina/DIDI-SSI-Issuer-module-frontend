import Constants from "../utils/constants/Constants";
import { fetchData, optionsBody } from "./utils";

export default class TemplateService {
	static create(data) {
		return fetchData(optionsBody("POST", data), Constants.API_ROUTES.TEMPLATES.CREATE);
	}

	static save(token, template, cb, errCb) {
		const templateData = {
			cert: template.data.cert.map(data => {
				return {
					name: data.name,
					type: data.type,
					mandatory: data.mandatory,
					defaultValue: data.defaultValue,
					required: data.required,
					options: data.options
				};
			}),
			participant: template.data.participant.map(data => {
				return {
					name: data.name,
					type: data.type,
					mandatory: data.mandatory,
					defaultValue: data.defaultValue,
					required: data.required,
					options: data.options
				};
			}),
			others: template.data.others.map(data => {
				return {
					name: data.name,
					type: data.type,
					mandatory: data.mandatory,
					defaultValue: data.defaultValue,
					required: data.required,
					options: data.options
				};
			})
		};
		const url = Constants.API_ROUTES.TEMPLATES.EDIT(template._id);
		const data = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				token: token
			},
			body: JSON.stringify({
				data: JSON.stringify(templateData),
				preview: template.previewData,
				category: template.category,
				type: template.previewType,
				registerId: template.registerId
			})
		};
		fetch(url, data)
			.then(data => {
				return data.json();
			})
			.then(data => {
				if (data.status === "success") {
					return cb(data.data);
				} else {
					errCb(data.data);
				}
			})
			.catch(err => errCb(err));
	}

	static getAll(token, cb, errCb) {
		const data = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				token: token
			}
		};

		fetch(Constants.API_ROUTES.TEMPLATES.GET_ALL, data)
			.then(data => {
				return data.json();
			})
			.then(data => {
				if (data.status === "success") {
					return cb(data.data);
				} else {
					errCb(data.data);
				}
			})
			.catch(err => errCb(err));
	}

	static get(token, id, cb, errCb) {
		const data = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				token: token
			}
		};

		fetch(Constants.API_ROUTES.TEMPLATES.GET(id), data)
			.then(data => {
				return data.json();
			})
			.then(data => {
				if (data.status === "success") {
					return cb(data.data);
				} else {
					errCb(data.data);
				}
			})
			.catch(err => errCb(err));
	}

	static getQrPetition(token, id, code, cb, errCb, registerId) {
		const data = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				token: token
			}
		};

		fetch(Constants.API_ROUTES.TEMPLATES.GET_QR(id, code, registerId), data)
			.then(data => {
				return data.json();
			})
			.then(data => {
				if (data.status === "success") {
					return cb(data.data);
				} else {
					errCb(data.data);
				}
			})
			.catch(err => errCb(err));
	}

	static sendRequest(data, code) {
		return fetchData(optionsBody("POST", data), Constants.API_ROUTES.TEMPLATES.REQUEST(code));
	}

	static delete(token, id, cb, errCb) {
		const data = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				token: token
			}
		};

		fetch(Constants.API_ROUTES.TEMPLATES.DELETE(id), data)
			.then(data => {
				return data.json();
			})
			.then(data => {
				if (data.status === "success") {
					return cb(data.data);
				} else {
					errCb(data.data);
				}
			})
			.catch(err => errCb(err));
	}

	static async getAllAsync(token) {
		const data = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				token: token
			}
		};

		const response = await fetch(Constants.API_ROUTES.TEMPLATES.GET_ALL, data);
		const sj = await response.json();
		return sj.data;
	}
}
