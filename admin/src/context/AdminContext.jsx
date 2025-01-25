import { createContext } from "react";

export const AdminContext = createContext();

const AdminContextProvider = (props) =>{

    const value = {

    }

    return (
        <AdminContext.Provider value={value}>
            {props.childern}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;