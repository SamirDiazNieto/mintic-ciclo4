//  import logo from './logo.svg';
 import React, {useEffect} from 'react';
import './App.css';
import BannerLogin from './components/BannerLogin/BannerLogin';
import BannerRegistro from './components/BannerRegistro/BannerRegistro';
import {Login} from './components/Login/Login';
import {Register} from './components/Register/Register';

import {capturaCampos} from './index'




 function AnchoPagina(){
  const [div_register, div_login, div_formularios, formulario_register, formulario_login] = capturaCampos();

  if (window.innerWidth > 850){
      div_register.style.display = "block";
      div_login.style.display = "block";
  }else{
      div_register.style.display = "block";
      div_register.style.opacity = "1";
      div_login.style.display = "none";
      div_formularios.style.left = "0px";
      formulario_login.style.display = "block";
      formulario_register.style.display = "none";
  }
}

export function IniciarSesion(){
  
  const [div_register, div_login, div_formularios, formulario_register, formulario_login] = capturaCampos();

   if (window.innerWidth > 850){
       div_register.style.opacity = "1";
       div_login.style.opacity = "0";
       div_formularios.style.left = "10px";
       formulario_register.style.display = "none";
       formulario_login.style.display = "block";
   }else{
       div_register.style.display = "block";
       div_login.style.display = "none";
       div_formularios.style.left = "0px";
       formulario_register.style.display = "none";
       formulario_login.style.display = "block";
   }
}

 export function RegistroUsuario(){

  const [div_register, div_login, div_formularios, formulario_register, formulario_login] = capturaCampos();

  if (window.innerWidth > 850){
    formulario_register.style.display = "block";
    div_formularios.style.left = "383px";
    formulario_login.style.display = "none";
    div_register.style.opacity = "0";
    div_login.style.opacity = "1";
  }else{
    formulario_register.style.display = "block";
    div_formularios.style.left = "0px";
    formulario_login.style.display = "none";
    div_register.style.display = "none";
    div_login.style.display = "block";
    div_login.style.opacity = "1";
  }
}

function App() {
  return (
    <main onLoad={AnchoPagina}>
      <div className="contenedor-principal">
        <div className="banner-fondo">
          <div id="div-trasera-login">
            <BannerLogin/>
          </div>
          <div id="div-trasera-register">
            <BannerRegistro/>
          </div>
        </div>
        <div className="div-formularios">
          <div className="div-formularios">
            <form action="" id="formulario-login">
              <Login />
            </form>
            <form action="" id="formulario-register">
              <Register />
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
