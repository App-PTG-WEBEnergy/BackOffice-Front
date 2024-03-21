/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";
import { Table, Form, Button, notification, Modal } from "antd";

import {
  ExclamationCircleOutlined,
  FormOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { Card, CardHeader, Row, Col } from "reactstrap";

import { get } from "services/callAPI";
import EditCom from "views/pages/jobs/EditCom";

const DataManagerCom = ({ object, callbackitemContent }) => {
  const {
    EDITCOM,
    INIT_ORDER,
    FETCH_URL_COM,
    DATA_FETCH,
    getSorter,
    STATIC_COLUMNS_COM,
    PAGINATION_FIELD,
    invisibleStatus,
    memberId,
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
    console.log(memberId);
    if (memberId !== undefined) {
      setLoading(true);
      get(FETCH_URL_COM + memberId).then((data) => {
        if (data) {
          setData(data);
          setPagination({
            ...pagination,
          });
        }
        setLoading(false);
      });
    }
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
          title: "View",
          dataIndex: "id",
          render: (id, row) => {
            return (
              <Button
                className="ant-btn-warning"
                onClick={() => editContent(row)}
                icon={<FormOutlined />}
              >
                View
              </Button>
            );
          },
          width: "30%",
        },
      ]
    : [
        {
          title: "View",
          dataIndex: "id",
          render: (id, row) => {
            return (
              <Button
                className="ant-btn-warning"
                onClick={() => editContent(row)}
                icon={<FormOutlined />}
              >
                View
              </Button>
            );
          },
          width: "30%",
        },
      ];
  const columns = [...STATIC_COLUMNS_COM, ...action_culum];
  useEffect(() => {
    fetch(pagination);
  }, []);

  return (
    <>
      {/* <Col sm={12} md={12}>
        <Card className="bg-secondary shadow">
          <CardHeader className="bg-white border-0"></CardHeader>

          <div className="table-responsive bg-white">
            <Table
              columns={columns}
              rowKey={(record) => record.menu_content_id}
              dataSource={data}
              pagination={pagination}
              loading={loading}
              onChange={handleTableChange}
            />
          </div>
        </Card>
      </Col>

      <EditCom
        data={editData}
        done={done}
        callback={callback}
        visible={visible}
        type={type}
        setVisable={setVisible}
      /> */}
      <Form
        form={form}
        layout="inline"
        name="form_in_modal"
        // {...layout}
        initialValues={{
          modifier: "public",
        }}
      >
        <table className="table table-striped" border="1" bordercolor="#ddd">
          <thead>
            <tr bgcolor="#eaeaea">
              <th scope="col">โปรแกรม</th>
              <th scope="col">ความชำนาญ</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => {
              return (
                <tr>
                  <td>{data.computerprogram}</td>
                  <td>{data.expert}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Form>
    </>
  );
};

export default DataManagerCom;
