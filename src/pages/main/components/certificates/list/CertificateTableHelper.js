import React from "react";
import Messages from "../../../../../utils/constants/Messages";
import Constants, { DATE_FORMAT } from "../../../../../utils/constants/Constants";

import Checkbox from "@material-ui/core/Checkbox";
import TableHeadCheck from "../../../../../components/TableHeadCheck";


import {
	PENDING_ACTIONS,
	EMMITED_ACTIONS,
	BASE_COLUMNS,
	EMMITED_COLUMNS,
	REVOCATION_REASONS_PLAIN,
	REVOKED_ACTIONS
} from "../../../../../utils/constants/CertificateDefinitions";
import moment from "moment";
import { Tooltip } from "@material-ui/core";
import { validateAccess } from "../../../../../utils/constants/Roles";
import CustomSelect from "../../../../../components/CustomSelect";
import InputFilter from "../../../../../components/InputFilter";
import DateRangeFilter from "../../../../../components/DateRangeFilter/DateRangeFilter";

const { CERT, EMISSION_DATE, EMISSION_DATE2, REVOCATION, BLOCKCHAIN, CRATED_DATE, SELECT } = Messages.LIST.TABLE;

class CertificateTableHelper {
	static baseCells = cert => ({
		_id: cert._id,
		blockchain: cert.blockchain ? cert.blockchain.toUpperCase() : "RSK",
		certName: cert.name,
		createdOn: cert.emmitedOn ? moment(cert.emmitedOn).format(DATE_FORMAT) : "-",
		did: cert.did
	});

	// genera las columnas de la tabla de credencial
	static getCertificatesPendingData(cert, selectedCertificates, onSelectToggle, onEmmit, onEdit, onDelete, isLoading) {
		const { createdOn, blockchain } = cert;
		const ACTIONS = PENDING_ACTIONS({ cert, onEmmit, onEdit, onDelete });
		const onToggle = (_, value) => {
			onSelectToggle(cert._id, value);
		};

		return {
			...this.baseCells(cert),
			createdOn: createdOn ? moment(createdOn).format(DATE_FORMAT) : "-",
			blockchain: blockchain ? blockchain.toUpperCase() : "-",
			select: (validateAccess(Constants.ROLES.Delete_Certs) || validateAccess(Constants.ROLES.Write_Certs)) && (
				<div className="Actions">
					<Checkbox checked={selectedCertificates[cert._id]} onChange={onToggle} />
				</div>
			),
			actions: (
				<div className="Actions">
					{ACTIONS.map(
						(item, index) =>
							item.enabled && (
								<div className={item.className} onClick={item.action} key={index}>
									<Tooltip arrow title={item.label} placement="top">
										{item.iconComponent}
									</Tooltip>
								</div>
							)
					)}
				</div>
			)
		};
	}

	static getCertificatesEmmitedData(cert, selectedCertificates, onSelectToggle, onView, onRevoke) {
		const ACTIONS = EMMITED_ACTIONS({ cert, onView, onRevoke });

		const onToggle = (_, value) => {
			onSelectToggle(cert._id, value);
		};

		return {
			...this.baseCells(cert),
			select: validateAccess(Constants.ROLES.Delete_Certs) && (
				<div className="Actions">
					<Checkbox checked={selectedCertificates[cert._id] || false} onChange={onToggle} />
				</div>
			),
			actions: (
				<div className="Actions">
					{ACTIONS.map(
						(item, index) =>
							item.enabled && (
								<div className={item.className} onClick={item.action} key={index}>
									<Tooltip title={item.label} placement="top" arrow>
										{item.iconComponent}
									</Tooltip>
								</div>
							)
					)}
				</div>
			)
		};
	}

	static getCertificatesRevokedData(cert, onView) {
		const ACTIONS = REVOKED_ACTIONS({ cert, onView });

		return {
			...this.baseCells(cert),
			revokedOn: moment(cert.revocation.date).format(DATE_FORMAT),
			revokeReason: REVOCATION_REASONS_PLAIN[cert.revocation.reason],
			actions: (
				<div className="Actions">
					{ACTIONS.map((item, index) => (
						<div className={item.className} onClick={item.action} key={index}>
							<Tooltip title={item.label} placement="top" arrow>
								{item.iconComponent}
							</Tooltip>
						</div>
					))}
				</div>
			)
		};
	}

