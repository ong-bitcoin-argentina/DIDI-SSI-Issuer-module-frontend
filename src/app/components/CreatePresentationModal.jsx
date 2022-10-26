import React, { useState, useEffect } from "react";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	ListItemText,
	MenuItem,
	Select,
	TextField,
	Typography
} from "@material-ui/core";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import PropTypes from "prop-types";
import ModalTitle from "../utils/modal-title";
import DefaultButton from "../setting/default-button";
import SelectClaims from "./SelectClaims";
import RegisterService from "../../services/RegisterService";
import Cookie from "js-cookie";
import { API_ROUTES } from "../../constants/Constants";

const TITLE = "Nuevo Requerimiento";

const CreatePresentationModal = ({ open, close, onSubmit, title, cred_categories }) => {
	const [newPresentation, setNewPresentation] = useState({ name: '', callback: API_ROUTES.PATH, claims: []});
	const [selectedName, setSelectedName] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [category, setCategory] = useState('');
  const [reason, setReason] = useState('');
  const [required, setRequired] = useState(false);
	const [issuers, setIssuers] = useState([]);
	const [register, setRegister] = useState({ name: '' });
	const [registers, setRegisters] = useState([]);
	const [selectedCategories, setSelectedCategories] = useState([]);

	const getRegisters = async () => {
		setLoading(true);
		const token = Cookie.get("token");
		try {
			setRegisters(await RegisterService.getAll({ status: "Creado" })(token));
		} catch (error) {
			setError(error.message);
		}
		setLoading(false);
	};

	useEffect(() => {
		getRegisters();
	}, [])


	const resetState = () => {
		setNewPresentation({ name: '', callback: API_ROUTES.PATH, claims: []});
		setSelectedName(false);
		setCategory('');
		setReason('');
		setIssuers([]);
		setSelectedCategories([]);
		setRegister({ name: '' })
		setRequired(false);
		setError("");
	};

	const handleSubmit = () => {
		const iat = Date.now();
		try {
			setNewPresentation({ ...newPresentation, iat })
			onSubmit(newPresentation);
			resetState();
			setError("");
			close();
		} catch (error) {
			setLoading(false);
			setError(error.message);
		}
	};

	const handleCancel = event => {
		event.preventDefault();
		resetState();
		close();
	};

	const handleChange = event => {
		const { name, value } = event.target;
		setNewPresentation(presentation => ({ ...presentation, [name]: value }));
	};

	const handleRegisterChange = event => {
		const { value } = event.target;
		setRegister(value)
		setNewPresentation(presentation => ({ ...presentation, registerDid: value.did }));
	}

	const handleSetName = () => {
		setSelectedName(true);
	};

	const addClaim = () => {
		setNewPresentation(presentation => {
			return ({
					...presentation,
					claims: [...presentation.claims, [category, { reason, iss:issuers, required }]],
				})
		});
		setSelectedCategories([...selectedCategories, category]);
		setCategory('');
		setReason('');
		setIssuers([]);
		setRequired(false);
	};

	const columns = [{
			Header: 'Credencial',
			accessor: 'cred'
		},
		{
			Header: 'Requerida',
			accessor: 'required_str',
		},
		{
			Header: 'Cant.Emisores',
			accessor: 'iss_count'
		},
	];
	
	return (
		<Dialog open={open} class="presentationDialog">
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
										<strong>Emisor: </strong>{register.name}
									</Typography>
									<Typography variant="h6">
										<strong>Credenciales:</strong>
									</Typography>
									<Typography class="subtitle">Agregue Credenciales a este requerimiento</Typography>
									<ReactTable
										sortable={false}
										data={newPresentation.claims}
										columns={columns}
										minRows={1}
										noDataText={"Agregue Credenciales a este requerimiento"}
										showPagination={false}
										loading={false}
										resolveData={data => data.map(claim => {
											claim.cred = `${cred_categories && cred_categories.hasOwnProperty(claim[0]) ? cred_categories[claim[0]] : claim[0]}`;
											claim.required_str = claim[1].required ? 'requerido' : '';
											claim.iss_count = claim[1].iss.length;
											return claim;
										})}
										style={{ textAlign: "center" }}
									/>
									<div className="DataCredenciales">
										<Typography variant="h7">
											<strong>Nueva Credencial</strong>
										</Typography>
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
											cred_categories={cred_categories}
										/>
									</div>
								</>
							: 
								<>
									<TextField
										key={'name'}
										style={{ marginBottom: "25px" }}
										label={'Nombre'}
										onChange={handleChange}
										name={'name'}
										required={true}
										type={'text'}
										fullWidth
									/>
									<TextField
										key={'callback'}
										style={{ marginBottom: "25px" }}
										label={'Callback'}
										onChange={handleChange}
										name={'callback'}
										required={true}
										type={'text'}
										value={newPresentation.callback}
										fullWidth
									/>
									{registers && (
										<>
											<Typography variant="subtitle1">Emisor asignado: </Typography>
											<Select
												labelId="Emisor asignado a la presentacion: "
												id="selectRegister"
												value={register}
												onChange={handleRegisterChange}
											>
												{registers.map((reg) => (
													<MenuItem key={reg.did} value={reg}>
														<ListItemText primary={reg.name} />
													</MenuItem>
												))}
											</Select>
										</>
										)}
								</>}
							{error && <div className="errMsg">{error}</div>}
						</Grid>

				</Grid>
			</DialogContent>
			<DialogActions>
				<DefaultButton funct={handleCancel} otherClass="DangerButtonOutlined" name="Cancelar" type="reset" disabled={loading} />
				{!selectedName ? 
					<DefaultButton 
						funct={handleSetName} 
						name={'Agregar credenciales'} 
						type="otherClass" 
						disabled={loading || register.name === '' || newPresentation.name === '' || newPresentation.callback === ''} 
						loading={loading} 
					/>
				: 	
				<>
					<DefaultButton 
						funct={addClaim} 
						name={'Agregar credencial'} 
						type="otherClass" 
						disabled={loading || reason === '' || category === '' || issuers.length === 0} 
					/>
					<DefaultButton 
						funct={handleSubmit} 
						name={title} 
						type="submit" 
						disabled={loading || newPresentation.claims.length === 0} loading={loading} 
					/>
				</>}
			</DialogActions>
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
