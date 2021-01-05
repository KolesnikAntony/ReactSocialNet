import * as axios from "axios";

const instance = axios.create(
    {
        withCredentials: true,
        headers: {
            'API-KEY': '40c8c4c0-bb4d-4239-bc96-756eb81d3261'
        },
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    }
)

export const usersAPI = {
    getUsers(currentPage, pageSize){
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    },
    unfollow(userId){
        return instance.delete(`follow/${userId}`)
    },
    follow(userId){
        return instance.post(`follow/${userId}`)
    },
    getProfile(userId) {
        console.warn('This is old method. Please use to ProfileAPI');
        return profileAPI.getProfile(userId);
    }

}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {
          status: status
        })
    }
}

export const authAPI = {

    me() {
        return instance.get('auth/me')
    },
    login(email, password, rememberMe) {
        return instance.post('auth/login', {email, password, rememberMe})
    },
    logout() {
        return instance.delete('auth/login')
    }
}