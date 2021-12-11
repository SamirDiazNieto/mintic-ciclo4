import { visible } from "ansi-colors";
import { useMemo } from "react";

export default function useColumns() {
 const columns = useMemo(
   () => [
    {
      Header: "_id",
      accessor: "_id",
      isVisible:false
    
    },
    {
       Header: "Estudiante",
       accessor: "student.nameUser",
       isVisible:false
       
       
     },
     {
        Header: "Proyecto",
        accessor: "project.name"
      }, /*
     {
       Header: "identificación",
       accessor: "student"
     },*/
     {
       Header: "Estado",
       accessor: "state",
       isVisible:true
     },
      {
       Header: "Fecha Registro",
       accessor: "dateRegister",
       isVisible:false,
       cell:({ value }) => value.toUTCString()
     },
     {
       Header: "Fecha Fin",
       accessor: "dateOut",
       cell:({ value }) => value.lower()
     }, 
     
     
   ],
   []
 );
//////////// CAMBIAR
 return columns;
}