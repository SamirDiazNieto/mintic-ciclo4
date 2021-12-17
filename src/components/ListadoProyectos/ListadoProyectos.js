import React from "react";
import "./ListadoProyectos.css";
import { Table, Button, Container } from "reactstrap";
import ModalCrearProyecto from "../ModalCrearProyecto/ModalCrearProyecto";
import ModalEditarProyecto from "../ModalEditarProyecto/ModalEditarProyecto";
import Sidebar from "../Dashboard/Sidebar/Sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { useHistory } from "react-router";

import { useTable, useGlobalFilter, useAsyncDebounce } from "react-table";
import useColumns from "../hooks/useColumnsProyecto";
import { createApolloFetch } from "apollo-fetch";
import Swal from "sweetalert2";
import { userRegisterReturn, IdRegisterReturn } from '../Firebase/Firebase';

const data = [];

//const uri = "http://localhost:5010/graphql";

const uri = process.env.REACT_APP_API_BASE_URL;

const ListadoProyectos = () => {
  debugger
  let userLogged = userRegisterReturn()
    var rol = userLogged.typeUser;
  const idEstudiante = IdRegisterReturn()._id;

  const auth = getAuth();
  const [modalActualizar, setModalActualizar] = React.useState(false);
  const [modalInsertar, setModalInsertar] = React.useState(false);
  const [errors, setErrors] = React.useState(null);
  const [newVal, setNewVal] = React.useState(0);
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();
  const [proyecto, setProyecto] = React.useState({
    data: data,
    form: {
      // _id: "" ,
      name: "" ,
      generalObjective: "" ,
      especificObjectives: "" ,
      budget: "" ,
      dateStart: "" ,
      dateEnd: "" ,
      phase: "" ,
      state: "" ,
      owner: {
        nameUser:""
      } ,
    },
  });

  let arregloProyectos = proyecto.data;
console.log(arregloProyectos)
  React.useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/");
  }, [user, loading]);

  React.useEffect(() => {
    const query = `
  query GetProjects {
    getProjects {
      _id
      name
      generalObjective
      especificObjectives
      budget
      dateStart
      dateEnd
      phase
      state
      owner { 
        nameUser
      }
    }
  }

`;
    const apolloFetch = createApolloFetch({ uri });
    apolloFetch({ query }).then(
      (result) => {
        
        result.data.getProjects.map((value)=>{
          console.log(value.state)
          if(value.state=== true)
           value.state= "Activo";
          else{
           value.state="Inactivo"
          }
         
          
        })
        setProyecto({
          ...proyecto,
          data: result.data.getProjects,
        });

        setDataTabla({
          ...dataTabla,
          data: result.data.getProjects,
        });
      },
      (error) => {
        //setIsLoaded(true);
        console.log(error);
        setErrors(error);
      }
    ).catch(error => console.error('Error:', error))


  }, [newVal]);

  const handleChange = (datosImput) => {
    setDataTabla((prevState) => ({
      ...prevState,
      data: proyecto.data,
    }));

    setProyecto((prevState) => ({
      ...prevState,
      form: {
        ...prevState.form,
        [datosImput.target.name]: datosImput.target.value,
      },
    }));
  };

  const mostrarModalActualizar = (datoId) => {

    let projectToModify;
    arregloProyectos.map((registro) => {
      if (datoId.target.id === registro._id) {
        projectToModify = registro;
      }
      return; //console.log("Mostro Modal Actualizar");
    });

    // listarUsuarios(userToModify);
    setProyecto({
      ...proyecto,
      form: projectToModify,
    });
    setModalActualizar(true);
  };
  const mostrarModalInsertar = () => {
    setModalInsertar(true);
    return; //console.log("Mostro Modal Actualizar");
  };

  const eliminar = (datoID) => {
    arregloProyectos.map((registro) => {
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
          text: `¿Estas seguro de eliminar el proyecto ${registro.name}?`,
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
              'Borrada!',
              'El proyecto ha sido borrado',
              'success'
            )
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelado',
              'El proyecto no fue borrado :)',
              'error'
            )
          }
        })
      }
      return; //console.log("Elimino Correctamente");
    });
  };

  const borrarCustomer = (id) => {
    const query = `
    mutation DeleteProject($id: ID!) {
      deleteProject(_id: $id) {
        _id
      }
    }
`
    console.log(query)

    const apolloFetch = createApolloFetch({ uri });


    apolloFetch({
      query: query,
      variables: { id: id }
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
///////FINALIZAR
const FinalizarProyecto = (datoID) => {
  arregloProyectos.map((registro) => {
    if (datoID.target.id === registro._id) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      debugger

      
        CambiarFaseProyecto(registro._id, "Terminado");
        swalWithBootstrapButtons.fire(
          'OK!',
          'El proyecto ha sido Terminado',
          'success'
        )

      

    }
    return;
  });
};


const CambiarFaseProyecto = (id,fase) => {
  const query = `
  mutation Mutation($projectId: ID, $newPhase: String) {
    changePhaseProject(projectId: $projectId, newPhase: $newPhase) {
      _id
    }
  }
`
  const apolloFetch = createApolloFetch({ uri });
  apolloFetch({
    query: query,
    variables: { 
      projectId: id,
      newPhase : fase
     }
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
/////////////////////APROBAR
  const aprobar = (datoID) => {
    arregloProyectos.map((registro) => {
      if (datoID.target.id === registro._id) {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })
        debugger

        if (registro.state == "Activo") {
          ActivarProyecto(registro._id, false);
          swalWithBootstrapButtons.fire(
            'OK!',
            'El proyecto ha sido inactivado',
            'success'
          )
        } else {
          ActivarProyecto(registro._id, true);
          swalWithBootstrapButtons.fire(
            'OK!',
            'El proyecto ha sido aprobado',
            'success'
          )

        }

      }
      return;
    });
  };


  const ActivarProyecto = (id,state) => {
    const query = `
    mutation Mutation($projectId: ID, $newState: Boolean) {
      changeStateProject(projectId: $projectId, newState: $newState) {
        _id
      }
    }
`
    const apolloFetch = createApolloFetch({ uri });
    apolloFetch({
      query: query,
      variables: { 
        projectId: id,
        newState : state
       }
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

  /////////////////////INSCRIBIR
  const inscribir = (datoID) => {
    arregloProyectos.map((registro) => {
      if (datoID.target.id === registro._id) {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })
         InscribirEstudiante(registro._id);
         swalWithBootstrapButtons.fire(
          'Inscrito!',
          'El estudiante ha sido inscrito',
          'success'
        )
      }
      return; 
    });
  };


  const InscribirEstudiante = (id) => {
    const query = `
    mutation CreateInscription($student: ID!, $project: ID!) {
      createInscription(student: $student, project: $project)
    }
`
    const apolloFetch = createApolloFetch({ uri });
    apolloFetch({
      query: query,
      variables: { 
        student: idEstudiante,
        project : id
       }
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

  /////CREAR AVANCE
  const crearAvance = (datoID) => {
    arregloProyectos.map((registro) => {
      if (datoID.target.id === registro._id) {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })


        
        swalWithBootstrapButtons.fire({
          input: 'textarea',
          inputLabel: 'Avance',
          inputPlaceholder: 'Descripciòn del avance',
          inputAttributes: {
            'aria-label': 'Ingrese avance'
          },
          showCancelButton: true,
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar',
          buttonsStyling:'margin: .5rem '
        }).then((result) => {
          if (result.value) {
            crearAvanceProj(registro._id, result.value);
            swalWithBootstrapButtons.fire(
              'Creado!',
              'Avance creado correctamente',
              'success'
            )
          }
        })
      }
      return;
    });
  };


  const crearAvanceProj = (id, description) => {
    const query = `
    mutation Mutation($project: ID!, $student: ID!, $description: String) {
      createAdvance(project: $project, student: $student, description: $description) {
        _id
      }
    }
`
    const apolloFetch = createApolloFetch({ uri });
    apolloFetch({
      query: query,
      variables: { 
        student: idEstudiante,
        project : id,
        description: description
       }
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
    data: proyecto.data,
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
  function CarsFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }) {
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
      <span className="cars-filter">
        Buscar Proyecto:
        <input
          size={50}
          value={value || ""}
          onChange={handleInputChange}
          placeholder={`${totalCarsAvailable} Proyectos disponibles...`}
        />
      </span>
    );
  }
  //console.log("fin")

  return (
    <>
      <Sidebar />
      <Container>
        <h1 className="titulos">Listado Proyectos</h1>
        <br />
        <Button
          className={rol == "Lider" ? "text-center text-uppercase m-1 ml-5" : 'hidden'}
          id="btn-crear" disabled={false} color="success" onClick={mostrarModalInsertar}>
          Crear
        </Button>
        <br />
        <br />
        <div id="lista">
          {/* Añadimos las propiedades a nuestra tabla nativa */}
          <Table onCompositionUpdate={handleChange} {...getTableProps()}>
            <thead className="encabezados">
              <tr>
                <th> Tabla</th>
                <th colSpan={9}>
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
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {
                      // Recorremos cada columna del conjunto para acceder a su información
                      headerGroup.headers.map((column) => (
                        // Añadimos las propiedades a cada celda de la cabecera
                        <th {...column.getHeaderProps()}>
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
                      {
                      <Button
                        className={rol == "Lider" && row.values.state == "Activo"? "single-btn  text-center text-uppercase m-1 ml-5" : 'hidden'}
                        id={row.values._id}
                        color="primary"
                        onClick={mostrarModalActualizar}
                      >
                        Editar
                      </Button> 
                      }  
                       {
                      <Button
                        className={rol == "Administrador" && row.values.state == "Activo" && row.values.phase == "En desarrollo"? "text-center text-uppercase m-1 ml-5" : 'hidden'}
                        id={row.values._id}
                        color="primary"
                        onClick={FinalizarProyecto}
                      >
                        Terminado
                      </Button> 
                      }                    
                      {
                        <Button
                          className={row.values.phase == null  && rol == "Administrador"? "text-center text-uppercase m-1 ml-5": 'hidden' }
                          id={row.values._id}
                          color="primary"
                          onClick={aprobar}
                        >                          
                          Aprobar  
                        </Button>
                      }
                      {
                        <Button
                          className={(row.values.state == "Inactivo"  && rol == "Administrador" && row.values.phase != "Terminado")? "text-center text-uppercase m-1 ml-5": 'hidden' }
                          id={row.values._id}
                          color="primary"
                          onClick={aprobar}
                        >                          
                          Activar  
                        </Button>
                      }
                      {
                        <Button
                         className={((row.values.phase == "Iniciado" || row.values.phase == "En desarrollo" ) && row.values.state == "Activo"  && rol == "Administrador")? "text-center text-uppercase m-1 ml-5 mr-5": 'hidden' }
                          id={row.values._id}
                          color="primary"
                          onClick={aprobar}
                        >                          
                          Inactivar
                        </Button>
                      }
                       {
                        <Button
                          className={row.values.state == "Activo" && rol == "Estudiante"? "text-center text-uppercase m-1 ml-5": 'hidden' }
                          id={row.values._id}
                          color="primary"
                          onClick={inscribir}
                        >
                          Inscribirse
                        </Button>
                      }
                      {
                        <Button
                          className={rol == "Administrador"? "text-center text-uppercase m-1 ml-5": 'hidden' }
                          id={row.values._id}
                          color="danger"
                          onClick={eliminar}
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
          <ModalCrearProyecto
            proyecto={proyecto}
            handleChange={handleChange}
            setModalInsertar={setModalInsertar}
            isOpen={modalInsertar}
            setNewVal={setNewVal}
            newVal={newVal}
            uri={uri}
          />
          <ModalEditarProyecto
            proyecto={proyecto}
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

export default ListadoProyectos;
