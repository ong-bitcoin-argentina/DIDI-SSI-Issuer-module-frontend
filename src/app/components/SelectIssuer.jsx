import React, { useState }  from "react";
import { Typography, TextField } from "@material-ui/core";
import DefaultButton from "../setting/default-button";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";

const SelectIssuers = ({ setIssuers, issuers }) => {
  const [issuer, setIssuer] = useState({
    did: '',
    url: '',
  });
  
  const columns = [{
      Header: 'DID',
      accessor: 'did'
    }, {
      Header: 'URL',
      accessor: 'url',
    },
  ];

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
    <div className="Data DataEmisores">
      <Typography variant="subtitle1">
        <strong>Emisores: </strong>
      </Typography>
      <Typography class="subtitle">Agregue Emisores a la credencial</Typography>
      <ReactTable
        sortable={false}
        data={issuers}
        columns={columns}
        minRows={1}
        noDataText={"Agregue Emisores a la credencial"}
        showPagination={false}
        loading={false}
        style={{ textAlign: "center" }}
			/>
      <div className="formDataEmisor">
        <TextField
          key={'issuerDid'}
          name={'issuerDid'}
          style={{ marginBottom: "0px" }}
          label={'Did del emisor'}
          value={issuer.did}
          onChange={handleChange}
          type={'text'}
          size={"small"}
          fullWidth
        />
        <TextField
          key={'issuerUrl'}
          name={'issuerUrl'}
          style={{ marginBottom: "5px" }}
          label={'Url del emisor (opcional)'}
          value={issuer.url}
          onChange={handleChange}
          type={'text'}
          size={"small"}
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
    </div>
	);
};

export default SelectIssuers;
