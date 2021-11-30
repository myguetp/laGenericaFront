import React, { Component } from 'react';
import { ProductoService } from '../service/ProductoService';
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

export default class Productos extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            producto: {
                codigoproducto: null,
                nombreproducto: null,
                nitproveedor: null,
                precio_compra: null,
                ivacompra: null,
                precioventa: null
            },
            selectedProducto: {

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
        this.productoService = new ProductoService();
        this.create = this.create.bind(this);
        this.delete = this.delete.bind(this);
        this.footer = (
            <div>
                <Button label="Aceptar" icon="pi pi-check" onClick={this.create} />
            </div>
        );
    }

    componentDidMount() {
        this.productoService.read().then(data => this.setState({ productos: data }))
    }

    create() {
        this.productoService.create(this.state.producto).then(data => {
            this.setState({
                visible: false,
                producto: {
                    codigoproducto: null,
                    nombreproducto: null,
                    nitproveedor: null,
                    preciocompra: null,
                    ivacompra: null,
                    precioventa: null
                }
            });
            this.growl.show({ severity: 'success', summary: 'Atención!', detail: 'Se guardó el registro correctamente.' });
            this.productoService.read().then(data => this.setState({ productos: data }))
        })
    }

    delete() {
        if (window.confirm("¿Realmente desea eliminar el registro?")) {
            this.productoService.delete(this.state.selectedProducto.codigoproducto).then(data => {
                this.growl.show({ severity: 'success', summary: 'Atención!', detail: 'Se eliminó el registro correctamente.' });
                this.productoService.read().then(data => this.setState({ productos: data }));
            });
        }
    }

    render() {
        return (
            <div style={{ width: '80%', margin: '0 auto', marginTop: '20px' }}>
                <Menubar model={this.items} />
                <br />
                <Panel header="Productos">
                    <DataTable value={this.state.productos} paginator={true} rows="4" selectionMode="single" selection={this.state.selectedProducto} onSelectionChange={e => this.setState({ selectedProducto: e.value })}>
                        <Column field="codigoproducto" header="Código"></Column>
                        <Column field="nombreproducto" header="Nombre"></Column>
                        <Column field="nitproveedor" header="NIT"></Column>
                        <Column field="preciocompra" header="Precio Compra"></Column>
                        <Column field="ivacompra" header="IVA Compra"></Column>
                        <Column field="precioventa" header="Precio Venta"></Column>
                    </DataTable>
                </Panel>
                <Dialog header="Productos" visible={this.state.visible} style={{ width: '400px' }} footer={this.footer} modal={true} onHide={() => this.setState({ visible: false })}>
                    <form id="producto-form">
                        <span className="p-float-label">
                            <InputText value={this.state.producto.codigoproducto} style={{ width: '100%' }} id="codigoproducto" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let producto = Object.assign({}, prevState.producto);
                                    producto.codigoproducto = val;

                                    return { producto };
                                })
                            }
                            } />
                            <label htmlFor="codigoproducto">Código</label>
                        </span>
                        <br />
                        <span className="p-float-label">
                            <InputText value={this.state.producto.nombreproducto} style={{ width: '100%' }} id="nombreproducto" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let producto = Object.assign({}, prevState.producto);
                                    producto.nombreproducto = val

                                    return { producto };
                                })
                            }
                            } />
                            <label htmlFor="nombreproducto">Nombre</label>
                        </span>
                        <br />
                        <span className="p-float-label">
                            <InputText value={this.state.producto.nitproveedor} style={{ width: '100%' }} id="nitproveedor" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let producto = Object.assign({}, prevState.producto);
                                    producto.nitproveedor = val

                                    return { producto };
                                })
                            }
                            } />
                            <label htmlFor="nitproveedor">NIT</label>
                        </span>
                        <br />
                        <span className="p-float-label">
                            <InputText value={this.state.producto.preciocompra} style={{ width: '100%' }} id="preciocompra" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let producto = Object.assign({}, prevState.producto);
                                    producto.preciocompra = val

                                    return { producto };
                                })
                            }
                            } />
                            <label htmlFor="preciocompra">Precio Compra</label>
                        </span>
                        <br />
                        <span className="p-float-label">
                            <InputText value={this.state.producto.ivacompra} style={{ width: '100%' }} id="ivacompra" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let producto = Object.assign({}, prevState.producto);
                                    producto.ivacompra = val

                                    return { producto };
                                })
                            }
                            } />
                            <label htmlFor="ivacompra">IVA Compra</label>
                        </span>
                        <br />
                        <span className="p-float-label">
                            <InputText value={this.state.producto.precioventa} style={{ width: '100%' }} id="precioventa" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                    let producto = Object.assign({}, prevState.producto);
                                    producto.precioventa = val

                                    return { producto };
                                })
                            }
                            } />
                            <label htmlFor="precioventa">Precio Venta</label>
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
            producto: {
                codigoproducto: null,
                nombreproducto: null,
                nitproveedor: null,
                preciocompra: null,
                ivacompra: null,
                precioventa: null
            },
        });
        document.getElementById('producto-form').reset();
    }

    showEditDialog() {
        this.setState({
            visible: true,
            producto: {
                codigoproducto: this.state.selectedProducto.codigoproducto,
                nombreproducto: this.state.selectedProducto.nombreproducto,
                nitproveedor: this.state.selectedProducto.nitproveedor,
                preciocompra: this.state.selectedProducto.preciocompra,
                ivacompra: this.state.selectedProducto.ivacompra,
                precioventa: this.state.selectedProducto.precioventa
            }
        })
    }
}