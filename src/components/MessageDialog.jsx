import { Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import React from "react";
import DefaultButton from "./default-button";
import Messages from "../utils/constants/Messages";

const MessageDialog = ({ modalOpen, setModalOpen, title, message, severity = 'error' }) => {

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
              {severity}
            </span>
            {message}
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <DefaultButton funct={close} otherClass="DangerButtonOutlined" name={Messages.LIST.DIALOG.CLOSE} />
      </DialogActions>
    </Dialog>
	);
};

export default MessageDialog;
