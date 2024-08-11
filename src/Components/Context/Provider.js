import React, { useState, useContext, useEffect } from 'react';
import Context from './Context';

const ContextProvider = ({ children }) => {

	const getInitialState = () => sessionStorage.getItem("profile") ? JSON.parse(sessionStorage.getItem("profile")) : null;

	const [profile, setProfile] = useState(getInitialState);

	const changeProfile = (data) => {
		sessionStorage.setItem('profile', JSON.stringify(data));
		setProfile(data);
	};

	return <Context.Provider value={{ profile, changeProfile }}>{children}</Context.Provider>;
};

export default ContextProvider;
