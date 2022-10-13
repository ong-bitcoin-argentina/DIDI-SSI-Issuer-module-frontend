import { Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import React from "react";
import Messages from "../utils/constants/Messages";
import DefaultButton from "./default-button";

const ConfirmationDenegateDialog = ({ modalOpen, setModalOpen, onConfirm, title, message, confirm }) => {

  const close = () => {
		setModalOpen(false);
	};

	return (
    <Dialog className="dialogBox" open={modalOpen} onClose={close} aria-labelledby="form-dialog-title">
      <DialogTitle id="DialogTitle">{title}</DialogTitle>
      <DialogContent>
        {message && (
          <div className="errorMessage">
            <span class="material-icons" style={{ marginBottom: "25px" }}>
              dangerous
            </span>
            {message}
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <DefaultButton funct={close} otherClass="DangerButtonOutlined" name={Messages.LIST.DIALOG.CANCEL} />
        <DefaultButton
          funct={onConfirm}
          name={confirm}
        />
      </DialogActions>
    </Dialog>
	);
};

export default ConfirmationDenegateDialog;
