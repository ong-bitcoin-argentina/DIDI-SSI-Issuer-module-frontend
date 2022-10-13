const Messages = {
	LOGIN: {
		WELCOME: "Bienvenido al",
		WELCOME_2: "Emisor de Credenciales Web",
		BUTTONS: {
			ENTER: "Ingresar"
		}
	},
	EDIT: {
		DATA: {
			PREVIEW: "Campos a Previsualizar",
			CATEGORIES: "Categoría de la Credencial",
			CERT: "Datos de la Credencial",
			PART: "Datos del Participante",
			OTHER: "Otros Datos",
			EMISOR: "Emisor",

			MICRO_CRED_NAME: "Nombre de la Micro",
			MICRO_CRED_FIELDS: "Campos de la Micro"
		},
		DIALOG: {
			QR: {
				REQUEST_SENT: "Pedido enviado",
				LOAD_BY_QR: "Cargar participante con código Qr",
				LOADED_BY_QR: name => {
					return "Participante " + name + " cargado.";
				},
				DIDS_TITLE: "DIDS Cargados:"
			},
			PARTICIPANT: {
				TITLE: "Agregar Participante",
				NAME: "Participante",
				CREATE: "Agregar",
				CLOSE: "Cerrar"
			},
			FIELD: {
				TITLE: "Agregar Campo",
				OPTION: "Opcion",
				REQUIRED: "Requerido",
				TYPES: "Tipo",
				NAME: "Nombre",
				CREATE: "Crear",
				CLOSE: "Cerrar"
			}
		},
		BUTTONS: {
			LOAD_DIDS_FROM_CSV: "Cargar DIDs por CSV",
			ADD_MICRO_CRED_LABEL: "Agregar Micro",
			REMOVE_MICRO_CRED_LABEL: "Quitar Micro",
			ADD_MICRO_CRED: "+",
			REMOVE_MICRO_CRED: "-",
			REMOVE_PARTICIPANTS: "X",
			SAMPLE_PART_FROM_CSV: "Descargar Modelo Carga CSV",
			SAMPLE_CERT_FROM_CSV: "Generar CSV",
			LOAD_CERT_FROM_CSV: "Cargar con CSV",
			ADD_PARTICIPANTS: "Nuevo Participante",
			LOAD_PARTICIPANTS: "Cargar Participantes",
			RENAME_ISSUER: "Renombrar Emisor",
			CREATE: "Nuevo Campo",
			SEND: "Enviar",
			SAVE: "Guardar",
			CANCEL: "Cancelar",
			CLOSE: "Cerrar",
			BACK: "Volver",
			EXIT: "Salir",
			REQUIRED: "Requerido",
			DELETE: "Borrar"
		}
	},
	CREDENTIAL: {
		TRANSLATE_NAMES: (origin) => {
			const names = {
				credentialName: "Credential",
				benefitHolderType: "Tipo Beneficiario",
				familyName: "Apellido",
				dni: "DNI",
				givenName: "Nombre",
			};
			const name = Object.entries(names).filter(([key, ]) => (key === origin));
			return (!name.length ? origin : name[0][1] );
		},
	},
	LIST: {
		MENU: {
			TITLE: "Menu"
		},
		DIALOG: {
			ISSUER_RENAME_TITLE: name => {
				return "Renombrar emisor (El nombre actual es '" + name + "'):";
			},
			ERROR_TITLE: "Mensaje de Error",
			DENY_TITLE: "Denegar Solicitud de Credencial",
			DENY_TITLE_BUTTON: "Denegar",
			DENY_MESSAGE: (code, name) => `¿Está seguro que desea denegar la solicitud ${code} de la presentación ${name}?`,
			DELETE_CONFIRMATION: title => `¿Está seguro que desea eliminar ${title}?`,
			DELETE_PRESENTATION_CONF: title => `¿Está seguro que desea eliminar la presentación ${title}?`,
			DELETE_CERT_TITLE: "Borrar Credencial",
			DELETE_PRESENTATION_TITLE: "Borrar Presentación",
			DELETE_TEMPLATE_TITLE: "Borrar Modelo",
			DELETE_DELEGATE_TITLE: "Borrar Delegado",
			REVOKE_CERT_TITLE: "Revocar Credencial",
			REVOKE_CONFIRMATION: "Esta seguro?",
			REVOKE: "Revocar",
			DELETE: "Borrar",
			CREATE_DELEGATE_TITLE: "Crear Delegado",
			CREATE_TEMPLATE_TITLE: "Crear Modelo",
			DID: "Did",
			NAME: "Nombre",
			CREATE: "Crear",
			CANCEL: "Cancelar",
			CLOSE: "Cerrar"
		},
		TABLE: {
			DID: "DID",
			HAS_TEL: "TELEFONO",
			HAS_MAIL: "MAIL",
			HAS_PERSONAL: "DATOS",
			HAS_PERSONAL2: "PERSONALES",
			HAS_ADDRESS: "DOMICILIO",
			TEMPLATE: "Modelo de Credencial",
			CERT: "Credencial",
			LAST_NAME: "APELLIDO",
			NAME: "NOMBRE",
			PREV: "ANTERIOR",
			NEXT: "SIGUIENTE",
			EMISSION_DATE: "FECHA DE",
			EMISSION_DATE2: "EMISIÓN",
			CRATED_DATE: "FECHA DE CREACIÓN",
			REVOCATION: "REVOCACIÓN",
			SELECT: "SELECCIONAR",
			ACTIONS: "ACCIONES",
			BLOCKCHAIN: "BLOCKCHAIN"
		},
		BUTTONS: {
			CREATE_DELEGATE: "Crear Delegado",
			DELEGATES: "Delegados",
			TO_QR: "Registro de DIDs",
			TO_CERTIFICATES_PENDING: "Credenciales Pendientes",
			TO_CERTIFICATES: "Credenciales",
			TO_REVOKED_CERTIFICATES: "Credenciales Revocadas",
			TO_TEMPLATES: "Templates",
			CREATE_TEMPLATE: "Crear Modelo de Credencial",
			CREATE_CERT: "Crear Credencial",
			CREATE_SHARE_REQ: "Crear Modelo de Presentación",
			EMMIT_SELECTED: "Emitir Seleccionados",
			DELETE_SELECETED: "Eliminar Credenciales Seleccionadas",
			EMMIT: "Emitir",
			VIEW: "Ver",
			EDIT: "Editar",
			DELETE: "Borrar",
			REVOKE: "Revocar",
			EXIT: "Salir",
			USERS: "Usuarios",
			CONFIG: "Configuración",
			PROFILE: "Perfiles",
			PRESENTATIONS: "Presentaciones",
			RESPONSES: "Respuestas",
		}
	},
	QR: {
		LOAD_SUCCESS: name => {
			return "USUARIO '" + name + "' CARGADO CON ÉXITO";
		},
		DID_SELECT: "DID",
		CERTIFICATE_SELECT: "Credencial A PEDIR",
		TEMPLATE_SELECT: "Modelo de Credencial",
		TEMPLATE_PART_SELECT_MESSAGE: "Elige el usuario a el que se pediran los datos:",
		TEMPLATE_SELECT_MESSAGE: "Elige el modelo de Credencial para el que se pediran los datos:",
		QR_MESSAGE_CERT: "O alternativamente ecanea el qr con la aplicacion para cargar los datos:",
		QR_MESSAGE: "Escanear el qr con la aplicacion para cargar los datos requeridos por el modelo de Credencial:",
		QR_PD: "Nota: Los datos obtenidos a partir del Qr serán accessibles solo para el modelo de Credencial actual",
		FULL_NAME: "NOMBRE COMPLETO",
		BUTTONS: {
			REQUEST: "Solicitar Credenciales",
			QR_LOAD: "Cargar DID por QR",
			GENERATE: "Generar Qr"
		}
	},
	TAB_TEXT: {
		TEMPLATES: {
			TITLE: "Templates",
			DESCRIPTION: "Creación de modelos de credenciales que luego se utilizarán al crear y emitir una credencial."
		},
		PRESENTATIONS: {
			TITLE: "Presentaciones",
			DESCRIPTION: "Creación de modelos de presentaciones para asociadas a un emisor.",
		},
		RESPONSES: {
			TITLE: "Respuestas a Presentaciones",
			DESCRIPTION: "Listado de respuestas de usuarios a presentaciones para emision de credenciales.",
		},
		CERTIFICATES_PENDING: {
			TITLE: "Credenciales Pendientes",
			DESCRIPTION:
				"Listado de credenciales aún no emitidas. Desde esta pantalla se crean las credenciales para luego ser emitidas."
		},
		CERTIFICATES_EMMITED: {
			TITLE: "Credenciales",
			DESCRIPTION: "Listado de credenciales emitidas y no revocadas."
		},
		CERTIFICATES_REVOKED: {
			TITLE: "Credenciales Revocadas",
			DESCRIPTION: "Listado de credenciales revocadas."
		},
		REGISTER_DIDS: {
			TITLE: "Registro de DIDs",
			DESCRIPTION: "Registro de DIDs receptores para la emisión de credenciales."
		},
		DELEGATES: {
			TITLE: "Delegados",
			DESCRIPTION:
				"Delegación de DIDs a los que se les desea otorgar el permiso de emitir credenciales como delegado de este emisor."
		},
		PROFILES: {
			TITLE: "Perfiles",
			DESCRIPTION: "Definición de perfiles de usuarios para la plataforma de emisores ai·di."
		},
		USERS: {
			TITLE: "Usuarios",
			DESCRIPTION: "Creación de usuarios para la plataforma de emisores ai·di."
		},
		SETTING: {
			TITLE: "Configuración",
			DESCRIPTION:
				"Registro de emisores delegados en la Blockchain, habilitados a emitir credenciales."
		}
	}
};

export default Messages;
