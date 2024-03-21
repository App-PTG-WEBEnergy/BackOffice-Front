/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";
import { Table, Form, Button, notification, Modal } from "antd";

import {
  ExclamationCircleOutlined,
  FormOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

import { Card, CardHeader, Row, Col } from "reactstrap";

import { post, get } from "services/callAPI";

const DataManagerNewPro = ({ object }) => {
  const {
    EDITORNEWPRO,
    UPDATE_STATUS_URL,
    INIT_ORDER,
    FETCH_URL_NEWPRO,
    DATA_FETCH_NEWPRO,
    DELETE_URL_NEWPRO,
    DELETE_FIELD_NEWPRO,
    getSorter,
    STATIC_COLUMNS_NEWPRO,
    PAGINATION_FIELD,
    invisibleStatus,
    SEND_DELETED_FILED_NEWPRO,
    NEWPRO_TYPE,
  } = object;
  let [data, setData] = useState([]);
  let [editData, setEditData] = useState([]);
  let [type, setType] = useState("add");
  let [nptype, setNpType] = useState("add");
  let [selected, setSelected] = useState([]);
  let [visible, setVisible] = useState(false);
  let [done, setDone] = useState(false);
  let [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    ...PAGINATION_FIELD,
    pageNumber: 1,
    reverse: "asc",
    sortingOrder: INIT_ORDER,
  });

  const [loading, setLoading] = useState(false);
  const regex = /(<([^>]+)>)/gi;
  const fetch = (params = {}) => {
    setLoading(true);
    setTimeout(() => {
      get(FETCH_URL_NEWPRO + NEWPRO_TYPE).then((data) => {
        console.log(data);
        if (data[DATA_FETCH_NEWPRO]) {
          //console.log(data[DATA_FETCH]);
          var i = 1;
          data[DATA_FETCH_NEWPRO].forEach((element) => {
            if (element.description_th !== null) {
              element.description_title_th = element.description_th.replace(
                regex,
                ""
              );
            }
            else {
              element.description_title_th = "";
            }
            element.index = i;
            i++;
          });
          setData(data[DATA_FETCH_NEWPRO]);
          setPagination({
            ...pagination,
            total: data.total,
          });
        }
        setLoading(false);
      });
    }, 500);
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
    setEditData(edit_data);
    setDone(true);
    setType("edit");
    setVisible(true);

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
      const FixIndexColunm = [
        {
          title: "ลำดับ",
              render: (id, row) => {
                return (<>{row.index}</>);
              },
          width: "5%",
        }
      ]
  const columns = [...FixIndexColunm,...STATIC_COLUMNS_NEWPRO, ...action_culum];
  const deleteData = () => {
    Modal.confirm({
      title: "ต้องการลบข้อมูลหรือไม่?",
      icon: <ExclamationCircleOutlined />,
      content: "คุณไม่สามารถย้อนกลับได้!!",
      okText: "Delete",
      okType: "danger",
      onOk() {
        post(DELETE_URL_NEWPRO, {
          [SEND_DELETED_FILED_NEWPRO]: selected.map(
            (item) => item[DELETE_FIELD_NEWPRO]
          ),
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
  // const search = () => {
  //   form.validateFields().then((values) => {
  //     pagination = { ...pagination, ...values };
  //     setPagination(pagination);
  //     fetch(pagination);
  //   });
  // };
  useEffect(() => {
    setData([]);
    setNpType(NEWPRO_TYPE);
    fetch(pagination);
  }, []);

  return (
    <>
      <Col sm={12} md={12}>
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
              rowKey={(record) => record.news_pro_id}
              rowSelection={rowSelection}
              dataSource={data}
              pagination={pagination}
              loading={loading}
              onChange={handleTableChange}
            />
          </div>
        </Card>
      </Col>

      <EDITORNEWPRO
        data={editData}
        done={done}
        callback={callback}
        visible={visible}
        type={type}
        nptype={nptype}
        setVisable={setVisible}
      />
    </>
  );
};

export default DataManagerNewPro;
