// import styled from 'styled-components';
// import { NavLink as Link } from 'react-router-dom';
import './Login.css';
import Logo from '../../assets/logo.png'
import { useAuthState } from "react-firebase-hooks/auth";
import { Alert } from 'reactstrap';
import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import { Spinner } from 'reactstrap';
import { Estado } from '../Register/Register';
import { 
  auth, 
  signInEmailAndPassword, 
  signInWithGoogle,  
} from "../Firebase/Firebase";

 const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userLogin, loading] = useAuthState(auth);
  const [hasError, setHasError] = useState(false);
  const [login, setLogin] = useState(false);
  const [errors, setErrors] = useState("");
  const history = useHistory();
  const usernameRef = React.useRef(null)
// // // // // Prueba para MongoDB
	const BASE_URL = process.env.REACT_APP_API_BASE_URL;
	const PATH_CUSTOMERS = process.env.REACT_APP_API_USUARIOS_PATH;
  const [newVal, setNewVal] = React.useState(0);
  const data =[]
  const [usuario, setUsuario] = useState();
  
  /* React.useEffect(() => {
    if (!userLogin) {
    userLogin.getIdToken(true).then(token => {
      // sessionStorage.setItem("token", token) 
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      fetch(`${BASE_URL}${PATH_CUSTOMERS}`, requestOptions)
        .then(res => res.json())
        .then(
          (result) => {
            //setIsLoaded(true);
            setUsuario({
              ...usuario,
              data: result
            });

            
          },
          (error) => {
            //setIsLoaded(true);
            setErrors(error);
          }
        )
    });
  }}, [newVal]);
  
 */ let banderaCrear=false
 var [bandera, setBandera]=React.useState(false)
     const insertarlogin = () => {
      
      let form = {
      nombreUsuario:userLogin.email,
      password: "",
      rol: "",
      estado:"Pendiente"
      }
      let usuarioACrear = form ;
      userLogin.getIdToken(true).then(token => {
        // sessionStorage.setItem("token", token) 
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
        fetch(`${BASE_URL}${PATH_CUSTOMERS}`, requestOptions)
          .then(res => res.json())
          .then(
            (result) => {
              // const bandera1= 
              result.map((value)=>{
                console.log(banderaCrear)
                console.log(value.nombreUsuario)
                if(value.nombreUsuario===form.nombreUsuario)
                { console.log("bandera existente")
                  banderaCrear=true
                  setBandera(true)
                  console.log(banderaCrear)
                  return(true)
                  //return(true)
                  }
  
                  //console.log(value)
                  
              })
              console.log(bandera)
              if(banderaCrear===false){
                userLogin.getIdToken(true).then(token => {
                const requestOptions = {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify(usuarioACrear)
                };
                
                fetch(`${BASE_URL}${PATH_CUSTOMERS}`, requestOptions)
                  .then(
                    (response) => {
                      response.json();
                      setNewVal(newVal + 1);
                    },
                    (error) => {
                      //setIsLoaded(true);
                      setErrors(error);
                    })
                  });
                }
              //console.log(result)
              //setIsLoaded(true);
              setUsuario({
                 result
              });
  
              console.log("usuario")
              console.log(usuario)
            },
            (error) => {
              //setIsLoaded(true);
              setErrors(error);
            }
          )
      });
      console.log("banderaCrear")
      console.log(banderaCrear)
      console.log(bandera)
      banderaCrear=false
      console.log(banderaCrear)
    }
     // // // // // Prueba para MongoDB

  useEffect(() => {

    if (userLogin) {
      let result= Estado();
      history.replace("/dashboard");
      if (login ||result) {
        insertarlogin()
      }
    } 
  }, [userLogin, loading]);

  if (loading) {

    return <Spinner children="" style={{ width: '10rem', height: '10rem', position: 'fixed', top: '17%', left: '38%' } } />;
  } else {

  return(
    
<>    {login &&
        <Spinner children="" style={{ width: '10rem', height: '10rem', position: 'fixed', top: '17%', left: '38%' , color:'red'} } />
    }

      {hasError &&
        <Alert color="warning">
          {errors}
        </Alert>
      }
      <img className="logo" src={Logo} alt="" />
          <h2>Inicia Sesión</h2>
          <input
            id="login-correo"
            type="text"
            value={email}
             onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo Electronico"
            ref={usernameRef}
          />
          <input
            id="login-pass"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
          />
          <button
          type="button"
            onClick={() => signInEmailAndPassword(email, password, setLogin, setHasError, setErrors)}>
            Entrar
          </button>
          <button 
          type="button"
          id="ingreso-gmail"  
          onClick={()=>signInWithGoogle(setLogin, setHasError,setErrors)}>
            Login with Google
          </button>
 </>
    );
 };

} 



 Login.propTypes = {
  type: PropTypes.string, // default: 'border'
  size: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  children: PropTypes.string, // default: 'Loading...'
};

Login.defaultProps = {};


 
export {
  Login,

  
};
