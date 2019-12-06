const DEBUGG = process.env.DEBUGG_MODE || true;
const MONGO_DIR = process.env.MONGO_DIR || "127.0.0.1";
const MONGO_PORT = process.env.MONGO_PORT || "27017";
const MONGO_USER = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_DB = process.env.MONGO_DB || "didi_issuer";

const ISSUER_SERVER_DID = process.env.ISSUER_SERVER_DID || "***REMOVED***";
const ISSUER_SERVER_PRIVATE_KEY =
	process.env.ISSUER_SERVER_PRIVATE_KEY || "***REMOVED***";

const PORT = process.env.PORT || 3500;

const URL = MONGO_DIR + ":" + MONGO_PORT + "/" + MONGO_DB;
const MONGO_URL =
	MONGO_USER && MONGO_PASSWORD ? "mongodb://" + MONGO_USER + ":" + MONGO_PASSWORD + "@" + URL : "mongodb://" + URL;
console.log(MONGO_URL);

const USER_TYPES = { Admin: "Admin" };
const CERT_FIELD_TYPES = {
	Text: "Text",
	Paragraph: "Paragraph",
	Date: "Date",
	Number: "Number",
	Boolean: "Boolean",
	Checkbox: "Checkbox"
};

const DIDI_API = process.env.DIDI_API || "http://localhost:3000/api/1.0/didi";

module.exports = {
	API_VERSION: "1.0",
	DEBUGG: DEBUGG,

	VALIDATION_TYPES: {
		TOKEN_MATCHES_USER_ID: "tokenMatchesUserId",
		IS_ADMIN: "isAdmin",
		IS_STRING: "isString",
		IS_BOOLEAN: "isBoolean",
		IS_PASSWORD: "isPassword",
		IS_CERT_DATA: "isCertData",
		IS_TEMPLATE_DATA: "isTemplateData",
		IS_TEMPLATE_DATA_TYPE: "isTemplateDataType",
		IS_TEMPLATE_DATA_VALUE: "isTemplateDataValue",
		IS_TEMPLATE_PREVIEW_DATA: "isTemplatePreviewData"
	},

	DATA_TYPES: {
		CERT: "cert",
		OTHERS: "others",
		PARTICIPANT: "participant"
	},

	COMMON_PASSWORDS: ["123456", "contraseña", "password"],
	PASSWORD_MIN_LENGTH: 6,
	SALT_WORK_FACTOR: 16,

	PREVIEW_ELEMS_LENGTH: {
		1: 2,
		2: 4,
		3: 6
	},

	USER_TYPES: USER_TYPES,
	CERT_FIELD_TYPES: CERT_FIELD_TYPES,
	CERT_FIELD_MANDATORY: {
		DID: "DID",
		NAME: "CERTIFICADO O CURSO",
		FIRST_NAME: "NOMBRE",
		LAST_NAME: "APELLIDO",
		EXPIRATION_DATE: "EXPIRATION DATE"
	},
	
	CREDENTIALS: {
		TYPES: {
			VERIFIABLE: "VerifiableCredential"
		},
		CONTEXT: "https://www.w3.org/2018/credentials/v1"
	},

	DIDI_API: DIDI_API,

	ISSUER_SERVER_DID: ISSUER_SERVER_DID,
	ISSUER_SERVER_PRIVATE_KEY: ISSUER_SERVER_PRIVATE_KEY,
	MONGO_URL: MONGO_URL,
	PORT: PORT
};
