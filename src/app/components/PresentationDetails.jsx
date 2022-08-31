import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	List,
	ListItem,
	ListItemText,
	Typography
} from "@material-ui/core";
import React from "react";
import moment from "moment";
import ModalTitle from "../utils/modal-title";
import DefaultButton from "../setting/default-button";
import { DATE_FORMAT } from "../../constants/Constants";
const TITLE = "Detalle de la Presentación";

const formatDate = date => (date ? moment(date).format(DATE_FORMAT) : "-");

const KeyValue = ({ field, value }) => (
	<Typography variant="subtitle2">
		<b>{field}</b>: {value}
	</Typography>
);

const PresentationDetails = ({ modalOpen, setModalOpen, presentation, cred_categories }) => {
	const { name, createdOn, createdAt, claims } = presentation ? presentation : null;

	const createdOnDate = createdOn || createdAt;
	const formattedCreationDate = formatDate(createdOnDate);
	const close = () => {
		setModalOpen(false);
	};
	let credentials = [];
  Object.entries(claims.verifiable).forEach(([key, value]) =>
    credentials.push({
			[key]: {
				value
			}
		})
	);
  
	return (
    <Dialog open={modalOpen} onClose={close}>
      <DialogTitle id="form-dialog-title">
        <ModalTitle title={TITLE} />
      </DialogTitle>
      <DialogContent style={{ margin: "0px 0 25px" }}>
        <Grid container item xs={12} justify="center" direction="column" style={{ marginBottom: "5px" }}>
          <KeyValue field="Nombre" value={name} />
          <KeyValue field="Fecha de creación" value={formattedCreationDate} />
          <Typography variant="subtitle2">
            <strong>Credenciales: </strong>
          </Typography>
          <List dense={true} disablePadding={true} >
            {credentials.map((cred) => {
              const entries = Object.entries(cred);
              const key = entries[0][0];
              const { value } = entries[0][1];
              const { reason, required:essential, iss } = value; 
              const required = essential ? 'Si' : 'No';
              const issuers = iss ? iss : value.issuers;
              return (
                <>
                  <ListItemText primary={`- ${key}: `} />
                  <ListItem>
                    <ListItemText secondary={`- Razón: ${reason}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText secondary={`- Requerido: ${required}`} />
                  </ListItem>
                  <ListItem>
                    <List dense={true} disablePadding={true} >
                      <ListItemText primary={'- Emisores autorizados: '} />
                      {issuers.map(issuer => {
                        return (
                          <>
                            <ListItem>
                              <ListItemText secondary={`- Did: ${issuer.did}`} />
                            </ListItem>
                            <ListItem>
                              <ListItemText secondary={`- Url: ${issuer.url}`} />
                            </ListItem>
                          </>
                        )})}
                    </List>
                  </ListItem>
                </>
            )})}
          </List>
        </Grid>
      </DialogContent>
      <DialogActions style={{ padding: "2em 25px" }}>
        <DefaultButton funct={close} name="Cerrar" />
      </DialogActions>
    </Dialog>
	);
};

export default PresentationDetails;
