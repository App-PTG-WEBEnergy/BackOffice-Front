/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Skeleton,
  Upload,
  Checkbox,
  Divider,
  Radio,
  Image,
  DatePicker,
} from "antd";
import { Row, Col, FormGroup, Input, Container } from "reactstrap";
// import ImgCrop from "antd-img-crop";
import moment from "moment";
import { post, postfile, get } from "services/callAPI";
import TextArea from "antd/lib/input/TextArea";

import EditEducation from "views/pages/jobs/EditEducation";
import EditIntern from "views/pages/jobs/EditIntern";
import EditActivity from "views/pages/jobs/EditActivity";
import EditLang from "views/pages/jobs/EditLang";
import EditCom from "views/pages/jobs/EditCom";
import EditHistory from "views/pages/jobs/EditHistory";
import DataManagerEducation from "components/DataManagerEducation";
import DataManagerIntern from "components/DataManagerIntern";
import DataManagerLang from "components/DataManagerLang";
import DataManagerActivity from "components/DataManegerActivity";
import DataManagerCom from "components/DataManagerCom";
import DataManagerHistory from "components/DataManagerHistory";
import DataManagerAttachment from "components/DataManagerAttachment";
const EDITOREducation = EditEducation;
const EDITORINTERN = EditIntern;
const EDITORACTIVITY = EditActivity;
const EDITLANG = EditLang;
const EDITORCOM = EditCom;
const EDITORHISTORY = EditHistory;
const EDITORATTACHMENT = [];

const SAVE_URL = "";
const datalocation = [
  { label: "ทั่วประเทศ", value: "ALL" },
  { label: "ภาคตะวันออกเฉียงเหนือ", value: "NE" },
  { label: "ภาคตะวันตก", value: "W" },
  { label: "ภาคใต้", value: "S" },
  { label: "ภาคเหนือ", value: "N" },
  { label: "ภาคตะวันออก", value: "E" },
  { label: "ภาคกลาง", value: "C" },
];

const datanews = [
  { label: "INTERNET", value: "I" },
  { label: "หนังสือสมัครงาน", value: "B" },
  { label: "เพื่อนแนะนำ", value: "F" },
];

