import { CSidebar, CSidebarNav, CNavTitle, CNavItem } from '@coreui/react';
import {useNavigate} from 'react-router-dom';

function Sidebar(){
    const navigate=useNavigate()
    const logoutfn=()=>{
        localStorage.clear();
        navigate("/");
    }
    return (
        <CSidebar unfoldable className='vh-100 bg-black'>
        <CSidebarNav>
            <CNavItem className="bg-dark d-flex">
                <i className="bi bi-bar-chart-fill text-white m-3 my-2"></i>
                <h5 className="text-white fw-bolder mx-3 my-2">TETHERX</h5>
            </CNavItem>
            <CNavTitle className="text-light fw-normal">
                A CRM App
            </CNavTitle>
            <div onClick={logoutfn}></div>
            <CNavItem className="bg-dark d-flex">
            
                <i className="bi bi-box-arrow-left text-white m-3"></i>
                <div className="text-white fw-bolder mx-3 my-2">Logout</div>
            </CNavItem>
        </CSidebarNav>

    </CSidebar>
    )
}

export default Sidebar;