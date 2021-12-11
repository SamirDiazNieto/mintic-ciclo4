import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarLink = styled(Link)`
	display: flex;
	color: #e1e9fc;
	justify-content: space-between;
	align-items: center;
	padding: 20px;
	list-style: none;
	height: 60px;
	text-decoration: none;
	font-size: 18px;

	&:hover {
		background: #252831;
		border-left: 4px solid #632ce4;
		cursor: pointer;
	}
`;

const SidebarLabel = styled.span`
	margin-left: 16px;
`;

const DropdownLink = styled(Link)`
	background: #424757;
	height: 60px;
	padding-left: 3rem;
	display: flex;
	align-items: center;
	text-decoration: none;
	color: #f5f5f5;
	font-size: 18px;

	&:hover {
		background: #632ce4;
		cursor: pointer;
	}
`;

const SubMenu = ({ item }) => {
	let [subnav, setSubnav] = useState(false);
	const showSubnav = () => {
		if (!subnav) {
			subnav = true;
			setSubnav(subnav);
			console.log(subnav);
		} else {
			subnav = false;
			setSubnav(subnav);
			console.log(subnav);
		}
	};
	return (
		<>
			<SidebarLink to={item.ruta} onClick={item.subNav && showSubnav}>
				<div>
					{item.icono}
					<SidebarLabel>{item.titulo}</SidebarLabel>
				</div>
				<div>{item.subNav && subnav ? item.iconoAbierto : item.subNav ? item.iconoCerrado : null}</div>
			</SidebarLink>
			{subnav &&
				item.subNav.map((subItem, index) => {
					return (
						<DropdownLink to={subItem.ruta} key={index}>
							{subItem.icono}
							<SidebarLabel>{subItem.titulo}</SidebarLabel>
						</DropdownLink>
					);
				})}
		</>
	);
};

export default SubMenu;
