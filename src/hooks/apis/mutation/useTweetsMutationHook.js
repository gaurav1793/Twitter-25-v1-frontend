import {  useMutation } from "@tanstack/react-query"
import { createTweet } from "../../../apis/TwiiterTweetsApi"



export const useCreateTweetHook =()=>{
   
    const {mutateAsync :createTweetFn,isError:CTisError,isPending:CTisPending,isSuccess:CTisSuccess,data:CTdata}=useMutation({
        mutationFn:createTweet,
        onSuccess:(data)=>{console.log("success",data)
        },
        onError:(error)=>{console.log(error)}
    })
    return {createTweetFn,CTisError,CTisPending,CTisSuccess,CTdata}
}