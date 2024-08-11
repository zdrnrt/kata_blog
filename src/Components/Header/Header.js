import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../Context/Context';
import './Header.scss';

export default function Header(props) {
	const data = useContext(Context);
	let controls;
	if (!!data.profile) {
		controls = <ProfileInfo profile={data.profile} action={data.loginProfile} />;
	} else {
		controls = <SignLinks />;
	}
	return (
		<header className="header">
			<div className="container pt-3 pb-3">
				<div className="row justify-content-between align-items-center">
					<h1 className="h5 col-6">
						<Link to="/" className="header__logo-link">
							Realworld Blog
						</Link>
					</h1>
					{!!data.profile ? (
						<ProfileInfo profile={data.profile.user} action={data.loginProfile} />
					) : (
						<SignLinks />
					)}
				</div>
			</div>
		</header>
	);
}

function ProfileInfo(props) {
	return (
		<div className="col-6 text-end">
			<Link to="/new-article" className="btn btn-sm btn-outline-success">
				Create article
			</Link>
			<Link to="/profile" type="button" className="btn profile lh-1">
				<span className="profile__name">{props.profile.username}</span>
				<img
					src={props.profile?.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'}
					width="36"
					height="36"
					className="profile__pic"
				/>
			</Link>
			<button type="button" className="btn btn-outline-secondary" onClick={() => props.action(null)}>
				Log Out
			</button>
		</div>
	);
}

function SignLinks() {
	return (
		<div className="col-6 text-end">
			<Link to="/sign-in" type="button" className="btn header__sign">
				Sign In
			</Link>
			<Link to="/sign-up" type="button" className="btn btn-outline-success">
				Sign Up
			</Link>
		</div>
	);
}
