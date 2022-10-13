import React, { useState, useEffect } from "react";
import KeyValue from "./KeyValue";
import { CircularProgress, Grid } from "@material-ui/core";
import Messages from "../utils/constants/Messages";

const TableSubComponent = ({ loadData }) => {
	const [loading, setloading] = useState(true);
	const [data, setData] = useState();

	useEffect(() => {
		loadData.then((response) => {
			setData(response);
			setloading(false);
		});
	}, [loadData]);

	return (
			<>
			{(loading && (
				<CircularProgress />
			)
			)}
			{(!loading && (
				<Grid container spacing={1} justify="left" style={{margin: "0px 40px 0px 40px"}} >
				{
					data.decoded.payload.vc.map((vc) => {
						return Object.values(vc.vc.credentialSubject).map((d) => {
							return Object.keys(d.data).map((key) => {
								return <Grid item xs={6}><KeyValue field={Messages.CREDENTIAL.TRANSLATE_NAMES(key)} value={d.data[key]} /></Grid>
							});
						})
					})
				}
				</Grid>
			)
			)}
			</>
	);
};

export default TableSubComponent;
