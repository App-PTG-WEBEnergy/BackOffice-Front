import React from "react";
import { Form, Input } from "antd";

import EditDepartment from "./EditDepartment";
import DataManager from "components/DataManagerCareer";

const EDITOR = EditDepartment;
const UPDATE_STATUS_URL = "careers/updateDepartmentStatus";
const INIT_ORDER = "";
const FETCH_URL = "careers/searchDepartment";
const DATA_FETCH = "departments";
const DATA_BY_ID_URL = "careers/getDepartmentById/";
const DELETE_URL = "careers/deleteDepartment";
const DELETE_FIELD = "department_id";
const SEND_DELETED_FILED = "department_ids";
const getSorter = (sorter, sort, sort_type) => {
  sort =
    "u." + sorter.field.substring(0, 1).toUpperCase() + sorter.field.substr(1);
  sort =
    sorter.field === "status"
      ? "u.Activated"
      : sorter.field === "groupName"
      ? "GroupName"
      : sort;
  sort_type = sorter.order === "descend" ? "desc" : "asc";
  return { sort, sort_type };
};

const STATIC_COLUMNS = [
  {
    title: "ชื่อฝ่ายภาษาไทย",
    dataIndex: "department_name_th",
    sorter: false,
    width: "35%",
  },
  {
    title: "ชื่อฝ่ายภาษาอังกฤษ",
    dataIndex: "department_name_en",
    sorter: false,
    width: "25%",
  },
  // {
  //     title: 'Mobile Number',
  //     dataIndex: 'mobilePhoneNumber',
  //     sorter: true,
  //     width: '25%'
  // },
  // {
  //     title: 'Office Number',
  //     dataIndex: 'officePhoneNumber',
  //     sorter: true,
  //     width: '25%'
  // },
];
const PAGINATION_FIELD = {
  department_name_th: "",
};

const InputForm = (
  <>
    <Form.Item
      style={{ textColor: "white" }}
      name="departmentName"
      label={<span style={{ color: "white" }}>ชื่อฝ่าย </span>}
    >
      <Input placeholder="ชื่อฝ่าย" />
    </Form.Item>
  </>
);

const Department = () => {
  return (
    <DataManager
      object={{
        EDITOR,
        UPDATE_STATUS_URL,
        INIT_ORDER,
        FETCH_URL,
        DATA_FETCH,
        DATA_BY_ID_URL,
        DELETE_URL,
        DELETE_FIELD,
        getSorter,
        STATIC_COLUMNS,
        PAGINATION_FIELD,
        InputForm,
        SEND_DELETED_FILED,
      }}
    ></DataManager>
  );
};

export default Department;
