import axios from 'axios'

function registerUser(data) {
    return axios({
        url: process.env.VUE_APP_URL + "/sendsms",
        method: 'post',
        data: data,
        withCredentials: true
    })
}
export default registerUser 
