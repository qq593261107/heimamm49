import instance from '@/utils/request.js'
function getUserInfo(params) {
    return instance({
        url: "/info",
        method: "get",
        params      //data: data   
    })
}
export { getUserInfo }