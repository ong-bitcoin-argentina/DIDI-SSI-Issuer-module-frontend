import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, InputLabel, CircularProgress } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import RegisterService from "../../services/RegisterService";
import ImageService from '../../services/ImageService';
import Cookie from "js-cookie";
import ModalTitle from "../utils/modal-title";
import DefaultButton from "./default-button";
import ImgPrev from "../components/ImgPreview/ImgPrev";

const TITLE = "Editar informacion del Emisor";
const EQUALS_NAME_ERROR = "Ingrese un nuevo nombre";
const EQUALS_DESCRIPTION_ERROR = "Ingrese un nuevo nombre";

const EditRegisterModal = ({ modalOpen, setModalOpen, register, onAccept }) => {
	const [error, setError] = useState("");
	const [data, setData] = useState({});
	const [image, setImage] = useState();
	const [loading, setLoading] = useState(false);

	const fetchImage = async (id) => {
		try {
			setLoading(true);
			const img = await ImageService.getImage(id);
			setImage(img);
			setLoading(false);
		} catch (error) {
			setError(error.message);
		}
	};

	useEffect(() => {
		setData(register);
	}, [register]);

	useEffect(() => {
		setImage(null);
		fetchImage(data.imageId);
	}, [data.imageId]);

	const INPUTS = [
		{
			name: "name",
			placeholder: "Nombre",
			disabled: false,
			initial: data.name,
		},
		{
			name: "description",
			placeholder: "Descripción",
			disabled: false,
			initial: data.description,
		},
	];
	
	const handleChange = event => {
		const { name, value } = event.target;
		setData(reg => ({ ...reg, [name]: value }));
	};

	const handleSubmit = async event => {
		event.preventDefault();
		if (register.name === data.name) {
			setError(EQUALS_NAME_ERROR);
			return;
		}
		if (register.description === data.description) {
			setError(EQUALS_DESCRIPTION_ERROR);
			return;
		}

		try {
			const token = Cookie.get("token");
			const { name, description, file, did } = data;
			const formData = new FormData();
			formData.append('name', name);
			formData.append('description', description);
			formData.append('file', file);

			await RegisterService.editName(formData, did)(token);
			onAccept();
			handleReset();
		} catch (error) {
			setError(error.message);
		}
	};

	const handleReset = () => {
		setError("");
		setModalOpen(false);
	};

	const handleImage = file => {
		setData({...data, file})
	};

	return (
		<Dialog open={modalOpen}>
			<form onSubmit={handleSubmit} onReset={handleReset}>
				<DialogTitle id="form-dialog-title">
					<ModalTitle title={TITLE} />
				</DialogTitle>
				<DialogContent style={{ margin: "0 0 25px" }}>
					<Grid container justify="center" style={{ marginTop: "25px" }}>
						<Grid item xs={6}>
							{INPUTS.map(({ name, placeholder, disabled, initial }, index) => (
									<TextField
										disabled={disabled}
										key={index}
										style={{ marginBottom: "25px" }}
										id={`"emisor-${name}-input"`}
										label={placeholder}
										name={name}
										defaultValue={initial}
										type="text"
										required
										error={error}
										helperText={error}
										onChange={handleChange}
										fullWidth
									/>
								))}
							<label htmlFor="contained-button-file">
								<InputLabel id="file-select-image" style={{ marginBottom: "5px" }}>Seleccione una Imagen (Opcional)</InputLabel>
								{!loading ? 
									<ImgPrev handleImage={handleImage} image={image} /> 
								: 
									<Grid item xs={2} container justify="center" alignItems="center">
										<CircularProgress />
									</Grid>}								
							</label>								
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<DefaultButton otherClass="CreateButtonOutlined" name="Cerrar" type="reset" />
					<DefaultButton name="Aceptar" type="submit" />
				</DialogActions>
			</form>
		</Dialog>
	);
};

export default EditRegisterModal;
