import request from "../utils/request";

// 获取飞机列表
export function fetchAircraftList(params) {
    return request.get('/aircraft/list', { params });
    
}

// 获取飞机维护记录
export function fetchAircraftMaintenanceList(params) {
  return request.get('/aircraft/maintenance', { params });
};

