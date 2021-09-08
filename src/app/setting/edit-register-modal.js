import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, InputLabel, CircularProgress } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import RegisterService from "../../services/RegisterService";
import ImageService from '../../services/ImageService';
import Cookie from "js-cookie";
import ModalTitle from "../utils/modal-title";
import DefaultButton from "./default-button";
import ImgPrev from "../components/ImgPreview/ImgPrev";
import INPUTS from "./inputs";

const TITLE = "Editar informacion del Emisor";

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
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
	 }
	};

	let inputs = INPUTS;
	inputs[0].initial = data.name;
	inputs[1].initial = data.description;

	useEffect(() => {
		setData(register);
	}, [register]);

	useEffect(() => {
		setImage(null);
		fetchImage(data.imageId);
	}, [data.imageId]);
	
	const handleChange = event => {
		const { name, value } = event.target;
		setData(reg => ({ ...reg, [name]: value }));
	};

	const handleSubmit = async event => {
		event.preventDefault();
		try {
			const token = Cookie.get("token");
			const { did, ...others } = data;
			const formData = new FormData();
			Object.entries(others).forEach(([k,v]) => formData.append(k, v));
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

	const handleImage = (e) => {
		if(e.target.files[0]) {
      const file = e.target.files[0];
			setData({...data, file})
      setImage(URL.createObjectURL(file));
    } 
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
							{inputs.map(({ name, placeholder, disabled, initial }, index) => (
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
