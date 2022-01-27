import React from "react";
import { DATE_FORMAT } from "../../../constants/Constants";
import moment from "moment";
import { Delete, Visibility } from "@material-ui/icons"
import InputFilter from "../../components/InputFilter";
import Action from "../../utils/Action";
import DateRangeFilter from "../../components/DateRangeFilter/DateRangeFilter";
import { CRED_CATEGORIES } from "./constants";

const COLUMNS_NAME = [
	{
		title: "Acciones",
		name: "actions",
		width: 130
	}
];

export const getPresentationColums = COLUMNS_NAME.map(({ name, title, width }) => ({
	Header: (
		<div className="HeaderText">
			<p>{title}</p>
		</div>
	),
	accessor: name,
	width
}));

export const getPresentationAllColumns = (handleFilter, onDateRangeFilterChange) => {
	return [
		{
			Header: <InputFilter label="nombre" onChange={handleFilter} field="name" />,
			accessor: "name"
		},
		{
			Header: "Credenciales",
			accessor: "claims"
		},
		{
			Header: (
				<DateRangeFilter label="fecha de creacion" onChange={value => onDateRangeFilterChange(value, "created")} />
			),
			accessor: "onCreated",
			width: 220
		},
		...getPresentationColums
	];
};

const formatDate = date => (date ? moment(date).format(DATE_FORMAT) : "-");

export const getPresentationData = (presentation, onView, onDelete) => {
	const { createdOn, claims } = presentation;
	const credentials = Object.keys(claims.verifiable).map(cred => CRED_CATEGORIES[cred] || cred);

	return {
		...presentation,
		onCreated: <div style={{ textAlign: "center" }}>{formatDate(createdOn)}</div>,
		claims: credentials.map((cred, index) => index < credentials.length - 1 ? `${cred} - ` : `${cred}`),
		actions: (
			<div className="Actions">
				<Action handle={() => onView(presentation)} title="Ver" Icon={Visibility} color="#5FCDD" />
				<Action handle={() => onDelete(presentation)} title="Borrar" Icon={Delete} color="#EB5757" />
			</div>
		)
	};
};
