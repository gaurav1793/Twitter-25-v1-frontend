import axios from "../config/ApiConfig"


export const getAllTweetsApi =async()=>{
    try {
        const response = await axios.get('/Tweets/getTweets',{ withCredentials: true })
        console.log(response);
        return response.data.data;
    } catch (error) {
        throw error
    }
}

export const createTweet = async(data)=>{
    try {
        const response=await axios.post('/Tweets/createTweet',data,{ withCredentials: true })
        console.log(response.data)
        return response.data
    } catch (error) {
        throw error
    }
}