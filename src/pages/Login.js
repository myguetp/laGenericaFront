import React, { Component } from 'react';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
/*import md5 from 'md5';*/
import Cookies from 'universal-cookie';

const URL = "http://localhost:8080/api/usuarios/";
const cookies = new Cookies();

class Login extends Component {
    state = {
        form: {
            usuario: '',
            contrasena: ''
        }
    }

    handleChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    iniciarSesion = async () => {
        console.log(this.state.form.usuario);
        return axios.get(URL + "listar/" + this.state.form.usuario).then(response => response.data).then(response => {
            if (response.contrasena === this.state.form.contrasena) {
                var respuesta = response;
                cookies.set('cedulausuario', respuesta.cedulausuario, { path: "/" });
                cookies.set('nombreusuario', respuesta.nombreusuario, { path: "/" });
                cookies.set('emailusuario', respuesta.emailusuario, { path: "/" });
                cookies.set('usuario', respuesta.usuario, { path: "/" });
                cookies.set('contrasena', respuesta.contrasena, { path: "/" });
                alert(`Bienvenido ${respuesta.nombreusuario}`);
                window.location.href = "./Menu";
            } else {
                alert('El usuario o la contraseña no son correctos')
            }
        })
            .catch(error => {
                console.log(error);
            })
    }

    componentDidMount() {
        if (cookies.get('usuario')) {
            window.location.href = "./Menu";
        }
    }

    render() {
        return (
            <div id="login">
                <h1 class="text-center text-white pt-5">Cadena La Generica</h1>
                <div class="container">
                    <div id="login-row" class="row justify-content-center align-items-center">
                        <div id="login-column" class="col-md-6">
                            <div id="login-box" class="col-md-12">
                                <form id="login-form" class="form" action="" method="post">
                                    <h2 class="text-center text-info">Login</h2>
                                    <div class="form-group">
                                        <label for="username" class="text-info"><h4>Usuario: </h4></label><br />
                                        <input type="text" name="usuario" id="usuario" class="form-control" onChange={this.handleChange} />
                                    </div>
                                    <br />
                                    <div class="form-group">
                                        <label for="password" class="text-info"><h4>Contraseña: </h4></label><br />
                                        <input type="password" name="contrasena" id="contrasena" class="form-control" onChange={this.handleChange} />
                                    </div>
                                    <br />
                                    <div class="form-group">
                                        <button class="btn btn-info btn-md" onClick={() => this.iniciarSesion()}>Iniciar Sesión</button>
                                    </div>
                                    <br />
                                    <br />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login;