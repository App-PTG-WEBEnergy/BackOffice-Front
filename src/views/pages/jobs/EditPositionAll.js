/* eslint-disable react-hooks/exhaustive-deps */
import _ from "lodash";
import React, { useState, useEffect, useRef } from "react";
import { Modal, Form, Skeleton, DatePicker, Checkbox, Select } from "antd";
import { Row, Col, FormGroup, Input, Container } from "reactstrap";
import { post, get } from "services/callAPI";
import moment, { now } from "moment";
import JoditEditor from "jodit-react";
const config = {
  readonly: false,
  buttons: [
    "source",
    "|",
    "bold",
    "strikethrough",
    "underline",
    "italic",
    "|",
    "ul",
    "ol",
    "|",
    "outdent",
    "indent",
    "|",
    "font",
    "fontsize",
    "brush",
    "paragraph",
    "|",
    "table",
    "link",
    "|",
    "align",
    "undo",
    "redo",
    "|",
    "image",
  ], // all options from https://xdsoft.net/jodit/doc/
};
const SAVE_URL = "careers/savePosition";
const EditPostitionAll = ({
  data,
  visible,
  callback,
  setVisable,
  type,
  done,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const editor = useRef(null);
  const [business, setBusiness] = useState("0");
  const [dataBusiness, setDataBusiness] = useState([]);
  const [department, setDepartment] = useState("0");
  const [dataDepartment, setDataDepartment] = useState([]);
  const [dataDept, setDataDept] = useState([]);
  const [deptBuVal, setDeptBuVal] = useState(0);
  const [announceDate, setAnnounceDate] = useState("");
  const [jobtype, setJobType] = useState("0");
  const [dataJobType, setDataJobType] = useState([]);
  const [province, setProvince] = useState("0");
  const [dataProvice, setDataProvince] = useState([]);
  const [jobResponsibilitiesTH, setJobResponsibilitiesTH] = useState("");
  const [jobResponsibilitiesEN, setJobResponsibilitiesEN] = useState("");
  const [jobpropertyTH, setJobpropertyTH] = useState("");
  const [jobpropertyEN, setJobpropertyEN] = useState("");
  const [jobContactTH, setJobContactTH] = useState("");
  const [jobContactEN, setJobContactEN] = useState("");
  const [jobPlaceTH, setJobPlaceTH] = useState("");
  const [jobPlaceEN, setjobPlaceEN] = useState("");
  const dateFormat = "YYYY-MM-DD";
  const handleCancel = () => {
    setVisable(false);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log(values);
      console.log("jobResponsibilitiesTH="+jobResponsibilitiesTH);
      values.announce_date = announceDate;
      values.job_responsibilities_th = jobResponsibilitiesTH;
      values.job_responsibilities_en = jobResponsibilitiesEN;
      values.job_property_th = jobpropertyTH;
      values.job_property_en = jobpropertyEN;
      values.job_contact_th = jobContactTH;
      values.job_contact_en = jobContactEN;
      values.job_work_location_th = jobPlaceTH;
      values.job_work_location_en = jobPlaceEN;
      if (values.hot_check === true) {
        values.hot_job_type = "Y";
      } else {
        values.hot_job_type = "";
      }

      if (values.status_check === true) {
        values.status = "Y";
      } else {
        values.status = "N";
      }

      if (type === "edit") {
        values = { ...values, position_id: data.position_id };
      } else {
        values = { ...values, position_id: 0 };
      }
      post(SAVE_URL, values).then(
        (result) => {
          callback({ success: true });
          setConfirmLoading(false);
          setVisable(false);
        },
        (err) => {
          setConfirmLoading(false);
          callback({ success: false });
        }
      );
    });
  };

  const onBusinessChange = (e) => {
    console.log("Business", e);
    if (e !== null && e !== undefined) {
      setDeptBuVal(e);
      console.log(dataDept);
      let dept = dataDept.filter((x) => x.business_id === e);
      console.log(dept);
      setDataDepartment(dept);
    }
    setBusiness(e);
  };

  const onDepartmentChange = (e) => {
    setDepartment(e);
    console.log("department", e);
  };

  const onJobTypeChange = (e) => {
    setJobType(e);
    console.log("jobtype", e);
  };
  const onProvinceChange = (e) => {
    setProvince(e);
    console.log("province", e);
  };

  function onAnnounceChangeDate(date, dateString) {
    if (dateString !== "" && date !== null) {
      setAnnounceDate(dateString);
    }
  }

  useEffect(() => {
    setJobResponsibilitiesTH("");
    setJobResponsibilitiesEN("");
    setJobpropertyTH("");
    setJobpropertyEN("");
    setJobContactTH("");
    setJobContactEN("");
    setAnnounceDate("");
    setJobPlaceTH("");
    setjobPlaceEN("");
    get("careers/getBusinesss").then((result) => {
      setDataBusiness(result);
      get("careers/getDepartments").then((department) => {
        setDataDepartment(department);
        setDataDept(department);
        get("careers/getJobTypes").then((jobtype) => {
          setDataJobType(jobtype);
          get("careers/getProvinces").then((province) => {
            setDataProvince(province);
            if (type === "edit") {
              setJobResponsibilitiesTH(data.job_responsibilities_th);
              setJobResponsibilitiesEN(data.job_responsibilities_en);
              setJobpropertyTH(data.job_property_th);
              setJobpropertyEN(data.job_property_en);
              setJobContactTH(data.job_contact_th);
              setJobContactEN(data.job_contact_en);
              setJobPlaceTH(data.job_work_location_th);
              setjobPlaceEN(data.job_work_location_en);
              console.log(data);
              if (
                data.hot_job_type !== null &&
                data.hot_job_type !== undefined &&
                data.hot_job_type !== " "
              ) {
                data.hot_check = true;
              } else {
                data.hot_check = false;
              }
              if (data.status === "Y") {
                data.status_check = true;
              } else {
                data.status_check = false;
              }
              if (
                data.announce_date !== null &&
                data.announce_date !== undefined
              ) {
                setAnnounceDate(data.announce_date);
              }
              form.setFieldsValue(data);
            } else {
              //setAnnounceDate("");
              form.resetFields();
            }
          });
        });
      });
    });
  }, [visible, done]);
  return (
    <Modal
      title={type === "edit" ? "Edit Position" : "Add Position"}
      visible={visible}
      width="90%"
      style={{ maxWidth: "1024px" }}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      onOk={handleOk}
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
              <Col sm={12} md={6}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-position"
                  >
                    ชื่อตำแหน่งภาษาไทย
                  </label>
                  <Form.Item
                    name="position_name_th"
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกข้อมูล ชื่อตำแหน่งภาษาไทย!",
                      },
                    ]}
                  >
                    <Input
                      className="form-control-alternative"
                      id="position_name_th"
                      placeholder="ชื่อตำแหน่งภาษาไทย"
                      type="text"
                    />
                  </Form.Item>
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-position"
                  >
                    ชื่อตำแหน่งภาษาอังกฤษ
                  </label>
                  <Form.Item
                    name="position_name_en"
                    rules={[
                      {
                        required: false,
                        message: "กรุณากรอกข้อมูล ชื่อตำแหน่งภาษาอังกฤษ!",
                      },
                    ]}
                  >
                    <Input
                      className="form-control-alternative"
                      id="position_name_en"
                      placeholder="ชื่อตำแหน่งภาษาอังกฤษ"
                      type="text"
                    />
                  </Form.Item>
                </FormGroup>
              </Col>

              <Col sm={12} md={6}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-business_id"
                  >
                    ประเภทธุรกิจ
                  </label>
                  <Form.Item
                    name="business_id"
                    rules={[
                      {
                        required: true,
                        message: "กรุณาเลือกประเภทธุรกิจ!",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      style={{ width: 200 }}
                      className="form-control-alternative"
                      optionFilterProp="children"
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
                          <option value={item.business_id}>
                            {item.business_name_th}
                          </option>
                        );
                      })}
                    </Select>

                    {/* <Input
                      type="select"
                      className="form-control-alternative"
                      disabled={confirmLoading}
                      defaultValue={business}
                      onChange={onBusinessChange}
                    >
                      <option value="0">กรุณาเลือก</option>
                      {dataBusiness.map((item) => {
                        return (
                          <option value={item.business_id}>
                            {item.business_name_th}
                          </option>
                        );
                      })}
                    </Input> */}
                  </Form.Item>
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    ฝ่าย
                  </label>
                  <Form.Item
                    name="department_id"
                    rules={[
                      {
                        required: true,
                        message: "กรุณาเลือกฝ่าย!",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      style={{ width: 200 }}
                      className="form-control-alternative"
                      optionFilterProp="children"
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
                    {/* <Input
                      type="select"
                      className="form-control-alternative"
                      disabled={confirmLoading}
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
                    </Input> */}
                  </Form.Item>
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    ประเภทงาน
                  </label>
                  <Form.Item
                    name="job_type_id"
                    rules={[
                      {
                        required: true,
                        message: "กรุณาเลือกประเภทงาน!",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      style={{ width: 200 }}
                      className="form-control-alternative"
                      optionFilterProp="children"
                      onChange={onJobTypeChange}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <option value="0">กรุณาเลือก</option>
                      {dataJobType.map((item) => {
                        return (
                          <option value={item.job_type_id}>
                            {item.job_type_name_th}
                          </option>
                        );
                      })}
                    </Select>
                    {/* <Input
                      type="select"
                      className="form-control-alternative"
                      disabled={confirmLoading}
                      defaultValue={jobtype}
                      onChange={onJobTypeChange}
                    >
                      <option value="0">กรุณาเลือก</option>
                      {dataJobType.map((item) => {
                        return (
                          <option value={item.job_type_id}>
                            {item.job_type_name_th}
                          </option>
                        );
                      })}
                    </Input> */}
                  </Form.Item>
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    สถานที่ปฏิบัติงาน
                  </label>
                  <Form.Item
                    name="province_id"
                    rules={[
                      {
                        required: true,
                        message: "กรุณาเลือกจังหวัด!",
                      },
                    ]}
                  >
                     <Select
                      showSearch
                      style={{ width: 200 }}
                      className="form-control-alternative"
                      optionFilterProp="children"
                      onChange={onProvinceChange}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                       <option value="0">กรุณาเลือก</option>
                      {dataProvice.map((item) => {
                        return (
                          <option value={item.province_id}>
                            {item.province_name_th}
                          </option>
                        );
                      })}
                    </Select>
                    {/* <Input
                      type="select"
                      className="form-control-alternative"
                      disabled={confirmLoading}
                      defaultValue={province}
                      onChange={onProvinceChange}
                    >
                      <option value="0">กรุณาเลือก</option>
                      {dataProvice.map((item) => {
                        return (
                          <option value={item.province_id}>
                            {item.province_name_th}
                          </option>
                        );
                      })}
                    </Input> */}
                  </Form.Item>
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-num_open"
                  >
                    อัตราที่เปิดรับ
                  </label>
                  <Form.Item
                    name="num_open"
                    rules={[
                      {
                        required: true,
                        message: "กรุณากรอกข้อมูล จำนวนตำแหน่ง!",
                      },
                    ]}
                  >
                    <Input
                      className="form-control-alternative"
                      id="num_open"
                      placeholder="จำนวนตำแหน่ง"
                      type="number"
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
                    วันที่ประกาศ
                  </label>
                  <Form.Item>
                    <DatePicker
                      id="announce_date"
                      value={
                        announceDate === null || announceDate === ""
                          ? ""
                          : moment(announceDate, "YYYY-MM-DD")
                      }
                      className="form-control-alternative"
                      onChange={onAnnounceChangeDate}
                    />
                  </Form.Item>
                </FormGroup>
              </Col>
              <Col sm={12} md={3}>
                <FormGroup>
                  <label>สถานะตำแหน่งงานด่วน </label>
                  <Form.Item name="hot_check" valuePropName="checked">
                    <Checkbox>Hot Job</Checkbox>
                  </Form.Item>
                </FormGroup>
              </Col>
              <Col sm={12} md={3}>
                <FormGroup>
                  <label>สถานะ</label>
                  <Form.Item name="status_check" valuePropName="checked">
                    <Checkbox>Active</Checkbox>
                  </Form.Item>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={12}>
                <FormGroup>
                  <label className="form-control-label">
                    หน้าที่และความรับผิดชอบภาษาไทย
                  </label>
                  <JoditEditor
                    ref={editor}
                    value={jobResponsibilitiesTH}
                    config={config}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={(newContent) => setJobResponsibilitiesTH(newContent)} 
                    onChange={(newContent) => { }}
                  />
             
                </FormGroup>
              </Col>
              <Col sm={12} md={12}>
                <FormGroup>
                  <label className="form-control-label">
                    หน้าที่และความรับผิดชอบภาษาอังกฤษ
                  </label>
                  <JoditEditor
                    ref={editor}
                    value={jobResponsibilitiesEN}
                    config={config}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={(newContent) => setJobResponsibilitiesEN(newContent)} 
                    onChange={(newContent) => {}}
                  />
                </FormGroup>
              </Col>
              <Col sm={12} md={12}>
                <FormGroup>
                  <label className="form-control-label">
                    คุณสมบัติภาษาไทย
                  </label>
                  <JoditEditor
                    ref={editor}
                    value={jobpropertyTH}
                    config={config}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={(newContent) => setJobpropertyTH(newContent)} 
                    onChange={(newContent) => {}}
                  />
                </FormGroup>
              </Col>
              <Col sm={12} md={12}>
                <FormGroup>
                  <label className="form-control-label">
                    คุณสมบัติภาษาอังกฤษ
                  </label>
                  <JoditEditor
                    ref={editor}
                    value={jobpropertyEN}
                    config={config}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={(newContent) => setJobpropertyEN(newContent)} 
                    onChange={(newContent) => {}}
                  />
                </FormGroup>
              </Col>

              <Col sm={12} md={12}>
                <FormGroup>
                  <label className="form-control-label">
                    รายละเอียดสถานที่ปฏิบัติงาน ภาษาไทย
                  </label>
                  <JoditEditor
                    ref={editor}
                    value={jobPlaceTH}
                    config={config}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={(newContent) => setJobPlaceTH(newContent)} 
                    onChange={(newContent) => {}}
                  />
                </FormGroup>
              </Col>
              <Col sm={12} md={12}>
                <FormGroup>
                  <label className="form-control-label">
                    รายละเอียดสถานที่ปฏิบัติงาน ภาษาอังกฤษ
                  </label>
                  <JoditEditor
                    ref={editor}
                    value={jobPlaceEN}
                    config={config}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={(newContent) => setjobPlaceEN(newContent)} 
                    onChange={(newContent) => {}}
                  />
                </FormGroup>
              </Col>
              <Col sm={12} md={12}>
                <FormGroup>
                  <label className="form-control-label">
                    ข้อมูลติดต่อภาษาไทย
                  </label>
                  <JoditEditor
                    ref={editor}
                    value={jobContactTH}
                    config={config}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={(newContent) => setJobContactTH(newContent)} 
                    onChange={(newContent) => {}}
                  />
                </FormGroup>
              </Col>
              <Col sm={12} md={12}>
                <FormGroup>
                  <label className="form-control-label">
                    ข้อมูลติดต่อภาษาอังกฤษ
                  </label>
                  <JoditEditor
                    ref={editor}
                    value={jobContactEN}
                    config={config}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={(newContent) => setJobContactEN(newContent)} 
                    onChange={(newContent) => {}}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Container>
        </Form>
      ) : (
        <Skeleton active />
      )}
    </Modal>
  );
};

export default EditPostitionAll;
