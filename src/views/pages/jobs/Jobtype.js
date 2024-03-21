import React from "react";
import { Form, Input } from "antd";

import EditJobtype from "./EditJobtype";
import DataManager from "components/DataManagerCareer";

const EDITOR = EditJobtype;
const UPDATE_STATUS_URL = "careers/updatJobtypeStatus";
const INIT_ORDER = "";
const FETCH_URL = "careers/searchJobType";
const DATA_FETCH = "jobTypes";
const DATA_BY_ID_URL = "careers/getJobtypeById/";
const DELETE_URL = "careers/deleteJobtype";
const DELETE_FIELD = "job_type_id";
const SEND_DELETED_FILED = "jobtype_ids";
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
    title: "ชื่อประเภทงานภาษาไทย",
    dataIndex: "job_type_name_th",
    sorter: false,
    width: "45%",
  },
  {
    title: "ชื่อประเภทงานภาษาอังกฤษ",
    dataIndex: "job_type_name_en",
    sorter: false,
    width: "45%",
  },
];
const PAGINATION_FIELD = {
    job_type_name_th: "",
};

const InputForm = (
  <>
    <Form.Item
      style={{ textColor: "white" }}
      name="jobtypename"
      label={<span style={{ color: "white" }}>ชื่อประเภทงาน </span>}
    >
      <Input placeholder="ชื่อประเภทงาน" />
    </Form.Item>
  </>
);

const Jobtype = () => {
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

export default Jobtype;
