import { useMemo } from "react";

export default function useColumns() {
 const columns = useMemo(
   () => [
    {
      Header: "ID",
      accessor: "_id"
    },
     {
       Header: "Cliente",
       accessor: "nombreCliente"
     },
     {
       Header: "Estado",
       accessor: "estado"
     },
     {
       Header: "Fecha",
       accessor: "fechaVenta"
     },
     {
      Header: "Precio",
      accessor: "precioUnitario"
    },
    {
      Header: "Cantidad",
      accessor: "cantidad"
    },
    {
      Header: "Total",
      accessor: "valorTotal"
    }
     
     
   ],
   []
 );

 return columns;
}