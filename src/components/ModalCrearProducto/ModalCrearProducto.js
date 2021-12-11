import React from 'react';
import './ModalCrearProducto.css';
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

const ModalCrearProducto = ({ usuario, handleChange, setModalInsertar, isOpen, setNewVal, newVal,BASE_URL,PATH_CUSTOMERS }) => {
  console.log("usuario")
  console.log(usuario)
  console.log(PATH_CUSTOMERS)
  console.log(BASE_URL)
  const auth = getAuth(); 
  const [user, loading, error] = useAuthState(auth);
  const [errors, setErrors] = React.useState(null);
  const cerrarModalInsertar = () => {
    setModalInsertar(false);
  };

  
  const insertar = () => {
    let usuarioACrear = { ...usuario.form };
    console.log("usuarioACrear")
    console.log(usuarioACrear)
    user.getIdToken(true).then(token => {
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
    setModalInsertar(false);
  }

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>
        <div><h3>Insertar Producto</h3></div>
      </ModalHeader>

      <ModalBody>
       
        <FormGroup>
          <label>
            Descripción:
          </label>
          <input
            className="form-control"
            name="descripcion"
            type="text"
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <label>
            Valor Unitario:
          </label>
          <input
            className="form-control"
            name="valor"
            type="number"
            min="1"
            step="any"
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <label>
            Estado:
          </label>
          <select name="estado" className="form-control" onChange={handleChange}>
            <option value="-1">Seleccione una opción</option>
            <option value="Disponible">Disponible</option>
            <option value="No Disponible">No Disponible</option>

          </select>
          {/* <input
            className="form-control"
            name="estado"
            type="text"
            onChange={handleChange}
          /> */}
        </FormGroup>
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



export default ModalCrearProducto;
