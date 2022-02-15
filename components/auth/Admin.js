import Router from "next/router"
import { useEffect } from "react"
import { isAuth } from "../../actions/auth"



const Admin = ({children}) => {
    useEffect(() => {
        if(!isAuth()){
            Router.push(`/404`)
            console.log('if');
        }
        else if(isAuth().role !== 1){
            Router.push(`/`)
            console.log('else');
        }
    },[])
    return <>{children}</>
}

export default Admin