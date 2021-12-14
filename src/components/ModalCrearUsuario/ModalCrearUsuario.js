import React from 'react';
import './ModalCrearUsuario.css';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { createApolloFetch } from "apollo-fetch";
import Swal from 'sweetalert2';


const ModalCrearUsuario = ({ usuario, handleChange, setModalInsertar, isOpen, setNewVal, newVal, uri }) => {
  const auth = getAuth(); 
  const [user, loading, error] = useAuthState(auth);

  const [errors, setErrors] = React.useState(null);

  const cerrarModalInsertar = () => {
    setModalInsertar(false);
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Usuario no creado',
      showConfirmButton: false,
      timer: 1500
    })
  };
  const insertar = () => {
    let usuarioACrear = { ...usuario.form };
    console.log(usuarioACrear)
    const query=`
    mutation CreateUser($identification: String!, $nameUser: String!, $email: String!, $typeUser: String!) {
      createUser(identification: $identification, nameUser: $nameUser, email: $email, typeUser: $typeUser) {
        _id
        nameUser
      }
    }
      `
      console.log(query)
      
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
        (result) => {
          setNewVal(newVal + 1);
          console.log(result);
        },
        (error) => {
          console.log(error);
        setErrors(error);
      }
    ).catch(error => console.error('Error:', error))
    setModalInsertar(false)
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Usuario creado con exito',
      showConfirmButton: false,
      timer: 1500
    })
  }

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>
        <div><h3>Insertar Usuario</h3></div>
      </ModalHeader>

      <ModalBody>
        {/* <FormGroup>
          <label>
            Id:
          </label>

          <input
            className="form-control"
            readOnly
            type="text"
            value={usuario.data.length + 1}
          />
        </FormGroup> */}
                <FormGroup>
          <label>
            Identificación:
          </label>
          <input
            className="form-control"
            name="identification"
            type="text"
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <label>
            Nombres:
          </label>
          <input
            className="form-control"
            name="nameUser"
            type="text"
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <label>
            Correo:
          </label>
          <input
            className="form-control"
            name="email"
            type="text"
            onChange={handleChange}
            required
          />
        </FormGroup>

        {/* <FormGroup>
          <label>
            Contraseña:
          </label>
          <input
            className="form-control"
            name="password"
            // type="password"
            type="text"
            min="1"
            step="any"
            onChange={handleChange}
          />
        </FormGroup> */}

        <FormGroup>
          <label>
          Tipo de Usuario:
          </label>
          <select name="typeUser" className="form-control"  type="text" onChange={handleChange}>
            <option value="-1" type="text">Seleccione una opción</option>
            <option value="Administrador" type="text">Administrador</option>
            <option value="Lider" type="text">Lider</option>            
            <option value="Estudiante" type="text">Estudiante</option>         
          </select>
          {/* <input
            className="form-control"
            name="estado"
            type="text"
            onChange={handleChange}
          /> */}
        </FormGroup>
        {/* <FormGroup>
          <label>
            Estado:
          </label>
          <select name="estado" className="form-control" type="text" onChange={handleChange}>
            <option value="-1" type="text">Seleccione una opción</option>
            <option value="Pendiente" type="text"> Pendiente</option>
            <option value="No Autorizado" type="text">No Autorizado</option>
            <option value="Autorizado" type="text">Autorizado</option>
          </select>
        </FormGroup> */}
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={insertar}
        >
          Insertar
        </Button>
        <Button
          className="btn btn-danger"
          onClick={cerrarModalInsertar}
        >
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
}



export default ModalCrearUsuario;
