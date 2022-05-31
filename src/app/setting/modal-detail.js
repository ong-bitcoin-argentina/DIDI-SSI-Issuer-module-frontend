import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Constants, { DATE_FORMAT } from "../../constants/Constants";
import ImageService from "../../services/ImageService";
import moment from "moment";
import ModalTitle from "../utils/modal-title";
import DefaultButton from "./default-button";
import CollapseMessageError from "./CollapseMessageError/CollapseMessageError";
import placeholder from "../../images/placeholder.png";
import Image from "../components/Image";
import ReactTable from "react-table-6";
import Messages from "../../constants/Messages";
import { getShareReqColumns, getShareReqData } from "./register-table-helper";
import Cookie from "js-cookie";
import RegisterService from "../../services/RegisterService";
import PresentationDetails from "../components/PresentationDetails";

const TITLE = "Detalles del Registro";

const formatDate = date => (date ? moment(date).format(DATE_FORMAT) : "-");

const { CREATING, ERROR, REVOKING, REVOKED } = Constants.STATUS;

const KeyValue = ({ field, value }) => {
	return (
		<>
			<Typography>
				<b>{field}</b>: {value}
			</Typography>
		</>
	);
};

const ModalDetail = ({ modalOpen, setModalOpen, register, handleRefresh, handleRevoke }) => {
	const [detailModalOpen, setDetailModalOpen] = useState(false);
	const [presentationSelected, setPresentationSelected] = useState();

	const selectPresentation = setModalFn => presentation => {
		setPresentationSelected(presentation);
		setModalFn(true);
	};

	const [shareRequests, setShareRequests] = useState([]);

	const token = Cookie.get("token");

	const getData = async (loadingName, setData, fetch_) => {
		setLoading(l => ({ ...l, [loadingName]: true }));
		const data = await fetch_(token);
		setLoading(l => ({ ...l, [loadingName]: false }));
		setData(data);
	};

	const getShareRequestsListData = async () => {
		getData("shareRequestListLoading", setShareRequests, await RegisterService.getPresentationByDid(register.did));
	};

	const [image, setImage] = useState({
		src: "",
		alt: "Issuer Image"
	});
	const [loading, setLoading] = useState(false);
	const { did, name, createdOn, expireOn, blockHash, messageError, status, blockchain, description, imageId } =
		register;

	const fetchImage = async id => {
		try {
			setLoading(true);
			const img = await ImageService.getImage(id);
			setImage({ src: img || placeholder });
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchImage(imageId);
	}, [imageId]);

	const createdOn_ = formatDate(createdOn);
	const expireOn_ = formatDate(expireOn);
	const statusNotAllowed = [CREATING, ERROR, REVOKING, REVOKED];

	const close = () => {
		setModalOpen(false);
	};

	const prepareDataForTable = shareRequests => {
		return shareRequests?.list.map(shareReq =>
			getShareReqData(
				{ ...shareReq.payload, name: shareReq?.name, createdAt: shareReq.createdAt },
				selectPresentation(setDetailModalOpen)
			)
		);
	};

	useEffect(() => {
		register?.did && getShareRequestsListData();
	}, [register]);

	return (
		<Dialog open={modalOpen} onClose={close}>
			<DialogTitle id="form-dialog-title">
				<ModalTitle title={TITLE} />
			</DialogTitle>
			<DialogContent style={{ margin: "0px 0 25px" }}>
				<Grid container item xs={12} justify="center" direction="column" style={{ marginBottom: "5px" }}>
					<KeyValue field="DID" value={did} />
					<KeyValue field="Blockchain" value={blockchain} />
					<KeyValue field="Nombre" value={name} />
					<KeyValue field="Descripcion" value={description} />
					<KeyValue field="Fecha de Registro" value={createdOn_} />
					<KeyValue field="Imagen" value={""} />
					{expireOn_ && expireOn_ !== "-" && <KeyValue field="Fecha de Expiración" value={expireOn_} />}
					{blockHash && <KeyValue field="Hash de Transacción" value={blockHash} />}
					<Image loading={loading} image={image} />
					{messageError && <CollapseMessageError messageError={messageError} blockchain={blockchain} status={status} />}

					<KeyValue field="Presentaciones" value={""} />
					<ReactTable
						style={{ marginTop: "0.5em" }}
						sortable={true}
						previousText={Messages.LIST.TABLE.PREV}
						nextText={Messages.LIST.TABLE.NEXT}
						data={shareRequests?.list && prepareDataForTable(shareRequests)}
						columns={getShareReqColumns()}
						minRows={Constants.CERTIFICATES.TABLE.MIN_ROWS}
						defaultPageSize={5}
					/>
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
			{presentationSelected ? (
				<>
					<PresentationDetails
						modalOpen={detailModalOpen}
						setModalOpen={setDetailModalOpen}
						presentation={presentationSelected}
					/>
				</>
			) : null}
		</Dialog>
	);
};

export default ModalDetail;
