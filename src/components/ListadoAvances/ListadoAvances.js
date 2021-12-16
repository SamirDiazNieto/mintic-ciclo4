import React from 'react';
import { Table, Button, Container } from 'reactstrap';
import ModalCrearAvance from '../ModalCrearAvance/ModalCrearAvance';
import ModalEditarAvance from '../ModalEditarAvance/ModalEditarAvance';
import Sidebar from '../Dashboard/Sidebar/Sidebar';
import { useHistory } from 'react-router';
import { useTable, useGlobalFilter, useAsyncDebounce } from 'react-table';
import useColumns from '../hooks/useColumnsAdvance';
import { createApolloFetch } from 'apollo-fetch';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import Swal from 'sweetalert2';

const data = [];

const uri = process.env.REACT_APP_API_BASE_URL;

const ListadoAvances = () => {
	const auth = getAuth();
	const [modalActualizar, setModalActualizar] = React.useState(false);
	const [modalInsertar, setModalInsertar] = React.useState(false);
	const [errors, setErrors] = React.useState(null);
	const [newVal, setNewVal] = React.useState(0);
	const [user, loading, error] = useAuthState(auth);
	const history = useHistory();
	const [avance, setAvance] = React.useState({
		data: data,
		form: {
			// _id: "" ,
			project: {
				name: '',
			},
			student: {
				_id: '',
				name:''
			},
			date: '',
			description: '',
			comments: '',
		},
	});

	let arregloAvances = avance.data;

	React.useEffect(() => {
		if (loading) return;
		if (!user) return history.replace('/');
	}, [user, loading]);

	React.useEffect(() => {
		const query = `
            query GetAdvances {
                getAdvances {
                    _id
                    project {
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
		const apolloFetch = createApolloFetch({ uri });

		apolloFetch({ query }).then(
			(result) => {
				console.log(result, 'prueba result');
				setAvance({
					...avance,
					data: result.data.getAdvances,
				});

				setDataTabla({
					...dataTabla,
					data: result.data.getAdvances,
				});
			},
			(error) => {
				console.log(error);
				setErrors(error);
			}
		);
	}, [newVal]);

	const handleChange = (datosImput) => {
		setDataTabla((prevState) => ({
			...prevState,
			data: avance.data,
		}));

		setAvance((prevState) => ({
			...prevState,
			form: {
				...prevState.form,
				[datosImput.target.name]: datosImput.target.value,
			},
		}));
	};

	const mostrarModalActualizar = (datoId) => {
		let advanceToModify;
		arregloAvances.map((registro) => {
			if (datoId.target.id === registro._id) {
				advanceToModify = registro;
			}
			return;
		});
		setAvance({
			...avance,
			form: advanceToModify,
		});
		setModalActualizar(true);
	};

	const mostrarModalInsertar = () => {
		setModalInsertar(true);
		return; //console.log("Mostro Modal Actualizar");
	};

	const eliminar = (datoID) => {
		arregloAvances.map((registro) => {
			if (datoID.target.id === registro._id) {
				const swalWithBootstrapButtons = Swal.mixin({
				  customClass: {
					confirmButton: 'btn btn-success',
					cancelButton: 'btn btn-danger'
				  },
				  buttonsStyling: false
				})
				
				swalWithBootstrapButtons.fire({
				  title: "Esta acción no se puede reversar!",
				  text: `¿Estas seguro de eliminar el avance ${registro.project.name}?`,
				  icon: 'warning',
				  showCancelButton: true,
				  confirmButtonText: 'Confirmar',
				  cancelButtonText: 'Cancelar',
				  // reverseButtons: true
				  buttonsStyling:'margin: .5rem '
				}).then((result) => {
				  if (result.isConfirmed) {
					borrarCustomer(registro._id);
					swalWithBootstrapButtons.fire(
					  'Borrado!',
					  'El avance ha sido borrado',
					  'success'
					)
					
				  } else if (
					/* Read more about handling dismissals below */
					result.dismiss === Swal.DismissReason.cancel
				  ) {
					swalWithBootstrapButtons.fire(
					  'Cancelado',
					  'El avance no fue borrado :)',
					  'error'
					)
				  }
				})
			  
			  }
			return; //console.log("Elimino Correctamente");
		});
	};

	const borrarCustomer = (id) => {
		console.log(id);
		const query = `
    	mutation DeleteAdvance($id: ID!) {
      		deleteAdvance(_id: $id) {
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
		data: avance.data,
	});

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
		}, 1000);

		const handleInputChange = (e) => {
			setValue(e.target.value);
			onFilterChange(e.target.value);
		};

		return (
			<span className='cars-filter'>
				Buscar Avance:
				<input autofocus size={50} value={value || ''} onChange={handleInputChange} placeholder={`${totalCarsAvailable} Avances disponibles...`} />
			</span>
		);
	}
	//console.log("fin")

	return (
		<>
			<Sidebar />
			<Container>
				<h1 className='titulos'>Listado Avances</h1>
				<br />
				<Button disabled={false} color='success' onClick={mostrarModalInsertar}>
					Crear
				</Button>
				<br />
				<br />
				<div id='lista'>
					{/* Añadimos las propiedades a nuestra tabla nativa */}
					<Table onCompositionUpdate={handleChange} {...getTableProps()}>
						<thead className='encabezados'>
							<tr>
								<th>
									Tabla
								</th>
								<th colSpan={4}>
									<CarsFilter preGlobalFilteredRows={preGlobalFilteredRows} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
								</th>
							</tr>

							{
								// Recorremos las columnas que previamente definimos
								headerGroups.map((headerGroup) => (
									// Añadimos las propiedades al conjunto de columnas
									<tr {...headerGroup.getHeaderGroupProps()}>
										{
											// Recorremos cada columna del conjunto para acceder a su información
											headerGroup.headers.map((column) => (
												// Añadimos las propiedades a cada celda de la cabecera
												<th {...column.getHeaderProps()}>
													{
														// Pintamos el título de nuestra columna (propiedad "Header")
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
									// Llamamos a la función que prepara la fila previo renderizado

									prepareRow(row);
									return (
										// Añadimos las propiedades a la fila
										<tr {...row.getRowProps()}>
											{
												// Recorremos cada celda de la fila
												row.cells.map((cell) => {
													// Añadimos las propiedades a cada celda de la fila
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
											<Button className='text-left text-uppercase m-1 mr-5 ' id={row.values._id} color='primary' onClick={mostrarModalActualizar}>
												Editar
											</Button>
											<Button className='text-left text-uppercase m-1 ml-5 ' id={row.values._id} color='danger' onClick={eliminar}>
												Eliminar
											</Button>
										</tr>
									);
								})
							}
						</tbody>
					</Table>
					<ModalCrearAvance
						avance={avance}
						handleChange={handleChange}
						setModalInsertar={setModalInsertar}
						isOpen={modalInsertar}
						setNewVal={setNewVal}
						newVal={newVal}
						uri={uri}
					/>
					<ModalEditarAvance
						avance={avance}
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

export default ListadoAvances;
