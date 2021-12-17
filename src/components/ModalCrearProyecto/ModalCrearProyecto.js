import React from 'react';
import './ModalCrearProyecto.css';
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
import { userRegisterReturn, IdRegisterReturn } from '../Firebase/Firebase';


const ModalCrearProyecto = ({ proyecto, handleChange, setModalInsertar, isOpen, setNewVal, newVal, uri }) => {
  const idLider = IdRegisterReturn()._id;

  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  const [errors, setErrors] = React.useState(null);

  const cerrarModalInsertar = () => {
    setModalInsertar(false);
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Proyecto no creado',
      showConfirmButton: false,
      timer: 1500
    })
  };
  const insertar = () => {
    let proyectoACrear = { ...proyecto.form };
    console.log(proyectoACrear)
    const query = `
    mutation CreateProject($name: String, $generalObjective: String, $especificObjectives: [String], $budget: Int, $owner: ID) {
      createProject(name: $name, generalObjective: $generalObjective, especificObjectives: $especificObjectives, budget: $budget, owner: $owner) {
        _id
      }
    }

      `

    let objetivosEspecificos = proyectoACrear.especificObjectives.split(';')
    const apolloFetch = createApolloFetch({ uri });
    apolloFetch({
      query: query,
      variables: {
        name: proyectoACrear.name,
        generalObjective: proyectoACrear.generalObjective,
        especificObjectives: objetivosEspecificos,
        budget: parseInt(proyectoACrear.budget),
        owner: idLider
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
      title: 'Proyecto creado con exito',
      showConfirmButton: false,
      timer: 1500
    })
  }

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>
        <div><h3>Insertar Proyecto</h3></div>
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
          />
        </FormGroup>       
      </ModalBody>
      <ModalFooter>
        <Button
          className = "btn-border"
          color="primary"
          onClick={insertar}
        >
          Insertar
        </Button>
        <Button
          className="btn btn-danger btn-border"
          onClick={cerrarModalInsertar}
        >
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
}



export default ModalCrearProyecto;
