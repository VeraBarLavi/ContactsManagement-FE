import * as axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/contacts",
});

export const GetContacts = () => {
  return axiosInstance.get();
};

export const NewContact = (contact) => {
  return axiosInstance.post("", contact);
};

export const EditContact = (contact) => {
  return axiosInstance.put("", contact);
};

export const DeleteContact = async (contact) => {
  return axiosInstance.delete("", { data: { ...contact } });
};

export const getErrorFromResponse = (error) => {
  if (!error.response) return error;

  if (error.response?.data?.errors) {
    const field = Object.keys(error?.response?.data?.errors)[0];
    return error?.response?.data?.errors[field][0];
  }

  return error.response.data;
};
