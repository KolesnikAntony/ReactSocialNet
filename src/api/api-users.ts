
import {APIResponseType, instance} from "./api";
import {UsersGetType} from "../Types/types";


export const usersAPI = {
    getUsers(currentPage: number, pageSize: number){
        return instance.get<UsersGetType>(`users?page=${currentPage}&count=${pageSize}`).then(res => res.data)
    },
    unfollow(userId:number){
        return instance.delete<APIResponseType>(`follow/${userId}`).then(res => res.data)
    },
    follow(userId: number){
        return instance.post<APIResponseType>(`follow/${userId}`).then(res => res.data)
    },

};

