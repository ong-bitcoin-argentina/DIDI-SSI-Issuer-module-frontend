import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography, CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Constants, { DATE_FORMAT } from "../../constants/Constants";
import ImageService from '../../services/ImageService';
import moment from "moment";
import ModalTitle from "../utils/modal-title";
import DefaultButton from "./default-button";
import CollapseMessageError from "./CollapseMessageError/CollapseMessageError";
import placeholder from '../../images/placeholder.png';

const TITLE = "Detalles del Registro";

const formatDate = date => (date ? moment(date).format(DATE_FORMAT) : "-");

const { CREATING, ERROR, REVOKING, REVOKED } = Constants.STATUS;

const KeyValue = ({ field, value }) => (
	<Typography variant="subtitle2">
		<b>{field}</b>: {value}
	</Typography>
);

const ModalDetail = ({ modalOpen, setModalOpen, register, handleRefresh, handleRevoke }) => {
	const [image, setImage] = useState({
		src: "",
		alt: "Issuer Image",
	});
	const [loading, setLoading] = useState(false);
	const { 
		did,
		name,
		createdOn,
		expireOn,
		blockHash,
		messageError,
		status,
		blockchain,
		description,
		imageId,
	} = register;

	const fetchImage = async (id) => {
		try {
			setLoading(true);
			const img = await ImageService.getImage(id);
			setImage({ src: img || placeholder });
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchImage(imageId);
	}, [imageId]);

	const partsOfDid = did?.split(":");
	const didKey = partsOfDid && partsOfDid[partsOfDid.length - 1];
	const createdOn_ = formatDate(createdOn);
	const expireOn_ = formatDate(expireOn);
	const statusNotAllowed = [CREATING, ERROR, REVOKING, REVOKED];

	const close = () => {
		setModalOpen(false);
	};

	return (
		<Dialog open={modalOpen} onClose={close}>
			<DialogTitle id="form-dialog-title">
				<ModalTitle title={TITLE} />
			</DialogTitle>
			<DialogContent style={{ margin: "0px 0 25px" }}>
				<Grid container item xs={12} justify="center" direction="column" style={{ marginBottom: "5px" }}>
					<KeyValue field="DID" value={`did:ethr:${blockchain}:${didKey}`} />
					<KeyValue field="Blockchain" value={blockchain} />
					<KeyValue field="Nombre" value={name} />
					<KeyValue field="Descripcion" value={description} />
					<KeyValue field="Fecha de Registro" value={createdOn_} />
					<KeyValue field="Imagen" value={""} />
					{expireOn_ && expireOn_ !== "-" && <KeyValue field="Fecha de Expiración" value={expireOn_} />}
					{blockHash && <KeyValue field="Hash de Transacción" value={blockHash} />}
					{!loading ? 
						<img src={image.src} alt={image.alt} className="img-preview"/>
					:
					<Grid item xs={2} container justify="center" alignItems="center">
						{loading && <CircularProgress />}
					</Grid>}		
					{messageError && <CollapseMessageError messageError={messageError} blockchain={blockchain} status={status} />}
				</Grid>
				{!statusNotAllowed.includes(status) && (
					<Grid container direction="row">
						<Grid item style={{ margin: "15px 0" }}>
							<DefaultButton
								funct={() => handleRefresh(did)}
								otherClass="WarningButton"
								name="Renovar"
								disabled={statusNotAllowed.includes(status)}
							/>
						</Grid>
						<Grid item style={{ margin: "15px 10px" }}>
							<DefaultButton funct={() => handleRevoke(did)} otherClass="DangerButton" name="Revocar" />
						</Grid>
					</Grid>
				)}
			</DialogContent>
			<DialogActions style={{ padding: "2em 25px" }}>
				<DefaultButton funct={close} name="Cerrar" />
			</DialogActions>
		</Dialog>
	);
};

export default ModalDetail;
