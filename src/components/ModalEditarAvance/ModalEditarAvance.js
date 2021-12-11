import React from 'react';
import './ModalEditarUsuario.css';
import { Button, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter, Input } from 'reactstrap';
import { createApolloFetch } from 'apollo-fetch';

const ModalEditarAvance = ({ avance, handleChange, setModalActualizar, isOpen, setNewVal, newVal, uri }) => {
	const [errors, setErrors] = React.useState(null);

	const cerrarModalActualizar = () => {
		setModalActualizar(false);
	};
	const editar = () => {
		let avanceAModificar = { ...avance.form };
		actualizarAvance(avanceAModificar);
		setModalActualizar(false);
	};
	const actualizarAvance = (miAvance) => {
		console.log(miAvance);
		const query = `
        mutation UpdateAdvance($id: ID!, $description: String) {
            updateAdvance(_id: $id, description: $description) {
                _id
                project {
                    _id
                    name
                }
                student {
                 _id
                 nameUser
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

		apolloFetch({
			query: query,
			variables: {
				id: avance._id,
				description: avance.description,
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
					<input className='form-control' name='description' type='text' onChange={handleChange} value={avance.form.description} />
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
