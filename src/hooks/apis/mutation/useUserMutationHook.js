import { useMutation } from "@tanstack/react-query"
import { userLogOutApi, userSignInApi, userSignUpApi } from "../../../apis/TwitterUserApi"

export const useUserSignUp = ()=>{
    const{mutateAsync,isError,isPending,isSuccess,data}=useMutation({
        mutationFn:(data)=>{userSignUpApi(data)},
        onSuccess:(data)=>{console.log("success",data)},
        onError:(error)=>{console.log(error)}

    })
    return {
        createUser:mutateAsync,
        isPending,
        isSuccess,isError,
        data
    }
}


export const useUserSignIn =()=>{
    const {mutateAsync:signInUser ,isError ,isSuccess,data,error}=useMutation({
        mutationFn:(data)=>userSignInApi(data),
        onSuccess:(data)=>{console.log("success usersignIN inside hook",data)},
        onError:(error)=>{console.log("error usersignIN inside hook",error)}
    })
    return {signInUser ,isError ,isSuccess,data,error}
}



export const useUserLogOut =()=>{
    const {mutateAsync:LogOutUser ,isError ,isSuccess,data,error} = useMutation({
        mutationFn:userLogOutApi,
    })

    return {LogOutUser ,isError ,isSuccess,data,error}
}