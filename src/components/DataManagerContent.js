/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";
import { Table, Form, Button, notification, Modal } from "antd";

import {
  ExclamationCircleOutlined,
  PlusCircleOutlined,
  FormOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { Card, CardHeader, Container, Row, Col } from "reactstrap";

import { post, get } from "services/callAPI";

import Header from "components/Headers/Header";

const DataManagerContent = ({ object }) => {
  const {
    EDITOR,
    ADDEDITOR,
    TRUCKEDIT,
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
    MenuData,
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
    pageSize: 10,
    ...PAGINATION_FIELD,
    pageNumber: 1,
    reverse: "asc",
    sortingOrder: INIT_ORDER,
  });

  const [loading, setLoading] = useState(false);

  const fetch = (params = {}) => {
    setLoading(true);
    get(FETCH_URL).then((data) => {
      if (data[DATA_FETCH]) {
        //console.log(data[DATA_FETCH]);
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
    // getCheckboxProps: (record) => ({
    //   disabled: record.name === "Disabled User",
    //   name: record.name,
    // }),
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
  const editContent = (edit_data) => {
    setDone(false);
    setType("edit");
    setVisible(true);
    setEditData(edit_data);
    setDone(true);

    // get(DATA_BY_ID_URL + edit_data.id).then((result) => {
    //   setEditData(result);
    //   setDone(true);
    // });
  };

  const callback = (data) => {
    if (data.success) {
      notification.success({
        message: "บันทึกข้อมูล",
        description: "บันทึกข้อมูลเสร้จสิ้น",
        onClick: () => {},
        placement: "bottomRight",
      });
      fetch(pagination);
    }
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
      title: "ต้องการลบข้อมูลหรือไม่?",
      icon: <ExclamationCircleOutlined />,
      content: "คุณไม่สามารถย้อนกลับได้!!",
      okText: "Delete",
      okType: "danger",
      onOk() {
        post(DELETE_URL, {
          [SEND_DELETED_FILED]: selected.map((item) => item[DELETE_FIELD]),
        }).then((result) => {
          notification.success({
            message: "ลบข้อมูล user",
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
            {/* <Form.Item
                    >
                        <Button icon={<FileSearchOutlined />} onClick={search}>search</Button>

                    </Form.Item>
                    <Form.Item>
                        <Button icon={<ClearOutlined />} onClick={clear}>clear</Button>
                    </Form.Item> */}
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
                        ลบข้อมูล
                      </Button>
                    )}
                  </Col>
                </Row>
              </CardHeader>

              <div className="table-responsive bg-white">
                {/* {JSON.stringify(columns)+' '+JSON.stringify(data)} */}
                <Table
                  columns={columns}
                  rowKey={(record) => record.menu_content_id}
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
      {type === "edit" && (
        <EDITOR
          data={editData}
          done={done}
          callback={callback}
          visible={visible}
          type={type}
          setVisable={setVisible}
        />
      )}
      {type === "add" && (
        <ADDEDITOR
          data={editData}
          done={done}
          callback={callback}
          visible={visible}
          type={type}
          setVisable={setVisible}
        />
      )}
    </>
  );
};

export default DataManagerContent;
