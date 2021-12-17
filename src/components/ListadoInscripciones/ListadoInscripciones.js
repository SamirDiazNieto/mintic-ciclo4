import React from "react";
import "./ListadoInscripciones.css";
import { Table, Button, Container } from "reactstrap";
import ModalCrearInscripcion from "../ModalCrearInscripcion/ModalCrearInscripcion";
import ModalEditarInscripcion from "../ModalEditarInscripcion/ModalEditarInscripcion";
import Sidebar from "../Dashboard/Sidebar/Sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { useHistory } from "react-router";

import { useTable, useGlobalFilter, useAsyncDebounce } from "react-table";
import useColumns from "../hooks/useColumnsInscripcion";
import { createApolloFetch } from "apollo-fetch";
import DateFromTime from "es-abstract/5/DateFromTime";
import { IdRegisterReturn, userRegisterReturn } from "../Firebase/Firebase";
import Swal from "sweetalert2";

const data = [];
const idUser=IdRegisterReturn()
const uri = process.env.REACT_APP_API_BASE_URL;

const ListadoInscripciones = () => {
  
  let userLogged = userRegisterReturn();
  console.log("userLogged")
  console.log(userLogged)

  const auth = getAuth();
  const [modalActualizar, setModalActualizar] = React.useState(false);
  const [modalInsertar, setModalInsertar] = React.useState(false);
  const [errors, setErrors] = React.useState(null);
  const [newVal, setNewVal] = React.useState(0);
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();
  const [inscripcion, setInscripcion] = React.useState({
    data: data,
    form: {
      _id:"",
      state:"",
      dateRegister:DateFromTime,
      dateOut:"",
      project:{
        _id:"",
        name:""
      },
      student:{
        _id:"",
        nameUser:""
        
      }
      
  }
      // _id: "" ,
      
  });

  let arregloInscripciones = inscripcion.data;

  React.useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/");
  }, [user, loading]);

  React.useEffect(() => {
    const  query=`
    query GetInscription {
      getInscription {
        _id
        state
        dateRegister
        dateOut
        project {
          _id
          name 
          owner {
            _id
          }
        }
        student {
          nameUser
        }
      }
    }

    `;
    



const apolloFetch = createApolloFetch({ uri });

apolloFetch({ query }).then(
  (result) => {
    debugger
    console.log(result)
    const info2= result.data.getInscription
    debugger
    let info3;
    if(userLogged.typeUser==="Lider"){

    
       info3 =info2.filter((value)=>{
        return value.project.owner._id=== idUser._id
      })
      localStorage.setItem('data', info3.toString());
    }
    else {
      info3=info2
    }

    
    
    //result.dateRegister=result.dateRegister.toUTCString();
    setInscripcion({
      ...inscripcion,
      data: info3,
    });
    console.log(inscripcion)

    setDataTabla({
      ...dataTabla,
      data: info3,
    });
  },
  (error) => {
    //setIsLoaded(true);
    console.log(error);
    setErrors(error);
  }
  )


  }, [newVal]);

  const handleChange = (datosImput) => {
    setDataTabla((prevState) => ({
      ...prevState,
      data: inscripcion.data,
    }));

    setInscripcion((prevState) => ({
      ...prevState,
      form: {
        ...prevState.form,
        [datosImput.target.name]: datosImput.target.value,
      },
    }));
  
  };

  const mostrarModalActualizar = (datoId) => {
    
    let userToModify;
    arregloInscripciones.map((registro) => {
      if (datoId.target.id === registro._id) {
        userToModify = registro;
      }
      return; //console.log("Mostro Modal Actualizar");
    });

    // listarInscripciones(userToModify);
    setInscripcion({
      ...inscripcion,
      form: userToModify,
    });
    setModalActualizar(true);
  };
  const mostrarModalInsertar = () => {
    setModalInsertar(true);
    return; //console.log("Mostro Modal Actualizar");
  };
  const eliminar = (datoID) => {
    arregloInscripciones.map((registro) => {
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
          text: `¿Estas seguro de eliminar la inscripción del proyecto ${registro.project.name}?`,
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
              'La inscipción ha sido borrada',
              'success'
            )
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelado',
              'La inscipción no fue borrada :)',
              'error'
            )
          }
        })
      
      }
      return; //console.log("Elimino Correctamente");
    });
  };

  const borrarCustomer = (id) => {
    console.log(id)
    const query=`
    mutation DeleteInscription($id: ID!) {
      deleteInscription(_id: $id) {
        _id
      }
    }
`
console.log(query)

    const apolloFetch = createApolloFetch({ uri });


    apolloFetch({
      query: query, 
      variables: { id:id }
    })
    .then(
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
    data: inscripcion.data,
  });
  console.log(dataTabla)
  var table = useTable({ columns, data: dataTabla.data}, useGlobalFilter);
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
  function CarsFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }) {
    const totalCarsAvailable = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter);

    const onFilterChange = useAsyncDebounce((value) => {
      debugger;
      
       
      setGlobalFilter(value || undefined);
    }, 200);

    const handleInputChange = (e) => {
      setValue(e.target.value);
      onFilterChange(e.target.value);
    };

    return (
      <span className="cars-filter">
        Buscar Producto:
        <input
          size={50}
          value={value || ""}
          onChange={handleInputChange}
          placeholder={`${totalCarsAvailable} Inscripciones disponibles...`}
        />
      </span>
    );
  }
  //console.log("fin")

