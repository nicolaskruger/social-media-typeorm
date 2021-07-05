import axios from 'axios'

export function useAxios(baseUrl: string, headers: any) {
    return axios.create({
        baseURL: baseUrl,
        headers: headers,
        withCredentials: true
    })
}