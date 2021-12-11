import React from 'react';
import './ModalEditar.css';
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



const ModalEditar = ({ productos,IdVendedor, venta, handleChange,setModalActualizar,isOpen, setNewVal, newVal,BASE_URL,PATH_CUSTOMERS}) => {
  
  console.log(venta)
  const auth = getAuth(); 
  const [user, loading, error] = useAuthState(auth);
  const listItemsProducto = productos.map((Producto) =>{
  
    if(Producto.estado==="disponible"){
      if(Producto.descripcion===venta.form.IdProducto){
        return (<option name="IdProducto" selected value={Producto.descripcion}>{Producto.descripcion}</option>)
      }
      else{
        return (<option name="IdProducto" value={Producto.descripcion}>{Producto.descripcion}</option>)
      }

    
    }
    
  }
  );
  console.log(venta)

  const estados = ["en proceso", "cancelada", "entregada"]
  const listarEstados = estados.map((est) =>{
  if(est===venta.form.estado){
    return (<option name="estado" selected value={est}>{est}</option>)
  }
  else{
    return (<option name="estado" value={est}>{est}</option>)
  }

   
});

  const cerrarModalActualizar = () => {
    setModalActualizar(false);
  };
  const editar = () => {
    let ventaAModificar = { ...venta.form };
    actualizarCustomer(ventaAModificar);
    setModalActualizar(false);

  };
  let resultado
  

  const actualizarCustomer = (customer) => {
    user.getIdToken(true).then(token => {
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(customer)
      };
      fetch(`${BASE_URL}${PATH_CUSTOMERS}/${customer._id}`, requestOptions)
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



  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>
        <div><h3>Actualizar Venta ({venta.form.IdProducto}) </h3></div>
      </ModalHeader>

      <ModalBody >
        <FormGroup style={{ padding: '0px 5px', position: 'relative', float: 'left' }}>
          <label>
            Id:
          </label>
          <input
            className="form-control"
            readOnly
            type="text"
            value={venta.form._id}

          />
        </FormGroup>
        <FormGroup style={{ padding: '0px 5px', position: 'relative', float: 'left' }}>
          <label>
            Producto:
          </label>

          
          <Input type="select" name="IdProducto" onChange={handleChange} >
            {listItemsProducto}
          </Input>

        </FormGroup>

        <FormGroup style={{ padding: '0px 5px', position: 'relative', float: 'left' }}>
          <label background='red'>
            cantidad:
          </label>
          <input
            className="form-control "
            name="cantidad"
            type="number"
            onChange={handleChange}
            value={venta.form.cantidad}


          />
        </FormGroup>


        <FormGroup style={{ padding: '0px 5px', position: 'relative', float: 'left' }}>
          <label>
            Precio Unitario:
          </label>
          <input
            
            className="form-control"
            name="precioUnitario"
            type="text"
            onChange={handleChange}
            value={venta.form.precioUnitario}

          />
        </FormGroup>

        <FormGroup style={{ padding: '0px 5px', position: 'relative', float: 'left' }}>
          <label>
            Total:
          </label>
          <input
          readOnly
            className="form-control"
            name="valorTotal"
            type="number"
            onChange={handleChange}
            value={parseInt(venta.form.cantidad)*parseInt(venta.form.precioUnitario)}

          />
        </FormGroup>
        <FormGroup style={{ padding: '0px 5px', position: 'relative', float: 'left' }}>
          <label>
            Estado:
          </label>
          <Input type="select" name="estado" onChange={handleChange}>
          {listarEstados}
          </Input>
          </FormGroup>
          

          <Label for="selector">--{venta.form.IdProducto}</Label>
        <Container>
          <br />
          <Label>Datos del Clientes</Label><hr />
          <div>
          
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
              value={venta.form.cedulaCliente}

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
              name="nombreCliente"
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
          onClick={editar}
        >
          Actualizar
        </Button>
        <Button
          className="btn btn-danger"
          onClick={cerrarModalActualizar}
        >
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ModalEditar;