const classState={editar:"text-left text-uppercase m-1 mr-5 ",
                  eliminar:"text-left text-uppercase m-1 mr-5 d-none d-print-block ",}
  console.log("userLogged.typeUser")
  console.log(dataTabla)
  if(userLogged.typeUser==="Administrador"){
    classState.editar="text-left text-uppercase m-1 mr-5"
    classState.eliminar="text-left text-uppercase m-1 mr-5"
  }
  
  return (
    <>
      <Sidebar />
      <Container>{inscripcion.data.toString()}
        <h1 className="titulos">Listado Inscripciones</h1>
        <br />
        {/* <Button disabled={false} color="success" onClick={mostrarModalInsertar}>
          Crear
        </Button> */}
        <br />
        <br />
        <div id="lista">
          {/* Añadimos las propiedades a nuestra tabla nativa */}
          <Table onCompositionUpdate={handleChange} {...getTableProps()}>
            <thead className="encabezados">
              <tr>
              <th>
                  Tabla
                </th>
                <th colSpan={4}>
                  <CarsFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={globalFilter}
                    setGlobalFilter={setGlobalFilter}
                  />
                </th>
              </tr>

              {
                // Recorremos las columnas que previamente definimos
                headerGroups.map((headerGroup) => (
                  // Añadimos las propiedades al conjunto de columnas
                  <tr className= "w-3 p-2" {...headerGroup.getHeaderGroupProps()}>
                    {
                      // Recorremos cada columna del conjunto para acceder a su información
                      headerGroup.headers.map((column) => (
                        // Añadimos las propiedades a cada celda de la cabecera
                        <th  className= "w-3 p-2 " {...column.getHeaderProps()}>
                          {
                            // Pintamos el título de nuestra columna (propiedad "Header")
                            column.render("Header")
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
                                cell.render("Cell")
                              }
                            </td>
                          );
                        })
                      }
                      <Button
                        className={classState.editar}
                       
                        id={row.values._id}
                        color="primary"
                        isVisible={true}
                        onClick={mostrarModalActualizar}
                      >
                        Editar
                      </Button>
                      {
                        <Button
                          className={classState.eliminar}
                          id={row.values._id}
                          color="danger"
                          onClick={eliminar}
                          available={false}
                          isVisible={true}
                        >
                          Eliminar
                        </Button>
                      }
                    </tr>
                  );
                })
              }
            </tbody>
          </Table>
          <ModalCrearInscripcion
            inscripcion={inscripcion}
            handleChange={handleChange}
            setModalInsertar={setModalInsertar}
            isOpen={modalInsertar}
            setNewVal={setNewVal}
            newVal={newVal}
            uri={uri}
          />
          <ModalEditarInscripcion
            inscripcion={inscripcion}
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

export default ListadoInscripciones;