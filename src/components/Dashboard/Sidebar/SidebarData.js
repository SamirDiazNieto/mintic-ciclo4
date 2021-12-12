import React from 'react';
import * as SiIcons from 'react-icons/si'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
//import * as RiIcons from 'react-icons/ri';
import * as BsIcons from 'react-icons/bs';
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { useHistory } from "react-router-dom";

const data = [

];

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const PATH_CUSTOMERS = process.env.REACT_APP_API_USUARIOS_PATH;
const PATH_CUSTOMERS_USUARIOS = process.env.REACT_APP_API_USUARIOS_PATH;
let sidebarDATA=[
	
	{
		titulo: 'Inicio',
		ruta: '/dashboard',
		icono: <AiIcons.AiFillHome />,
	},
	{
		titulo: 'Productos',
		ruta: '/dashboard/lista-productos',
		icono: <FaIcons.FaShoppingCart />,
		// iconoCerrado: <RiIcons.RiArrowDownSFill />,
		// iconoAbierto: <RiIcons.RiArrowUpSFill />,
		// subNav: [
		// 	{
		// 		titulo: 'Registrar',
		// 		ruta: '/dashboard/productos/registrar',
		// 		icono: <AiIcons.AiOutlineAppstoreAdd />,
		// 	},
		// 	{
		// 		titulo: 'Listar',
		// 		ruta: '/dashboard/productos/listar',
		// 		icono: <FaIcons.FaListOl />,
		// 	},
		// 	{
		// 		titulo: 'Buscar',
		// 		ruta: '/dashboard/productos/buscar',
		// 		icono: <AiIcons.AiOutlineFileSearch />,
		// 	},
		// 	{
		// 		titulo: 'Actualizar',
		// 		ruta: '/dashboard/productos/actualizar',
		// 		icono: <FaIcons.FaEdit />,
		// 	},
		// ],
	},
	{
		titulo: 'Ventas',
		ruta: '/dashboard/lista-ventas',
		icono: <BsIcons.BsReceiptCutoff />,
		
	},
	{
		titulo: 'Inscripciones',
		ruta: '/dashboard/lista-inscripciones',
		icono: <FaIcons.FaUser />,
	},
	{
		titulo: 'Usuarios',
		ruta: '/dashboard/lista-usuarios',
		icono: <FaIcons.FaUserCog />,
		
	},
	{
		titulo: 'Actualizar mis Datos',
		ruta: '/dashboard/actualizar-datos',
		icono: <FaIcons.FaEdit />,
		
	},
	
];
const SidebarData = () => {
		const history = useHistory();
		const auth = getAuth();
		const [user] = useAuthState(auth);
		const [errors, setErrors] = React.useState(null);
		const [newVal, setNewVal] = React.useState(0);
		var usuarioActivo=false
		const [us, setUs] = React.useState({
			data: data,
			form: {
			  // id: "",
			  nombreUsuario: "",
			  password: "",
			  rol: "",
			  estado:""
			}
		  });
		  React.useEffect(() => {
			if (!user) return history.replace("/");
			user.getIdToken(true).then(token => {
			  // sessionStorage.setItem("token", token) 
			  const requestOptions = {
				method: 'GET',
				headers: {
				  'Content-Type': 'application/json',
				  Authorization: `Bearer ${token}`,
				},
			  };
			  fetch(`${BASE_URL}${PATH_CUSTOMERS}`, requestOptions)
				.then(res => res.json())
				.then(
				  (result) => {
					  console.log(result)
					//setIsLoaded(true);
					

					console.log("user.email---")
				console.log(user.email)
				console.log("usuario----")
				result.map((us)=>{
					console.log("validar-----")
					if (us.nombreUsuario===user.email ){
					
						
						console.log(us.estado)
						console.log(us.rol)
						
						if(us.estado==="Pendiente" ){
							console.log("usuarioActivo-----")
							console.log(usuarioActivo)
							usuarioActivo=true
							console.log(usuarioActivo)
							console.log("sidebarDATA")
							console.log(sidebarDATA)
							sidebarDATA=[]
						}
						if(us.estado ==="No Autorizado"){
							sidebarDATA=[]
						}
							
							
							console.log(sidebarDATA)
					
					if(us.rol==="Vendedor"){
						sidebarDATA.splice(3,1)
					}
					sidebarDATA.splice(0,0,{
						titulo: `ROL: ${us.rol}`,
						ruta: '',
						icono: <SiIcons.SiWebauthn />,})
						sidebarDATA.splice(0,0,{
							titulo: `ESTADO: ${us.estado}`,
							ruta: '',
							icono: <SiIcons.SiWebauthn />,})
					
				}
					console.log(sidebarDATA)
						
				})
					
				
		
					
				  },
				  (error) => {
					//setIsLoaded(true);
					setErrors(error);
				  }
				)
				
			});
		  }, [newVal]);
		  
return( sidebarDATA)
	  
	}

	  export default SidebarData;