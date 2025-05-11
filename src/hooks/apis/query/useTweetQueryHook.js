import { useQuery } from "@tanstack/react-query"
import { getAllTweetsApi } from "../../../apis/TwiiterTweetsApi"



export const useGetAllTweetHook = ()=>{
    const{isFetching,isFetched,isError,data:AllTweets ,error:getAllTweetsError ,refetch:getTweetList}=useQuery({
        queryFn:getAllTweetsApi,
        queryKey:['AllTweets'],
         enabled: false,
        
    })
    return {isFetching,isFetched,isError,AllTweets ,getAllTweetsError,getTweetList}
} 

export const useGetAllTweetsByIdHook =()=>{
    const { isFetching:GTbyIdisFetching,isFetched:GTbyIdisFetched,isError:GTbyIdisError,data:GTbyIdData ,error:GTbyIdError ,refetch:GTbyId}=useQuery({
        queryFn:(id)=>getTweetsById(id),
        queryKey:['AllTweetsById'],
        enabled: false,
    })
    return {GTbyIdisFetching,GTbyIdisFetched,GTbyIdisError,GTbyIdData,GTbyIdError,GTbyId}
}