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