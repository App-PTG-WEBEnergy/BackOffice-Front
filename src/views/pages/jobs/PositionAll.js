import React, { useState, useEffect, useRef } from "react";
import { Form, Input, Select } from "antd";

import EditPosition from "./EditPositionAll";
import DataManager from "components/DataManagerCareer";
import { post, get } from "services/callAPI";

const EDITOR = EditPosition;
const UPDATE_STATUS_URL = "careers/updatPositionStatus";
const INIT_ORDER = "";
const FETCH_URL = "careers/searchPosition";
const DATA_FETCH = "positions";
const DATA_BY_ID_URL = "careers/getPositionById/";
const DELETE_URL = "careers/deletePosition";
const DELETE_FIELD = "position_id";
const SEND_DELETED_FILED = "position_ids";
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
    title: "ชื่อตำแหน่งภาษาไทย",
    dataIndex: "position_name_th",
    sorter: true,
    width: "50%",
  },
  {
    title: "กลุ่มธุรกิจ",
    dataIndex: "business_name_th",
    sorter: true,
    width: "30%",
  },
];
const PAGINATION_FIELD = {
  fullName: "",
  username: "",
};

const PositionAll = () => {
  //const location = useLocation();
  //const path = location.pathname;
  //const menuid = path.substr(16);

  const [business, setBusiness] = useState("0");
  const [dataBusiness, setDataBusiness] = useState([]);
  const [department, setDepartment] = useState("0");
  const [dataDepartment, setDataDepartment] = useState([]);
  const [dataDept, setDataDept] = useState([]);

  useEffect(() => {
    get("careers/getBusinesss").then((result) => {
      setDataBusiness(result);
      console.log(result);
      get("careers/getDepartments").then((department) => {
        setDataDepartment(department);
        setDataDept(department);
      });
    });
  }, []);
  const onBusinessChange = (e) => {
    if (e !== null && e !== undefined) {
      let dept = dataDept.filter((x) => x.business_id === e );
      setDataDepartment(dept);
    }
    setBusiness(e);
  };

  const onDepartmentChange = (e) => {
    setDepartment(e);
  };
  const InputForm = (
    <>
      <Form.Item
        style={{ textColor: "white" }}
        name="positionName"
        label={<span style={{ color: "white" }}>ชื่อตำแหน่งงาน </span>}
      >
        <Input placeholder="ชื่อตำแหน่งงาน" />
      </Form.Item>
      <Form.Item
        style={{ textColor: "white" }}
        name="businessId"
        label={<span style={{ color: "white" }}>กลุ่มธุรกิจ </span>}
      >
        <Select
          showSearch
          style={{ width: 150 }}
          placeholder="เลือก กลุ่มธุรกิจ"
          defaultValue={business}
          onChange={onBusinessChange}
          filterOption={(input, option) =>
            option.children
              .toLowerCase()
              .indexOf(input.toLowerCase()) >= 0
          }
        >
          <option value="0">กรุณาเลือก</option>
          {dataBusiness.map((item) => {
            return (
              <option value={item.business_id}>{item.business_name_th}</option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        style={{ textColor: "white" }}
        name="departmentId"
        label={<span style={{ color: "white" }}>ฝ่าย </span>}
      >
        <Select
          showSearch
          style={{ width: 150 }}
          placeholder="เลือก ผ่าย"
          defaultValue={department}
          onChange={onDepartmentChange}
          filterOption={(input, option) =>
            option.children
              .toLowerCase()
              .indexOf(input.toLowerCase()) >= 0
          }
        >
          <option value="0">กรุณาเลือก</option>
          {dataDepartment.map((item) => {
            return (
              <option value={item.department_id}>
                {item.department_name_th}
              </option>
            );
          })}
        </Select>
      </Form.Item>
    </>
  );

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

export default PositionAll;
