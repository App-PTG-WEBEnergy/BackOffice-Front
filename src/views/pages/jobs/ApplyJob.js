import React, { useState, useEffect, useRef } from "react";
import { Form, Input, Select } from "antd";

import DataManagerApply from "components/DataManagerApply";
import { post, get } from "services/callAPI";

const EDITOR = [];
const UPDATE_STATUS_URL = "";
const INIT_ORDER = "";
const FETCH_URL = "careers/searchApplyJob";
const DATA_FETCH = "applyjobs";
const DATA_BY_ID_URL = "";
const DELETE_URL = "";
const DELETE_FIELD = "";
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
    title: "ชื่อผู้สมัคร",
    dataIndex: "first_name_th",
    sorter: true,
    width: "20%",
  },
  {
    title: "นามสกุลผู้สมัคร",
    dataIndex: "last_name_th",
    sorter: true,
    width: "15%",
  },
  {
    title: "เบอร์โทรศัพท์",
    dataIndex: "mobile_no",
    sorter: true,
    width: "15%",
  },
  {
    title: "ชื่อตำแหน่งภาษาไทย",
    dataIndex: "position_name_th",
    sorter: true,
    width: "30%",
  },
  {
    title: "กลุ่มธุรกิจ",
    dataIndex: "business_name_th",
    sorter: true,
    width: "50%",
  },
];
const PAGINATION_FIELD = {
  fullName: "",
  username: "",
};

const ApplyJob = () => {
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
      let dept = dataDept.filter((x) => x.business_id === e);
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
        label={<span style={{ color: "white" }}>ชื่อตำแหน่ง </span>}
      >
        <Input placeholder="ชื่อตำแหน่ง" />
      </Form.Item>
      <Form.Item
        style={{ textColor: "white" }}
        name="businessId"
        label={<span style={{ color: "white" }}>กลุ่มธุรกิจ </span>}
      >
        <Select
          style={{ width: 150 }}
          placeholder="Select Business"
          defaultValue={business}
          onChange={onBusinessChange}
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
        label={<span style={{ color: "white" }}>แผนก </span>}
      >
        <Select
          style={{ width: 150 }}
          placeholder="Select Department"
          defaultValue={department}
          onChange={onDepartmentChange}
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
    <DataManagerApply
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
    ></DataManagerApply>
  );
};

export default ApplyJob;
