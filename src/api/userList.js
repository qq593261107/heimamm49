import instance from '@/utils/request.js'

function getUserList(params) {
    return instance({
        url: "/user/list",
        method: "get",
        params      //data: data   
    })
}
function setUserStatus(data) {
    return instance({
        url: "/user/status",
        method: "post",
        data      //data: data   
    })
}
function delUserList(data) {
    return instance({
        url: "/user/remove",
        method: "post",
        data      //data: data   
    })
}
function addUserList(data) {
    return instance({
        url: "/user/add",
        method: "post",
        data      //data: data   
    })
}
function editUserList(data) {
    return instance({
        url: "/user/edit",
        method: "post",
        data      //data: data   
    })
}
export { getUserList,setUserStatus,delUserList,addUserList,editUserList }