	// genera los headers para las columnas de la tabla de credencial
	static getCertColumns(
		certificates,
		selectedCerts,
		allSelectedCerts,
		onCertificateSelectAllToggle,
		onTemplateFilterChange,
		onDidFilterChange,
		onBlockchainFilterChange,
		isLoading
	) {
		const certNames = [...new Set(certificates.map(cert => cert.certName))];

		const COLUMNS = EMMITED_COLUMNS({ onDidFilterChange });

		const LIST_COLUMNS = [
			...COLUMNS.map(item => ({
				Header: (
					<div className="SelectionTable">
						<InputFilter label={item.label} onChange={item.action} />
					</div>
				),
				accessor: item.accessor
			})),
			{
				Header: (
					<div className="SelectionTable">
						<CustomSelect options={certNames} label={CERT} onChange={onTemplateFilterChange} />
					</div>
				),
				accessor: "certName"
			},
			{
				Header: (
					<div className="SelectionTable">
						<CustomSelect options={Constants.BLOCKCHAINS} label={BLOCKCHAIN} onChange={onBlockchainFilterChange} />
					</div>
				),
				accessor: "blockchain"
			},
			{
				Header: CRATED_DATE,
				accessor: "createdOn"
			},
			{
				Header: (
					<div className="HeaderText">
						<p>Acciones</p>
					</div>
				),
				accessor: "actions"
			}
		];

		const select = {
			Header: (
				<TableHeadCheck selected={selectedCerts} all={allSelectedCerts} onChange={onCertificateSelectAllToggle} />
			),
			accessor: "select"
		};

		if (validateAccess(Constants.ROLES.Delete_Certs) || validateAccess(Constants.ROLES.Write_Certs))
			LIST_COLUMNS.push(select);

		return LIST_COLUMNS;
	}

	static getCertEmmitedColumns(
		certificates,
		selectedRows,
		isAllSelected,
		isIndeterminated,
		onSelectAllToggle,
		onFilterChange,
		onDateRangeFilterChange
	) {
		// TODO: refactor this to get templates names from backend
		const certNames = [...new Set(certificates.map(cert => cert.certName))];

		const LIST_COLUMNS = [
			...BASE_COLUMNS.map(item => ({
				Header: <InputFilter label={item.label} onChange={onFilterChange} field={item.accessor} />,
				accessor: item.accessor
			})),
			{
				Header: (
					<div className="SelectionTable">
						<CustomSelect options={certNames} label={CERT} onChange={onFilterChange} field="certName" />
					</div>
				),
				accessor: "certName"
			},
			{
				Header: (
					<div className="SelectionTable">
						<CustomSelect
							options={Constants.BLOCKCHAINS}
							label={BLOCKCHAIN}
							onChange={onFilterChange}
							field="blockchain"
						/>
					</div>
				),
				accessor: "blockchain"
			},
			{
				Header: <DateRangeFilter label={`${EMISSION_DATE} ${EMISSION_DATE2}`} onChange={onDateRangeFilterChange} />,
				accessor: "createdOn"
			},
			{
				Header: "Acciones",
				accessor: "actions"
			}
		];

		const selectedQuantity = Object.values(selectedRows).filter(val => val).length;

		const select = {
			Header: (
				<div className="SelectorHeader">
					<div className="HeaderText">
						<p>{SELECT}</p>
						<p>{selectedQuantity}</p>
					</div>
					<div className="Actions">
						<Checkbox checked={isAllSelected} onChange={onSelectAllToggle} indeterminate={isIndeterminated} />
					</div>
				</div>
			),
			accessor: "select"
		};

		if (validateAccess(Constants.ROLES.Delete_Certs)) LIST_COLUMNS.push(select);

		return LIST_COLUMNS;
	}

	static getCertRevokedColumns(certificates, onFilterChange) {
		// TODO: refactor this to get templates names from backend
		const certNames = [...new Set(certificates.map(cert => cert.certName))];

		return [
			...BASE_COLUMNS.map(item => ({
				Header: (
					<div className="SelectionTable">
						<InputFilter label={item.label} onChange={onFilterChange} field={item.accessor} />
					</div>
				),
				accessor: item.accessor
			})),
			{
				Header: (
					<div className="SelectionTable">
						<CustomSelect options={certNames} label={CERT} onChange={onFilterChange} field="certName" />
					</div>
				),
				accessor: "certName"
			},
			{
				Header: (
					<div className="SelectionTable">
						<CustomSelect
							options={Constants.BLOCKCHAINS}
							label={BLOCKCHAIN}
							onChange={onFilterChange}
							field="blockchain"
						/>
					</div>
				),
				accessor: "blockchain"
			},
			{
				Header: `${EMISSION_DATE} ${EMISSION_DATE2}`,
				accessor: "createdOn"
			},
			{
				Header: `${EMISSION_DATE} ${REVOCATION}`,
				accessor: "revokedOn"
			},
			{
				Header: `Motivo de Revocación`,
				accessor: "revokeReason"
			},
			{
				Header: "Acciones",
				accessor: "actions"
			}
		];
	}
}

export default CertificateTableHelper;
