import React, { useState, useEffect } from "react";
import ReactTable from "react-table-6";
import Cookie from "js-cookie";
import { CircularProgress } from "@material-ui/core";

import Constants from '../../../constants/Constants';
import Messages, { TAB_TEXT } from "../../../constants/Messages";
import { getPresentationAllColumns, getPresentationData } from "./PresentationTableHelper";
import "./Presentations.scss";
import { filter, filterByDates } from "../../../services/utils";
import PresentationService from "../../../services/PresentationService";
import RegisterService from "../../../services/RegisterService";
import DescriptionGrid from "../../components/DescriptionGrid";
import OpenModalButton from "../../setting/open-modal-button";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import CreatePresentationModal from "../../components/CreatePresentationModal";
import PresentationDetails from "../../components/PresentationDetails";

const { TITLE, DESCRIPTION } = TAB_TEXT.PRESENTATIONS;

const Presentation = () => {
	const [loading, setLoading] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [detailModalOpen, setDetailModalOpen] = useState(false);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [filters, setFilters] = useState({});
	const [filteredData, setFilteredData] = useState([]);
	const [presentationSelected, setPresentationSelected] = useState();

	const [data, setData] = useState([]);
	const [error, setError] = useState("");

	useEffect(() => {
		const { name, created } = filters;
		const result = data.filter(
			row =>
				filter(row, "name", name) &&
				filterByDates(row, created?.start, created?.end) 
		);
		setFilteredData(result);
	}, [filters, data]);

	const getPresentations = async () => {
		setLoading(true);
		const token = Cookie.get("token");
		try {
			setData(await PresentationService.getAll()(token));
			setFilteredData(data);
		} catch (error) {
			setError(error.message);
		}
		setLoading(false);
	};

	useEffect(() => {
		getPresentations();
	}, []);


	const selectPresentation = setModalFn => presentation => {
		setPresentationSelected(presentation);
		setModalFn(true);
	};

	const onFilterChange = (e, key) => {
		const val = e.target.value;
		setFilters(prev => ({ ...prev, [key]: val }));
	};

	const onDateRangeFilterChange = (value, key) => {
		setFilters(prev => ({ ...prev, [key]: value }));
	};

	const createPresentation = async (presentation) => {
		setLoading(true);
		try {
			const token = Cookie.get("token");
			await RegisterService.createPresentation(presentation)(token);
		} catch (error) {
			setError(error.message);
		}
		getPresentations();
		setLoading(false);
		setModalOpen(false);
	};

	const onDelete = async () => {
		setLoading(true);
		try {
			const token = Cookie.get("token");
			const { _id } = presentationSelected;
			await PresentationService.delete(_id)(token);
			getPresentations();
			setFilteredData(data);
		} catch (error) {
			setError(error.message);
		}
		setLoading(false);
		setDeleteModalOpen(false);
	};

	return (
		<>
			{!loading && (
				<DescriptionGrid title={TITLE} description={DESCRIPTION}>
					<OpenModalButton setModalOpen={setModalOpen} title="Crear Presentacion" />
				</DescriptionGrid>
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
					data={filteredData.map(presentation => 
						getPresentationData(
							presentation,
							selectPresentation(setDetailModalOpen),
							selectPresentation(setDeleteModalOpen)
						))}
					columns={getPresentationAllColumns(onFilterChange, onDateRangeFilterChange)}
					minRows={Constants.CERTIFICATES.TABLE.MIN_ROWS}
					defaultPageSize={5}
				/>}
			<CreatePresentationModal
				title="Crear"
				open={modalOpen}
				close={() => setModalOpen(false)}
				onSubmit={createPresentation}
			/>
			{presentationSelected ? 
				<>
					<PresentationDetails
						modalOpen={detailModalOpen}
						setModalOpen={setDetailModalOpen}
						presentation={presentationSelected}
					/> 
					<ConfirmationDialog
						modalOpen={deleteModalOpen}
						setModalOpen={setDeleteModalOpen}
						onDelete={() => onDelete()}
						title={Messages.LIST.DIALOG.DELETE_CERT_TITLE}
						message={Messages.LIST.DIALOG.DELETE_PRESENTATION_CONF(presentationSelected.name)}
						confirm={Messages.LIST.DIALOG.DELETE}
					/>
				</>	: null}
		</>
	);
};

export default Presentation;
