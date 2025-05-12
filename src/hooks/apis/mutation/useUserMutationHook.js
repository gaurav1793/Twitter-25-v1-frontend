import { useMutation } from "@tanstack/react-query"
import { updateUser, userLogOutApi, userSignInApi, userSignUpApi } from "../../../apis/TwitterUserApi"

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
    const {mutateAsync:signInUser ,isError:signInIsError ,isSuccess:signInIsSuccess,data:signInData,error:signInError}=useMutation({
        mutationFn:(data)=>userSignInApi(data),
        onSuccess:(data)=>{console.log("success usersignIN inside hook",data)},
        onError:(error)=>{console.log("error usersignIN inside hook",error)}
    })
    return {signInUser ,signInIsError ,signInIsSuccess,signInData,signInError}
}



export const useUserLogOut =()=>{
    const {mutateAsync:LogOutUser ,isError:logOutisError ,isSuccess:logOutIsSuccess,data,error} = useMutation({
        mutationFn:userLogOutApi,
    })

    return {LogOutUser ,logOutisError ,logOutIsSuccess}
}



export const useUpdateUser = ()=>{
    const {mutateAsync:UpdateUser ,isError:UpdateUserisError ,isSuccess:UpdateUserisSuccess,data:UpdateUserData,error:UpdateUserError}=useMutation({
        mutationFn:(data)=>updateUser(data),
        onSuccess:(data)=>{console.log("success userupdate inside hook",data)},
        onError:(error)=>{console.log("error userupdate inside hook",error)}
    })

    return {UpdateUser,UpdateUserisError,UpdateUserisSuccess,UpdateUserData,UpdateUserError}
}