import React from "react";
import { Form, Input } from "antd";

import EditBusiness from "./EditBusiness";
import DataManager from "components/DataManagerCareer";

const EDITOR = EditBusiness;
const UPDATE_STATUS_URL = "careers/updateBusinessStatus";
const INIT_ORDER = "";
const FETCH_URL = "careers/searchBusiness";
const DATA_FETCH = "businesses";
const DATA_BY_ID_URL = "careers/getBusinessById/";
const DELETE_URL = "careers/deleteBusiness";
const DELETE_FIELD = "business_id";
const SEND_DELETED_FILED = "business_ids";
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
    title: "ชื่อกลุ่มธุรกิจ",
    dataIndex: "business_name_th",
    sorter: false,
    width: "35%",
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
  business_name_th: "",
};

const InputForm = (
  <>
    <Form.Item
      style={{ textColor: "white" }}
      name="businessName"
      label={<span style={{ color: "white" }}>BusinessName </span>}
    >
      <Input placeholder="BusinessName" />
    </Form.Item>
  </>
);

const Business = () => {
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

export default Business;
