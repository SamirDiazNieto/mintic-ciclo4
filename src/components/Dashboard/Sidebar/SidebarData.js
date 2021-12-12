import React from "react";
import * as SiIcons from "react-icons/si";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
//import * as RiIcons from 'react-icons/ri';
import * as BsIcons from "react-icons/bs";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { userRegisterReturn } from "../../Firebase/Firebase";

let sidebarDATA = [
  {
    titulo: "Inicio",
    ruta: "/dashboard",
    icono: <AiIcons.AiFillHome />,
  },
  {
    titulo: "Proyectos",
    ruta: "/dashboard",
    icono: <AiIcons.AiOutlineAppstoreAdd />,
    // 		icono: <FaIcons.FaShoppingCart />,
  },
  {
    titulo: "Avances",
    ruta: "/dashboard",
    icono: <BsIcons.BsReceiptCutoff />,
  },
  {
    titulo: "Actualizar mis Datos",
    ruta: "/dashboard/actualizar-datos",
    icono: <FaIcons.FaUserCog />,
  },
  {
    titulo: "Mis Proyectos", //Estudiante
    ruta: "/dashboard",
    icono: <FaIcons.FaListOl />,
  },
  {
	  titulo: "Mis Proyectos", //Lider
	  ruta: "/dashboard",
	  icono: <AiIcons.AiOutlineFileSearch />,
	},
	{
		titulo: "Inscripciones",
    ruta: "/dashboard/lista-inscripciones",
    icono: <FaIcons.FaEdit />,
},
{
  titulo: "Usuarios",
  ruta: "/dashboard/lista-usuarios",
  icono: <FaIcons.FaUser />,
},
];


const SidebarData = () => {
	console.log(sidebarDATA)
	let datos = userRegisterReturn();
	console.log(datos);
	const history = useHistory();
	const auth = getAuth();
	const [user] = useAuthState(auth);
	
	function menu(){
		if (datos.state === "Autorizado"&& sidebarDATA.length === 8) {
			console.log("Activo");
			if (datos.typeUser === "Lider") {
				console.log("Lider");
				sidebarDATA.splice(7,1)
				sidebarDATA.splice(4,1)
			} else if (datos.typeUser === "Administrador") {
				console.log("Administrador");
				sidebarDATA.splice(4,2)
				console.log(sidebarDATA)
				
			} else if (datos.typeUser === "Estudiante") {
			console.log("Estudiante");
			sidebarDATA.splice(5,3)
		} else {
		}
	} else if (datos.state === "Pendiente" && sidebarDATA.length === 8) {
		console.log("Pendiente");
		sidebarDATA.splice(4,4)
		sidebarDATA.splice(1,2)
	} else if(datos.state === "No Autorizado" && sidebarDATA.length === 8){
		console.log("No Autorizado");
		sidebarDATA.splice(1,7)
	  }else{

	  }
  }
  setTimeout(
	menu()
	,3000)
  

  return sidebarDATA;
};

export default SidebarData;
