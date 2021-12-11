import { useMemo } from "react";

export default function useColumns() {
 const columns = useMemo(
   () => [
    {
      Header: "_id",
      accessor: "_id"
    },
     {
       Header: "descripcion",
       accessor: "descripcion"
     },
     {
       Header: "estado",
       accessor: "estado"
     },
     {
       Header: "valor",
       accessor: "valor"
     }
     
     
   ],
   []
 );

 return columns;
}