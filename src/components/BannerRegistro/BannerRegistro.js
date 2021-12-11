import React from 'react';
import './BannerRegistro.css';
import { RegistroUsuario } from '../../App';


const BannerRegistro = () => (
  <>
    <h2>CA-JS (Proyectos)</h2>
    <h3>¿Aún no te has registrado?</h3>
    <p>Regístrate para que puedas iniciar sesión</p>
    <button id="btn-registro"onClick={RegistroUsuario}>Regístrate</button>
</>
);



export default BannerRegistro;
