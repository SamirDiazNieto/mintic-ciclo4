import React from 'react';
import './ModalEditarProyecto.css';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
  Input,
} from "reactstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { createApolloFetch } from 'apollo-fetch';
import Swal from 'sweetalert2';


const ModalEditarProyecto = ({proyecto, handleChange,setModalActualizar,isOpen, setNewVal, newVal,uri}) => {
  const auth = getAuth(); 
  const [user, loading, error] = useAuthState(auth);

  const [errors, setErrors] = React.useState(null);
 
 
  const cerrarModalActualizar = () => {
    setModalActualizar(false);
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Proyecto no modificado',
      showConfirmButton: false,
      timer: 1500
    })
  };
  const editar = () => {
    let proyectoAModificar = { ...proyecto.form };
    actualizarCustomer(proyectoAModificar);
    setModalActualizar(false);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Proyecto modificado con exito',
      showConfirmButton: false,
      timer: 1500
    })
  };
  const actualizarCustomer = (customer) => {
      console.log(customer)
      const query=`
      mutation UpdateProject($id: ID!, $name: String, $generalObjective: String, $especificObjectives: [String], $budget: Int) {
        updateProject(_id: $id, name: $name, generalObjective: $generalObjective, especificObjectives: $especificObjectives, budget: $budget) {
          _id
        }
      }
        `
        
        const apolloFetch = createApolloFetch({ uri });
        
        apolloFetch({
          query: query, 
          variables: { 
            id: customer._id,
            name: customer.name, 
            generalObjective: customer.generalObjective, 
            especificObjectives: customer.especificObjectives, 
            budget: parseInt(customer.budget), 
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
      setModalActualizar(false)
  }
  return (
  <Modal isOpen={isOpen}>
        <ModalHeader>
          <div><h3>Actualizar proyecto {proyecto.form.name}</h3></div>
        </ModalHeader>

        <ModalBody>
        
        <FormGroup>
          <label>
            Nombre:
          </label>
          <input
            className="form-control"
            name="name"
            type="text"
            onChange={handleChange}
            required
            value={proyecto.form.name}
            />
        </FormGroup>
        <FormGroup>
          <label>
            Objetivo General:
          </label>
          <input
            className="form-control"
            name="generalObjective"
            type="text"
            onChange={handleChange}
            required
            value={proyecto.form.generalObjective}
            />
        </FormGroup>
        <FormGroup>
          <label>
          Objetivos especificos (separados por ;):
          </label>
          <input
            className="form-control"
            name="especificObjectives"
            type="text"
            onChange={handleChange}
            required
            value={proyecto.form.especificObjectives}
            />
        </FormGroup>
        <FormGroup>
          <label>
          Presupuesto:
          </label>
          <input
            className="form-control"
            name="budget"
            type="number"
            onChange={handleChange}
            required
            value={proyecto.form.budget}
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

export default ModalEditarProyecto;
