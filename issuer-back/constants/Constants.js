const DEBUGG = process.env.DEBUGG_MODE || true;
const MONGO_DIR = process.env.MONGO_DIR || "127.0.0.1";
const MONGO_PORT = process.env.MONGO_PORT || "27017";
const MONGO_USER = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_DB = process.env.MONGO_DB || "didi_issuer";
const SERVER_PRIVATE_KEY =
	process.env.SERVER_PRIVATE_KEY || "***REMOVED***";
const PORT = process.env.PORT || 3500;

const URL = MONGO_DIR + ":" + MONGO_PORT + "/" + MONGO_DB;
const MONGO_URL =
	MONGO_USER && MONGO_PASSWORD ? "mongodb://" + MONGO_USER + ":" + MONGO_PASSWORD + "@" + URL : "mongodb://" + URL;

const USER_TYPES = { Admin: "Admin" };
const CERT_FIELD_TYPES = {
	Text: "Text",
	Paragraph: "Paragraph",
	Date: "Date",
	Number: "Number",
	Boolean: "Boolean",
	Checkbox: "Checkbox"
};

module.exports = {
	API_VERSION: "1.0",
	DEBUGG: DEBUGG,

	SERVER_PRIVATE_KEY: SERVER_PRIVATE_KEY,

	VALIDATION_TYPES: {
		TOKEN_MATCHES_USER_ID: "tokenMatchesUserId",
		IS_ADMIN: "isAdmin",
		IS_STRING: "isString",
		IS_PASSWORD: "isPassword",
		IS_TEMPLATE_DATA: "isTemplateData",
		IS_TEMPLATE_DATA_TYPE: "isTemplateDataType"
	},

	DATA_TYPES: {
		CERT: "certData",
		OTHERS: "othersData",
		PARTICIPANT: "participantData"
	},

	COMMON_PASSWORDS: ["123456", "contraseña", "password"],
	PASSWORD_MIN_LENGTH: 6,
	SALT_WORK_FACTOR: 16,

	USER_TYPES: USER_TYPES,
	CERT_FIELD_TYPES: CERT_FIELD_TYPES,

	MONGO_URL: MONGO_URL,
	PORT: PORT
};