const EditMember = ({ data, visible, callback, setVisable, type, done }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [memberId, setMemberId] = useState("0");
  const [dataJobPosition, setDataJobPosition] = useState([]);
  const [checkLocation, setChecklocation] = useState([]);
  const [checkNews, setCheckNews] = useState([]);
  const datamember = data;
  const datacheck = [];

  const handleOk = () => {
    setVisable(false);
  };
  const handleCancel = () => {
    setVisable(false);
  };

  useEffect(() => {
    let data_ = data;
    setCheckNews([]);
    setChecklocation([]);
    if (data_.location != null) {
      var d = argStr(data_.location);
      let dataCheckloc = [];
      if (d.includes("ALL")) {
        dataCheckloc.push("ALL");
      }
      if (d.includes("N")) {
        dataCheckloc.push("N");
      }
      if (d.includes("S")) {
        dataCheckloc.push("S");
      }
      if (d.includes("NE")) {
        dataCheckloc.push("C");
      }
      if (d.includes("W")) {
        dataCheckloc.push("W");
      }
      if (d.includes("E")) {
        dataCheckloc.push("E");
      }
      if (d.includes("C")) {
        dataCheckloc.push("C");
      }
      setChecklocation(dataCheckloc);
    }
    if (data_.recruitment_news) {
      var n = argStr(data_.recruitment_news);
      let dataNew = [];
      if (n.includes("I")) {
        dataNew.push("I");
      }
      if (n.includes("B")) {
        dataNew.push("B");
      }
      if (n.includes("F")) {
        dataNew.push("F");
      }
      setCheckNews(dataNew);
    }
    get("careers/getPosition").then((result) => {
      setDataJobPosition(result);
      if (type === "edit") {
        setMemberId(data_.memberId);
        //memberId = data.member_id
        if (data_.card_date_of_issue != null) {
          data_.card_date_of_issue = data_.card_date_of_issue.replace(
            "T00:00:00",
            ""
          );
        }
        if (data_.card_date_of_exprie != null) {
          data_.card_date_of_exprie = data_.card_date_of_exprie.replace(
            "T00:00:00",
            ""
          );
        }
        if (data_.card_date_of_birth != null) {
          data_.card_date_of_birth = data_.card_date_of_birth.replace(
            "T00:00:00",
            ""
          );
        }
        if (data_.cure_start_date != null) {
          data_.cure_start_date = data_.cure_start_date.replace("T00:00:00", "");
        }
        if (data_.cure_end_date != null) {
          data_.cure_end_date = data_.cure_end_date.replace("T00:00:00", "");
        }

        if (data_.cur_wagefirst != null) {
          data_.cur_wagefirst = numberWithCommas(data_.cur_wagefirst);
        }
        if (data_.cur_wagecurrent != null) {
          data_.cur_wagecurrent = numberWithCommas(data_.cur_wagecurrent);
        }
        if (data_.cur_pro_free != null) {
          data.cur_pro_free = numberWithCommas(data.cur_pro_free);
        }
        if (data.cur_phone_free != null) {
          data_.cur_phone_free = numberWithCommas(data_.cur_phone_free);
        }
        if (data_.cur_comisstion_free != null) {
          data_.cur_comisstion_free = numberWithCommas(data_.cur_comisstion_free);
        }
        if (data_.cur_other_free != null) {
          data_.cur_other_free = numberWithCommas(data_.cur_other_free);
        }
        if (data_.cur_total != null) {
          data_.cur_total = numberWithCommas(data_.cur_total);
        }
        form.resetFields();
        form.setFieldsValue(data_);
      } else {
        form.resetFields();
      }
    });
  }, [visible, done]);
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  function argStr(arg) {
    return arg + " ";
  }
  const INIT_ORDER = "";
  const FETCH_URL = "careers/getEducationByMemberId/";
  const FETCH_URL_INTERN = "careers/getInternByMemberId/";
  const FETCH_URL_ACTIVITY = "careers/getActivitiByMemberId/";
  const FETCH_URL_LANG = "careers/getSkillLangBymemberId/";
  const FETCH_URL_COM = "careers/getSkillComByMemberId/";
  const FETCH_URL_HISTORY = "careers/getHistoryByMemberId/";
  const FETCH_URL_ATTACHMENT = "careers/getAttachByMemberId/";
  const DATA_FETCH = "";

  const getSorter = (sorter, sort, sort_type) => {
    sort =
      "u." +
      sorter.field.substring(0, 1).toUpperCase() +
      sorter.field.substr(1);
    sort =
      sorter.field === "status"
        ? "u.Activated"
        : sorter.field === "groupName"
        ? "GroupName"
        : sort;
    sort_type = sorter.order === "descend" ? "desc" : "asc";
    return { sort, sort_type };
  };

  const STATIC_COLUMNS_EDU = [
    {
      title: "ระดับการศึกษา",
      dataIndex: "education_level",
      sorter: true,
      width: "40%",
    },
    {
      title: "สถาบัน",
      dataIndex: "education_institution",
      sorter: true,
      width: "40%",
    },
    {
      title: "สถานที่",
      dataIndex: "education_place",
      sorter: true,
      width: "40%",
    },
  ];
  const STATIC_COLUMNS_INTERN = [
    {
      title: "สถาบัน",
      dataIndex: "Institution_name",
      sorter: true,
      width: "40%",
    },
    {
      title: "ชื่อหลักสูตร",
      dataIndex: "course_name",
      sorter: true,
      width: "40%",
    },
  ];
  const STATIC_COLUMNS_ACTIVITY = [
    {
      title: "ชื่อกิจกรรม",
      dataIndex: "activity_name",
      sorter: true,
      width: "40%",
    },
    {
      title: "หน้าที่รับผิดชอบ",
      dataIndex: "responsible",
      sorter: true,
      width: "40%",
    },
  ];

  const STATIC_COLUMNS_LANG = [
    {
      title: "ภาษา",
      dataIndex: "lang_name",
      sorter: true,
      width: "40%",
    },
  ];
  const STATIC_COLUMNS_COM = [
    {
      title: "โปรแกรม",
      dataIndex: "computerprogram",
      sorter: true,
      width: "40%",
    },
  ];
  const STATIC_COLUMNS_HISTORY = [
    {
      title: "สถานที่ทำงาน",
      dataIndex: "workplace_name",
      sorter: true,
      width: "30%",
    },
    {
      title: "ตำแหน่งงาน",
      dataIndex: "jobposition",
      sorter: true,
      width: "20%",
    },
    {
      title: "เริ่มต้น",
      dataIndex: "start_date",
      sorter: true,
      width: "20%",
    },
    {
      title: "สิ้นสุด",
      dataIndex: "end_date",
      sorter: true,
      width: "20%",
    },
  ];
  const STATIC_COLUMNS_ATTACHMENT = [];
  const PAGINATION_FIELD = {};
  const InputForm = <></>;

  return (
    <Modal
      title={type === "edit" ? "ProfileInformation" : "Add Business"}
      visible={visible}
      width="90%"
      onOk={handleOk}
      style={{ maxWidth: "1024px" }}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      cancelButtonProps={{ style: { display: "none" } }}
      maskClosable={false}
    >
      {done || type !== "edit" ? (
        <Form
          form={form}
          layout="inline"
          name="form_in_modal"
          // {...layout}
          initialValues={{
            modifier: "public",
          }}
        >
          <Container fluid>
            <Row>
              <Col sm={12} md={12}>
                <Image
                  id="resume_image_path"
                  width={150}
                  src={
                    data.resume_image_path === null
                      ? "https://via.placeholder.com/100"
                      : data.resume_image_path
                  }
                />
              </Col>
            </Row>
            <br></br>
            <Row>
              <Col sm={12} md={3}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    ชื่อภาษาไทย
                  </label>
                  <Form.Item name="first_name_th">
                    <Input
                      className="form-control-alternative"
                      id="first_name_th"
                      placeholder="ชื่อภาษาไทย"
                      readOnly={true}
                      type="text"
                    />
                  </Form.Item>
                </FormGroup>
              </Col>
              <Col sm={12} md={3}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    นามสกุลภาษาไทย
                  </label>
                  <Form.Item name="last_name_th">
                    <Input
                      className="form-control-alternative"
                      id="last_name_th"
                      placeholder="นามสกุลภาษาไทย"
                      type="text"
                      readOnly={true}
                    />
                  </Form.Item>
                </FormGroup>
              </Col>
              <Col sm={12} md={3}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    ชื่อภาษาอังกฤษ
                  </label>
                  <Form.Item name="first_name_th">
                    <Input
                      className="form-control-alternative"
                      id="first_name_th"
                      placeholder="ชื่อภาษาอังกฤษ"
                      readOnly={true}
                      type="text"
                    />
                  </Form.Item>
                </FormGroup>
              </Col>
              <Col sm={12} md={3}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    นามสกุลภาษาอังกฤษ
                  </label>
                  <Form.Item name="last_name_en">
                    <Input
                      className="form-control-alternative"
                      id="last_name_en"
                      placeholder="นามสกุลภาษาอังกฤษ"
                      type="text"
                      readOnly={true}
                    />
                  </Form.Item>
                </FormGroup>
              </Col>
              <Col sm={12} md={3}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    คำนำหน้า
                  </label>
                  <Form.Item name="title">
                    <Input
                      className="form-control-alternative"
                      id="title"
                      placeholder="คำนำหน้า"
                      type="text"
                      readOnly={true}
                    />
                  </Form.Item>
                </FormGroup>
              </Col>
              <Col sm={12} md={3}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    เบอร์โทรศัพท์
                  </label>
                  <Form.Item name="mobile_no">
                    <Input
                      className="form-control-alternative"
                      id="mobile_no"
                      placeholder="เบอร์โทรศัพท์"
                      type="text"
                      readOnly={true}
                    />
                  </Form.Item>
                </FormGroup>
              </Col>
              <Col sm={12} md={3}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    LineId
                  </label>
                  <Form.Item name="line_id">
                    <Input
                      className="form-control-alternative"
                      id="line_id"
                      placeholder="LineId"
                      type="text"
                      readOnly={true}
                    />
                  </Form.Item>
                </FormGroup>
              </Col>
              <Col sm={12} md={3}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    Email
                  </label>
                  <Form.Item name="email">
                    <Input
                      className="form-control-alternative"
                      id="line_id"
                      placeholder="LineId"
                      type="text"
                      readOnly={true}
                    />
                  </Form.Item>
                </FormGroup>
              </Col>
              <Col sm={12} md={4}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    ตำแหน่งงานที่สนใจ 1
                  </label>
                  <Form.Item
                    name="job_position1"
                    rules={[
                      {
                        required: false,
                        message: "!",
                      },
                    ]}
                  >
                    <Input
                      type="select"
                      className="form-control-alternative"
                      disabled={confirmLoading}
                    >
                      <option value="0">กรุณาเลือก</option>
                      {dataJobPosition.map((item) => {
                        return (
                          <option value={item.position_id}>
                            {item.position_name_th}
                          </option>
                        );
                      })}
                    </Input>
                  </Form.Item>
                </FormGroup>
              </Col>
              <Col sm={12} md={4}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    ตำแหน่งงานที่สนใจ 2
                  </label>
                  <Form.Item
                    name="job_position2"
                    rules={[
                      {
                        required: false,
                        message: "!",
                      },
                    ]}
                  >
                    <Input
                      type="select"
                      className="form-control-alternative"
                      disabled={confirmLoading}
                    >
                      <option value="0">กรุณาเลือก</option>
                      {dataJobPosition.map((item) => {
                        return (
                          <option value={item.position_id}>
                            {item.position_name_th}
                          </option>
                        );
                      })}
                    </Input>
                  </Form.Item>
                </FormGroup>
              </Col>
              <Col sm={12} md={4}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    ตำแหน่งงานที่สนใจ 3
                  </label>
                  <Form.Item
                    name="job_position3"
                    rules={[
                      {
                        required: false,
                        message: "!",
                      },
                    ]}
                  >
                    <Input
                      type="select"
                      className="form-control-alternative"
                      disabled={confirmLoading}
                    >
                      <option value="0">กรุณาเลือก</option>
                      {dataJobPosition.map((item) => {
                        return (
                          <option value={item.position_id}>
                            {item.position_name_th}
                          </option>
                        );
                      })}
                    </Input>
                  </Form.Item>
                </FormGroup>
              </Col>
              <Col sm={12} md={3}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    สามารถปฏิบัติงานต่างจังหวัดได้
                  </label>
                  <Form.Item name="other_provinces">
                    <Radio.Group value={data.other_provinces}>
                      <Radio value={"N"}>ไม่ได้</Radio>
                      <Radio value={"S"}>บางครั้ง</Radio>
                    </Radio.Group>
                  </Form.Item>
                </FormGroup>
              </Col>
              <Col sm={12} md={3}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    สามารถปฏิบัติงานต่างจังหวัดได้
                  </label>
                  <Form.Item>
                    <Checkbox.Group
                      options={datalocation}
                      value={checkLocation}
                    />
                  </Form.Item>
                </FormGroup>
              </Col>
              <Col sm={12} md={3}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    ทราบข่าวสารการสมัครจาก
                  </label>
                  <Form.Item>
                    <Checkbox.Group
                      options={datanews}
                      value={checkNews}
                    />
                  </Form.Item>
                </FormGroup>
              </Col>
              <Col sm={12} md={3}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    ชื่อผู้แนะนำ
                  </label>
                  <Form.Item name="recruitment_name">
                    <Input
                      className="form-control-alternative"
                      id="recruitment_name"
                      placeholder="ชื่อผู้แนะนำ"
                      type="text"
                      readOnly={true}
                    />
                  </Form.Item>
                </FormGroup>
              </Col>
              <Col sm={12} md={3}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    รหัสผู้แนะนำ
                  </label>
                  <Form.Item name="recruitment_code">
                    <Input
                      className="form-control-alternative"
                      id="recruitment_code"
                      placeholder="รหัส"
                      type="text"
                      readOnly={true}
                    />
                  </Form.Item>
                </FormGroup>
              </Col>
              <Col sm={12} md={3}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    สถานะภาพการทำงานปัจจุบัน
                  </label>
                  <Form.Item name="work_status">
                    <Radio.Group value={data.other_provinces}>
                      <Radio value={"U"}>ว่างงาน</Radio>
                      <Radio value={"P"}>มีงานประจำ</Radio>
                      <Radio value={"E"}>งานเสริม</Radio>
                    </Radio.Group>
                  </Form.Item>
                </FormGroup>
              </Col>
              <Col sm={12} md={3}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    เงินเดือน
                  </label>
                  <Form.Item name="salary">
                    <Input
                      className="form-control-alternative"
                      id="salary"
                      placeholder="เงินเดือน"
                      type="text"
                      readOnly={true}
                    />
                  </Form.Item>
                </FormGroup>
              </Col>

              <Col sm={12} md={3}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    เพศ
                  </label>
                  <Form.Item name="gender">
                    <Input
                      className="form-control-alternative"
                      id="gender"
                      placeholder="เพศ"
                      type="text"
                      readOnly={true}
                    />
                  </Form.Item>
                </FormGroup>
              </Col>

              <Col sm={12} md={3}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    ชื่อเล่น
                  </label>
                  <Form.Item name="nickname">
                    <Input
                      className="form-control-alternative"
                      id="nickname"
                      placeholder="ชื่อเล่น"
                      type="text"
                      readOnly={true}
                    />
                  </Form.Item>
                </FormGroup>
              </Col>
              <Col sm={12} md={3}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    หมู่เลือด
                  </label>
                  <Form.Item name="blood_group">
                    <Input
                      className="form-control-alternative"
                      id="blood_group"
                      placeholder="หมู่เลือด"
                      type="text"
                      readOnly={true}
                    />
                  </Form.Item>
                </FormGroup>
              </Col>
              <Col sm={12} md={3}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    เลขบัตรประชาชน
                  </label>
                  <Form.Item name="id_card">
                    <Input
                      className="form-control-alternative"
                      id="id_card"
                      placeholder="เลขบัตรประชาชน"
                      type="text"
                      readOnly={true}
                    />
                  </Form.Item>
                </FormGroup>
              </Col>
              <Col sm={12} md={3}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    จังหวัดที่ออกบัตร
                  </label>
                  <Form.Item name="province_name_th">
                    <Input
                      className="form-control-alternative"
                      id="province_name_th"
                      placeholder="จังหวัดที่ออกบัตร"
                      type="text"
                      readOnly={true}
                    />
                  </Form.Item>
                </FormGroup>
              </Col>
              <Col sm={12} md={3}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    อำเภอที่ออกบัตร
                  </label>
                  <Form.Item name="districts_name_th">
                    <Input
                      className="form-control-alternative"
                      id="districts_name_th"
                      placeholder="อำเภอที่ออกบัตร"
                      type="text"
                      readOnly={true}
                    />
                  </Form.Item>
                </FormGroup>
              </Col>
              <Col sm={12} md={3}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    วันที่ออกบัตร
                  </label>
                  <Form.Item name="card_date_of_issue">
                    <Input
                      className="form-control-alternative"
                      id="card_date_of_issue"
                      placeholder="วันที่ออกบัตร"
                      type="text"
                      readOnly={true}
                    />
                  </Form.Item>
                </FormGroup>
              </Col>
              <Col sm={12} md={3}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    วันที่หมดอายุ
                  </label>
                  <Form.Item name="card_date_of_exprie">
                    <Input
                      className="form-control-alternative"
                      id="card_date_of_exprie"
                      placeholder="วันที่หมดอายุ"
                      type="text"
                      readOnly={true}
                    />
                  </Form.Item>
                </FormGroup>
              </Col>
              <Col sm={12} md={3}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    วันเกิด
                  </label>
                  <Form.Item name="card_date_of_birth">
                    <Input
                      className="form-control-alternative"
                      id="card_date_of_birth"
                      placeholder="วันเกิด"
                      type="text"
                      readOnly={true}
                    />
                  </Form.Item>
                </FormGroup>
              </Col>
              <Col sm={12} md={3}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    ศาสนา
                  </label>
                  <Form.Item name="religion">
                    <Input
                      className="form-control-alternative"
                      id="religion"
                      placeholder="ศาสนา"
                      type="text"
                      readOnly={true}
                    />
                  </Form.Item>
                </FormGroup>
              </Col>
              <Col sm={12} md={3}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    สัญชาติ
                  </label>
                  <Form.Item name="nation">
                    <Input
                      className="form-control-alternative"
                      id="nation"
                      placeholder="สัญชาติ"
                      type="text"
                      readOnly={true}
                    />
                  </Form.Item>
                </FormGroup>
              </Col>
              <Col sm={12} md={3}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    ประกันสังคม
                  </label>
                  <Form.Item name="sso_card">
                    <Radio.Group value={data.sso_card}>
                      <Radio value={"Y"}>มี</Radio>
                      <Radio value={"N"}>ไม่มี</Radio>
                    </Radio.Group>
                  </Form.Item>
                </FormGroup>
              </Col>
              <Col sm={12} md={5}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    โปรดระบุโรงพยาบาล
                  </label>
                  <Form.Item name="sso_hospital">
                    <Input
                      className="form-control-alternative"
                      id="sso_hospital"
                      placeholder="โปรดระบุโรงพยาบาล"
                      type="text"
                      readOnly={true}
                    />
                  </Form.Item>
                </FormGroup>
              </Col>
              <Divider>ข้อมูลเกี่ยวกับครอบครัว</Divider>
              <Row>
                <Col sm={12} md={4}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      ชื่อ-นามสกุล บิดา
                    </label>
                    <Form.Item name="father_name">
                      <Input
                        className="form-control-alternative"
                        id="father_name"
                        placeholder="ชื่อ-นามสกุล"
                        type="text"
                        readOnly={true}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>

                <Col sm={12} md={4}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      อายุ บิดา
                    </label>
                    <Form.Item name="father_age">
                      <Input
                        className="form-control-alternative"
                        id="father_age"
                        placeholder="อายุ"
                        type="text"
                        readOnly={true}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>
                <Col sm={12} md={4}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      เบอร์โทรศัพท์ บิดา
                    </label>
                    <Form.Item name="father_phone">
                      <Input
                        className="form-control-alternative"
                        id="father_phone"
                        placeholder="เบอร์โทรศัพท์"
                        type="text"
                        readOnly={true}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>
                <Col sm={12} md={4}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      อาชีพ บิดา
                    </label>
                    <Form.Item name="father_career">
                      <Input
                        className="form-control-alternative"
                        id="father_career"
                        placeholder="อาชีพ"
                        type="text"
                        readOnly={true}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>
                <Col sm={12} md={4}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      บิดายังมีชีวิตอยู่หรือไม่
                    </label>
                    <Form.Item name="father_status">
                      <Radio.Group value={data.father_status}>
                        <Radio value={"live"}>มีชีวิตอยู่</Radio>
                        <Radio value={"Dese"}>ถึงแก่กรรม</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col sm={12} md={4}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      ชื่อ-นามสกุล มารดา
                    </label>
                    <Form.Item name="mother_name">
                      <Input
                        className="form-control-alternative"
                        id="mother_name"
                        placeholder="ชื่อ-นามสกุล"
                        type="text"
                        readOnly={true}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>

                <Col sm={12} md={4}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      อายุ มารดา
                    </label>
                    <Form.Item name="mother_age">
                      <Input
                        className="form-control-alternative"
                        id="mother_age"
                        placeholder="อายุ"
                        type="text"
                        readOnly={true}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>
                <Col sm={12} md={4}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      เบอร์โทรศัพท์ มารดา
                    </label>
                    <Form.Item name="mother_phone">
                      <Input
                        className="form-control-alternative"
                        id="mother_phone"
                        placeholder="เบอร์โทรศัพท์"
                        type="text"
                        readOnly={true}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>
                <Col sm={12} md={4}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      อาชีพ มารดา
                    </label>
                    <Form.Item name="mother_career">
                      <Input
                        className="form-control-alternative"
                        id="mother_career"
                        placeholder="อาชีพ"
                        type="text"
                        readOnly={true}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>
                <Col sm={12} md={4}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      มารดายังมีชีวิตอยู่หรือไม่
                    </label>
                    <Form.Item name="mother_status">
                      <Radio.Group value={data.mother_status}>
                        <Radio value={"live"}>มีชีวิตอยู่</Radio>
                        <Radio value={"Dese"}>ถึงแก่กรรม</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </FormGroup>
                </Col>
              </Row>

              <Col sm={12} md={12}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    ที่อยู่ปัจจุบันของบิดา - มารดา
                  </label>
                  <Form.Item name="family_address">
                    <TextArea
                      className="form-control-alternative"
                      id="family_address"
                      placeholder="ชื่อ-นามสกุล"
                      rows={3}
                      readOnly={true}
                    />
                  </Form.Item>
                </FormGroup>
              </Col>

              <Divider>ข้อมูลเกี่ยวกับครอบครัว</Divider>
              <Row>
                <Col sm={12} md={4}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      สถานะ
                    </label>
                    <Form.Item name="marital_status">
                      <Radio.Group value={data.marital_status}>
                        <Radio value={"1"}>โสด</Radio>
                        <Radio value={"2"}>หมั้น</Radio>
                        <Radio value={"3"}>สมรส</Radio>
                        <Radio value={"4"}>หย่าร้าง</Radio>
                        <Radio value={"5"}>แยกกันอยู่</Radio>
                        <Radio value={"6"}>หม้าย</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </FormGroup>
                </Col>

                <Col sm={12} md={4}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      จำนวนบุตร
                    </label>
                    <Form.Item name="number_of_children">
                      <Input
                        className="form-control-alternative"
                        id="number_of_children"
                        type="number"
                        readOnly={true}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>
                <Col sm={12} md={4}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      จำนวนพี่น้อง
                    </label>
                    <Form.Item name="number_of_children">
                      <Input
                        className="form-control-alternative"
                        id="number_of_children"
                        type="number"
                        readOnly={true}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col sm={12} md={4}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      ชื่อ-นามสกุล คู่สมรส
                    </label>
                    <Form.Item name="spouse_name">
                      <Input
                        className="form-control-alternative"
                        id="spouse_name"
                        placeholder="ชื่อ-นามสกุล"
                        type="text"
                        readOnly={true}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>

                <Col sm={12} md={4}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      อายุ คู่สมรส
                    </label>
                    <Form.Item name="spouse_age">
                      <Input
                        className="form-control-alternative"
                        id="spouse_age"
                        placeholder="อายุ"
                        type="text"
                        readOnly={true}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>
                <Col sm={12} md={4}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      หมายเลขโทรศัพท์ของคู่สมรส
                    </label>
                    <Form.Item name="spouse_phone">
                      <Input
                        className="form-control-alternative"
                        id="spouse_phone"
                        placeholder="หมายเลขโทรศัพท์ของคู่สมรส"
                        type="text"
                        readOnly={true}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>
                <Col sm={12} md={4}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      อาชีพ คู่สมรส
                    </label>
                    <Form.Item name="spouse_career">
                      <Input
                        className="form-control-alternative"
                        id="spouse_career"
                        placeholder="อาชีพ"
                        type="text"
                        readOnly={true}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>
                <Col sm={12} md={4}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      คู่สมรสยังมีชีวิตอยู่หรือไม่
                    </label>
                    <Form.Item name="spouse_status">
                      <Radio.Group value={data.spouse_status}>
                        <Radio value={"live"}>มีชีวิตอยู่</Radio>
                        <Radio value={"Dese"}>ถึงแก่กรรม</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </FormGroup>
                </Col>
              </Row>
              <Divider>ข้อมูลการติดต่อ</Divider>
              <Row>
                <Col sm={12} md={12}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      พักอยู่กับ
                    </label>
                    <Form.Item name="contract_stay">
                      <Radio.Group value={data.contract_stay}>
                        <Radio value={"1"}>บิดามารดา</Radio>
                        <Radio value={"2"}>หอพัก</Radio>
                        <Radio value={"3"}>อื่นๆ</Radio>
                        <Radio value={"4"}>บ้านพักตัวเอง</Radio>
                        <Radio value={"5"}>บ้านเช่า</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </FormGroup>
                </Col>
                <Col sm={12} md={12}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      โปรดระบุ
                    </label>
                    <Form.Item name="family_address">
                      <TextArea
                        className="form-control-alternative"
                        id="contract_stay_detail"
                        placeholder="โปรดระบุ"
                        rows={3}
                        readOnly={true}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>
              </Row>
              <Divider>ข้อมูลการติดต่อฉุกเฉิน</Divider>
              <Row>
                <Col sm={12} md={6}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      ชื่อ - สกุล
                    </label>
                    <Form.Item name="contract_emer_name">
                      <Input
                        className="form-control-alternative"
                        id="contract_emer_name"
                        type="text"
                        readOnly={true}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>
                <Col sm={12} md={6}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      ความสัมพันธ์
                    </label>
                    <Form.Item name="contract_emer_relationship">
                      <Input
                        className="form-control-alternative"
                        id="contract_emer_relationship"
                        type="text"
                        readOnly={true}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>
                <Col sm={12} md={6}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      หมายเลขโทรศัพท์บุคคลที่ติดต่อในกรณีฉุกเฉิน
                    </label>
                    <Form.Item name="contract_emer_phone">
                      <Input
                        className="form-control-alternative"
                        id="contract_emer_phone"
                        type="text"
                        readOnly={true}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>
              </Row>
              <Divider>สถานภาพทางการศึกษา</Divider>
              <Row>
                <Col sm={12} md={12}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      สถานภาพทางการศึกษา
                    </label>
                    <Form.Item name="education_status">
                      <Radio.Group value={data.education_status}>
                        <Radio value={"N"}>ปัจจุบันไม่ได้ศึกษาแล้ว</Radio>
                        <Radio value={"Y"}>ศึกษาต่อ</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </FormGroup>
                </Col>
                <Col sm={12} md={6}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      สาขา
                    </label>
                    <Form.Item name="education_status_branch">
                      <Input
                        className="form-control-alternative"
                        id="education_status_branch"
                        type="text"
                        readOnly={true}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>
                <Col sm={12} md={6}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      ชื่อสถานบันการศึกษา
                    </label>
                    <Form.Item name="education_status_Insitution">
                      <Input
                        className="form-control-alternative"
                        id="education_status_Insitution"
                        type="text"
                        readOnly={true}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>
              </Row>

              <Divider>งานปัจจุบัน</Divider>
              <Row>
                <Col sm={12} md={6}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      ชื่อสถานที่ทำงาน
                    </label>
                    <Form.Item name="cur_workplace_name">
                      <Input
                        className="form-control-alternative"
                        id="cur_workplace_name"
                        type="text"
                        readOnly={true}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>
                <Col sm={12} md={6}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      ประเภทธุรกิจ
                    </label>
                    <Form.Item name="cur_bu_type">
                      <Input
                        className="form-control-alternative"
                        id="cur_bu_type"
                        type="text"
                        readOnly={true}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>
                <Col sm={12} md={6}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      ที่อยู่
                    </label>
                    <Form.Item name="cur_address">
                      <Input
                        className="form-control-alternative"
                        id="cur_address"
                        type="text"
                        readOnly={true}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>
                <Col sm={12} md={6}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      หมายเลขโทรศัพท์
                    </label>
                    <Form.Item name="cur_phone">
                      <Input
                        className="form-control-alternative"
                        id="cur_phone"
                        type="text"
                        readOnly={true}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>

                <Col sm={12} md={3}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      เริ่มทำงาน
                    </label>
                    {/* <Form.Item>
                      <DatePicker
                        id="cur_startdate"
                        aria-readonly={true}
                        value={
                          data.cur_startdate === null ||
                          data.cur_startdate === ""
                            ? ""
                            : moment(data.cur_startdate, "YYYY-MM-DD")
                        }
                        className="form-control-alternative"
                      />
                    </Form.Item> */}
                    <Form.Item name="cur_startdate">
                      <Input
                        className="form-control-alternative"
                        id="cur_startdate"
                        type="text"
                        readOnly={true}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>
                <Col sm={12} md={3}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      สิ้นสุดการทำงาน
                    </label>
                    {/* <Form.Item>
                      <DatePicker
                        id="cur_enddate"
                        aria-readonly={true}
                        value={
                          data.cur_enddate === null || data.cur_enddate === ""
                            ? ""
                            : moment(data.cur_enddate, "YYYY-MM-DD")
                        }
                        className="form-control-alternative"
                      />
                    </Form.Item> */}
                    <Form.Item name="cur_enddate">
                      <Input
                        className="form-control-alternative"
                        id="cur_enddate"
                        type="text"
                        readOnly={true}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>
                <Col sm={12} md={3}></Col>
                <Col sm={12} md={3}></Col>
              </Row>
              <Row>
                <Col sm={12} md={6}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      ตำแหน่งแรกเข้า
                    </label>
                    <Form.Item name="cur_firstpos">
                      <Input
                        className="form-control-alternative"
                        id="cur_firstpos"
                        type="text"
                        readOnly={true}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>
                <Col sm={12} md={6}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      ตำแหน่งปัจจุบัน
                    </label>
                    <Form.Item name="CUR_CURRENTPOS">
                      <Input
                        className="form-control-alternative"
                        id="CUR_CURRENTPOS"
                        type="text"
                        readOnly={true}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>
                <Col sm={12} md={6}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      ลักษณะของงาน
                    </label>
                    <Form.Item name="cur_jobdesc">
                      <Input
                        className="form-control-alternative"
                        id="cur_jobdesc"
                        type="text"
                        readOnly={true}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>
                <Col sm={12} md={6}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      เหตุผลที่จะลาออก
                    </label>
                    <Form.Item name="cur_reason">
                      <Input
                        className="form-control-alternative"
                        id="cur_reason"
                        type="text"
                        readOnly={true}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>
              </Row>
              <Divider>ค่าจ้างที่ได้รับ</Divider>
              <Row>
                <Col sm={12} md={4}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      เงินเดือนแรกเข้า (THB)
                    </label>
                    <Form.Item name="cur_wagefirst">
                      <Input
                        className="form-control-alternative"
                        id="cur_wagefirst"
                        type="text"
                        readOnly={true}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>
                <Col sm={12} md={4}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      เงินเดือนปัจจุบัน (THB)
                    </label>
                    <Form.Item name="cur_wagecurrent">
                      <Input
                        className="form-control-alternative"
                        id="cur_wagecurrent"
                        type="text"
                        readOnly={true}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>
                <Col sm={12} md={4}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      ค่าวิชาชีพ / น้ำมัน (THB)
                    </label>
                    <Form.Item name="cur_pro_free">
                      <Input
                        className="form-control-alternative"
                        id="cur_pro_free"
                        type="text"
                        readOnly={true}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>
                <Col sm={12} md={4}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      ค่าโทรศัพท์ (THB)
                    </label>
                    <Form.Item name="cur_phone_free">
                      <Input
                        className="form-control-alternative"
                        id="cur_phone_free"
                        type="text"
                        readOnly={true}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>
                <Col sm={12} md={4}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      ค่าคอมมิชชั่น (THB)
                    </label>
                    <Form.Item name="cur_comisstion_free">
                      <Input
                        className="form-control-alternative"
                        id="cur_comisstion_free"
                        type="text"
                        readOnly={true}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>
                <Col sm={12} md={4}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      รายได้อื่น (THB)
                    </label>
                    <Form.Item name="cur_other_free">
                      <Input
                        className="form-control-alternative"
                        id="cur_other_free"
                        type="text"
                        readOnly={true}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>
                <Col sm={12} md={4}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      รายได้รวมต่อเดือน (THB)
                    </label>
                    <Form.Item name="cur_total">
                      <Input
                        className="form-control-alternative"
                        id="cur_total"
                        type="text"
                        readOnly={true}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>
              </Row>
              <Divider>ประวัติอื่นๆ</Divider>
              <Row>
                <Col sm={12} md={6}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      ท่านเคยถูกจับกุมหรือต้องโทษในคดีทางอาญาหรือไม่
                    </label>
                    <Form.Item name="profileother1_status">
                      <Radio.Group value={data.profileother1_status}>
                        <Radio value={"N"}>ไม่มี</Radio>
                        <Radio value={"Y"}>มี</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </FormGroup>
                </Col>
                <Col sm={12} md={6}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      ระบุ
                    </label>
                    <Form.Item name="profileother1_detail">
                      <Input
                        className="form-control-alternative"
                        id="profileother1_detail"
                        type="text"
                        readOnly={true}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>

                <Col sm={12} md={6}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      ปัจจุบันท่านมีสถานะเครดิตบูโรเป็นปกติหรือไม่
                    </label>
                    <Form.Item name="profileother2_status">
                      <Radio.Group value={data.profileother2_status}>
                        <Radio value={"Y"}>ปกติ</Radio>
                        <Radio value={"N"}>ไม่ปกติ</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </FormGroup>
                </Col>
                <Col sm={12} md={6}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      โปรดระบุ
                    </label>
                    <Form.Item name="profileother2_detail">
                      <Input
                        className="form-control-alternative"
                        id="profileother2_detail"
                        type="text"
                        readOnly={true}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>

                <Col sm={12} md={6}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      ท่านมีโรคประจำตัวหรือไม่
                    </label>
                    <Form.Item name="profileother3_status">
                      <Radio.Group value={data.profileother3_status}>
                        <Radio value={"N"}>ไม่มี</Radio>
                        <Radio value={"Y"}>มี</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </FormGroup>
                </Col>
                <Col sm={12} md={6}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      โปรดระบุ
                    </label>
                    <Form.Item name="profileother3_detail">
                      <Input
                        className="form-control-alternative"
                        id="profileother3_detail"
                        type="text"
                        readOnly={true}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>

                <Col sm={12} md={6}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      ท่านมีญาติหรือคนรู้จักในบริษัทนี้หรือไม่
                    </label>
                    <Form.Item name="profileother4_status">
                      <Radio.Group value={data.profileother4_status}>
                        <Radio value={"N"}>ไม่มี</Radio>
                        <Radio value={"Y"}>มี</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </FormGroup>
                </Col>
                <Col sm={12} md={6}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      ชื่อสกุล
                    </label>
                    <Form.Item name="profileother4_name">
                      <Input
                        className="form-contrl-alternative"
                        id="profileother4_name"
                        type="text"
                        readOnly={true}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>

                <Col sm={12} md={6}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      ตำแหน่ง
                    </label>
                    <Form.Item name="profileother4_position">
                      <Input
                        className="form-control-alternative"
                        id="profileother4_position"
                        type="text"
                        readOnly={true}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>
                <Col sm={12} md={6}>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      หน่วยงาน
                    </label>
                    <Form.Item name="profileother4_depart">
                      <Input
                        className="form-control-alternative"
                        id="profileother4_depart"
                        type="text"
                        readOnly={true}
                      />
                    </Form.Item>
                  </FormGroup>
                </Col>
              </Row>
            </Row>
            <Divider>ประวัติการศึกษา</Divider>
            <Row>
              <DataManagerEducation
                object={{
                  EDITOREducation,
                  INIT_ORDER,
                  FETCH_URL,
                  DATA_FETCH,
                  getSorter,
                  STATIC_COLUMNS_EDU,
                  PAGINATION_FIELD,
                  InputForm,
                  memberId,
                  datamember,
                }}
              ></DataManagerEducation>
            </Row>
            <Divider>ประวัติการอบรม</Divider>

            <DataManagerIntern
              object={{
                EDITORINTERN,
                INIT_ORDER,
                FETCH_URL_INTERN,
                DATA_FETCH,
                getSorter,
                STATIC_COLUMNS_INTERN,
                PAGINATION_FIELD,
                InputForm,
                memberId,
                datamember,
              }}
            ></DataManagerIntern>

            <Divider>กิจกรรม</Divider>

            <DataManagerActivity
              object={{
                EDITORACTIVITY,
                INIT_ORDER,
                FETCH_URL_ACTIVITY,
                DATA_FETCH,
                getSorter,
                STATIC_COLUMNS_ACTIVITY,
                PAGINATION_FIELD,
                InputForm,
                memberId,
                datamember,
              }}
            ></DataManagerActivity>

            <Divider>ความชำนาญพิเศษ ภาษาต่างประเทศ</Divider>

            <DataManagerLang
              object={{
                EDITLANG,
                INIT_ORDER,
                FETCH_URL_LANG,
                DATA_FETCH,
                getSorter,
                STATIC_COLUMNS_LANG,
                PAGINATION_FIELD,
                InputForm,
                memberId,
                datamember,
              }}
            ></DataManagerLang>

            <Divider>ความชำนาญพิเศษ โปรแกรม</Divider>

            <DataManagerCom
              object={{
                EDITORCOM,
                INIT_ORDER,
                FETCH_URL_COM,
                DATA_FETCH,
                getSorter,
                STATIC_COLUMNS_COM,
                PAGINATION_FIELD,
                InputForm,
                memberId,
                datamember,
              }}
            ></DataManagerCom>

            <Divider>ความชำนาญพิเศษ ใบอนุญาตขับขี่</Divider>
            <Col sm={12} md={6}>
              <FormGroup>
                <label className="form-control-label" htmlFor="input-username">
                  เลขที่ใบอนุญาติขับขี่
                </label>
                <Form.Item name="driving_license_no">
                  <Input
                    className="form-control-alternative"
                    id="driving_license_no"
                    type="text"
                    readOnly={true}
                  />
                </Form.Item>
              </FormGroup>
            </Col>
            <Col sm={12} md={6}>
              <FormGroup>
                <label className="form-control-label" htmlFor="input-username">
                  เลขที่ใบอนุญาติขับขี่จักรยานยนต์
                </label>
                <Form.Item name="motor_license_no">
                  <Input
                    className="form-control-alternative"
                    id="motor_license_no"
                    type="text"
                    readOnly={true}
                  />
                </Form.Item>
              </FormGroup>
            </Col>
            <Col sm={12} md={6}>
              <FormGroup>
                <label className="form-control-label" htmlFor="input-username">
                  เลขที่ใบอนุญาติขับขี่ประเภท 4
                </label>
                <Form.Item name="other_license_no">
                  <Input
                    className="form-control-alternative"
                    id="other_license_no"
                    type="text"
                    readOnly={true}
                  />
                </Form.Item>
              </FormGroup>
            </Col>

            <Divider>ความชำนาญพิเศษ ความสนใจอื่นๆ</Divider>
            <FormGroup>
              <label className="form-control-label" htmlFor="input-username">
                ผลงานอื่นๆ
              </label>
              <Form.Item name="other_works">
                <Input
                  className="form-control-alternative"
                  id="other_works"
                  type="text"
                  readOnly={true}
                />
              </Form.Item>
            </FormGroup>
            <FormGroup>
              <label className="form-control-label" htmlFor="input-username">
                งานอดิเรกและความสนใจ
              </label>
              <Form.Item name="hobby">
                <Input
                  className="form-control-alternative"
                  id="hobby"
                  type="text"
                  readOnly={true}
                />
              </Form.Item>
            </FormGroup>
            <FormGroup>
              <label className="form-control-label" htmlFor="input-username">
                กีฬา
              </label>
              <Form.Item name="sport">
                <Input
                  className="form-control-alternative"
                  id="sport"
                  type="text"
                  readOnly={true}
                />
              </Form.Item>
            </FormGroup>

            <Divider>ประวัติการทำงาน</Divider>
            <Row>
              <DataManagerHistory
                object={{
                  EDITORHISTORY,
                  INIT_ORDER,
                  FETCH_URL_HISTORY,
                  DATA_FETCH,
                  getSorter,
                  STATIC_COLUMNS_HISTORY,
                  PAGINATION_FIELD,
                  InputForm,
                  memberId,
                  datamember,
                }}
              ></DataManagerHistory>
            </Row>
            <Divider>File</Divider>

            <DataManagerAttachment
              object={{
                EDITORATTACHMENT,
                INIT_ORDER,
                FETCH_URL_ATTACHMENT,
                DATA_FETCH,
                getSorter,
                STATIC_COLUMNS_ATTACHMENT,
                PAGINATION_FIELD,
                InputForm,
                memberId,
                datamember,
              }}
            ></DataManagerAttachment>
          </Container>
        </Form>
      ) : (
        <Skeleton active />
      )}
    </Modal>
  );
};

export default EditMember;
