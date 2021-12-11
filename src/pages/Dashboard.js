import React from 'react';
import Sidebar from '../components/Dashboard/Sidebar/Sidebar';
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import Foto from "../assets/foto-perfil.png"
import { useHistory } from "react-router-dom";
import { userRegisterReturn } from '../components/Firebase/Firebase';


function Dashboard() {
	let userLogged = userRegisterReturn();
  console.log(userLogged)
  console.log("listado")
  

	const auth = getAuth();
	const [user] = useAuthState(auth);
	const history = useHistory();
	if (!user) {
		history.replace("/");
		return(
			<>
			<h1 className="title-dashboard">Bienvenidos al mejor gestor de proyectos </h1><br/>
			<h2>Grupo CA-JS</h2>
			</>
		);
	} else {

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
