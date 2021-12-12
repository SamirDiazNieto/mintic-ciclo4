import './Register.css';
// import Logo from '../../assets/logo.png'
import React, { useState, useEffect } from "react";
import {
  userRegister,
  registerWithEmailAndPassword,
} from "../Firebase/Firebase";


let contador = 0;
const Estado = (estado=1) =>{
  debugger;
  if (contador===1 && estado ===1 ) return true

return false
}

const Register = () =>{

  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [nameRegister, setNameRegister] = useState("");
  const [documentoRegister, setDocumentoRegister] = useState("");
  const [tipoUsuarioRegister, setTipoUsuarioRegister] = useState("");
  const usernameRef = React.useRef(null)
  

   
function capturaVariables(valor){
  const registrarUsuario = document.getElementById("btn-registrase");
  valor === true? registrarUsuario.disabled = true: registrarUsuario.disabled = false;
}
 function ValidarCorreo() {
  const emailRegister = document.getElementById("registro-correo");
   let msjemailRegister = document.getElementById("msjCorreo");

   if (!emailRegister.value.includes('@')) {
       emailRegister.classList.remove("margin-green");
       emailRegister.classList.add("margin-red");
       msjemailRegister.innerText = "  Ingrese un correo valido.";
       msjemailRegister.classList.remove("exito");
       msjemailRegister.classList.add("error");
       return false;
   } else {
       emailRegister.classList.remove("margin-red");
       emailRegister.classList.add("margin-green");
       msjemailRegister.innerText = "  El correo es valido.";
       msjemailRegister.classList.remove("error");
       msjemailRegister.classList.add("exito");
       capturaVariables(false)
       setEmailRegister(emailRegister.value)
       return true;
   }
 }
 function ValidaPass() {
  const pass = document.getElementById("registro-pass");
    let mensajePass = document.getElementById("msjPass");
   if (pass.value.length < 8) {
      pass.classList.remove("margin-green");
      pass.classList.add("margin-red");
       mensajePass.innerText = "La contraseña minimo 8 caracteres"
       mensajePass.classList.remove("exito");
       mensajePass.classList.add("error");
       return false;
   } else {
       pass.classList.remove("margin-red");
       pass.classList.add("margin-green");
       mensajePass.innerText = "  La contraseña es correcta."
       mensajePass.classList.remove("error");
       mensajePass.classList.add("exito");
       capturaVariables(false)
       setPasswordRegister(pass.value)
       return true;
   }
 }
 function ValidarNombres() {
  const name = document.getElementById("registro-nombres");
    let mensajeName = document.getElementById("msjNombres");
    let regex = new RegExp( /[0-9]/ );
    // console.log(regex.test(name.value))
   if (name.value.length < 7 ||  regex.test(name.value) ) {
    name.classList.remove("margin-green");
    name.classList.add("margin-red");
    mensajeName.innerText = "Nombre minimo 7 caracteres y sin números."
       mensajeName.classList.remove("exito");
       mensajeName.classList.add("error");
       return false;
   } else {
    name.classList.remove("margin-red");
    name.classList.add("margin-green");
       mensajeName.innerText = "Nombre es valido."
       mensajeName.classList.remove("error");
       mensajeName.classList.add("exito");
       capturaVariables(false)
       setNameRegister(name.value)
       return true;
   }
 }
 function ValidaConfirmar() {
  const pass = document.getElementById("registro-pass");
  const confirmar = document.getElementById("registro-confirmar-pass");
   let mensajeConfirmar = document.getElementById("msjConfirmar");

   if (confirmar.value === pass.value && ValidaPass() === true) {
        confirmar.classList.remove("margin-red");
        confirmar.classList.add("margin-green");
       mensajeConfirmar.innerText = " Las Contraseñas coinciden"
       mensajeConfirmar.classList.remove("error");
       mensajeConfirmar.classList.add("exito");
       capturaVariables(false)
       return true;
   } else if(confirmar.value === pass.value){
       mensajeConfirmar.innerText = " Las Contraseñas coinciden pero NO son seguras"
       mensajeConfirmar.classList.remove("exito");
       mensajeConfirmar.classList.add("error");
       return false;

   }else {
       confirmar.classList.remove("margin-green");
       confirmar.classList.add("margin-red");
       mensajeConfirmar.innerText = " Las Contraseñas no coinciden"
       mensajeConfirmar.classList.remove("exito");
       mensajeConfirmar.classList.add("error");
       return false;

   }
 }
 function ValidarIdentificacion() {
  const documento = document.getElementById("registro-identificacion");
    let mensajIdentificacion = document.getElementById("msjIdentificacion");
   if (documento.value.length < 8 || documento.value.length > 11 ) {
    documento.classList.remove("margin-green");
    documento.classList.add("margin-red");
       mensajIdentificacion.innerText = "El documento debe estar entre 8 y 10 digitos"
       mensajIdentificacion.classList.remove("exito");
       mensajIdentificacion.classList.add("error");
       return false;
   } else {
    documento.classList.remove("margin-red");
    documento.classList.add("margin-green");
    mensajIdentificacion.innerText = "El documento es valido."
    mensajIdentificacion.classList.remove("error");
    mensajIdentificacion.classList.add("exito");
       capturaVariables(false)
       setDocumentoRegister(documento.value)
       return true;
   }
 }
 function ValidaTipoUsuario() {
  const tipoUsuario = document.getElementById("resgistro-tipoUsuario");
    let mensajetipoUsuario = document.getElementById("msjtipoUsuario");
   if (tipoUsuario.value ==="" || tipoUsuario.value ===null ) {
    tipoUsuario.classList.remove("margin-green");
    tipoUsuario.classList.add("margin-red");
    mensajetipoUsuario.innerText = "Elije una de las opciones"
    mensajetipoUsuario.classList.remove("exito");
    mensajetipoUsuario.classList.add("error");
       return false;
   } else {
    tipoUsuario.classList.remove("margin-red");
    tipoUsuario.classList.add("margin-green");
    mensajetipoUsuario.innerText = "Tipo de Usuario Valido"
    mensajetipoUsuario.classList.remove("error");
    mensajetipoUsuario.classList.add("exito");
       capturaVariables(false)
       setTipoUsuarioRegister(tipoUsuario.value)
       return true;
   }
 }
 function Registrar() {
  debugger;
  let correo = ValidarCorreo();
  let pass = ValidaPass();
  let confirma = ValidaConfirmar();
  let identifica = ValidarIdentificacion();
  let tipoUser = ValidaTipoUsuario();

  contador = 0;
  
 
 
  if (correo && pass && confirma && identifica && tipoUser) {
   
   registerWithEmailAndPassword(emailRegister, passwordRegister);
   debugger
   console.log(nameRegister, documentoRegister, tipoUsuarioRegister, "Pendiente")
   userRegister(nameRegister, documentoRegister, tipoUsuarioRegister, "Pendiente");
   console.log("Se registro correctamente");
     contador = 1;
     setTimeout(() => {
       contador = 0;
     }, 1000);

  } else {
      alert("No Se registro correctamente");
      capturaVariables(true)
  }
}

return(
<>
{/* <img className="logo" src={Logo} alt="logo"/> */}
  <h2>Regístrate</h2>      
  <input
          id="registro-identificacion"
          type="text"
          className="register__textBox"
          onChange={ValidarIdentificacion} 
          required 
          placeholder="Ingrese su Documento"
        />
  <p id="msjIdentificacion">&nbsp;</p>    
  <input
          id="registro-correo"
          type="text"
          className="register__textBox"
          onChange={ValidarCorreo} 
          required 
          placeholder="Correo Electronico"
          ref={usernameRef}
        />
  <p id="msjCorreo">&nbsp;</p>    
  <input
          id="registro-nombres"
          type="text"
          className="register__textBox"
          onChange={ValidarNombres} 
          required 
          placeholder="Nombre Completo"
        />
  <p id="msjNombres">&nbsp;</p>    
  <input
          id="registro-pass"
          type="password"
          className="register__textBox"
          onChange={ValidaPass} 
          required
          placeholder="Contraseña"
        />
  <p id="msjPass">&nbsp;</p>
  <input className="register__textBox" id="registro-confirmar-pass" type="password" placeholder="Confirmar Contraseña" onChange={ValidaConfirmar} required/>
  <p id="msjConfirmar">&nbsp;</p>
  <select  className='form-control' name="tipoUsuario" id="resgistro-tipoUsuario" onChange={ValidaTipoUsuario} required>
      <option value="" selected>Seleccione una Opción</option>
      <option value="Estudiante">Estudiante</option>
      <option value="Lider">Lider</option>
      <option value="Administrador">Administrador</option>
    </select>
  <p id="msjtipoUsuario">&nbsp;</p>
  <button  type="button" id="btn-registrase" onClick={Registrar}>Regístrate</button>
</>
);
};


export {
  Register,
  Estado,
  
};