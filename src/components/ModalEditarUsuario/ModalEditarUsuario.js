import React from 'react';
import './ModalEditarUsuario.css';
import { Button, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter, Input } from 'reactstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { createApolloFetch } from 'apollo-fetch';
import { userRegisterReturn } from '../Firebase/Firebase';
import Swal from 'sweetalert2';

const ModalEditarUsuario = ({ usuario, handleChange, setModalActualizar, isOpen, setNewVal, newVal, uri }) => {
	const auth = getAuth();
	let userLogged = userRegisterReturn();
	const [user, loading, error] = useAuthState(auth);

	const [errors, setErrors] = React.useState(null);

	const estados = ['Pendiente', 'Autorizado', 'No Autorizado'];
	const roles = ['Administrador', 'Lider', 'Estudiante'];
	/////////////////////////////////////////////////// PREGUNTAR
	const listarRoles = roles.map((typeUser) => {
		if (typeUser === usuario.form.typeUser) {
			return (
				<option name='typeUser' selected value={typeUser}>
					{typeUser}
				</option>
			);
		} else {
			return (
				<option name='typeUser' value={typeUser}>
					{typeUser}
				</option>
			);
		}
	});
	///////////////////////////////////////////////////
	/////////////////////////////////////////////////// PREGUNTAR
	if (userLogged.typeUser === 'Lider') {
		estados.pop();
	}

	const listarEstados = estados.map((state) => {
		if (state === usuario.form.state) {
			return (
				<option name='state' selected value={state}>
					{state}
				</option>
			);
		} else {
			return (
				<option name='state' value={state}>
					{state}
				</option>
			);
		}
	});
	///////////////////////////////////////////////////
	const cerrarModalActualizar = () => {
		setModalActualizar(false);
		Swal.fire({
			position: 'center',
			icon: 'error',
			title: 'Usuario no modificado',
			showConfirmButton: false,
			timer: 1500,
		});
	};
	const editar = () => {
		let usuarioAModificar = { ...usuario.form };
		actualizarCustomer(usuarioAModificar);
		setModalActualizar(false);
		Swal.fire({
			position: 'center',
			icon: 'success',
			title: 'Usuario modificado con exito',
			showConfirmButton: false,
			timer: 1500,
		});
	};

	const classState = { activo: false };
	console.log('userLogged.typeUser');
	if (userLogged.typeUser === 'Lider') {
		classState.activo = true;
	}

	const actualizarCustomer = (customer) => {
		console.log(customer);
		const query = `
      mutation UpdateUser($id: ID!, $nameUser: String!, $identification: String,  $state: String) {
        updateUser( _id: $id, identification: $identification, nameUser: $nameUser,state: $state) {
          email
          typeUser
        }
      }
        `;
		console.log(query);

		const apolloFetch = createApolloFetch({ uri });

		console.log(uri);
		console.log(customer.identification);

		apolloFetch({
			query: query,
			variables: {
				id: customer._id,
				identification: customer.identification,
				nameUser: customer.nameUser,
				state: customer.state,
			},
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
			)
			.catch((error) => console.error('Error:', error));
		setModalActualizar(false);
	};
	return (
		<Modal isOpen={isOpen}>
			<ModalHeader>
				<div>
					<h3>Actualizar usuario {usuario.form.nombreUsuario}</h3>
				</div>
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
              value={usuario.form.id}
            />
          </FormGroup> */}
				<FormGroup>
					<label>Identificación:</label>
					<input
						readOnly={classState.activo}
						className='form-control'
						name='identification'
						type='text'
						onChange={handleChange}
						value={usuario.form.identification}
					/>
				</FormGroup>
				<FormGroup>
					<label>Nombres:</label>
					<input readOnly={classState.activo} className='form-control' name='nameUser' type='text' onChange={handleChange} value={usuario.form.nameUser} />
				</FormGroup>
				{/* <FormGroup>
            <label>
            Correo:
            </label>
            <input
              className="form-control"
              name="email"
              type="text"
              onChange={handleChange}
              value={usuario.form.email}
            />
          </FormGroup> */}
				{/* <FormGroup>
            <label>
            Contraseña:
            </label>
            <input
              className="form-control"
              name="password"
              // type="password"
              type="text"
              onChange={handleChange}
              value={usuario.form.password}
            />
          </FormGroup>  */}
				{/* <FormGroup>
          <label>
          Tipo de Usuario:
            <Input type="select" name ="typeUser"  onChange={handleChange}>
              {listarRoles}
            </Input>
          </label>
          
        </FormGroup> */}

				<FormGroup>
					<label>Estado:</label>
					<Input type='select' name='state' onChange={handleChange}>
						{listarEstados}
					</Input>
				</FormGroup>
			</ModalBody>

			<ModalFooter>
				<Button color='primary' onClick={editar}>
					Actualizar
				</Button>
				<Button className='btn btn-danger' onClick={cerrarModalActualizar}>
					Cancelar
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default ModalEditarUsuario;
