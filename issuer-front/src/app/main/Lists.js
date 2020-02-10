import "./Lists.scss";
import React, { Component } from "react";
import { withRouter, Redirect } from "react-router";

import Cookie from "js-cookie";

import Constants from "../../constants/Constants";
import Messages from "../../constants/Messages";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import Templates from "../templates/list/Templates";
import TemplateTableHelper from "../templates/list/TemplateTableHelper";

import Certificates from "../certificates/list/Certificates";
import CertificateTableHelper from "../certificates/list/CertificateTableHelper";

import Participants from "../participants/Participants";
import ParticipantsTableHelper from "../participants/ParticipantsTableHelper";

import CertificateService from "../../services/CertificateService";
import TemplateService from "../../services/TemplateService";
import ParticipantsService from "../../services/ParticipantService";

class Lists extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			isDeleteDialogOpen: false,
			tabIndex: 1,
			partTypes: ["tel", "mail", "personal", "address"],
			parts: [],
			allSelectedParticipants: {
				tel: false,
				mail: false,
				personal: false,
				address: false
			},
			selectedParticipants: {
				tel: {},
				mail: {},
				personal: {},
				address: {}
			},
			selectedElems: {},
			certificates: [],
			filteredCertificates: [],
			templates: []
		};
	}

	// cargar certificados
	componentDidMount() {
		const splitPath = this.props.history.location.pathname.split("/");
		const active = splitPath[splitPath.length - 1];
		let tabIndex = active === "certificates" ? 1 : 0;

		const token = Cookie.get("token");
		const self = this;

		self.setState({ loading: true, tabIndex: tabIndex });
		ParticipantsService.getGlobal(
			async function(parts) {
				const allSelectedParticipants = self.state.allSelectedParticipants;
				const selectedParticipants = self.state.selectedParticipants;
				self.updateSelectedState(parts, selectedParticipants, allSelectedParticipants);

				TemplateService.getAll(
					token,
					async function(templates) {
						templates = templates.map(template => {
							return TemplateTableHelper.getTemplateData(
								template,
								self.onTemplateEdit,
								self.onTemplateDeleteDialogOpen
							);
						});
						const templateColumns = TemplateTableHelper.getTemplateColumns(templates);
						CertificateService.getAll(
							token,
							async function(certificates) {
								certificates = certificates.map(certificate => {
									return CertificateTableHelper.getCertificatesData(
										certificate,
										self.state.selectedElems,
										self.onCertificateSelectToggle,
										self.onCertificateEmmit,
										self.onCertificateEdit,
										self.onCertificateDeleteDialogOpen
									);
								});
								const certColumns = CertificateTableHelper.getCertColumns(
									certificates,
									self.onEmmitedFilterChange,
									self.onTemplateFilterChange,
									self.onFirstNameFilterChange,
									self.onLastNameFilterChange
								);

								self.setState({
									templates: templates,
									templateColumns: templateColumns,
									certificates: certificates,
									certColumns: certColumns,
									filteredCertificates: certificates,
									error: false,
									loading: false
								});
							},
							function(err) {
								self.setState({ error: err });
								console.log(err);
							}
						);
					},
					function(err) {
						self.setState({ error: err });
						console.log(err);
					}
				);
			},
			function(err) {
				self.setState({ error: err });
				console.log(err);
			}
		);
	}

	// seleccionar certificado a pedir para el participante
	onParticipantSelectToggle = (id, type, value) => {
		const allSelectedParticipants = this.state.allSelectedParticipants;
		const selectedParticipants = this.state.selectedParticipants;
		selectedParticipants[type][id] = value;
		this.updateSelectedState(this.state.parts, selectedParticipants, allSelectedParticipants);
	};

	// seleccionar certificado a pedir para todos los participantes
	onParticipantSelectAllToggle = (type, value) => {
		const parts = this.state.parts;
		const allSelectedParticipants = this.state.allSelectedParticipants;
		const selectedParticipants = this.state.selectedParticipants;

		parts.forEach(part => {
			if (!part[type]) selectedParticipants[type][part.did] = value;
		});
		allSelectedParticipants[type] = value;
		this.updateSelectedState(parts, selectedParticipants, allSelectedParticipants);
	};

	// actualizar seleccion de certificados a pedir para participantes
	updateSelectedState = (parts, selectedParts, allSelectedParticipants) => {
		const types = this.state.partTypes;
		parts.forEach(part => {
			types.forEach(type => {
				if (!part[type] && !selectedParts[type][part.did]) selectedParts[type][part.did] = false;
			});
		});

		types.forEach(type => {
			allSelectedParticipants[type] = true;
			for (let did of Object.keys(selectedParts[type])) {
				if (!selectedParts[type][did]) {
					allSelectedParticipants[type] = false;
				}
			}
		});

		this.setState({
			selectedParticipants: selectedParts,
			allSelectedParticipants: allSelectedParticipants
		});

		const participants = parts.map(participant => {
			return ParticipantsTableHelper.getParticipantData(
				participant,
				this.state.selectedParticipants,
				this.onParticipantSelectToggle
			);
		});

		const participantColumns = ParticipantsTableHelper.getParticipantColumns(
			this.state.allSelectedParticipants,
			this.onParticipantSelectAllToggle
		);

		this.setState({
			parts: parts,
			participants: participants,
			participantColumns: participantColumns
		});
	};

	// recargar tabla de participantes
	onParticipantsReload = () => {
		const self = this;
		self.setState({ loading: true });
		ParticipantsService.getGlobal(
			async function(parts) {
				parts.forEach(part => {
					self.state.partTypes.forEach(type => {
						self.state.selectedParticipants[type][part.did] = false;
					});
				});
				self.setState({
					selectedParticipants: self.state.selectedParticipants,
					allSelectedParticipants: self.state.allSelectedParticipants
				});

				const participants = parts.map(participant => {
					return ParticipantsTableHelper.getParticipantData(
						participant,
						self.state.selectedParticipants,
						self.onParticipantSelectToggle
					);
				});

				const participantColumns = ParticipantsTableHelper.getParticipantColumns(
					self.state.allSelectedParticipants,
					self.onParticipantSelectAllToggle
				);

				self.setState({
					allSelectedParticipants: self.state.allSelectedParticipants,
					participants: participants,
					participantColumns: participantColumns,
					error: false,
					loading: false
				});
			},
			function(err) {
				self.setState({ error: err });
				console.log(err);
			}
		);
	};

	// abrir dialogo de confirmacion para borrado de certificados
	onCertificateDeleteDialogOpen = id => {
		this.setState({ isDeleteDialogOpen: true, selectedCertId: id });
	};

	// cerrar dialogo de confirmacion para borrado de certificados
	onDeleteDialogClose = () => {
		this.setState({ isDeleteDialogOpen: false });
	};

	// borrar certificados
	onCertificateDelete = id => {
		const token = Cookie.get("token");
		const self = this;

		const cert = self.state.certificates.find(t => t._id === id);
		cert.actions = <div></div>;

		self.setState({ cert: self.state.certificates, loading: true });
		CertificateService.delete(
			token,
			id,
			async function(cert) {
				const certificates = self.state.certificates.filter(t => t._id !== cert._id);
				self.setState({ certificates: certificates, loading: false, error: false });
			},
			function(err) {
				self.setState({ error: err });
				console.log(err);
			}
		);
	};

	// selecciionar certificados para emision multiple
	onCertificateSelectToggle = (certId, value) => {
		const stateElem = this.state.selectedElems;
		stateElem[certId] = value;
		this.setState({ selectedElems: this.state.selectedElems });
	};

	// emitir certificados marcados para emision multiple
	onCertificateMultiEmmit = () => {
		const keys = Object.keys(this.state.selectedElems);
		const toEmmit = keys.filter(key => this.state.selectedElems[key]);

		if (toEmmit.length === 0) return;

		const certs = this.state.certificates.filter(t => toEmmit.indexOf(t._id) > -1);
		certs.forEach(cert => {
			cert.actions = <div></div>;
		});

		this.setState({ cert: this.state.certificates });

		const token = Cookie.get("token");
		const self = this;
		const promises = toEmmit.map(elem => {
			return new Promise(function(resolve, reject) {
				CertificateService.emmit(
					token,
					elem,
					async function(_) {
						resolve();
					},
					function(err) {
						reject(err);
					}
				);
			});
		});

		Promise.all(promises)
			.then(function() {
				self.componentDidMount();
			})
			.catch(function(err) {
				console.log(err);
				self.setState({ error: err });
			});
	};

	// emitir certificados
	onCertificateEmmit = id => {
		const token = Cookie.get("token");
		const self = this;

		const cert = self.state.certificates.find(t => t._id === id);
		cert.actions = <div></div>;

		self.setState({ cert: self.state.certificates });
		CertificateService.emmit(
			token,
			id,
			async function(_) {
				self.componentDidMount();
			},
			function(err) {
				console.log(err);
				self.setState({ error: err });
			}
		);
	};

	// a pantalla de edicion
	onCertificateEdit = id => {
		this.props.history.push(Constants.ROUTES.EDIT_CERT + id);
	};

	// crear templates
	onTemplateCreate = name => {
		const token = Cookie.get("token");
		const self = this;
		self.setState({ loading: true });
		TemplateService.create(
			token,
			name,
			async function(template) {
				const templates = self.state.templates;
				const data = TemplateTableHelper.getTemplateData(
					template,
					self.onTemplateEdit,
					self.onTemplateDeleteDialogOpen
				);
				templates.push(data);
				self.setState({ templates: templates, loading: false, error: false });
			},
			function(err) {
				self.setState({ error: err });
				console.log(err);
			}
		);
	};

	// abrir dialogo de borrado
	onTemplateDeleteDialogOpen = id => {
		this.setState({ isDeleteDialogOpen: true, selectedTemplateId: id });
	};

	// borrar templates
	onTemplateDelete = id => {
		const token = Cookie.get("token");
		const self = this;
		self.setState({ loading: true });
		TemplateService.delete(
			token,
			id,
			async function(template) {
				const templates = self.state.templates.filter(t => t._id !== template._id);
				self.setState({ templates: templates, loading: false, error: false });
			},
			function(err) {
				self.setState({ error: err });
				console.log(err);
			}
		);
	};

	// filtro por nombre
	onFirstNameFilterChange = event => {
		const filter = event.target.value;
		this.updateFiltererCertificates(
			filter,
			this.state.lastNameFilter,
			this.state.templateFilter,
			this.state.emmitedFilter
		);
		this.setState({ firstNameFilter: filter });
	};

	// filtro por apellido
	onLastNameFilterChange = event => {
		const filter = event.target.value;
		this.updateFiltererCertificates(
			this.state.firstNameFilter,
			filter,
			this.state.templateFilter,
			this.state.emmitedFilter
		);
		this.setState({ lastNameFilter: filter });
	};

	// filtro por modelo de certificado
	onTemplateFilterChange = event => {
		const filter = event.target.value;
		this.updateFiltererCertificates(
			this.state.firstNameFilter,
			this.state.lastNameFilter,
			filter,
			this.state.emmitedFilter
		);
		this.setState({ templateFilter: filter });
	};

	// filtro por estado de emision de certificado
	onEmmitedFilterChange = event => {
		const filter = event.target.value;
		this.updateFiltererCertificates(
			this.state.firstNameFilter,
			this.state.lastNameFilter,
			this.state.templateFilter,
			filter
		);
		this.setState({ emmitedFilter: filter });
	};

	// actualizar tabla en funcion de los filtros
	updateFiltererCertificates = (firstNameFilter, lastNameFilter, templateFilter, emmitedFilter) => {
		let cert = this.state.certificates;

		if (firstNameFilter && firstNameFilter !== "") {
			cert = cert.filter(certData => {
				return certData.firstName.toLowerCase().includes(firstNameFilter.toLowerCase());
			});
		}

		if (lastNameFilter && firstNameFilter !== "") {
			cert = cert.filter(certData => {
				return certData.lastName.toLowerCase().includes(lastNameFilter.toLowerCase());
			});
		}

		if (templateFilter) {
			cert = cert.filter(certData => {
				return certData.certName.toLowerCase().includes(templateFilter.toLowerCase());
			});
		}

		if (emmitedFilter) {
			if (emmitedFilter === "EMITIDOS") {
				cert = cert.filter(certData => {
					return certData.createdOn !== "-";
				});
			} else {
				cert = cert.filter(certData => {
					return certData.createdOn === "-";
				});
			}
		}

		this.setState({ filteredCertificates: cert });
	};

	// a pantalla de edicion
	onTemplateEdit = id => {
		this.props.history.push(Constants.ROUTES.EDIT_TEMPLATE + id);
	};

	// a pantalla de login
	onLogout = () => {
		Cookie.set("token", "");
		this.props.history.push(Constants.ROUTES.LOGIN);
	};

	render() {
		if (!Cookie.get("token")) {
			return <Redirect to={Constants.ROUTES.LOGIN} />;
		}

		return (
			<Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
				<TabList>
					<Tab>{Messages.LIST.BUTTONS.TO_TEMPLATES}</Tab>
					<Tab>{Messages.LIST.BUTTONS.TO_CERTIFICATES}</Tab>
					<Tab>{Messages.LIST.BUTTONS.TO_QR}</Tab>
				</TabList>

				<TabPanel>
					<Templates
						selected={this.state.tabIndex === 0}
						templates={this.state.templates}
						columns={this.state.templateColumns}
						loading={this.state.loading}
						error={this.state.error}
						onTemplateCreate={this.onTemplateCreate}
						selectedTemplateId={this.state.selectedTemplateId}
						onTemplateDelete={this.onTemplateDelete}
						onDeleteDialogClose={this.onDeleteDialogClose}
						isDeleteDialogOpen={this.state.isDeleteDialogOpen}
						onLogout={this.onLogout}
					/>
				</TabPanel>
				<TabPanel>
					<Certificates
						selected={this.state.tabIndex === 1}
						certificates={this.state.filteredCertificates}
						columns={this.state.certColumns}
						loading={this.state.loading}
						onCertificateEmmit={this.onCertificateEmmit}
						onCertificateMultiEmmit={this.onCertificateMultiEmmit}
						onCertificateCreate={this.onCertificateCreate}
						selectedCertId={this.state.selectedCertId}
						onCertificateDelete={this.onCertificateDelete}
						onDeleteDialogClose={this.onDeleteDialogClose}
						isDeleteDialogOpen={this.state.isDeleteDialogOpen}
						error={this.state.error}
						onLogout={this.onLogout}
					/>
				</TabPanel>
				<TabPanel>
					<Participants
						selected={this.state.tabIndex === 2}
						loading={this.state.loading}
						templates={this.state.templates}
						participants={this.state.participants}
						columns={this.state.participantColumns}
						error={this.state.error}
						onParticipantsReload={this.onParticipantsReload}
						selectedParticipants={this.state.selectedParticipants}
						onLogout={this.onLogout}
					/>
				</TabPanel>
			</Tabs>
		);
	}
}

export default withRouter(Lists);
