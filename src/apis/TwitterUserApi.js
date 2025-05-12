import axios from "../config/ApiConfig";


export const userSignUpApi = async(data)=>{
    try {
        const response = await axios.post('/User/SignUp' ,data ,{ withCredentials: true });
        console.log(response);
        return response.data;
    } catch (error) {
        console.log("error while signing up user" , error);
    }
}


export const userSignInApi = async(data)=>{
    try {
        const response = await axios.post('/User/SignIn',data,{ withCredentials: true });
        console.log(response);
        return response.data;
    } catch (error) {
        throw error
    }
}


export const getUserProfile = async()=>{
    try {
        const response = await axios.get('/User/userProfile',{ withCredentials: true })
        console.log(response);
        return response.data;
    } catch (error) {
        throw error
    }
}
export const userLogOutApi = async()=>{
    try {
        const response = await axios.post('/User/LogOut',{},{ withCredentials: true });
        console.log(response);
    } catch (error) {
         throw error
    }
}

export const getUserProfileById = async(id)=>{
    try {
        const response = await axios.get(`/User/getUserById/${id}`,{ withCredentials: true })
        console.log(response?.data)
        return response?.data.data
    } catch (error) {
        throw error
    }
}

export const updateUser = async(data)=>{
    try {
        const response = await axios.post('/User/updateUser',data,{ withCredentials: true })
        console.log(response);
        return response.data;
    } catch (error) {
        throw error
    }
}