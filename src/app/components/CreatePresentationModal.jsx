import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	List,
	ListItem,
	ListItemText,
	TextField,
	Typography
} from "@material-ui/core";
import React, { useState } from "react";
import PropTypes from "prop-types";
import ModalTitle from "../utils/modal-title";
import DefaultButton from "../setting/default-button";
import SelectClaims from "./SelectClaims";
import { CERT_CATEGORIES } from "../presentations/list/constants";


const TITLE = "Nueva Presentación";

const CreatePresentationModal = ({ open, close, onSubmit, title }) => {
	const [newPresentation, setNewPresentation] = useState({ name: '', claims: []});
	const [selectedName, setSelectedName] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [category, setCategory] = useState('');
  const [reason, setReason] = useState('');
  const [required, setRequired] = useState(false);
	const [issuers, setIssuers] = useState([]);
	const [selectedCategories, setSelectedCategories] = useState([]);


	const resetState = () => {
		setNewPresentation({ name: '', claims: []});
		setSelectedName(false);
		setCategory('');
		setReason('');
		setIssuers([]);
		setSelectedCategories([]);
		setRequired(false);
		setError("");
	};

	const handleSubmit = async (event, values) => {
		const iat = Date.now();
		try {
			setNewPresentation({ ...newPresentation, iat })
			onSubmit(newPresentation);
			resetState();
			setError("");
		} catch (error) {
			setLoading(false);
			setError(error.message);
		}
	};

	const handleCancel = event => {
		event.preventDefault();
		event.target.reset();
		resetState();
		close();
	};

	const handleChange = event => {
		const { name, value } = event.target;
		setNewPresentation(presentation => ({ ...presentation, [name]: value }));
	};

	const handleSetName = () => {
		setSelectedName(true);
	};

	const addClaim = () => {
		setNewPresentation(presentation => {
			return ({
					...presentation,
					claims: [...presentation.claims, [category, { reason, issuers, required }]],
				})
		});
		setSelectedCategories([...selectedCategories, category]);
		setCategory('');
		setReason('');
		setSelectedCategories([]);
		setIssuers([]);
		setRequired(false);
	};

	return (
		<Dialog open={open}>
			<form onSubmit={handleSubmit} onReset={handleCancel}>
				<DialogTitle id="form-dialog-title">
					<ModalTitle title={`${title} ${TITLE}`} />
				</DialogTitle>
				<DialogContent style={{ margin: "0px 0 25px" }}>
						<Grid container item xs={12} justify="center">
							<Grid item xs={9}>
								{selectedName ?
									<>
										<Typography variant="h6">
											<strong>Nombre: </strong>{newPresentation.name}
										</Typography>
										<Typography variant="h6">
											<strong>Credenciales: </strong>
										</Typography>
										<List dense={true} disablePadding={true} >
											{newPresentation.claims.map(claim => {
												return (
													<ListItem>
														<ListItemText
															primaryTypographyProps={{ style: { fontSize: 18 } }}
															primary={`- ${CERT_CATEGORIES[claim[0]]}`}
														/>
													</ListItem>
												)})}
										</List>
										<SelectClaims 
											setCategory={setCategory}
											setReason={setReason}
											setRequired={setRequired}
											setIssuers={setIssuers}
											newClaim={{
												category,
												reason,
												required,
											}}
											issuers={issuers}
											selectedCategories={selectedCategories}
										/>
									</>
								: 
									<TextField
										key={'name'}
										style={{ marginBottom: "25px" }}
										label={'Nombre'}
										onChange={handleChange}
										name={'name'}
										required={true}
										type={'text'}
										fullWidth
									/>}
								{error && <div className="errMsg">{error}</div>}
							</Grid>

					</Grid>
				</DialogContent>
				<DialogActions>
					<DefaultButton otherClass="DangerButtonOutlined" name="Cancelar" type="reset" disabled={loading} />
					{!selectedName ? 
						<DefaultButton funct={() => handleSetName()} name={'Agregar credenciales'} type="otherClass" disabled={loading} loading={loading} />
					: 	
					<>
						<DefaultButton 
							funct={() => addClaim()} 
							name={'Agregar credencial'} 
							type="otherClass" 
							disabled={loading || reason === '' || category === '' || issuers.length === 0} 
						/>
						<DefaultButton 
							funct={() => handleSubmit()} 
							name={title} 
							type="submit" 
							disabled={loading || !newPresentation.claims} loading={loading} 
						/>
					</>}
				</DialogActions>
			</form>
		</Dialog>
	);
};

CreatePresentationModal.propTypes = {
	newPresentationData: PropTypes.object,
	open: PropTypes.bool.isRequired,
	onSubmit: PropTypes.func.isRequired,
	close: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired
};

CreatePresentationModal.defaultProps = {
	property: {}
};

export default CreatePresentationModal;
