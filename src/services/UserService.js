import { baseService } from "./baseService";

//lớp đối tượng ProjectService kế thừa từ component baseService
export class UserService extends baseService {
  constructor() {
    super();
  }
  //trả về 1 promise
  getUser = (keyWord) => {
    return this.get(`/api/Users/getUser?keyword=${keyWord}`);
  };
  assignUserProject = (userProject) => {
    //truyền 2 tham số url, model (data)
    return this.post(`api/Project/assignUserProject`, userProject);
  };
  removeUserProject = (userProject) => {
    //truyền 2 tham số url, model (data)
    return this.post(`api/Project/removeUserFromProject`, userProject);
  };
  getUserByProjectId = (idProject) => {
    return this.get(`/api/Users/getUserByProjectId?idProject=${idProject}`);
  };
}

export const userService = new UserService();
