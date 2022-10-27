import {useNavigate} from 'react-router-dom';
import Not from '../static/notfound.svg';
function Notfound (){
    const  navigate=useNavigate()
    const goback=()=>{
            navigate(-1)
    }
    return (
        <div className='bg-light vh-100 d-flex justify-content-center align-items-center text-center'> 
            <div>
                <h1>Not Found</h1>
                <img src={Not} alt="not found"/>
                <p className='lead fw-bolder m-1'>Hmm.. The Pege you are looking for does not exist</p>
                <button onClick={goback} className="btn btn-info text-white m-1 p-2"> Go Back</button>
            </div>
            
        </div>
    )

}

export default Notfound;