import axios from "axios";
import { notification } from "antd";

export const baseUrl ="https://asv-ptgenergy-backoffice-api-devuat.azurewebsites.net/api/";
//export const baseUrl ="https://asv-ptgenergy-backoffice-api-prod.azurewebsites.net/api/";
//export const baseUrl = "http://localhost:57348/api/";

export const post = (url, data) => {
  return new Promise((resolve, reject) => {
    var token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ` + token,
    };
    var client = axios.create({
      baseURL: baseUrl,
      timeout: 50000,
      headers,
    });
    client.post(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        if (err.response.status === 401) {
          window.location.href = "/auth/login";
        }
        var message = "something wrong while fetching data";
        console.log("response", err.response);
        if (err.response != null && err.response !== undefined) {
          message = JSON.stringify(err.response.data);
        }
        notification.error({
          message: "Something wrong",
          description: message,
          placement: "bottomRight",
        });
        reject(err);
      }
    );
  });
};

export const postLogin = (url, data) => {
  return new Promise((resolve, reject) => {
    var token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ` + token,
    };
    var client = axios.create({
      baseURL: baseUrl,
      timeout: 50000,
      headers,
    });
    client.post(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        if (err.response.status === 401) {
          notification.error({
            message: "ไม่สามารถเข้าสู่ระบบได้",
            description: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
            placement: "bottomRight",
          });
        }
        else {
          var message = "something wrong while fetching data";
          console.log("response", err.response);
          if (err.response != null && err.response !== undefined) {
            message = JSON.stringify(err.response.data);
          }

          notification.error({
            message: "ไม่สามารถเข้าสู่ระบบได้",
            description: message,
            placement: "bottomRight",
          });

        }
       
        
        reject(err);
      }
    );
  });
};

export const postfile = async (url, data) => {
  return new Promise((resolve, reject) => {
    var token = localStorage.getItem("token");
    var bodyFormData = new FormData();
    bodyFormData.append("file", data);
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ` + token,
    };
    var client = axios.create({
      baseURL: baseUrl,
      headers,
    });
    client.post(url, bodyFormData).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        if (err.response.status === 401) {
          window.location.href = "/auth/login";
        }
        var message = "something wrong while fetching data";
        console.log("response", err.response);
        if (err.response != null && err.response !== undefined) {
          message = JSON.stringify(err.response.data);
        }
        notification.error({
          message: "Something wrong",
          description: message,
          placement: "bottomRight",
        });
        reject(err);
      }
    );
  });
};
export const get = (url) => {
  var token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ` + token,
  };
  var client = axios.create({
    baseURL: baseUrl,
    timeout: 50000,
    headers,
  });
  return new Promise((resolve, reject) => {
    client.get(url).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        if (err.response.status === 401) {
          window.location.href = "/auth/login";
        }
        var message = "something wrong while fetching data";
        console.log(err.response);
        if (err.response !== null && err.response === undefined) {
          message = JSON.stringify(err.response.data);
        }
        notification.error({
          message: "Something wrong",
          description: message,
          placement: "bottomRight",
        });
        reject(err);
      }
    );
  });
};

export const getfile = (url) => {
  var token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ` + token,
  };
  var client = axios.create({
    baseURL: baseUrl,
    timeout: 50000,
    headers,
    responseType: "blob",
  });
  return new Promise((resolve, reject) => {
    client.get(url).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        if (err.response.status === 401) {
          window.location.href = "/auth/login";
        }
        var message = "something wrong while fetching data";
        console.log(err.response);
        if (err.response !== null && err.response === undefined) {
          message = JSON.stringify(err.response.data);
        }
        notification.error({
          message: "Something wrong",
          description: message,
          placement: "bottomRight",
        });
        reject(err);
      }
    );
  });
};

export const postgetfile = (url, data) => {
  return new Promise((resolve, reject) => {
    var token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ` + token,
    };
    var client = axios.create({
      baseURL: baseUrl,
      headers,
      responseType: "blob",
    });
    client.post(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        if (err.response.status === 401) {
          window.location.href = "/auth/login";
        }
        var message = "something wrong while fetching data";
        console.log("response", err.response);
        if (err.response != null && err.response !== undefined) {
          message = JSON.stringify(err.response.data);
        }
        notification.error({
          message: "Something wrong",
          description: message,
          placement: "bottomRight",
        });
        reject(err);
      }
    );
  });
};
