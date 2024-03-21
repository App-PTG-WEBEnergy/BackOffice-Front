/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";
import { Table, Form, Button, notification, Modal } from "antd";

import {
  ExclamationCircleOutlined,
  FormOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import moment from "moment";

import { Card, CardHeader, Row, Col } from "reactstrap";

import { get } from "services/callAPI";

const DataManagerIntern = ({ object, callbackitemContent }) => {
  const {
    EDITORINTERN,
    INIT_ORDER,
    FETCH_URL_INTERN,
    DATA_FETCH,
    getSorter,
    STATIC_COLUMNS_INTERN,
    PAGINATION_FIELD,
    invisibleStatus,
    memberId,
    datamember,
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
    if (datamember.member_id !== undefined) {
      setLoading(true);
      get(FETCH_URL_INTERN + datamember.member_id).then((data) => {
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
  const columns = [...STATIC_COLUMNS_INTERN, ...action_culum];
  useEffect(() => {
    fetch(pagination);
  }, []);

  return (
    <>
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
              <th scope="col">สถานบัน / หน่วยงาน / บริษัท</th>
              <th scope="col">ชื่อหลักสูตร</th>
              <th scope="col">วันที่เริ่มต้น</th>
              <th scope="col">วันที่สิ้นสุด</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => {
              return (
                <tr>
                  <td>{data.institution_name}</td>
                  <td>{data.course_name}</td>
                  <td>{data.start_date.replace('T00:00:00','')}</td>
                  <td>{data.end_date.replace('T00:00:00','')}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Form>
    </>
  );
};

export default DataManagerIntern;
