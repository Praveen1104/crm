import axios from "axios";
const base_url="https://relevel-crm--backend.herokuapp.com";


/*
signup
POST:api
url:/crm/api/v1/auth/signup
data:uid,email,name,pw
*/

export async function UserSignup(data){
    return await axios.post(`${base_url}/crm/api/v1/auth/signup`,data)
}
/*
signin
POST:api
url:/crm/api/v1/auth/signin
data:uid,pw

*/
export async function UserSignin(data){
    return await axios.post(`${base_url}/crm/api/v1/auth/signin`,data)
}