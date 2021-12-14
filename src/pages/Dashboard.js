import React from 'react';
import Sidebar from '../components/Dashboard/Sidebar/Sidebar';
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import Foto from "../assets/foto-perfil.png"
import { useHistory } from "react-router-dom";
import { userRegisterReturn } from '../components/Firebase/Firebase';

function Dashboard() {
	const auth = getAuth();
	const [user] = useAuthState(auth);
	const history = useHistory();

	let userLogged = userRegisterReturn();

  if (!user || !userLogged) {
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
		<Sidebar/>

		<center>
			<div className="bienvenido-dashboard">
				<h1 className="title-dashboard">Bienvenidos al mejor gestor de proyectos </h1><br/>
				<h2>Grupo CA-JS</h2>

				<img className="imagen-login" src={(user.photoURL) ? user.photoURL: Foto} alt="" />
				<h3>Hola, {(userLogged.nameUser)? userLogged.nameUser: ""}</h3>
				<h3>Tu correo es: {(user.email)? user.email: ""} </h3>
				<h2>El estado de tu usuario es: {(userLogged.state)? userLogged.state.toUpperCase(): ""} </h2>
			</div>
		</center>

		</>

		
	)
}
}
export default Dashboard;
