import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserProfileStore = create(persist(
    (set)=>{
    return{
        userProfile:null,
        setUserProfile:(username,avtar,coverImage,email,_id)=>{
            set({userProfile:{
                userName:username,
                userAvtar:avtar,
                userCoverImage:coverImage,
                UserEmail:email,
                userId:_id
            }}) 
        },
        clearUserProfile: () => set({ userProfile: null })
    }  
    },
    {
        name: 'user-profile-store',
    }
))