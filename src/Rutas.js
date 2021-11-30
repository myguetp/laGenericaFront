import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Menu from './pages/Menu';
import Navbar from './componentes/Navbar';
import Usuarios from './pages/Usuarios';
import Clientes from './pages/Clientes';
import Proveedores from './pages/Proveedores';
import Productos from './pages/Productos';
import Ventas from './pages/Ventas';
import Consolidado from './pages/Consolidado';
import './Rutas.css';

class Rutas extends Component {
    render() {
        return (
            <>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path='/Usuarios' element={<Usuarios />} />
                        <Route path='/Clientes' element={<Clientes />} />
                        <Route path='/Proveedores' element={<Proveedores />} />
                        <Route path='/Productos' element={<Productos />} />
                        <Route path='/Ventas' element={<Ventas />} />
                        <Route path='/Consolidado' element={<Consolidado />} />
                    </Routes>
                </BrowserRouter>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' exact element={<Login />} />
                        <Route path='/Menu' element={<Menu />} />
                    </Routes>
                </BrowserRouter>
            </>
        );
    }
}
export default Rutas;