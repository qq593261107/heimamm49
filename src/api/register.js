import instance from '@/utils/request.js'


function registerUser(data) {
    return instance({
        url: "/sendsms",
        method: 'post',
        data: data
    })
}
function register(data) {
    return instance({
        url: "/register",
        method: 'post',
        data
    })
}
export { registerUser, register } 
