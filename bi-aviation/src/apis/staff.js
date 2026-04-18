import request from "../utils/request";

export function fetchStaffList(params) {
  return request.get('/dispatch/staff', { params });
}