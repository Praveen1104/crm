import axios from "axios";

const base_url="https://relevel-crm--backend.herokuapp.com";

export async function Fetchticket(){
    return await axios.get(`${base_url}/crm/api/v1/tickets/`,{
        headers: {
            'x-access-token':localStorage.getItem("token")
        }
    }, {
        "userId": localStorage.getItem("userId")
    }
    )
}


export async function ticketUpdation(id,selectedcurrticket){
    return await axios.put(`${base_url}/crm/api/v1/tickets/${id}`,selectedcurrticket,{
        headers: {
            'x-access-token':localStorage.getItem("token")
        }
    }, {
        "userId": localStorage.getItem("userId")
    }
    )
}