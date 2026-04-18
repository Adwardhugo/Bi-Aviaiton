import request from "../utils/request"; 

//增加维护任务
export function createMaintenancePlan(data) {
  return request.post('/aircraft/maintenance', data);
}
