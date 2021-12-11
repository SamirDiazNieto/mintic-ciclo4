import React from 'react';
import './ModalCrear.css';
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import {
  Input,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
  Alert,
  Container
} from "reactstrap";


const ModalCrear = ({productos, IdVendedor, venta, handleChange,setModalInsertar,isOpen, setNewVal, newVal,BASE_URL,PATH_CUSTOMERS}) => {
  const auth = getAuth(); 
  const [user, loading, error] = useAuthState(auth);
  const [errors, setErrors] = React.useState(null);
  console.log("productos")
   console.log(productos)
  
  const estados = ["en proceso", "cancelada", "entregada"]
  const listarEstados = estados.map((est) =>

    <option name="estado" value={est}>{est}</option>
  );
  
  const listItemsProducto = productos.map((Producto) =>{
  
    if(Producto.estado==="Disponible"){

    return (<option name="IdProducto" value={Producto.descripcion}>{Producto.descripcion}</option>)
    }
    
  }
  );
  console.log(listItemsProducto)
  let IdProducto = 0;
  console.log("venta.form.IdProducto")
  console.log(venta.form)
  const listItemsValor = productos.map((Producto) =>{
  
    
     if(Producto.descripcion===venta.form.IdProducto){

    return (<input
      className="form-control"
      readOnly
      name="precioUnitario"
      type="text"
      onChange={handleChange}
      value={venta.form.precioUnitario=Producto.valor}
    />)
     }
     });
  const cerrarModalInsertar = () => {
    setModalInsertar(false);
  };

  function Precio(datoId) {
    return (venta.form.IdProducto)
  }


const insertar = () => {
  let ventaACrear = { ...venta.form };
  user.getIdToken(true).then(token => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(ventaACrear)
  };
  fetch(`${BASE_URL}${PATH_CUSTOMERS}`, requestOptions)
    .then(
      (response) => {
        response.json();
        setNewVal(newVal + 1);
      },
      (error) => {
        //setIsLoaded(true);
        setErrors(error);
      })
    });
  setModalInsertar(false);
}




  return (
    <Modal isOpen={isOpen} >
      <ModalHeader>
        <div><h3>Insertar Venta</h3></div>
      </ModalHeader>

      <ModalBody>
        
          <FormGroup style={{ padding: '0px 5px', position: 'relative', float: 'left' }}>
            <label>
              Id:
            </label>

            <input
              className="form-control"
              readOnly
              name="id"
              type="text"
              onChange={handleChange}
              value={venta.data.length + 1}
            />
          </FormGroup>
          <FormGroup style={{ padding: '0px 5px', position: 'relative', float: 'left' }}>


            <Label for="selector">Producto:</Label>
            <Input type="select" name="IdProducto"  onChange={handleChange}>
              <option>Selecione un Producto</option>
              {listItemsProducto}
            </Input>

          </FormGroup>

          <FormGroup style={{ padding: '0px 5px', position: 'relative', float: 'left' }}>
            <label>
              Cantidad:
            </label>
            <input
              className="form-control"
              name="cantidad"
              type="number"
              onChange={handleChange}
              
            />
          </FormGroup>

          <FormGroup style={{ padding: '0px 5px', position: 'relative', float: 'left' }}>
            <label>
              Valor Unitario:
            </label>
            
            {listItemsValor}

          </FormGroup>

          <FormGroup style={{ padding: '0px 5px', position: 'relative', float: 'left' }}>
            <label>
              valor Total:
            </label>
            <input
              readOnly
              className="form-control"
              name="valorTotal"
              type="number"
              onChange={handleChange}
              value={venta.form.valorTotal=venta.form.precioUnitario * venta.form.cantidad}
            />
          </FormGroup>

          <FormGroup style={{ padding: '0px 5px', position: 'relative', float: 'left' }} >
            <label>
              Estado:
            </label>
            <Label for="selector"></Label>
            <Input type="select" name="estado" onChange={handleChange}>
              <option>Selecione un estado</option>
              {listarEstados}
            </Input>
          </FormGroup>

       


        <Container>
          <br />
          <div>
          <Label>Datos del Cliente</Label><hr />
          </div>
          <FormGroup style={{ padding: '0px 5px', position: 'relative', float: 'left' }}>
            <label>
              Fecha:
            </label>
            <input

              className="form-control"
              name="fechaVenta"
              type="date"
              onChange={handleChange}
              value={venta.form.fechaVenta}

            />
          </FormGroup>
          <FormGroup style={{ padding: '0px 5px', position: 'relative', float: 'left' }}>
            <label>
              Cedula:

            </label>
            <input

              className="form-control"
              name="cedulaCliente"
              type="number"
              onChange={handleChange}
              

            />
          </FormGroup>
          <FormGroup style={{ padding: '0px 5px', position: 'relative', float: 'left' }}>
            <label>
              Nombre:

            </label>
            <input

              className="form-control"
              name="nombreCliente"
              type="text"
              onChange={handleChange}
              value={venta.form.nombreCliente} 

            />
          </FormGroup>
          <FormGroup style={{ padding: '0px 5px', position: 'relative', float: 'left' }}>
            <label>
              Vendedor:

            </label>
            <input
              readOnly
              className="form-control"
              name="nombreVendedor"
              type="text"
              onChange={handleChange}
              value={IdVendedor}

            />
          </FormGroup>
        </Container>



      </ModalBody>

      <ModalFooter>
        <Button
          color="primary"
          onClick={insertar}
        >
          Insertar
        </Button>
        <Button
          className="btn btn-danger"
          onClick={cerrarModalInsertar}
        >
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
}



export default ModalCrear;
