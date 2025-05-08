import { useMutation } from "@tanstack/react-query"
import { userSignUpApi } from "../../../apis/TwitterApi"

export const useUserSignUp = ()=>{
    const{mutateAsync,isError,isPending,isSuccess}=useMutation({
        mutationFn:(data)=>{userSignUpApi(data)},
        onSuccess:(data)=>{console.log(data)},
        onError:(error)=>{console.log(error)}

    })
    return {
        createUser:mutateAsync,
        isPending,
        isSuccess,isError
    }
}