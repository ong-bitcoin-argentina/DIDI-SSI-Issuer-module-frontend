import React, { useState, useEffect } from "react";
import ReactTable from "react-table-6";
import Cookie from "js-cookie";
import { CircularProgress } from "@material-ui/core";

import Constants from '../../../constants/Constants';
import Messages, { TAB_TEXT } from "../../../constants/Messages";
import { getResponseAllColumns, getResponseData } from "./ResponsesTableHelper";
import "./Responses.scss";
import { filter, filterByDates } from "../../../services/utils";
import ResponseService from "../../../services/ResponseService";
import DescriptionGrid from "../../components/DescriptionGrid";
import MessageDialog from "../../components/MessageDialog";
import TableSubComponent from "../../components/TableSubComponent";
import ConfirmationDenegateDialog from "../../components/ConfirmationDenegateDialog";

const { TITLE, DESCRIPTION } = TAB_TEXT.RESPONSES;

const Response = () => {
	const [loading, setLoading] = useState(false);
	const [errorModalOpen, setErrorModalOpen] = useState(false);
	const [denyModalOpen, setDenyModalOpen] = useState(false);
	const [filters, setFilters] = useState({});
	const [filteredData, setFilteredData] = useState([]);
	const [responseSelected, setResponseSelected] = useState();

	const [data, setData] = useState([]);
	const [error, setError] = useState("");
	
	const filterSubValue = (item, key, val) => {
		const vkey = key.split('.');
		const parsedVal = val && val.toLowerCase();
		return !parsedVal || item[vkey[0]][vkey[1]]?.toLowerCase().includes(parsedVal);
	}
	const filterStatus = (item, key, status, errorMessage) => {
		const nstatus = !!errorMessage ? 'error' : (status?.toLowerCase());
		const itemstatus = item?.errorMessage ? 'error' : item[key]?.toLowerCase();
		return !status || itemstatus === nstatus;
	}

	useEffect(() => {
		const { id, shareRequestName, created, status, errorMessage } = filters;
		const result = data.filter(
			row =>
				filter(row, "_id", id) &&
				filterStatus(row, "process_status", status, errorMessage) &&
				filterSubValue(row, "shareRequestId.name", shareRequestName) &&
				filterByDates(row, created?.start, created?.end) 
		);
		setFilteredData(result);
	}, [filters, data]);

	const getResponses = async () => {
		setLoading(true);
		const token = Cookie.get("token");
		try {
			setData(await ResponseService.getAll()(token));
			setFilteredData(data);
		} catch (e) {
			setError(e.message);
		}
		setLoading(false);
	};

	useEffect(() => {
		getResponses();
	}, []);


	const selectResponse = setModalFn => response => {
		setResponseSelected(response);
		setModalFn(true);
	};

	const onFilterChange = (e, key) => {
		const val = e.target.value;
		setFilters(prev => ({ ...prev, [key]: val }));
	};

	const onDateRangeFilterChange = (value, key) => {
		setFilters(prev => ({ ...prev, [key]: value }));
	};

	const onStatusFilterChange = (e, key) => {
		const val = e.target.value;
		setFilters(prev => ({ ...prev, [key]: val }));
	};

	const onConfirm = async () => {
		setLoading(true);
		try {
			getResponses();
			setFilteredData(data);
		} catch (e) {
			setError(e.message);
		}
		setLoading(false);
		setDenyModalOpen(false);
	};
	const getResponseExpandData = (obj) => {
		const responseId = obj.row._original._id;
		const token = Cookie.get("token");
		const loadData = (id, tokenUser) => (ResponseService.getByIdDecoded(id)(tokenUser)).then((responseData) => {
			return responseData;
		});
		return <TableSubComponent loadData={loadData(responseId, token)} />;
	};

	return (
		<>
			{!loading && (
				<DescriptionGrid title={TITLE} description={DESCRIPTION}></DescriptionGrid>
			)}
			{error && (
				<div className="errMsg" style={{ width: "100%" }}>
					{error}
				</div>
			)}
			{(loading && (
				<div style={{ display: "flex", justifyContent: "center" }}>
					<CircularProgress />
				</div>
			)) ||
				<ReactTable
					sortable={true}
					previousText={Messages.LIST.TABLE.PREV}
					nextText={Messages.LIST.TABLE.NEXT}
					data={filteredData.map(response => 
						getResponseData(
							response,
							selectResponse(setErrorModalOpen)
						))}
					columns={getResponseAllColumns(onFilterChange, onDateRangeFilterChange, onStatusFilterChange)}
					minRows={Constants.CERTIFICATES.TABLE.MIN_ROWS}
					defaultPageSize={5}
					SubComponent={(v) => getResponseExpandData(v)}
				/>}
			{responseSelected ? 
				<>
					<MessageDialog
						modalOpen={errorModalOpen}
						setModalOpen={setErrorModalOpen}
						title={Messages.LIST.DIALOG.ERROR_TITLE}
						message={responseSelected.errorMessage}
					/>
					<ConfirmationDenegateDialog
						modalOpen={denyModalOpen}
						setModalOpen={setDenyModalOpen}
						onConfirm={() => onConfirm()}
						title={Messages.LIST.DIALOG.DENY_TITLE}
						message={Messages.LIST.DIALOG.DENY_MESSAGE(responseSelected?._id, responseSelected?.shareRequestId?.name)}
						confirm={Messages.LIST.DIALOG.DENY_TITLE_BUTTON}
					/>
				</>	: null}
		</>
	);
};

export default Response;
