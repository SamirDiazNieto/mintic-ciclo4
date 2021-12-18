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
  IdRegister, 
  signInEmailAndPassword, 
  userRegister, 
  userRegisterReturn,  
} from "../Firebase/Firebase";
import { createApolloFetch } from "apollo-fetch";

 const Login = () => {
  const uri = "http://3.13.152.194:5010/graphql";
  console.log(uri)
  console.log("uri++++++++++++++++++")
  console.log(uri)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userLogin, loading] = useAuthState(auth);
  const [hasError, setHasError] = useState(false);
  const [login, setLogin] = useState(false);
  const [errors, setErrors] = useState("");
  const history = useHistory();
  const usernameRef = React.useRef(null)
  const [newVal, setNewVal] = React.useState(0);
  const [usuario, setUsuario] = useState();
 var [bandera, setBandera]=React.useState(false)

 const getUserByEmail=(email)=>{
  const query = `
      query GetUserByEmail($email: String) {
        getUserByEmail(email: $email) {
          _id
          email
          identification
          nameUser
          typeUser
          state
        }
      }

    `;
    console.log("..")
    
    const apolloFetch = createApolloFetch({ uri });
    
    apolloFetch({
      query: query, 
      variables: { email:email }
      }).then(
          (result) => {
              console.log("result email")
              console.log(result)
              const info =result.data.getUserByEmail
              if(result.data.getUserByEmail !== null){ 
                console.log("Usuario existente")
                console.log(info.email)
                IdRegister(info._id)
                userRegister(info.nameUser, info.identification, 
                  info.typeUser,info.state)
                  setBandera(true)
                  console.log(usuario)

              }else{
                console.log("Usuario No existe")
                setBandera(false)
                bandera=false
                console.log(usuario)
                console.log(bandera)
              }
            },
            (error) => {
              console.log(error);
              setErrors(error);
            }
            ).catch(error => console.log('Error:', error))
        
    
      }


  const insertarlogin = () => {
    debugger;
      let data = userRegisterReturn();
      console.log(data)
      let form = {
        // _id: "" ,
        nameUser: data.nameUser,
        identification: data.identification,
        email: userLogin.email,
        password: "",
        typeUser: data.typeUser,
        state: data.state,
          }
          let usuarioACrear = form ;
          const existe =getUserByEmail(userLogin.email)
          console.log(usuario)
          console.log(bandera)
          if(! bandera){
            const query=`
            mutation CreateUser($identification: String!, $nameUser: String!, $email: String!, $typeUser: String!) {
              createUser(identification: $identification, nameUser: $nameUser, email: $email, typeUser: $typeUser) {
                _id
                email
              }
            }
              `
              const apolloFetch = createApolloFetch({ uri });
              apolloFetch({
                query: query, 
                variables: { 
                  identification: usuarioACrear.identification, 
                  nameUser: usuarioACrear.nameUser, 
                  email: usuarioACrear.email, 
                  typeUser: usuarioACrear.typeUser
                 }
              })
              .then(
                (response) => {
                  setNewVal(newVal + 1);
                  
                  const info =response.data.createUser
                  userRegister(info.nameUser, info.identification, 
                  info.typeUser,info.state)
                  IdRegister(info._id)
                },
                (error) => {
                  setErrors(error);
                }).catch(error => console.error('Error:', error))
          }
             
              }

     
        
       
  useEffect(() => {
debugger;
    if (userLogin) {
      let result= Estado();
      history.replace("/dashboard");
      if (login || result) {
        debugger;
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
            onClick={() =>{ signInEmailAndPassword(email, password, setLogin, setHasError, setErrors); getUserByEmail(email)
            }}>
            Entrar
          </button>
          {/* <button 
          type="button"
          id="ingreso-gmail"  
          onClick={()=>signInWithGoogle(setLogin, setHasError,setErrors)}>
            Login with Google
          </button> */}
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
