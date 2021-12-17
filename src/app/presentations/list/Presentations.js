import React, { useState, useEffect } from "react";
import ReactTable from "react-table-6";
import Cookie from "js-cookie";
import { CircularProgress } from "@material-ui/core";

import Constants from '../../../constants/Constants';
import Messages, { TAB_TEXT } from "../../../constants/Messages";
import { getPresentationAllColumns, getPresentationData } from "./PresentationTableHelper";
import "./Presentations.scss";
import { presentations } from "./pres";
import { filter, filterByDates } from "../../../services/utils";
import DescriptionGrid from "../../components/DescriptionGrid";
import OpenModalButton from "../../setting/open-modal-button";
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

	const ifNotElements = data.length === 0;

	useEffect(() => {
		const { name, created } = filters;
		const result = data.filter(
			row =>
				filter(row, "name", name) &&
				filterByDates(row, created?.start, created?.end) 
		);
		setFilteredData(result);
	}, [filters, data]);

  // TODO: mandar a otro archivo

	useEffect(() => {
		const getPresentations = async () => {
			setLoading(true);
			try {
				// const data = await PresentationService.getAll({})(token);
				setData(presentations);
				setFilteredData(data);
			} catch (error) {
				setError(error.message);
			}
			setLoading(false);
		};
	
		getPresentations();
	}, [data]);

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

	const createPresentation = (presentation) => {
		console.log(presentation)
		setModalOpen(false);
	};

	return (
		<>
			{!loading && !ifNotElements && (
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
				required
			/>
			{presentationSelected ? 
				<PresentationDetails 
					modalOpen={detailModalOpen}
					setModalOpen={setDetailModalOpen}
					presentation={presentationSelected}
				/> : null}
		</>
	);
};

export default Presentation;