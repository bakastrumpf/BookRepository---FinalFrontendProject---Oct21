import React, {useState, useContext, createContext} from 'react';

const authContext = createContext();

export const ProvideAuth = ({children}) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>
        {children}
    </authContext.Provider>
}

export const useAuth = () => {
    return useContext(authContext);
}

const useProvideAuth = () => {
    const [login, setLogin] = useState(null);
    const [error, setError] = useState("");
    const signin = (username, password, failCallback = () => {}, okCallback = () => {}) => {
        fetch("http://localhost:3080/app/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username, password: password})
        }).then(response => response.json())
        .then(data => {
            if(data.status !== "ok"){
                setLogin(null);
                setError(data.body);
                failCallback();    
            }else{
                setLogin(data.body);
                setError(""); 
                okCallback();
            }
        })
        .catch(err => {
            setLogin(null);
            setError(err);
            failCallback();
        });
    }
    const signout = (cb = () => {}) => {
        setLogin(null);
        setError("");
        cb();
    }

    return [login, error, signin, signout];
}