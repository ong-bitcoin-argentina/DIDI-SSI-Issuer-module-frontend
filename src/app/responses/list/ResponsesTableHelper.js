import React from "react";
import { DATE_FORMAT, RESPONSE_STATUS } from "../../../constants/Constants";
import moment from "moment";
import { AssignmentLate, AssignmentTurnedIn, Error } from "@material-ui/icons"
import InputFilter from "../../components/InputFilter";
import Action from "../../utils/Action";
import CustomSelect from "../../components/CustomSelect";
import DateRangeFilter from "../../components/DateRangeFilter/DateRangeFilter";

const COLUMNS_NAME = [
	{
		title: "Acciones",
		name: "actions",
		width: 130
	}
];

export const getResponseColums = COLUMNS_NAME.map(({ name, title, width }) => ({
	Header: (
		<div className="HeaderText">
			<p>{title}</p>
		</div>
	),
	accessor: name,
	width
}));

export const getResponseAllColumns = (handleFilter, onDateRangeFilterChange, onStatusFilterChange) => {
	return [
		{
			Header: <InputFilter label="Identificador" onChange={handleFilter} field="id" />,
			accessor: "id"
		},
		{
			Header: (
				<DateRangeFilter label="fecha de creación" onChange={value => onDateRangeFilterChange(value, "created")} />
			),
			accessor: "onCreated",
			width: 220
		},
		{
			Header: <InputFilter label="Presentación" onChange={handleFilter} field="shareRequestName" />,
			accessor: "shareRequestId.name"
		},
		{
			Header: (
				<div className="SelectionTable">
					<CustomSelect options={RESPONSE_STATUS} label="Estado" onChange={value => onStatusFilterChange(value, "status")} />
				</div>
			),
			accessor: "statusMessage"
		},
		...getResponseColums
	];
};

const formatDate = date => (date ? moment(date).format(DATE_FORMAT) : "-");

export const getResponseData = (response, onCreateCredencial, onDeny) => {
	const { createdOn, process_status, errorMessage } = response;
	const errorAction = (!!errorMessage ? <Action handle={() => onDeny(response)} title="Ver Error" Icon={Error} color="#EB5757" /> : "")
	const actions = (
		errorAction === "" ? 
			<>
				<Action handle={() => onCreateCredencial(response)} title="Crear Credencial" Icon={AssignmentTurnedIn} color="#0ca120" />
				<Action handle={() => onDeny(response)} title="Denegar" Icon={AssignmentLate} color="#EB5757" />
			</>
		: 
			""
	);
	return {
		...response,
		onCreated: <div style={{ textAlign: "center" }}>{formatDate(createdOn)}</div>,
		statusMessage: (!!errorMessage ? `Error - `: '') + `${process_status}`,
		status: (!!errorMessage ? `Error - `: process_status),
		actions: (
			<div className="Actions">
				{errorAction}
				{actions}
			</div>
		)
	};
};
