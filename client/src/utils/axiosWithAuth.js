import axios from 'axios';

export const axiosWithAuth = () => {
    const token = window.localStorage.getItem('Token');
    return axios.create({
        headers: {
            authorization: token
        },
        baseURL: 'http://localhost:5000'
    })
}