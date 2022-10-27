import axios from "axios";

const base_url="https://relevel-crm--backend.herokuapp.com";

export async function getAllusers(){
    return await axios.get(`${base_url}/crm/api/v1/users`,{
        headers: {
            'x-access-token':localStorage.getItem("token")
        }
    }, {
        "userId": localStorage.getItem("userId")
    })

    
}


export async function userUpdation(userId,selectedcurruser){
                return await axios.put(`${base_url}/crm/api/v1/users/${userId}`,selectedcurruser,{
                    headers: {
                        'x-access-token':localStorage.getItem("token")
                    }
                }, {
                    "userId": localStorage.getItem("userId")
                })
}