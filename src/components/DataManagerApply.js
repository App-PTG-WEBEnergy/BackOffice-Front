/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";
import { Table, Form, Button, notification, Modal } from "antd";
import { saveAs } from "file-saver";
import {
  ExclamationCircleOutlined,
  PlusCircleOutlined,
  FormOutlined,
  DeleteOutlined,
  FileSearchOutlined,
  ClearOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

import { Card, CardHeader, Container, Row, Col } from "reactstrap";
import { post, get, getfile,postgetfile } from "services/callAPI";
import Header from "components/Headers/Header";
import { useLocation } from "react-router-dom";

const sendexportfiled = "apply_job_ids";
const exportfiled = "apply_job_id";
const urlDownloadfile = "files/getApplyJobExcel/";
const urlDownloadfiles = "files/postMemberApplyJobExcel";
const DataManagerApply = ({ object }) => {
  const {
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
    invisibleStatus,
    SEND_DELETED_FILED,
  } = object;
  let [data, setData] = useState([]);
  let [editData, setEditData] = useState([]);
  let [type, setType] = useState("add");
  let [selected, setSelected] = useState([]);
  let [visible, setVisible] = useState(false);
  let [done, setDone] = useState(false);
  let [form] = Form.useForm();
  let [pagination, setPagination] = useState({
    current: 1,
    pageSize: 100,
    ...PAGINATION_FIELD,
    pageNumber: 1,
    reverse: "asc",
    sortingOrder: INIT_ORDER,
  });
  let [datapermission, setDataPermission] = useState({});
  const location = useLocation();
  const path = location.pathname;
  const permiss = JSON.parse(localStorage.getItem("permisstiongroup"));
  const checkUserGroup = (userGroupData) => {
    let { view, modify, approve } = {};

    view = userGroupData["view_" + path.substr(14)];
    modify = userGroupData["modify_" + path.substr(14)];
    approve = userGroupData["approve_" + path.substr(14)];

    return { view, modify, approve };
  };
  const [loading, setLoading] = useState(false);

  const fetch = (params = {}) => {
    setDataPermission(checkUserGroup(permiss));
    setLoading(true);
    console.log(params);
    post(FETCH_URL, params).then((data) => {
      if (data[DATA_FETCH]) {
        setData(data[DATA_FETCH]);
        setPagination({
          ...pagination,
          total: data.total,
        });
      }
      setLoading(false);
    });
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelected(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  const handleTableChange = (paginations, filters, sorter) => {
    var sort = pagination.sortingOrder;
    var sort_type = pagination.reverse;

    if (sorter.field) {
      var s = getSorter(sorter, sort_type);
      sort = s.sort;
      sort_type = s.sort_type;
    }

    pagination = {
      ...pagination,
      current: paginations.current,
      pageSize: paginations.pageSize,
      pageNumber: paginations.current,
      reverse: sort_type,
      sortingOrder: sort,
    };
    setPagination(pagination);
    fetch(pagination);
  };
  const exportData = () => {
    postgetfile(urlDownloadfiles, {
      [sendexportfiled]: selected.map((item) => item[exportfiled]),
    }).then((result) => {
      let url = window.URL.createObjectURL(new Blob([result]));
      saveAs(url, "memberprofile.xlsx");
    });
  };
  const onDownLoadfile = (edit_data) => {
    let id;
    console.log(edit_data);
    id = edit_data.apply_job_id;
    getfile(urlDownloadfile + id).then((result) => {
      let url = window.URL.createObjectURL(new Blob([result]));
      saveAs(url, `${edit_data.first_name_th}.xlsx`);
    });
  };
  const callback = (data) => {
    if (data.success) {
      notification.success({
        message: "บันทึกข้อมูล",
        description: "บันทึกข้อมูลเสร็จสิ้น",
        onClick: () => {},
        placement: "bottomRight",
      });
      fetch(pagination);
    }
  };
  var action_culum = invisibleStatus
    ? []
    : [
        {
          title: "Download",
          dataIndex: "id",
          render: (id, row) => {
            return (
              <Button
                className="ant-btn-success"
                onClick={() => onDownLoadfile(row)}
                icon={<DownloadOutlined />}
                disabled={datapermission.modify === "N"}
              >
                ดาวน์โหลด
              </Button>
            );
          },
          width: "30%",
        },
      ];
  const columns = [...STATIC_COLUMNS, ...action_culum];

  const search = () => {
    form.validateFields().then((values) => {
      pagination = { ...pagination, ...values };
      console.log(pagination);
      setPagination(pagination);
      fetch(pagination);
    });
  };
  const clear = () => {
    form.resetFields();
    search();
  };
  useEffect(() => {
    fetch(pagination);
  }, []);

  return (
    <>
      <Header
        component={
          <Form
            form={form}
            layout="inline"
            name="form_in_modal"
            initialValues={{
              modifier: "public",
            }}
          >
            {InputForm}
            <Form.Item>
              <Button icon={<FileSearchOutlined />} onClick={search}>
                search
              </Button>
            </Form.Item>
            <Form.Item>
              <Button icon={<ClearOutlined />} onClick={clear}>
                clear
              </Button>
            </Form.Item>
          </Form>
        }
      />

      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8"></Col>
                  <Col className="text-right" xs="4">
                    {selected.length > 0 && (
                      <Button
                        color="primary"
                        size="sm"
                        className="ant-btn-success"
                        onClick={exportData}
                        icon={<DownloadOutlined />}
                        disabled={datapermission.modify === "N"}
                      >
                        ดาวน์โหลด
                      </Button>
                    )}
                  </Col>
                </Row>
              </CardHeader>

              <div className="table-responsive bg-white">
                <Table
                  columns={columns}
                  rowKey={(record) => record.apply_job_id}
                  rowSelection={rowSelection}
                  dataSource={data}
                  pagination={pagination}
                  loading={loading}
                  onChange={handleTableChange}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DataManagerApply;
