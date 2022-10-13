import { Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import React from "react";
//REVISAR
import DefaultButton from "./default-button";
import Messages from "../utils/constants/Messages";

const ConfirmationDialog = ({ modalOpen, setModalOpen, onDelete, title, message, confirm }) => {

  const close = () => {
		setModalOpen(false);
	};

	return (
    <Dialog className="dialogBox" open={modalOpen} onClose={close} aria-labelledby="form-dialog-title">
      <DialogTitle id="DialogTitle">{title}</DialogTitle>
      <DialogContent>
        {message && (
          <div className="DeleteMessage">
            <span class="material-icons" style={{ marginBottom: "25px" }}>
              delete_outline
            </span>
            {message}
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <DefaultButton funct={close} otherClass="DangerButtonOutlined" name={Messages.LIST.DIALOG.CANCEL} />
        <DefaultButton
          funct={onDelete}
          name={confirm}
        />
      </DialogActions>
    </Dialog>
	);
};

export default ConfirmationDialog;
