import {  useMutation } from "@tanstack/react-query"
import { createTweet, deleteTweetApi, updateTweet } from "../../../apis/TwiiterTweetsApi"



export const useCreateTweetHook =()=>{
   
    const {mutateAsync :createTweetFn,isError:CTisError,isPending:CTisPending,isSuccess:CTisSuccess,data:CTdata}=useMutation({
        mutationFn:createTweet,
        onSuccess:(data)=>{console.log("success",data)
        },
        onError:(error)=>{console.log(error)}
    })
    return {createTweetFn,CTisError,CTisPending,CTisSuccess,CTdata}
}


export const UseTweetDelete = ()=>{
    const{isSuccess:DTisSuccess,isPending:DTisPending,isError:DTisError,mutateAsync:deleteTweet}=useMutation({
        mutationFn:(id)=>deleteTweetApi(id),
        onSuccess:(data)=>{console.log(data)},
        onError:(error)=>{console.log(error)},
    })
    return {DTisSuccess,DTisPending,DTisError,deleteTweet}
}

export const useUpdateTweet =()=>{
    const {mutateAsync:UpdateTweet ,isError:UpdateTweetisError ,isSuccess:UpdateTweetisSuccess,error:UpdateTweetError}=useMutation({
        mutationFn:(data)=>updateTweet(data),
        onSuccess:(data)=>{console.log("success userupdate inside hook",data)},
        onError:(error)=>{console.log("error userupdate inside hook",error)}
    })
    return {UpdateTweet,UpdateTweetisError,UpdateTweetisSuccess,UpdateTweetError}
}