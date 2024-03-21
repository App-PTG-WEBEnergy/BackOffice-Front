import React from "react";
import { Form, Input } from "antd";

import EditMember from "./EditMember";
import DataManager from "components/DataManagerMember";

const EDITOR = EditMember;
const UPDATE_STATUS_URL = "";
const INIT_ORDER = "";
const FETCH_URL = "careers/searchMember";
const DATA_FETCH = "members";
const DATA_BY_ID_URL = "careers/getMemberById/";
const DELETE_URL = "";
const DELETE_FIELD = "member_id";
const SEND_DELETED_FILED = "";
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
    title: "ชื่อ",
    dataIndex: "first_name_th",
    sorter: false,
    width: "35%",
  },
  {
    title: "นามสกุล",
    dataIndex: "last_name_th",
    sorter: false,
    width: "25%",
  },
  {
      title: 'เบอร์โทรศัพท์',
      dataIndex: 'mobile_no',
      sorter: true,
      width: '25%'
  },
  {
      title: 'ความสมบูรณ์',
      dataIndex: 'current_step_sum',
      sorter: true,
      width: '10%'
  },
];
const PAGINATION_FIELD = {
    FirstName: "",
    LastName: ""
};

const InputForm = (
  <>
    <Form.Item
      style={{ textColor: "white" }}
      name="FirstName"
      label={<span style={{ color: "white" }}>FirstName </span>}
    >
      <Input placeholder="FirstName" />
    </Form.Item>
  </>
);

const Member = () => {
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

export default Member;
