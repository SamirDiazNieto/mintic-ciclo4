import { useMemo } from 'react';

export default function useColumns() {
	const columns = useMemo(
		() => [
			{
				Header: '_id',
				accessor: '_id',
			},
			{
				Header: 'Estudiante',
				accessor: 'student.nameUser',
			},
			{
				Header: 'Proyecto',
				accessor: 'project.name',
			} /*
     {
       Header: "identificación",
       accessor: "student"
     },*/,
			{
				Header: 'Estado',
				accessor: 'state',
			},
			{
				Header: 'Fecha Registro',
				accessor: 'dateRegister',

				cell: ({ value }) => value.toUTCString(),
			},
			{
				Header: 'Fecha Fin',
				accessor: 'dateOut',
				cell: ({ value }) => value.lower(),
			},
		],
		[]
	);
	//////////// CAMBIAR
	return columns;
}
