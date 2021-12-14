import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import  SidebarData  from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
import { getAuth } from "firebase/auth";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';


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

const Sidebar = (estado) => {
<<<<<<< HEAD
	
=======
>>>>>>> SamirDiaz
	const sideBarD=SidebarData()
	const [sidebar, setSidebar] = useState(false);
	const showSidebar = () => setSidebar(!sidebar);
	const history = useHistory();
	const auth = getAuth();
	
	const logout = () => {
		auth.signOut().then(function () {
			localStorage.removeItem('nameRegister');
			localStorage.removeItem('documentoRegister');
			localStorage.removeItem('tipoUsuarioRegister');
			localStorage.removeItem('stateRegister');
			localStorage.removeItem('_id');
		  console.log("loggedout");
		  history.replace("/");
		  Swal.fire({
			position: 'center',
			icon: 'info',
			title: 'Sesión cerrada',
			showConfirmButton: false,
			timer: 1500
		  })

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
							return <SubMenu disabled={true} item={item} key={index}/>;
						})}
					</SidebarWrap>
				</SidebarNav>
			</IconContext.Provider>
		</>
	);
};


export default Sidebar;
