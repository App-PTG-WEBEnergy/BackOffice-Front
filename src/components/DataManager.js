/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";
import { Table, Form, Button, notification, Modal } from "antd";

import {
  ExclamationCircleOutlined,
  PlusCircleOutlined,
  FormOutlined,
  DeleteOutlined,
  FileSearchOutlined,
  ClearOutlined,
} from "@ant-design/icons";

import { Card, CardHeader, Container, Row, Col } from "reactstrap";

import { post, get } from "services/callAPI";

import Header from "components/Headers/Header";

const DataManager = ({ object }) => {
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

  const [loading, setLoading] = useState(false);

  const fetch = (params = {}) => {
    setLoading(true);
    console.log(params);
    post(FETCH_URL, params).then((data) => {
      if (data[DATA_FETCH]) {
        if(DATA_FETCH == "groups"){
          data[DATA_FETCH] = data[DATA_FETCH].filter(x => x.id !== 1);
          setData(data[DATA_FETCH]);
        }
        else {
          setData(data[DATA_FETCH]);
        }
        
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
    console.log(pagination);
    setPagination(pagination);
    fetch(pagination);
  };
  const editContent = (edit_data) => {
    setDone(false);

    let id;
    console.log(edit_data);
    if (edit_data.position_id !== undefined) {
      id = edit_data.position_id;
    } else if (edit_data.id !== undefined) {
      id = edit_data.id;
    } else if (edit_data.department_id !== undefined) {
      id = edit_data.department_id;
    } else if (edit_data.business_id !== undefined) {
      id = edit_data.business_id;
    } else if (edit_data.job_type_id !== undefined) {
      id = edit_data.job_type_id;
    }
    get(DATA_BY_ID_URL + id).then((result) => {
      setEditData(result);
      setDone(true);
    });
    setType("edit");
    setVisible(true);
  };
  const callback = (data) => {
    if (data.success) {
      notification.success({
        message: "บันทึกข้อมูล",
        description: "บันทึกข้อมูลเสร็จสิ้น",
        onClick: () => { },
        placement: "bottomRight",
      });
      fetch(pagination);
    }
  };
  const setStatus = (row, status) => {
    var post_data = { ...row, status };
    post(UPDATE_STATUS_URL, post_data).then(
      (result) => {
        callback({ success: true });
      },
      (err) => {
        callback({ success: false });
      }
    );
  };
  var action_culum = invisibleStatus
    ? [
      {
        title: "Edit",
        dataIndex: "id",
        render: (id, row) => {
          return (
            <Button
              className="ant-btn-warning"
              onClick={() => editContent(row)}
              icon={<FormOutlined />}
            >
              แก้ไขข้อมูล
            </Button>
          );
        },
        width: "30%",
      },
    ]
    : [
      {
        title: "Status",
        dataIndex: "status",
        sorter: true,
        width: "25%",
        render: (status, row) => {
          return (
            <select
              style={{ width: "100px", height: 30 }}
              className={
                row.status === "Active"
                  ? "bg-success text-white"
                  : "bg-volcano text-white"
              }
              onChange={(e) => setStatus(row, e.target.value)}
            >
              <option selected={status === "Active"}>Active</option>
              <option selected={status !== "Active"}>Inactive</option>
            </select>
          );
        },
      },
      {
        title: "Edit",
        dataIndex: "id",
        render: (id, row) => {
          return (
            <Button
              className="ant-btn-warning"
              onClick={() => editContent(row)}
              icon={<FormOutlined />}
            >
              แก้ไขข้อมูล
            </Button>
          );
        },
        width: "30%",
      },
    ];
  const columns = [...STATIC_COLUMNS, ...action_culum];
  const deleteData = () => {
    Modal.confirm({
      title: "Do you Want to delete these items?",
      icon: <ExclamationCircleOutlined />,
      content: "you can't reverse this!!",
      okText: "Delete",
      okType: "danger",
      onOk() {
        console.log( {
          [SEND_DELETED_FILED]: selected.map((item) => item[DELETE_FIELD]),
        });
        post(DELETE_URL, {
          [SEND_DELETED_FILED]: selected.map((item) => item[DELETE_FIELD]),
        }).then((result) => {
          notification.success({
            message: "ลบข้อมูล",
            description: "ลบข้อมูลเสร็จสิ้น",
            onClick: () => {
              //console.log('Notification Clicked!');
            },
            placement: "bottomRight",
          });
          fetch(pagination);
        });
      },
      onCancel() {
        //console.log('Cancel');
      },
    });
  };

  const addData = () => {
    setType("add");
    setVisible(true);
  };
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
                  <Col xs="8">
                    <Button
                      className="ant-btn-success mb-3"
                      onClick={addData}
                      icon={<PlusCircleOutlined />}
                    >
                      เพิ่มข้อมูล
                    </Button>
                  </Col>
                  <Col className="text-right" xs="4">
                    {selected.length > 0 && (
                      <Button
                        color="primary"
                        size="sm"
                        danger
                        onClick={deleteData}
                        icon={<DeleteOutlined />}
                      >
                        Delete
                      </Button>
                    )}
                  </Col>
                </Row>
              </CardHeader>

              <div className="table-responsive bg-white">
                {/* {JSON.stringify(columns)+' '+JSON.stringify(data)} */}
                <Table
                  columns={columns}
                  rowKey={(record) => {
                    if (record.position_id !== undefined) {
                      return record.position_id;
                    } else if (record.id !== undefined) {
                      return record.id;
                    } else if (record.business_id !== undefined) {
                      return record.business_id;
                    } else if (record.department_id !== undefined) {
                      return record.department_id;
                    } else if (record.job_type_id !== undefined) {
                      return record.job_type_id;
                    }
                    else {
                      return record.id;
                    }
                  }}
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
      <EDITOR
        data={editData}
        done={done}
        callback={callback}
        visible={visible}
        type={type}
        setVisable={setVisible}
      />
    </>
  );
};

export default DataManager;
