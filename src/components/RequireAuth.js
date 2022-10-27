import  {Outlet,Navigate,useLocation} from 'react-router-dom';
function RequireAuth({allowedroles}){
    const loca=useLocation()
    return (
        localStorage.getItem("userTypes") === allowedroles[0]  ?
        <Outlet />
        : localStorage.getItem("userTypes") 
        ? <Navigate to="/unauthorized" state={{from : loca}} replace />
        : <Navigate to="/" state={{from : loca}} replace />
    )
}

export default RequireAuth