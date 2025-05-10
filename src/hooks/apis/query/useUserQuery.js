import { useQuery } from "@tanstack/react-query"
import { getUserProfile } from "../../../apis/TwitterUserApi"


export const useUserGetProfile = ()=>{
    const {isLoading:userProfileIsLoading , isSuccess:userProfileIsSuccess ,isError:userProfileIsError ,data:UserProfileData ,error}=useQuery({
        queryFn:()=>getUserProfile(),
        queryKey: ['userProfile'],
        cacheTime:0
    })

    return {isLoading:userProfileIsLoading,userProfileIsSuccess,userProfileIsError,UserProfileData}
}

// export const useUserLogOut = ()=>{
//     const {isLoading , isSuccess ,isError ,error}=useQuery({
//         queryFn:userLogOutApi,
//     })

//     return {isLoading , isSuccess ,isError ,error}
// }