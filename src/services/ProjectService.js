import { baseService } from "./baseService";

//lớp đối tượng ProjectService kế thừa từ component baseService
export class ProjectService extends baseService {
  constructor() {
    super();
  }

  //get all project
  getAllProject = () => {
    return this.get(`/api/Project/getAllProject`);
  };
  //trả về 1 promise
  deleteProject = (id) => {
    return this.delete(`api/Project/deleteProject?projectId=${id}`);
  };

  //nhận vào 2 object (do backend quy định)
  deleteUserFromProject = (userProject) => {
    return this.post(`api/Project/removeUserFromProject`, userProject);
  };

  //get project detail

  getProjectDetail = (projectId) => {
    return this.get(`/api/Project/getProjectDetail?id=${projectId}`);
  };
}

export const projectService = new ProjectService();
