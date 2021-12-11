import React from 'react';
import './VistaVenta.css';
import { Table, Button, Container } from 'reactstrap';
import ModalCrear from '../ModalCrearVenta/ModalCrear';
import ModalEditar from '../ModalEditarVenta/ModalEditar';
import Sidebar from '../Dashboard/Sidebar/Sidebar';
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { getAuth } from "firebase/auth";



import useColumns from "../hooks/useColumnsVenta";

// hasta este punto funciona
import { useTable, useGlobalFilter, useAsyncDebounce } from "react-table";


////////////////////////////// DATOS DE PRUEBA
const data = [
 //{ _id: 1, IdProducto: 'cafe', cantidad: 3,precioUnitario:10000, valorTotal:10000, fechaVenta: "2021-10-20", cedulaCliente:11111,nombreCliente: "pablo", estado: "en proceso" , cedulaCliente:11221222, nombreCliente:"pepito", IdVendedor:"samir"},
  //{ id: 2, IdProducto: 'cacao', cantidad: 3,precioUnitario:10000, valorTotal:10000,  fechaVenta: "2021-10-20", cedulaCliente:11111,nombreCliente: "pablo", estado: "en proceso", cedulaCliente:11221222, nombreCliente:"pepito", IdVendedor:"samir"},
  //{ id: 3, IdProducto: 'azucar', cantidad: 3,precioUnitario:10000, valorTotal:10000,  fechaVenta: "2021-10-20", cedulaCliente:11111,nombreCliente: "pablo", estado: "en proceso", cedulaCliente:11221222, nombreCliente:"pepito", IdVendedor:"samir"},
  //{ id: 5, IdProducto: 'caña', cantidad: 3,precioUnitario:10000, valorTotal:10000,  fechaVenta:"2021-10-20", cedulaCliente:11111,nombreCliente: "pablo", estado: "en proceso", cedulaCliente:11221222, nombreCliente:"pepito", IdVendedor:"samir"}
];

const IdVendedor = "Jeison";
const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const PATH_CUSTOMERS = process.env.REACT_APP_API_CUSTOMERS_VENTAS_PATH;
const PATH_CUSTOMERS_PRODUCTOS = process.env.REACT_APP_API_PRODUCTOS_VENTAS_PATH;

const VistaVenta = () => {
  const [newVal, setNewVal] = React.useState(0);
  const auth = getAuth(); 
  const [errors, setErrors] = React.useState(null);
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();
  console.log(PATH_CUSTOMERS)
  const [modalActualizar, setModalActualizar] = React.useState(false);
  const [modalInsertar, setModalInsertar] = React.useState(false);

  
  const [venta, setVenta] = React.useState({
    data: data,
    form: {
      //id: "",
    
      IdProducto: "",
      cantidad: "",
      precioUnitario: "",
      valorTotal: "",
      fechaVenta: "",
      cedulaCliente:"",
      estado:"",
      nombreCliente:""
      
    }
  });
  let arregloVentas = venta.data;
  React.useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/");
  }, [user, loading]);
  
  React.useEffect(() => {
    if (!user) return history.replace("/");
    user.getIdToken(true).then(token => {
      // sessionStorage.setItem("token", token) 
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      fetch(`${BASE_URL}${PATH_CUSTOMERS}`, requestOptions)
        .then(res => res.json())
        .then(
          (result) => {
            //setIsLoaded(true);
            setVenta({
              ...venta,
              data: result
            });

            setDataTabla({
              ...dataTabla,
              data: result
            
            
            });
          },
          (error) => {
            //setIsLoaded(true);
            setErrors(error);
          }
        )
    });
  }, [newVal]);
  const [producto, setProducto] = React.useState({
    data: data,
    form: {
      _id: "",
      descripcion: "",
      valor: "",
      estado: ""
    }
  });

  React.useEffect(() => {
    if (!user) return history.replace("/");
    user.getIdToken(true).then(token => {
      // sessionStorage.setItem("token", token) 
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      fetch(`${BASE_URL}${PATH_CUSTOMERS_PRODUCTOS}`, requestOptions)
        .then(res => res.json())
        .then(
          (result) => {
            //setIsLoaded(true);
            setProducto({
              ...producto,
              data: result
            });
          },
          (error) => {
            //setIsLoaded(true);
            setErrors(error);
          }
        )
    });
  }, [newVal]);

  const handleChange = (datosImput) => {
    console.log("ejecute handle")
    console.log(datosImput)
    console.log("fin handle")
    setDataTabla((prevState) =>({
      ...prevState,
      data: venta.data
    
    
    })
    )
    setVenta((prevState) => ({
      ...prevState,
      form: {
        ...prevState.form,
        [datosImput.target.name]: datosImput.target.value,
      }
    }));
  };

  const mostrarModalActualizar = (datoId) => {
    let saleToModify;
    console.log("datoId")
    console.log(datoId.target.id)
    arregloVentas.map((registro) => {
        console.log(registro._id)  
      if ( datoId.target.id === registro._id) {
        console.log("registro.id")
        console.log(registro._id)
        
        saleToModify = registro;
        console.log("saleToModify")
        console.log(saleToModify)
        }
        return console.log("Mostro Modal Actualizar");
    });
    // listarVentas(saleToModify);
     setVenta({
       ...venta,
     form: saleToModify
     });
    setModalActualizar(true);
  };

  const mostrarModalInsertar = () => {
    setModalInsertar(true);
    return console.log("Mostro Modal Actualizar");
  };
  const eliminar = (e) => {
    arregloVentas.map((registro) => {
      if (e.target.id === registro._id) {
        let opcion = window.confirm("¿Está seguro que desea eliminar la compra de  " + registro.nombreCliente + "?");
        if (opcion) {
          borrarCustomer(registro._id);
        }
      }
      return console.log("Elimino Correctamente");
    });
  }
  const borrarCustomer = (id) => {
    user.getIdToken(true).then(token => {
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      fetch(`${BASE_URL}${PATH_CUSTOMERS}/${id}`, requestOptions)
        .then(result => result.json())
        .then(
          (result) => {
            setNewVal(newVal + 1);
          },
          (error) => {
            console.log(error);
          }
        );
    });
  }
  
  
