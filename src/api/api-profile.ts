import {PhotosDataType, UserProfileType} from "../Types/types";
import {APIResponseType, instance} from "./api";

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<APIResponseType<UserProfileType>>(`profile/${userId}`).then(res => res.data)
    },
    getStatus(userId: number) {
        return instance.get<APIResponseType<string>>(`profile/status/${userId}`).then(res => res.data)
    },
    updateStatus(status: string) {
        return instance.put<APIResponseType>(`profile/status`, {
            status: status
        }).then(res => res.data)
    },
    updatePhoto(photo: any) {
        let formData = new FormData();
        formData.append("image", photo);
        return instance.put<APIResponseType<PhotosDataType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)
    },
    updateProfile(profileData: UserProfileType) {
        return instance.put<APIResponseType>(`profile`, profileData).then(res => res.data)
    }
};