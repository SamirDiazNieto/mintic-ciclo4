import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { auth, resetPassword } from "../Firebase/Firebase";
import { Alert } from 'reactstrap';
import Sidebar from "../Dashboard/Sidebar/Sidebar";
import './PerfilUsuario.css';
import { userRegisterReturn } from "../Firebase/Firebase";
import Foto from "../../assets/foto-perfil.png"


const PerfilUsuario = () => {
  const [email, setEmail] = useState("");
  const [user, loading] = useAuthState(auth);
  const [errors, setErrors] = useState("");
  const [hasError, setHasError] = useState(false);
  const [success, setSuccess] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const history = useHistory();
  let userLogged = userRegisterReturn();
  const handleChange = (datosImput) => {
    
    console.log("datosImput")
    console.log(datosImput)
    //setParamenter(datosImput.target.value);
    
    setParameter((prevState) => ({
      
        ...prevState,
        [datosImput.target.name]: datosImput.target.value,
      
    }));
    console.log(parameter);
    
    
  };
  const [parameter, setParameter]=useState({"identification":userLogged.identification,
  "nameUser": userLogged.nameUser
  });

   useEffect(() => {
     if (loading) return;
     if (!user) history.replace("/");
   }, [user, loading]);

  const handleErrors = (error) => {
    setHasError(true);
    setIsSuccess(false);
    console.log(error);
    setErrors(error);
  };

  const handleSuccess = (message) => {
    setHasError(false);
    setIsSuccess(true);
    console.log(message);
    setSuccess(message);
  };

  return(
    <>
    <Sidebar />
    <div className="actualizar-pass">
      <div className="actualizar-pass-container">
        <img className="imagen-user" src={Foto} alt="" />
        {hasError &&
          <Alert color="warning">
            {errors}
          </Alert>
        }
        {isSuccess &&
          <Alert color="success">
            {success}
          </Alert>
        }
         <input
            className="texto-actualizar-pass"
            name="identification"
            type="text"
            onChange={handleChange}
            placeholder="Identificación"
            value={parameter.identification}
            required
          />
          <input
            className="texto-actualizar-pass"
            name="nameUser"
            type="text"
            onChange={handleChange}
            placeholder="Nombre Usuario"
            value={parameter.nameUser}
            required
          />
                  <button
          className="actualizar-pass-btn"
          onClick={() => resetPassword(email, handleErrors, handleSuccess)}
        >
          Actualizar Datos
        </button>
        <input
          type="text"
          className="texto-actualizar-pass"
           value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo Electronico"
          // value={user.email}
          
        />
        <button
          className="actualizar-pass-btn"
          onClick={() => resetPassword(email, handleErrors, handleSuccess)}
        >
          Cambiar Contraseña
        </button>
        {/* <div>
          No tienes cuenta ? <Link id="link" to="/">Registrarte</Link> Ahora.
        </div> */}
      </div>
 </div>
    </>
    
  );
}



export default PerfilUsuario;
