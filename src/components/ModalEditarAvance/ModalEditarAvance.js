import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter, Input } from 'reactstrap';
import { createApolloFetch } from 'apollo-fetch';
import { userRegisterReturn } from '../Firebase/Firebase';
import Swal from 'sweetalert2';

const ModalEditarAvance = ({ avance, handleChange, setModalActualizar, isOpen, setNewVal, newVal, uri }) => {
	const [errors, setErrors] = React.useState(null);
	let userLogged = userRegisterReturn();

	const cerrarModalActualizar = () => {
		setModalActualizar(false);
		Swal.fire({
			position: 'center',
			icon: 'error',
			title: 'Avance no modificado',
			showConfirmButton: false,
			timer: 1500,
		});
	};
	const editar = () => {
		let avanceAModificar = { ...avance.form };
		actualizarAvance(avanceAModificar);
		setModalActualizar(false);
		Swal.fire({
			position: 'center',
			icon: 'success',
			title: 'Avance modificado con exito',
			showConfirmButton: false,
			timer: 1500,
		});
	};

	const classState = { descripcion: false, comentario: false };
	console.log('userLogged.typeUser');
	if (userLogged.typeUser === 'Lider') {
		classState.comentario = false;
		classState.descripcion = true;
	} else if (userLogged.typeUser === 'Estudiante') {
		classState.comentario = true;
		classState.descripcion = false;
	}

	const actualizarAvance = (miAvance) => {
		console.log(miAvance);
		const query = `
        mutation UpdateAdvance($id: ID!, $description: String, $comments: String) {
            updateAdvance(_id: $id, description: $description, comments: $comments) {
                _id
                project {
                    _id
                }
                student {
                 _id
                }
                date
                description
				comments
            }
        }
        `;
		console.log(query);
		const apolloFetch = createApolloFetch({ uri });
		console.log(uri);

		console.log(avance);
		console.log(avance.form._id, 'id del avance');
		console.log(avance.form.description, 'description del avance');

		apolloFetch({
			query: query,
			variables: {
				id: avance.form._id,
				description: avance.form.description,
				comments: avance.form.comments,
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
					<h3>Actualizar Avance {avance._id}</h3>
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
					<label>Description:</label>
					<input
						readOnly={classState.descripcion}
						className='form-control'
						name='description'
						type='text'
						onChange={handleChange}
						value={avance.form.description}
					/>
				</FormGroup>
				<FormGroup>
					<label>Comentario:</label>
					<input readOnly={classState.comentario} className='form-control' name='comments' type='text' onChange={handleChange} value={avance.form.comments} />
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

export default ModalEditarAvance;
