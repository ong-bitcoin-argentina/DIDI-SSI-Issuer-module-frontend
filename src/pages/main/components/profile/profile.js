import { CircularProgress, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ReactTable from "react-table-6";
import Constants from "../../../../utils/constants/Constants";
import Messages from "../../../../utils/constants/Messages";
import OpenModalButton from "../setting/open-modal-button";
import ProfileModal from "./profile-modal";
import { getProfileAllColumns, getProfileData } from "./profile-table-helper";
import Cookie from "js-cookie";
import ProfileService from "../../../../services/ProfileService";
import { filter } from "../../../../services/utils";
import DeleteAbstractModal from "../users/delete-abstract-modal";
import { validateAccess } from "../../../../utils/constants/Roles";

const { PREV, NEXT } = Messages.LIST.TABLE;
const { MIN_ROWS } = Constants.CERTIFICATES.TABLE;

const BUTTON_MODAL_NAME = "Nuevo Perfil";
const TITLE = "Perfiles";
const DESCRIPTION = "Definición de perfiles de usuarios para la plataforma de emisores ai·di.";

const Profile = () => {
	const [loading, setLoading] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [profiles, setProfiles] = useState([]);
	const [profileSelected, setProfileSelected] = useState({});
	const [error, setError] = useState("");

	const [filters, setFilters] = useState({});
	const [filteredData, setFilteredData] = useState([]);
	const [openDelete, setOpenDelete] = useState(false);

	useEffect(() => {
		getProfilesData();
	}, []);

	useEffect(() => {
		const { name, type } = filters;
		const result = profiles.filter(row => filter(row, "name", name) && filterTypes(row, type));
		setFilteredData(result);
	}, [filters]);

	const filterTypes = (row, type) => {
		const types = row && row.types;
		return !type || types.some(t => Constants.ROLES_TRANSLATE[t] === type);
	};

	const handle = async next => {
		try {
			await next();
			setError("");
		} catch (error) {
			setError(error.message);
		}
		setLoading(false);
		setOpenDelete(false);
	};

	const getProfilesData = () =>
		handle(async () => {
			const token = Cookie.get("token");
			setLoading(true);
			const profiles = await ProfileService.getAll()(token);

			setProfiles(profiles);
			setFilteredData(profiles);
		});

	const createProfile = newProfile =>
		handle(async () => {
			const token = Cookie.get("token");
			await ProfileService.create(newProfile)(token);
			await getProfilesData();
		});

	const editProfile = ({ _id, ...rest }) =>
		handle(async () => {
			const token = Cookie.get("token");
			await ProfileService.edit(_id, rest)(token);
			await getProfilesData();
		});

	const onEdit = profile => {
		setProfileSelected(profile);
		setEditModalOpen(true);
	};

	const onDelete = profile => {
		setProfileSelected(profile);
		setOpenDelete(true);
	};

	const handleDelete = async () =>
		handle(async () => {
			const token = Cookie.get("token");
			await ProfileService.delete(profileSelected._id)(token);
			await getProfilesData();
		});

	const onFilterChange = (e, key) => {
		const val = e.target.value;
		setFilters(prev => ({ ...prev, [key]: val }));
	};

	return (
		<>
			{(!loading && (
				<>
					<Grid container xs={12} style={{ margin: "10px 0" }}>
						<Grid item xs={8} container direction="column" style={{ textAlign: "start" }}>
							<h1 style={{ margin: "0", padding: "0" }}>{TITLE}</h1>
							<p>{DESCRIPTION}</p>
						</Grid>
						{validateAccess(Constants.ROLES.Write_Profiles) && (
							<Grid item xs={4} container justify="flex-end" alignItems="center">
								<OpenModalButton setModalOpen={setModalOpen} title={BUTTON_MODAL_NAME} />
							</Grid>
						)}
					</Grid>
					{error && (
						<div className="errMsg" style={{ width: "100%" }}>
							{error}
						</div>
					)}
					<ReactTable
						sortable
						previousText={PREV}
						columns={getProfileAllColumns(onFilterChange)}
						minRows={MIN_ROWS}
						defaultPageSize={5}
						nextText={NEXT}
						data={filteredData.map(profile => getProfileData(profile, onEdit, onDelete))}
					/>
				</>
			)) || (
				<div style={{ display: "flex", justifyContent: "center" }}>
					<CircularProgress />
				</div>
			)}
			<ProfileModal title="Crear" open={modalOpen} close={() => setModalOpen(false)} onSubmit={createProfile} />
			<ProfileModal
				title="Editar"
				open={editModalOpen}
				close={() => setEditModalOpen(false)}
				onSubmit={editProfile}
				profileData={profileSelected}
			/>
			<DeleteAbstractModal title="Perfil" open={openDelete} setOpen={setOpenDelete} onAccept={handleDelete} />
		</>
	);
};

export default Profile;
