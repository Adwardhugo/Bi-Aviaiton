import request from "../utils/request";

// 获取飞机列表
export function fetchAircraftList(params) {
    return request.get('/aircraft/list', { params });
}