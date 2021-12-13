import { useMemo } from 'react';

export default function useColumns() {
	const columns = useMemo(
		() => [
			{
				Header: '_id',
				accessor: '_id',
			},
			{
				Header: 'Proyecto',
				accessor: 'project.name',
			},
			{
				Header: 'Estudiante',
				accessor: 'student._id',
			},
			{
				Header: 'Fecha',
				accessor: 'date',
			},
			{
				Header: 'Descripción',
				accessor: 'description',
			},
			{
				Header: 'Comentarios',
				accessor: 'comments',
			},
		],
		[]
	);
	//////////// CAMBIAR
	return columns;
}
