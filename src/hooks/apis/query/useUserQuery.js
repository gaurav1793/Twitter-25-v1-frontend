import { useQuery } from "@tanstack/react-query"
import { getUserProfile, getUserProfileById } from "../../../apis/TwitterUserApi"


export const useUserGetProfile = ()=>{
    const {isLoading:userProfileIsLoading , isSuccess:userProfileIsSuccess ,isError:userProfileIsError ,data:UserProfileData ,error}=useQuery({
        queryFn:()=>getUserProfile(),
        queryKey: ['userProfile'],
        cacheTime:0
    })

    return {isLoading:userProfileIsLoading,userProfileIsSuccess,userProfileIsError,UserProfileData}
}

export const useGetUserById = (id)=>{
    console.group("hi bhai from q",id);
    const {isFetching:GUByIdisFetching,isFetched:GUByIdisFetched,data : GUByIdData,isError:GUByIdisError,refetch:GUByIdFn}=useQuery({
        queryFn:()=>getUserProfileById(id),
        queryKey:['UserById'],
        enabled:false,
    })
    return {GUByIdisFetching,GUByIdisFetched,GUByIdData,GUByIdisError,GUByIdFn}
}
