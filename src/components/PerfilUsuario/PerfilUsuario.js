import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { auth, IdRegisterReturn, resetPassword } from "../Firebase/Firebase";
import { Alert } from 'reactstrap';
import Sidebar from "../Dashboard/Sidebar/Sidebar";
import './PerfilUsuario.css';
import { userRegisterReturn } from "../Firebase/Firebase";
import Foto from "../../assets/foto-perfil.png"
import { createApolloFetch } from "apollo-fetch";
import Swal from "sweetalert2";



const PerfilUsuario = () => {
  const uri = process.env.REACT_APP_API_BASE_URL
  const [email, setEmail] = useState("");
  const [user, loading] = useAuthState(auth);
  const [errors, setErrors] = useState("");
  const [hasError, setHasError] = useState(false);
  const [success, setSuccess] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const history = useHistory();
  let userLogged = userRegisterReturn();
  let idLogged = IdRegisterReturn();
  console.log(idLogged)
  const [usuario, setUsuario] = React.useState({
    form: {
     _id: idLogged._id ,
     nameUser: userLogged.nameUser,
     identification: userLogged.identification,
    },
  });

 
  

   useEffect(() => {
     if (loading) return;
     if (!user) history.replace("/");
   }, [user, loading]);
   
   const handleChange = (datosImput) => {

    setUsuario((prevState) => ({
      ...prevState,
      form: {
        ...prevState.form,
        [datosImput.target.name]: datosImput.target.value,
      },
    }));
  };

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

  const editar = () => {
    let usuarioAModificar = { ...usuario.form };
    actualizarCustomer(usuarioAModificar)
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Usuario modificado con exito',
      showConfirmButton: false,
      timer: 1500
    })
    
  };
  const actualizarCustomer = (customer) => {
      console.log(customer)
      const query=`
      mutation UpdateUser($id: ID!, $nameUser: String!, $identification: String,  $state: String) {
        updateUser( _id: $id, identification: $identification, nameUser: $nameUser,state: $state) {
          email
          typeUser
        }
      }
        `
        console.log(query)
        
        const apolloFetch = createApolloFetch({ uri });
        
        console.log(uri)
        console.log(customer.identification)
  
        apolloFetch({
          query: query, 
          variables: { 
            id: customer._id,
            identification: customer.identification, 
            nameUser: customer.nameUser, 
            state: customer.state, 
           }
        })
        .then(
          (result) => {
            console.log(result);
            localStorage.setItem('documentoRegister', customer.identification);
            localStorage.setItem('nameRegister', customer.nameUser);
          },
          (error) => {
            console.log(error);
          setErrors(error);
        }
      ).catch(error => console.error('Error:', error))
  }

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
            value={usuario.form.identification}
            required
          />
          <input
            className="texto-actualizar-pass"
            name="nameUser"
            type="text"
             onChange={handleChange}
            placeholder="Nombre Usuario"
            value={usuario.form.nameUser}
            required
          />
                  <button
          className="actualizar-pass-btn"
          onClick={editar}
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
