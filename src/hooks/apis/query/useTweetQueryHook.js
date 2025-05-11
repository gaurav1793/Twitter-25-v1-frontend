import { useQuery } from "@tanstack/react-query"
import { getAllTweetsApi, getTweetsById } from "../../../apis/TwiiterTweetsApi"



export const useGetAllTweetHook = ()=>{
    const{isFetching,isFetched,isError,data:AllTweets ,error:getAllTweetsError ,refetch:getTweetList}=useQuery({
        queryFn:getAllTweetsApi,
        queryKey:['AllTweets'],
         enabled: false,
        
    })
    return {isFetching,isFetched,isError,AllTweets ,getAllTweetsError,getTweetList}
} 

export const useGetAllTweetsByIdHook =(id)=>{
    console.log(id)
    const { isFetching:GTbyIdisFetching,isFetched:GTbyIdisFetched,isError:GTbyIdisError,data ,error:GTbyIdError ,refetch:gtFn}=useQuery({
        queryFn:()=>getTweetsById(id),
        queryKey:['AllTweetsById'],
        enabled:false,
    })

    return {GTbyIdisFetching,GTbyIdisFetched,GTbyIdisError,data,GTbyIdError,gtFn}
}