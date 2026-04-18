import request from "../utils/request";

export function fetchTaskByPlanId(params) {
  return request.get('/aircraft/maintenance/task', { params });
}