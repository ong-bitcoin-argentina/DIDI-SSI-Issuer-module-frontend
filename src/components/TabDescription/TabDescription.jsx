import { Grid } from "@material-ui/core";
import React from "react";
import Messages from "../../utils/constants/Messages";
import "./_style.scss";

const TabDescription = ({ tabName }) => {
	return (
		<Grid container columns={12} direction="column" className="tab-description">
			<h1 className="m-0 p-0">{Messages.TAB_TEXT[tabName].TITLE}</h1>
			<p>{Messages.TAB_TEXT[tabName].DESCRIPTION}</p>
		</Grid>
	);
};

export default TabDescription;
