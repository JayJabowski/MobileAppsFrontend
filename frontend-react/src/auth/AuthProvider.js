//------------------------
// AUTHOR: Jan Wittrowski
//------------------------

import React, { createContext, useState } from "react";
 
const AuthContext = createContext({});

export const AuthProvider = ( { children }) => {
    const [ auth, setAuth ] = useState({ token: "REMOVE_ME"});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>

    )
}

//TODO : De-Hard-Code token

export default AuthContext;