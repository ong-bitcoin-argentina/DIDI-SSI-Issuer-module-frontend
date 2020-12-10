import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@material-ui/core";

const DELETE_TITLE = "Borrar Credenciales";
const MESSAGE = "Estás por eliminar la siguientes credenciales pendientes de emisión:";

const DeleteAllCertsDialog = ({ onDeleteSelects, selectedCerts, openDeleteAll, allCertificates, setOpenDeleteAll }) => {
	const handleClose = () => {
		setOpenDeleteAll(false);
	};

	const handleAccept = () => {
		handleClose();
		onDeleteSelects();
	};

	const getCerts = () => {
		const keys = Object.keys(selectedCerts);
		const selectedCerts_ = keys.filter(key => selectedCerts[key]);
		const certs = allCertificates.filter(t => selectedCerts_.indexOf(t._id) > -1);
		return certs;
	};

	return (
		<Dialog open={openDeleteAll} onClose={handleClose}>
			<DialogTitle id="form-dialog-title">
				<div>{DELETE_TITLE}</div>
			</DialogTitle>
			<DialogContent style={{ margin: "0px 0 25px" }}>
				<Typography variant="body1">
					<b>{MESSAGE}</b>
				</Typography>
				{getCerts().map(({ _id, certName, firstName, lastName }) => (
					<Typography key={_id} style={{ marginTop: "5px" }}>
						- {certName} - {`${firstName} ${lastName}`}
					</Typography>
				))}
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Cancelar
				</Button>
				<Button onClick={handleAccept} color="secondary" variant="contained">
					Borrar
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DeleteAllCertsDialog;