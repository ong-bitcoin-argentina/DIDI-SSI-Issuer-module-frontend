import React from "react";

import Messages from "./Messages";
import { Edit, Delete, AssignmentTurnedIn, Visibility, AssignmentLate } from "@material-ui/icons";
import { validateAccess } from "./Roles";
import Constants from "./Constants";

const { DID } = Messages.LIST.TABLE;
const { EMMIT, DELETE, EDIT, VIEW, REVOKE } = Messages.LIST.BUTTONS;

const { Write_Certs, Delete_Certs, Read_Certs } = Constants.ROLES;

export const PENDING_ACTIONS = ({ cert, onEmmit, onEdit, onDelete }) => [
	{
		className: "EditAction",
		action: () => onEdit(cert._id),
		label: VIEW,
		enabled: validateAccess(Read_Certs),
		iconComponent: <Visibility fontSize="default" />
	},
	{
		className: "EmmitAction",
		action: () => onEmmit(cert._id),
		label: EMMIT,
		enabled: validateAccess(Write_Certs),
		iconComponent: <AssignmentTurnedIn fontSize="default" />
	},
	{
		className: "EditAction",
		action: () => onEdit(cert._id),
		label: EDIT,
		enabled: validateAccess(Write_Certs),
		iconComponent: <Edit fontSize="default" />
	},
	{
		className: "DeleteAction",
		action: () => onDelete(cert._id),
		label: DELETE,
		enabled: validateAccess(Delete_Certs),
		iconComponent: <Delete fontSize="default" />
	}
];

export const EMMITED_ACTIONS = ({ cert, onView, onRevoke }) => [
	{
		className: "EditAction",
		action: () => onView(cert._id),
		iconComponent: <Visibility fontSize="default" />,
		label: VIEW,
		enabled: true
	},
	{
		className: "DeleteAction",
		action: () => onRevoke(cert),
		iconComponent: <AssignmentLate fontSize="default" />,
		label: REVOKE,
		enabled: validateAccess(Delete_Certs)
	}
];

export const REVOKED_ACTIONS = ({ cert, onView }) => [
	{
		className: "EditAction",
		action: () => onView(cert._id),
		iconComponent: <Visibility fontSize="default" />,
		label: VIEW
	}
];

export const BASE_COLUMNS = [
	{
		label: DID,
		accessor: "did"
	}
];

export const EMMITED_COLUMNS = ({ onDidFilterChange }) => [
	{
		label: DID,
		action: e => onDidFilterChange(e),
		accessor: "did"
	},
];

export const REVOCATION_REASONS_PLAIN = {
	EXPIRATION: "Expiración",
	UNLINKING: "Desvinculación",
	DATA_MODIFICATION: "Modificación de datos",
	REPLACEMENT: "Reemplazo",
	OTHER: "Otro"
};

export const REVOCATION_REASONS = Object.keys(REVOCATION_REASONS_PLAIN).map(key => ({
	label: REVOCATION_REASONS_PLAIN[key],
	value: key
}));
