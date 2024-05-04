import { ApiService } from "../apiService";

export const accountAPI = {
  getTest: async (id: string) => {
    const response = await ApiService.getData({
      endpoint: "get/test",
      queryBody: { id },
    });
    return response;
  },
  createTest: async (body: any) => {
    const response = await ApiService.postData({
      endpoint: "create/test",
      body,
    });
    return response;
  },
  updateTest: async (body: any & { id: string }) => {
    const response = await ApiService.putData({
      endpoint: "update/test",
      body,
    });
    return response;
  },
  deleteTest: async (id: string) => {
    const response = await ApiService.deleteData({
      endpoint: "delete/test",
      queryBody: { id },
    });
    return response;
  },
};