const columns = useColumns();
const [dataTabla, setDataTabla] = React.useState({
  data: venta.data
});

var table = useTable({ columns, data:dataTabla.data  }, useGlobalFilter);
const {
  getTableProps,
  getTableBodyProps,
  headerGroups,
  rows,
  prepareRow,
  preGlobalFilteredRows,
  setGlobalFilter,
  state: { globalFilter }
} = table;
function CarsFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) {
  const totalCarsAvailable = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);

const onFilterChange = useAsyncDebounce(
(value) => setGlobalFilter(value || undefined),
200
);

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
    placeholder={`${totalCarsAvailable} Productos disponibles...`}
  />
</span>
);
}
  return (
    < >
		<Sidebar />
      <Container>
        <h1 className="titulos">Registro de Ventas</h1>
        <br />
        <Button  color="success" onClick={mostrarModalInsertar}>Registrar Nueva Venta</Button>
        <br />
        <br />
        <div id="lista">
        {/* Añadimos las propiedades a nuestra tabla nativa */}
        <Table  onCompositionUpdate={handleChange} {...getTableProps()}>
          <thead className="encabezados">
          <tr>
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
              headerGroups.map(headerGroup => (
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
            rows.map(row => {
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
                  <Button className="text-left text-uppercase m-1 mr-5 " id={row.values._id}
                      color="primary" 
                       onClick={mostrarModalActualizar} 
                    >
                      Editar
                    </Button>{" . "}
                    <Button  className="text-center text-uppercase m-1 ml-5" id={row.values._id} color="danger" onClick={console.log("row"), console.log(row.values._id), eliminar} /* onClick={eliminar} */>Eliminar</Button>
                </tr>
              );
            })
          }
        </tbody>
      </Table>



        {/* <Table >
          <thead className="encabezados">
            <tr>
              <th>Nombre</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Fecha</th>

              <th>Acciones</th>

            </tr>
          </thead>

          <tbody>
            {venta.data.map((dato) => (
              <tr key={dato._id}>
                <td> {dato.nombreCliente}</td>
                <td>{dato.IdProducto}</td>
                <td>{dato.cantidad}</td>
                <td>{dato.precioUnitario}</td>
                <td>{dato.valorTotal}</td>
                <td>{dato.estado}</td>
                <td>{dato.fechaVenta}</td>
                <td >
                  <Button  color="primary" id={dato._id}   
                  onClick={mostrarModalActualizar}  >
                    Editar
                  </Button>{"     "}
                  <Button id={dato._id} color="danger" 
                  onClick={eliminar}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table > */}
          <ModalCrear 
                    productos={producto.data}
                    IdVendedor={IdVendedor}
                    venta={venta}
                    handleChange={handleChange}
                    setModalInsertar={setModalInsertar}
                    isOpen={modalInsertar}
                    setNewVal={setNewVal}
                    newVal={newVal}
                    BASE_URL={BASE_URL}
                    PATH_CUSTOMERS={PATH_CUSTOMERS}
          />
          <ModalEditar 
                    productos={producto.data}
                    IdVendedor={IdVendedor}
                    venta={venta}
                    handleChange={handleChange}
                    setModalActualizar={setModalActualizar}
                    isOpen={modalActualizar}
                    setNewVal={setNewVal}
                    newVal={newVal}
                    BASE_URL={BASE_URL}
                    PATH_CUSTOMERS={PATH_CUSTOMERS}
                    

          />
        </div>
        


        
      </Container>

      

    </>
  );        
};

export default VistaVenta;
