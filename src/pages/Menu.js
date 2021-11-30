import { Component } from "react";
import Cookies from "universal-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';

const cookies = new Cookies();

class Menu extends Component {

    cerrarSesion = () => {
        cookies.remove('cedulausuario', { path: "/" });
        cookies.remove('nombreusuario', { path: "/" });
        cookies.remove('emailusuario', { path: "/" });
        cookies.remove('usuario', { path: "/" });
        cookies.remove('contrasena', { path: "/" });
        window.location.href = "./";
    }

    componentDidMount() {
        if (!cookies.get('usuario')) {
            window.location.href = "./";
        }
    }

    render() {
        console.log('cedulausuario:' + cookies.get('cedulausuario'));
        console.log('nombreusuario:' + cookies.get('nombreusuario'));
        console.log('emailusuario:' + cookies.get('emailusuario'));
        console.log('usuario:' + cookies.get('usuario'));
        console.log('contrasena:' + cookies.get('contrasena'));
        return (
            <div>
                <br />
                <button class="btn btn-info btn-md" onClick={() => this.cerrarSesion()}>Cerrar Sesión</button>
            </div>
        );
    }
}
export default Menu;