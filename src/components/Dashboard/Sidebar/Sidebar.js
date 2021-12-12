import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import  SidebarData  from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { useHistory } from "react-router-dom";
import ListadoUsuarios from '../../ListadoUsuarios/ListadoUsuarios';
import { IdRegister , userRegister , userRegisterReturn} from '../../Firebase/Firebase';

import { createApolloFetch } from 'apollo-fetch';
const data = [

];

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const PATH_CUSTOMERS = process.env.REACT_APP_API_USUARIOS_PATH;
const PATH_CUSTOMERS_USUARIOS = process.env.REACT_APP_API_USUARIOS_PATH;


const Nav = styled.div`
	background: #15171c;
	height: 80px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;



const NavIcon = styled(Link)`
	margin-left: 2rem;
	margin-right: 2rem;
	font-size: 2rem;
	height: 80px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
`;

const SidebarNav = styled.nav`
	background: #15171c;
	width: 250px;
	height: 100vh;
	display: flex;
	justify-content: center;
	position: fixed;
	top: 0;
	left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
	transition: 350ms;
	z-index: 10;
`;

const SidebarWrap = styled.div`
	width: 100%;
`;

const Sidebar = () => {
	const uri = "http://localhost:5010/graphql";
async function  getUserByEmail(email){
	const query = `
		query GetUserByEmail($email: String) {
		  getUserByEmail(email: $email) {
			_id
			email
			identification
			nameUser
			typeUser
			state
		  }
		}
  
	  `;
	  console.log("..")
	  
	  const apolloFetch = createApolloFetch({ uri });
	  
	  await apolloFetch({
		query: query, 
		variables: { email:email }
		}).then(
			(result) => {
				console.log(result)
				const info =result.data.getUserByEmail
				debugger;
				if(result.data.getUserByEmail !== null){ 
				  
				  console.log("Usuario existente")
				  console.log(info.email)
				  IdRegister(info._id)

				  
				  userRegister(info.nameUser, info.identification, 
					info.typeUser,info.state)
  
				}else{
				  debugger;
				  console.log("Usuario No existe")
				}
			  },
			  (error) => {
				console.log(error);
			  }
			  ).catch(error => console.log('Error:', error))
		  
	  
		}
	const sideBarD=SidebarData()
	
	const [sidebar, setSidebar] = useState(false);
	const showSidebar = () => setSidebar(!sidebar);
	const history = useHistory();
	const auth = getAuth();
	const [user] = useAuthState(auth);
	const [errors, setErrors] = React.useState(null);
	const [newVal, setNewVal] = React.useState(0);
	var usuarioActivo=false
	const [usuario, setUsuario] = React.useState({
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
				//setIsLoaded(true);
				setUsuario({
				  ...usuario,
				  data: result
				});
				//console.log("user.email")
				//console.log(user.email)
				//console.log("usuario")
				//console.log(usuario)
	
				usuario.data.map((us)=>{
					//console.log("validar")
					if (us.nombreUsuario===user.email){
						//console.log(us.rol)
						//console.log(us.estado)
						if(us.estado==="Pendiente"){
							//console.log("usuarioActivo")
							//console.log(usuarioActivo)
							//usuarioActivo=true
							//console.log(usuarioActivo)
						}
					}
				})
			  },
			  (error) => {
				//setIsLoaded(true);
				setErrors(error);
			  }
			)
		});
	  }, [newVal]);
	
	const logout = () => {
		auth.signOut().then(function () {
		  console.log("loggedout");
		  history.replace("/");

		}).catch((error) => {

		});
	  };
	return (
		<>
			<IconContext.Provider value={{ color: '#fff' }}>
				<Nav>
					<NavIcon to='#'>
						<FaIcons.FaBars onClick={showSidebar} />
					</NavIcon>
					<NavIcon to='/' activestyle>
						<BiIcons.BiLogOut color="danger" onClick={logout} />
					</NavIcon> 
				</Nav>
				<SidebarNav sidebar={sidebar}>
					<SidebarWrap>
						<NavIcon to='#'>
							<AiIcons.AiOutlineClose onClick={showSidebar} />
						</NavIcon>
						{sideBarD.map((item, index) => {
							
							
							return <SubMenu disabled={true} item={item} key={index} />;
							
							
							
						})}
					</SidebarWrap>
				</SidebarNav>
			</IconContext.Provider>
		</>
	);
};


export default Sidebar;
