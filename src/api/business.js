import instance from '@/utils/request.js'

function getBusinessDate(params) {
    return instance({
        url: "/enterprise/list",
        method: "get",
        params      //data: data   
    })
}
function addBusinessDate(data) {
    return instance({
        url: "/enterprise/add",
        method: "post",
        data      //data: data   
    })
}
function delBusinessDate(data) {
    return instance({
        url: "/enterprise/remove",
        method: "post",
        data      //data: data   
    })
}
function setBusinessStatus(data) {
    return instance({
        url: "/enterprise/status",
        method: "post",
        data      //data: data   
    })
}
function editBusinessDate(data) {
    return instance({
        url: "/enterprise/edit",
        method: "post",
        data      //data: data   
    })
}
export { getBusinessDate,addBusinessDate,delBusinessDate,setBusinessStatus,editBusinessDate }