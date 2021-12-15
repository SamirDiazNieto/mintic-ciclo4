import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter } from 'reactstrap';
import { createApolloFetch } from 'apollo-fetch';
import Swal from 'sweetalert2';

const ModalCrearAvance = ({ avance, handleChange, setModalInsertar, isOpen, setNewVal, newVal, uri }) => {
	const [errors, setErrors] = React.useState(null);

	const cerrarModalInsertar = () => {
		setModalInsertar(false);
		Swal.fire({
			position: 'center',
			icon: 'error',
			title: 'Avance no creado',
			showConfirmButton: false,
			timer: 1500
		  })
	};
	const insertar = () => {
		let nuevoAvance = { ...avance.form };
		console.log(nuevoAvance);
		const query = `
        mutation CreateAdvance($project: ID!, $student: ID!, $date: Date, $description: String, $comments: String) {
            createAdvance(project: $project, student: $student, date: $date, description: $description, comments: $comments) {
                _id
                project
                student
                date
                description
                comments
            }
        }
        `;
		const apolloFetch = createApolloFetch({ uri });

		apolloFetch({
			query: query,
			variables: {
				project: nuevoAvance.project,
				student: nuevoAvance.student,
				date: nuevoAvance.date,
				description: nuevoAvance.description,
				commnets: nuevoAvance.commnets,
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
		setModalInsertar(false);
		Swal.fire({
			position: 'center',
			icon: 'success',
			title: 'Avance creado con exito',
			showConfirmButton: false,
			timer: 1500
		  })
	};

	return (
		<Modal isOpen={isOpen}>
			<ModalHeader>
				<div>
					<h3>Crear Avance</h3>
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
            value={usuario.data.length + 1}
          />
        </FormGroup> */}
				<FormGroup>
					<label>ID Proyecto:</label>
					<input className='form-control' name='project' type='text' onChange={handleChange} required />
				</FormGroup>
				<FormGroup>
					<label>ID Estudiante:</label>
					<input className='form-control' name='student' type='text' onChange={handleChange} required />
				</FormGroup>
				<FormGroup>
					<label>Descripción:</label>
					<input className='form-control' name='description' type='text' onChange={handleChange} required />
				</FormGroup>
			</ModalBody>
			<ModalFooter>
				<Button color='primary' onClick={insertar}>
					Insertar
				</Button>
				<Button className='btn btn-danger' onClick={cerrarModalInsertar}>
					Cancelar
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default ModalCrearAvance;
