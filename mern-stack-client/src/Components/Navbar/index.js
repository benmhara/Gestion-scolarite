import React from 'react';
import { Link } from 'react-router-dom';
import {
	Nav,
	NavLink,
	Bars,
	NavMenu,
	NavBtn,
	NavBtnLink,
} from './NavbarElements';
import PostMessages from '../etudiant/PostMessages';
import PostEnseignants from '../enseignant/PostEnseignants';
import PostCours from '../cours/PostCours';
import PostPfes from '../pfe/PostPfes';
import SearchTable from '../filterTable';
import Register from '../auth/Register';

const Navbar = () => {
	return (
		<>
			<Nav>
				<Bars />
				<NavMenu>
					<NavLink to="/PostMessages" activeStyle>
						Gestion étudiants
					</NavLink>
					<NavLink to="/PostEnseignants" activeStyle>
						Gestion enseignants
					</NavLink>
					<NavLink to="/PostCours" activeStyle>
						Gestion Cours
					</NavLink>
					<NavLink to="/PostPfes" activeStyle>
						Gestion PFE
					</NavLink>
					<NavLink to="/SearchTable" activeStyle>
						Gestion utilisateur
					</NavLink>
				</NavMenu>
				<NavBtn>
					<NavBtnLink to='/Register'>S'incrire</NavBtnLink>
				</NavBtn>
				<NavBtn>
					<NavBtnLink to='/login'>Connexion</NavBtnLink>
				</NavBtn>
			</Nav>
		</>
	);
};

export default Navbar;
