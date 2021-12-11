import React from 'react';
import './BannerLogin.css';
import { IniciarSesion } from '../../App';

const BannerLogin = () => (
  <>
  <h2>CA-JS (Proyectos)</h2>
  <h3>¿Ya tienes una cuenta?</h3>
  <p>Inicia sesión para entrar en la página</p>
  <button id="btn-inicio-sesion" onClick={IniciarSesion}>Inicia Sesión</button>
</>
);


export default BannerLogin;
