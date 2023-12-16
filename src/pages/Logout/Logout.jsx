import { useContext, useEffect } from "react"
import { AuthContext } from "../../auth/AuthWrapper"

const Logout = () => {
    const context = useContext(AuthContext)
    const { logout } = context;

    logout();
   
    return (
        <></>
    )
}

export default Logout