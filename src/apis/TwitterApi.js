import axios from "../config/ApiConfig";


export const userSignUpApi = async(data)=>{
    try {
        const response = await axios.post('/User/SignUp' ,data);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log("error while signing up user" , error);
    }
}