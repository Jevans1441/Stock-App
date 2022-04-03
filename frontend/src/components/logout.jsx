import { useNavigate } from "react-router-dom"
import { Dispatch } from "react"

const Logout = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        navigate('/login')
    }

    return (
        <>
        {handleLogout}
        </>
    )

    
}

export default Logout