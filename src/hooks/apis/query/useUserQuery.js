import { useQuery } from "@tanstack/react-query"
import { getUserProfile } from "../../../apis/TwitterUserApi"


export const useUserGetProfile = ()=>{
    const {isLoading , isSuccess ,isError ,data:UserProfile ,error}=useQuery({
        queryFn:getUserProfile,
    })

    return {isLoading,isSuccess,isError,UserProfile,error}
}

// export const useUserLogOut = ()=>{
//     const {isLoading , isSuccess ,isError ,error}=useQuery({
//         queryFn:userLogOutApi,
//     })

//     return {isLoading , isSuccess ,isError ,error}
// }