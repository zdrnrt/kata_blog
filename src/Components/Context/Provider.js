import React, { useState, useContext } from 'react';
import Context from './Context';

const ContextProvider = ({ children }) => {
	const [profile, setProfile] = useState(useContext(Context));
	// console.log("Provider", profile);

	const loginProfile = (data) => setProfile(data);

	return <Context.Provider value={{ profile, loginProfile }}>{children}</Context.Provider>;
};

export default ContextProvider;
