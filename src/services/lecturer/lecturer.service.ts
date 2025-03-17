import { BaseResponse } from '@app/core/models/base.type';
import httpClient from '@app/services/http-client';
import { Lecturer, LecturerCreatedRequest } from '@app/services/lecturer/lecturer.type';

const getLecturers = () => {
  return httpClient.get<Lecturer[]>('teachers').then((res) => res.data);
};

const createLecturer = (payload: LecturerCreatedRequest) => {
  return httpClient.post<BaseResponse<Lecturer>>('teachers', payload).then((res) => res.data);
};

const deleteLecturer = (id: number) => {
  return httpClient.delete(`teachers/${id}`).then((res) => res.data);
};

const updateLecturer = (payload: LecturerCreatedRequest, id?: number) => {
  return httpClient.put<BaseResponse<Lecturer>>(`teachers/${id}`, payload).then((res) => res.data);
};

const LecturerServices = {
  getLecturers,
  createLecturer,
  deleteLecturer,
  updateLecturer
};

export default LecturerServices;
