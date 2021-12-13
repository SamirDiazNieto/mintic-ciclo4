import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter } from 'reactstrap';
import { createApolloFetch } from 'apollo-fetch';

const ModalCrearComentarioAvance = ({ avance, handleChange, setModalInsertar, isOpen, setNewVal, newVal, uri }) => {
	const [errors, setErrors] = React.useState(null);

	const cerrarModalInsertar = () => {
		setModalInsertar(false);
	};
	const insertar = () => {
		let nuevoComentario = { ...avance.form };
		console.log(nuevoComentario);
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
				commnets: avance.commnets,
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
	};

	return (
		<Modal isOpen={isOpen}>
			<ModalHeader>
				<div>
					<h3>Crear Comentario</h3>
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
					<label>Nuevo comentario:</label>
					<input className='form-control' name='comments' type='text' onChange={handleChange} required />
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

export default ModalCrearComentarioAvance;
