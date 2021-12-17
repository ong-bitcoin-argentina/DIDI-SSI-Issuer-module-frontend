import React from "react";
import { DATE_FORMAT } from "../../../constants/Constants";
import moment from "moment";
import { Delete, Visibility } from "@material-ui/icons"
import InputFilter from "../../components/InputFilter";
import Action from "../../utils/Action";
import DateRangeFilter from "../../components/DateRangeFilter/DateRangeFilter";
import { CERT_CATEGORIES } from "./constants";

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
			Header: "certificados",
			accessor: "claims"
		},
		{
			Header: (
				<DateRangeFilter label="fecha de creacion" onChange={value => onDateRangeFilterChange(value, "created")} />
			),
			accessor: "iat",
			width: 220
		},
		...getPresentationColums
	];
};

const formatDate = date => (date ? moment(date).format(DATE_FORMAT) : "-");

export const getPresentationData = (presentation, onView, onDelete) => {
	const { iat, claims } = presentation;
	const certificates = Object.keys(claims.verifiable).map(cert => CERT_CATEGORIES[cert]);

	return {
		...presentation,
		onCreated: <div style={{ textAlign: "center" }}>{formatDate(iat)}</div>,
		claims: certificates.map((cert, index) => index < certificates.length - 1 ? `${cert} - ` : `${cert}`),
		actions: (
			<div className="Actions">
				<Action handle={() => onView(presentation)} title="Ver" Icon={Visibility} color="#5FCDD" />
				<Action handle={() => onDelete(presentation)} title="Borrar" Icon={Delete} color="#EB5757" />
			</div>
		)
	};
};
