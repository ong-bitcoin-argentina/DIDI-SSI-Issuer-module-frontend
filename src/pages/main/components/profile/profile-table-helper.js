import { Grid } from "@material-ui/core";
import React from "react";
import Constants from "../../../../utils/constants/Constants";
import { Edit, Delete } from "@material-ui/icons";
import InputFilter from "../../../../components/InputFilter";
import Action from "../../../../utils/Action";
import CustomSelect from "../../../../components/CustomSelect";
import { validateAccess } from "../../../../utils/constants/Roles";
import CustomChip from "../../../../components/CustomChip";

const EDIT_COLOR = "#5FCDD7";
const DELETE_COLOR = "#EB5757";

const { Write_Profiles, Delete_Profiles } = Constants.ROLES;

const COLUMNS_NAME = [
	{
		title: "acciones",
		name: "actions"
	}
];

export const getProfileColumns = COLUMNS_NAME.map(({ name, title, width }) => ({
	Header: (
		<div className="HeaderText">
			<p>{title}</p>
		</div>
	),
	accessor: name,
	width
}));

export const getProfileAllColumns = handleFilter => {
	return [
		{
			Header: <InputFilter label="Nombre" onChange={handleFilter} field="name" />,
			accessor: "name"
		},
		{
			Header: (
				<CustomSelect
					options={Object.values(Constants.ROLES_TRANSLATE)}
					field="type"
					label="Tipos"
					onChange={handleFilter}
				/>
			),
			accessor: "types",
			width: 1100
		},
		...getProfileColumns
	];
};

export const getProfileData = (profile, onEdit, onDelete) => {
	return {
		...profile,
		types: (
			<Grid container justify="flex-start">
				{profile.types.map(role => (
					<CustomChip title={Constants.ROLES_TRANSLATE[role]} />
				))}
			</Grid>
		),
		actions: (
			<div className="Actions">
				{validateAccess(Write_Profiles) && (
					<Action handle={() => onEdit(profile)} title="Editar" Icon={Edit} color={EDIT_COLOR} />
				)}
				{validateAccess(Delete_Profiles) && (
					<Action handle={() => onDelete(profile)} title="Borrar" Icon={Delete} color={DELETE_COLOR} />
				)}
			</div>
		)
	};
};
