import { useMemo } from "react";

export default function useColumns() {
  const columns = useMemo(
    () => [
      {
        Header: "_id",
        accessor: "_id"
      },
      {
        Header: "Nombre Proyecto",
        accessor: "name"
      },
      {
        Header: "Objetivo General",
        accessor: "generalObjective"
      },
      {
        Header: "Objetivos Especificos",
        accessor: "especificObjectives"
      },
      {
        Header: "Presupuesto",
        accessor: "budget"
      },
      {
        Header: "Fecha Inicio",
        accessor: "dateStart"
      },
      {
        Header: "Fecha Fin",
        accessor: "dateEnd"
      },
      {
        Header: "Fase",
        accessor: "phase"
      }
      ,
      {
        Header: "Estado",
        accessor: "state"
      }
      ,
      {
        Header: "Dueño id",
        accessor: "owner"
      }
    ],
    []
  );
  //////////// CAMBIAR
  return columns;
}