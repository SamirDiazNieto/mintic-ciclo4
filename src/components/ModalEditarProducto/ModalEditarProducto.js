import React from 'react';
import './ModalEditarProducto.css';
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


const ModalEditarProducto = ({usuario, handleChange,setModalActualizar,isOpen, setNewVal, newVal,BASE_URL,PATH_CUSTOMERS}) => {
  
  const auth = getAuth(); 
  const [user, loading, error] = useAuthState(auth);

  const cerrarModalActualizar = () => {
    setModalActualizar(false);
  };
  const editar = () => {
    let usuarioAModificar = { ...usuario.form };
    actualizarCustomer(usuarioAModificar);
    setModalActualizar(false);
    
  };

  const actualizarCustomer = (customer) => {
    user.getIdToken(true).then(token => {
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(customer)
      };
      fetch(`${BASE_URL}${PATH_CUSTOMERS}/${customer._id}`, requestOptions)
        .then(result => result.json())
        .then(
          (result) => {
            setNewVal(newVal + 1);
          },
          (error) => {
            console.log(error);
          }
        );
    });
  }
  return (
  <Modal isOpen={isOpen}>
        <ModalHeader>
          <div><h3>Actualizar Producto {usuario.form.descripcion}</h3></div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>
              Id:
            </label>
            <input
              className="form-control"
              readOnly
              type="text"
              value={usuario.form.id}
            />
          </FormGroup>

          <FormGroup>
            <label>
              Descripción:
            </label>
            <input
              className="form-control"
              name="descripcion"
              type="text"
              onChange={handleChange}
              value={usuario.form.descripcion}
              required
            />
          </FormGroup>

          <FormGroup>
            <label>
              Valor:
            </label>
            <input
              className="form-control"
              name="valor"
              type="number"
              onChange={handleChange}
              value={usuario.form.valor}
            />
          </FormGroup>

          <FormGroup>
            <label>
              Estado:
            </label>
            <input
              className="form-control"
              name="estado"
              type="text"
              onChange={handleChange}
              value={usuario.form.estado}
            />
          </FormGroup>
                 
        </ModalBody>

        <ModalFooter>
          <Button
            color="primary"
            onClick={editar}
          >
            Actualizar
          </Button>
          <Button
            className="btn btn-danger"
            onClick={cerrarModalActualizar}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
  );
}

export default ModalEditarProducto;
