import React, { useState }  from "react";
import { Typography, TextField, List, ListItem, ListItemText } from "@material-ui/core";
import DefaultButton from "./default-button";

const SelectIssuers = ({ setIssuers, issuers }) => {
  const [issuer, setIssuer] = useState({
    did: '',
    url: '',
  });

  const handleChange = (event) => {
    const {
      target: { value, name }
    } = event;
    if (name === 'issuerDid') {
      setIssuer({...issuer, did: value });
    } else {
      setIssuer({...issuer, url: value});
    }
  };

  const addIssuer = () => {
    setIssuers([...issuers, issuer]);
    setIssuer({ did: '', url: '' });
  }

	return (
    <div className="Data">
      <Typography variant="subtitle1">
        <strong>Emisores: </strong>
      </Typography>
      <List dense={true} disablePadding={true} >
        {issuers.map((iss, index) => {
          return (
            <ListItem divider={true} key={index}>
              <ListItemText primary={`-${iss.did}`} />
            </ListItem>
          )})}
      </List>
      <TextField
        key={'issuerDid'}
        name={'issuerDid'}
        style={{ marginBottom: "5px" }}
        label={'Did del emisor'}
        value={issuer.did}
        onChange={handleChange}
        type={'text'}
        fullWidth
      />
      <TextField
        key={'issuerUrl'}
        name={'issuerUrl'}
        style={{ marginBottom: "15px" }}
        label={'Url del emisor (opcional)'}
        value={issuer.url}
        onChange={handleChange}
        type={'text'}
        fullWidth
      />
      <div style={{ display: 'flex' }}>
        <DefaultButton 
          funct={addIssuer} 
          name={'Agregar emisor'}
          type="otherClass" 
          disabled={issuer.did === ''} 
        />
      </div>
    </div>
	);
};

export default SelectIssuers;
