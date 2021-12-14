import React from 'react';
import './ModalEditarInscripcion.css';
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


const ModalEditarInscripcion = ({inscripcion, handleChange,setModalActualizar,isOpen, setNewVal, newVal,uri}) => {
  const auth = getAuth(); 
  const [user, loading, error] = useAuthState(auth);

  const [errors, setErrors] = React.useState(null);
 
 
  const estados = ["Pendiente", "Aceptado", "Rechazado"]
  const roles =["Seleccione una Opción","Administrador", "Lider", "Estudiante"]
  /////////////////////////////////////////////////// PREGUNTAR
  const listarRoles = roles.map((typeUser) =>{
    if(typeUser===inscripcion.form.typeUser){
      return (<option name="typeUser" selected value={typeUser}>{typeUser}</option>)
    }
    else{
      return (<option name="typeUser" value={typeUser}>{typeUser}</option>)
    } 
  });
  ///////////////////////////////////////////////////
  /////////////////////////////////////////////////// PREGUNTAR
  const listarEstados = estados.map((state) =>{
    if(state===inscripcion.form.state){
      return (<option name="state" selected value={state}>{state}</option>)
    }
    else{
      return (<option name="state" value={state}>{state}</option>)
    } 
  });
  ///////////////////////////////////////////////////
  const cerrarModalActualizar = () => {
    setModalActualizar(false);
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Inscipción no modificada',
      showConfirmButton: false,
      timer: 1500
    })
  };
  const editar = () => {
    let inscripcionAModificar = { ...inscripcion.form };
    actualizarCustomer(inscripcionAModificar);
    setModalActualizar(false);
    
  };
  const actualizarCustomer = (customer) => {
      console.log(customer)
      const query=`
      mutation UpdateInscription($id: ID!, $state: String) {
        updateInscription(_id: $id, state: $state) {
          _id
        }
      }
        `
        console.log(query)
        
        const apolloFetch = createApolloFetch({ uri });
        
        console.log(uri)
        console.log(customer.state)
  
        apolloFetch({
          query: query, 
          variables: { 
            id: customer._id,
            state: customer.state, 
           }
        })
        .then(
          (result) => {
            setNewVal(newVal + 1);
            console.log("result");
            console.log(result);
          },
          (error) => {
            console.log(error);
          setErrors(error);
        }
      ).catch(error => console.error('Error:', error))
      setModalActualizar(false)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Inscipción modificada con exito',
        showConfirmButton: false,
        timer: 1500
      })
  }
  return (
  <Modal isOpen={isOpen} className=" w-auto">
        <ModalHeader>
          <div><h3>Actualizar inscripcion {inscripcion.form.nombreInscripcion}</h3></div>
        </ModalHeader>

        <ModalBody className="form-control w-auto p-2">
          {/* <FormGroup>
            <label>
              Id:
            </label>
            <input
              className="form-control"
              readOnly
              type="text"
              value={inscripcion.form.id}
            />
          </FormGroup> */}
          <FormGroup>
            <label>
              Proyecto:
            </label>
            <input
              className="form-control w-auto p-2"
              readOnly
              type="text"
              onChange={handleChange}
              value={inscripcion.form.project.name}
            />
          </FormGroup>
          <FormGroup>
            <label>
              Estudiante:
            </label>
            <input
              readOnly
              className="form-control w-auto p-2"
              name="nameUser"
              type="text"
              onChange={handleChange}
              value={inscripcion.form.student.nameUser}
            />
          </FormGroup>
         
           

        <FormGroup>
          <label>
            Estado:
          </label>
          <Input 
          className="form-control w-auto p-2"
          type="select" name ="state"  onChange={handleChange}>
              {listarEstados}
            </Input>
          
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

export default ModalEditarInscripcion;
