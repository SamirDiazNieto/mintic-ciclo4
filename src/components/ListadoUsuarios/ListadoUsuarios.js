import React from 'react';
import './ListadoUsuarios.css';
import { Table, Button, Container } from 'reactstrap';
import ModalCrearUsuario from '../ModalCrearUsuario/ModalCrearUsuario';
import ModalEditarUsuario from '../ModalEditarUsuario/ModalEditarUsuario';
import Sidebar from '../Dashboard/Sidebar/Sidebar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { useHistory } from 'react-router';

import { useTable, useGlobalFilter, useAsyncDebounce } from 'react-table';
import useColumns from '../hooks/useColumnsUsuario';
import { createApolloFetch } from 'apollo-fetch';
import Swal from 'sweetalert2';
import { userRegisterReturn } from '../Firebase/Firebase';
const data = [];

const uri = process.env.REACT_APP_API_BASE_URL;

const ListadoUsuarios = () => {
	let userLogged = userRegisterReturn();
	const auth = getAuth();
	const [modalActualizar, setModalActualizar] = React.useState(false);
	const [modalInsertar, setModalInsertar] = React.useState(false);
	const [errors, setErrors] = React.useState(null);
	const [newVal, setNewVal] = React.useState(0);
	const [user, loading, error] = useAuthState(auth);
	const history = useHistory();
	const [usuario, setUsuario] = React.useState({
		data: data,
		form: {
			// _id: "" ,
			nameUser: '',
			identification: '',
			email: '',
			// password: "",
			typeUser: '',
			// state: "",
		},
	});

	let arregloUsuarios = usuario.data;

	React.useEffect(() => {
		if (loading) return;
		if (!user) return history.replace('/');
	}, [user, loading]);

	React.useEffect(() => {
		const query = `
query GetUsers {
  getUsers {
    _id
    nameUser
    identification
    email
    typeUser
    state
  }
}
`;
		const apolloFetch = createApolloFetch({ uri });

		apolloFetch({ query }).then(
			(result) => {
				setUsuario({
					...usuario,
					data: result.data.getUsers,
				});

				setDataTabla({
					...dataTabla,
					data: result.data.getUsers,
				});
			},
			(error) => {
				//setIsLoaded(true);
				console.log(error);
				setErrors(error);
			}
		);
	}, [newVal]);

	const handleChange = (datosImput) => {
		setDataTabla((prevState) => ({
			...prevState,
			data: usuario.data,
		}));

		setUsuario((prevState) => ({
			...prevState,
			form: {
				...prevState.form,
				[datosImput.target.name]: datosImput.target.value,
			},
		}));
	};

	const mostrarModalActualizar = (datoId) => {
		let userToModify;
		arregloUsuarios.map((registro) => {
			if (datoId.target.id === registro._id) {
				userToModify = registro;
			}
			return; //console.log("Mostro Modal Actualizar");
		});

		// listarUsuarios(userToModify);
		setUsuario({
			...usuario,
			form: userToModify,
		});
		setModalActualizar(true);
	};
	const mostrarModalInsertar = () => {
		setModalInsertar(true);
		return; //console.log("Mostro Modal Actualizar");
	};
	const eliminar = (datoID) => {
		arregloUsuarios.map((registro) => {
			if (datoID.target.id === registro._id) {
				const swalWithBootstrapButtons = Swal.mixin({
					customClass: {
						confirmButton: 'btn btn-success',
						cancelButton: 'btn btn-danger',
					},
					buttonsStyling: false,
				});

				swalWithBootstrapButtons
					.fire({
						title: 'Esta acci??n no se puede reversar!',
						text: `??Estas seguro de eliminar el usuario ${registro.nameUser}?`,
						icon: 'warning',
						showCancelButton: true,
						confirmButtonText: 'Confirmar',
						cancelButtonText: 'Cancelar',
						// reverseButtons: true
						buttonsStyling: 'margin: .5rem ',
					})
					.then((result) => {
						if (result.isConfirmed) {
							borrarCustomer(registro._id);
							swalWithBootstrapButtons.fire('Borrado!', 'El Usuario ha sido borrado', 'success');
						} else if (
							/* Read more about handling dismissals below */
							result.dismiss === Swal.DismissReason.cancel
						) {
							swalWithBootstrapButtons.fire('Cancelado', 'El usuario no fue borrado :)', 'error');
						}
					});
			}
			return; //console.log("Elimino Correctamente");
		});
	};

	const borrarCustomer = (id) => {
		const query = `
    mutation DeleteUser($id: ID!) {
      deleteUser(_id: $id) {
        _id
      }
    }
`;
		console.log(query);

		const apolloFetch = createApolloFetch({ uri });

		apolloFetch({
			query: query,
			variables: { id: id },
		}).then(
			(result) => {
				setNewVal(newVal + 1);
			},
			(error) => {
				console.log(error);
				setErrors(error);
			}
		);
	};

	const columns = useColumns();

	const [dataTabla, setDataTabla] = React.useState({
		data: usuario.data,
	});

	const classState = { editar: 'text-left text-uppercase m-1 mr-5 single-btn', eliminar: 'text-left text-uppercase m-1 mr-5 d-none d-print-block ' };
	console.log('userLogged.typeUser');
	console.log(dataTabla);
	if (userLogged.typeUser === 'Administrador') {
		classState.editar = 'text-left text-uppercase m-1 mr-5';
		classState.eliminar = 'text-left text-uppercase m-1 mr-5';
	}

	var table = useTable({ columns, data: dataTabla.data }, useGlobalFilter);
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		preGlobalFilteredRows,
		setGlobalFilter,
		state: { globalFilter },
	} = table;
	function CarsFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) {
		const totalCarsAvailable = preGlobalFilteredRows.length;
		const [value, setValue] = React.useState(globalFilter);

		const onFilterChange = useAsyncDebounce((value) => {
			setGlobalFilter(value || undefined);
		}, 200);

		const handleInputChange = (e) => {
			setValue(e.target.value);
			onFilterChange(e.target.value);
		};

		return (
			<span className='cars-filter'>
				Buscar Producto:
				<input size={50} value={value || ''} onChange={handleInputChange} placeholder={`${totalCarsAvailable} Usuarios disponibles...`} />
			</span>
		);
	}
	//console.log("fin")

	return (
		<>
			<Sidebar />
			<Container>
				<h1 className='titulos'>Listado Usuarios</h1>
				<br />
				{/* <Button btn-crear disabled={false} color='success' onClick={mostrarModalInsertar}>
					Crear
				</Button> */}
				<br />
				<br />
				<div id='lista'>
					{/* A??adimos las propiedades a nuestra tabla nativa */}
					<Table onCompositionUpdate={handleChange} {...getTableProps()}>
						<thead className='encabezados'>
							<tr>
								<th>Tabla</th>
								<th colSpan={4}>
									<CarsFilter preGlobalFilteredRows={preGlobalFilteredRows} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
								</th>
							</tr>

							{
								// Recorremos las columnas que previamente definimos
								headerGroups.map((headerGroup) => (
									// A??adimos las propiedades al conjunto de columnas
									<tr {...headerGroup.getHeaderGroupProps()}>
										{
											// Recorremos cada columna del conjunto para acceder a su informaci??n
											headerGroup.headers.map((column) => (
												// A??adimos las propiedades a cada celda de la cabecera
												<th {...column.getHeaderProps()}>
													{
														// Pintamos el t??tulo de nuestra columna (propiedad "Header")
														column.render('Header')
													}
												</th>
											))
										}
										<th>Opciones</th>
									</tr>
								))
							}
						</thead>

						<tbody {...getTableBodyProps()}>
							{
								// Recorremos las filas
								rows.map((row) => {
									// Llamamos a la funci??n que prepara la fila previo renderizado

									prepareRow(row);
									return (
										// A??adimos las propiedades a la fila
										<tr {...row.getRowProps()}>
											{
												// Recorremos cada celda de la fila
												row.cells.map((cell) => {
													// A??adimos las propiedades a cada celda de la fila
													return (
														<td {...cell.getCellProps()}>
															{
																// Pintamos el contenido de la celda
																cell.render('Cell')
															}
														</td>
													);
												})
											}
											<Button className={classState.editar} id={row.values._id} color='primary' onClick={mostrarModalActualizar}>
												Editar
											</Button>
											{
												<Button className={classState.eliminar} id={row.values._id} color='danger' onClick={eliminar}>
													Eliminar
												</Button>
											}
										</tr>
									);
								})
							}
						</tbody>
					</Table>
					<ModalCrearUsuario
						usuario={usuario}
						handleChange={handleChange}
						setModalInsertar={setModalInsertar}
						isOpen={modalInsertar}
						setNewVal={setNewVal}
						newVal={newVal}
						uri={uri}
					/>
					<ModalEditarUsuario
						usuario={usuario}
						handleChange={handleChange}
						setModalActualizar={setModalActualizar}
						isOpen={modalActualizar}
						setNewVal={setNewVal}
						newVal={newVal}
						uri={uri}
					/>
				</div>
			</Container>
		</>
	);
};

export default ListadoUsuarios;
