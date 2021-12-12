import React from 'react';
import Sidebar from '../components/Dashboard/Sidebar/Sidebar';
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import Foto from "../assets/foto-perfil.png"
import { useHistory } from "react-router-dom";
import { userRegisterReturn } from '../components/Firebase/Firebase';
import { IdRegister, userRegister } from '../components/Firebase/Firebase';
import { createApolloFetch } from 'apollo-fetch';

const uri = "http://localhost:5010/graphql";
async function  getUserByEmail(email){
	const query = `
		query GetUserByEmail($email: String) {
		  getUserByEmail(email: $email) {
			_id
			email
			identification
			nameUser
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
function Dashboard() {
	const auth = getAuth();
	const [user] = useAuthState(auth);
	const history = useHistory();

	let userLogged = userRegisterReturn();



  

  if (!user) {
		history.replace("/");
		return(
			<>
			<h1 className="title-dashboard">Bienvenidos al mejor gestor de proyectos </h1><br/>
			<h2>Grupo CA-JS</h2>
			</>
		);
	} else {

		if(userLogged.nameUser=== ""){
			debugger;
			 getUserByEmail(user.email)
		};
		console.log(userLogged)
  console.log("listado")
	return (
		<>
			<Sidebar />
		<center>
			<div className="bienvenido-dashboard">
				<h1 className="title-dashboard">Bienvenidos al mejor gestor de proyectos </h1><br/>
				<h2>Grupo CA-JS</h2>

				<img className="imagen-login" src={(user.photoURL) ? user.photoURL: Foto} alt="" />
				<h3>Hola, {userLogged.nameUser }</h3>
				<h3>Tu correo es: {user.email} </h3>
			</div>
		</center>
		</>

		
	)
}
}
export default Dashboard;
