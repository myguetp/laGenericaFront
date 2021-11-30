import React, { Component } from 'react';
import { UsuarioService } from '../service/UsuarioService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class Usuarios extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            usuario: {
                cedulausuario: null,
                nombreusuario: null,
                emailusuario: null,
                usuario: null,
                contrasena: null
            },
            selectedUsuario: {

            }
        };
        this.items = [
            {
                label: 'Crear',
                icon: 'pi pi-fw pi-plus',
                command: () => { this.showCreateDialog() }
            },
            {
                label: 'Editar',
                icon: 'pi pi-fw pi-pencil',
                command: () => { this.showEditDialog() }
            },
            {
                label: 'Eliminar',
                icon: 'pi pi-fw pi-trash',
                command: () => { this.delete() }
            }
        ];
        this.usuarioService = new UsuarioService();
        this.create = this.create.bind(this);
        this.delete = this.delete.bind(this);
        this.footer = (
            <div>
                <Button label="Aceptar" icon="pi pi-check" onClick={this.create} />
            </div>
        );
    }

    componentDidMount() {
        this.usuarioService.read().then(data => this.setState({ usuarios: data }))
    }

    create() {
        this.usuarioService.create(this.state.usuario).then(data => {
            this.setState({
                visible: false,
                usuario: {
                    cedulausuario: null,
                    nombreusuario: null,
                    emailusuario: null,
                    usuario: null,
                    contrasena: null
                }
            });
            this.growl.show({ severity: 'success', summary: 'Atención!', detail: 'Se guardó el registro correctamente.' });
            this.usuarioService.read().then(data => this.setState({ usuarios: data }))
        })
    }

    delete() {
        if (window.confirm("¿Realmente desea eliminar el registro?")) {
            this.usuarioService.delete(this.state.selectedUsuario.cedulausuario).then(data => {
                this.growl.show({ severity: 'success', summary: 'Atención!', detail: 'Se eliminó el registro correctamente.' });
                this.usuarioService.read().then(data => this.setState({ usuarios: data }));
            });
        }
    }

    render() {
        return (
            <div style={{ width: '80%', margin: '0 auto', marginTop: '20px' }}>
                <Menubar model={this.items} />
                <br />
                <Panel header="Usuarios">
                    <DataTable value={this.state.usuarios} paginator={true} rows="4" selectionMode="single" selection={this.state.selectedUsuario} onSelectionChange={e => this.setState({ selectedUsuario: e.value })}>
                        <Column field="cedulausuario" header="Cédula"></Column>
                        <Column field="nombreusuario" header="Nombre"></Column>
                        <Column field="emailusuario" header="Email"></Column>
                        <Column field="usuario" header="Usuario"></Column>
                        <Column field="contrasena" header="Clave"></Column>
                    </DataTable>
                </Panel>
                <Dialog header="Usuario" visible={this.state.visible} style={{ width: '400px' }} footer={this.footer} modal={true} onHide={() => this.setState({ visible: false })}>
                    <form id="usuario-form">
                        <span className="p-float-label">
                            <InputText value={this.state.usuario.cedulausuario} style={{ width: '100%' }} id="cedulausuario" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let usuario = Object.assign({}, prevState.usuario);
                                    usuario.cedulausuario = val;

                                    return { usuario };
                                })
                            }
                            } />
                            <label htmlFor="cedulausuario">Cédula</label>
                        </span>
                        <br />
                        <span className="p-float-label">
                            <InputText value={this.state.usuario.nombreusuario} style={{ width: '100%' }} id="nombreusuario" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let usuario = Object.assign({}, prevState.usuario);
                                    usuario.nombreusuario = val

                                    return { usuario };
                                })
                            }
                            } />
                            <label htmlFor="nombreusuario">Nombre</label>
                        </span>
                        <br />
                        <span className="p-float-label">
                            <InputText value={this.state.usuario.emailusuario} style={{ width: '100%' }} id="emailusuario" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let usuario = Object.assign({}, prevState.usuario);
                                    usuario.emailusuario = val

                                    return { usuario };
                                })
                            }
                            } />
                            <label htmlFor="emailusuario">Email</label>
                        </span>
                        <br />
                        <span className="p-float-label">
                            <InputText value={this.state.usuario.usuario} style={{ width: '100%' }} id="username" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let usuario = Object.assign({}, prevState.usuario);
                                    usuario.usuario = val

                                    return { usuario };
                                })
                            }
                            } />
                            <label htmlFor="usuario">Usuario</label>
                        </span>
                        <br />
                        <span className="p-float-label">
                            <InputText value={this.state.usuario.contrasena} style={{ width: '100%' }} id="password" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let usuario = Object.assign({}, prevState.usuario);
                                    usuario.contrasena = val

                                    return { usuario };
                                })
                            }
                            } />
                            <label htmlFor="contrasena">Clave</label>
                        </span>
                    </form>
                </Dialog>
                <Growl ref={(el) => this.growl = el} />
            </div>
        );
    }

    showCreateDialog() {
        this.setState({
            visible: true,
            usuario: {
                cedulausuario: null,
                nombreusuario: null,
                emailusuario: null,
                usuario: null,
                contrasena: null
            }
        });
        document.getElementById('usuario-form').reset();
    }

    showEditDialog() {
        this.setState({
            visible: true,
            usuario: {
                cedulausuario: this.state.selectedUsuario.cedulausuario,
                nombreusuario: this.state.selectedUsuario.nombreusuario,
                emailusuario: this.state.selectedUsuario.emailusuario,
                usuario: this.state.selectedUsuario.usuario,
                contrasena: this.state.selectedUsuario.contrasena
            }
        })
    }
}