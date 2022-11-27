import React, { useState, useContext } from "react";

export let Apcontext = React.createContext();

export let AppProvider = ({children}) => {

    let [from, setFrom] = useState('');
    let [limit, setLimit] = useState('');


    let searchProducts = (start, limits) => {

        setFrom(start);
        setLimit(limits)
       
    }
    

    return(
        <Apcontext.Provider value={{from, limit, searchProducts}}>
            
            {children}
        </Apcontext.Provider>
    )

}