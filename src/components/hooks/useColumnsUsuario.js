import { useMemo } from "react";

export default function useColumns() {
 const columns = useMemo(
   () => [
    {
      Header: "_id",
      accessor: "_id"
    },
     {
       Header: "Nombre Usuario",
       accessor: "nameUser"
     },
     {
       Header: "identificación",
       accessor: "identification"
     },
     {
       Header: "Correo",
       accessor: "email"
     },
     {
       Header: "Contraseña",
       accessor: "password"
     },
     {
       Header: "Tipo Usuario",
       accessor: "typeUser"
     },
     {
       Header: "Estado",
       accessor: "state"
     },
     
   ],
   []
 );
//////////// CAMBIAR
 return columns;
}