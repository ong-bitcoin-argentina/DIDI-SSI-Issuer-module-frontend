import React  from "react";
import { 
  FormControl,
  Select,
  Typography,
  ListItemText,
  MenuItem,
  TextField,
  Checkbox,
} from "@material-ui/core";

import { CERT_CATEGORIES, VC_CATEGORIES } from "../presentations/list/constants";
import SelectIssuers from "./SelectIssuer";

const SelectClaims = ({ setCategory, setReason, setRequired, setIssuers, newClaim, selectedCategories, issuers }) => {
  const { category, reason, required } = newClaim;

  const handleSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategory(value);
  };

  const handleChange = (event) => {
    setReason(event.target.value)
  }

  const toggle = (event) => {
    setRequired(event.target.checked);
  }

  const categories = VC_CATEGORIES.filter(category => {
    return !selectedCategories.includes(category)
  });

	return (
    <div className="Data">
      <FormControl sx={{ m: 1, width: 300 }}>
        {categories.length > 0 ? 
          <>
            <Typography variant="subtitle1">Seleccione credenciales</Typography>
            <Select
              labelId="selectClaims"
              id="selectClaims"
              value={category}
              onChange={handleSelectChange}
              renderValue={(selected) => CERT_CATEGORIES[selected]}
            >
            {categories.map((claim) => (
              <MenuItem key={claim} value={claim}>
                <ListItemText primary={CERT_CATEGORIES[claim]} />
              </MenuItem>
            ))}
            </Select>
            <TextField
              key={'reason'}
              name={'reason'}
              style={{ marginTop: "25px", marginBottom: "30px" }}
              label={'Porque se solicita'}
              value={reason}
              onChange={handleChange}
              type={'text'}
              fullWidth
            /> 
            <div style={{ display: "flex" }}>
              <Typography variant="subtitle1">Requerido: </Typography>
              <Checkbox
                style={{ marginTop: "-7px" }} 
                onChange={toggle}
                checked={required}
              />
            </div>
            <SelectIssuers issuers={issuers} setIssuers={setIssuers} />
          </>
          : <Typography variant="subtitle1">Se seleccionaron todas las categorias disponibles, haga click en crear para finalizar.</Typography>}
      </FormControl>
    </div>
	);
};

export default SelectClaims;
