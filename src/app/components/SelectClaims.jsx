import React from "react";
import { 
  Select,
  Typography,
  ListItemText,
  MenuItem,
  TextField,
  Checkbox,
} from "@material-ui/core";

import SelectIssuers from "./SelectIssuer";

const SelectClaims = ({ setCategory, setReason, setRequired, setIssuers, newClaim, issuers, selectedCategories, cred_categories }) => {
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

  const categories = Object.keys(cred_categories).filter(category => {
    return !selectedCategories.includes(category)
  });

	return (
    <div className="Data" sx={{ m: 1, width: 300 }}>
        {categories.length > 0 ? 
          <>
            <Typography variant="subtitle1">Seleccione tipo de credencial</Typography>
            <Select
              labelId="selectClaims"
              id="selectClaims"
              value={category}
              onChange={handleSelectChange}
              renderValue={(selected) => (cred_categories && cred_categories.hasOwnProperty(selected) ? cred_categories[selected] : selected)}
            >
            {categories.map((claim) => (
              <MenuItem key={claim} value={claim}>
                <ListItemText primary={cred_categories && cred_categories.hasOwnProperty(claim) ? cred_categories[claim] : claim} />
              </MenuItem>
            ))}
            </Select>
            <TextField
              key={'reason'}
              name={'reason'}
              style={{ marginTop: "0px", marginBottom: "10px" }}
              label={'Porque se solicita'}
              value={reason}
              onChange={handleChange}
              type={'text'}
              size={"small"}
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
    </div>
	);
};

export default SelectClaims;
