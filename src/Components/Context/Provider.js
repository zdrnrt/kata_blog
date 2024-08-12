import React, { useState, useContext, useEffect } from 'react';
import Context from './Context';

const ContextProvider = ({ children }) => {
	const getInitialState = () => (sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null);

	const [user, setUser] = useState(getInitialState);

	const changeUser = (data) => {
		sessionStorage.setItem('user', JSON.stringify(data));
		setUser(data);
	};

	return <Context.Provider value={{ user, changeUser }}>{children}</Context.Provider>;
};

export default ContextProvider;
