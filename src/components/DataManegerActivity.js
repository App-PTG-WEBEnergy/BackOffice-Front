/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";
import { Form, Button, notification } from "antd";

import {
  FormOutlined,
} from "@ant-design/icons";

import { get } from "services/callAPI";

const DataManagerActivity = ({ object, callbackitemContent }) => {
  const {
    EDITORACTIVITY,
    INIT_ORDER,
    FETCH_URL_ACTIVITY,
    DATA_FETCH,
    getSorter,
    STATIC_COLUMNS_ACTIVITY,
    PAGINATION_FIELD,
    invisibleStatus,
    memberId,
    datamember,
  } = object;
  let [data, setData] = useState([]);
  let [editData, setEditData] = useState([]);
  let [type, setType] = useState("add");
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
      get(FETCH_URL_ACTIVITY + datamember.member_id).then((data) => {

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


  // const handleTableChange = (paginations, filters, sorter) => {
  //   var sort = pagination.sortingOrder;
  //   var sort_type = pagination.reverse;

  //   if (sorter.field) {
  //     var s = getSorter(sorter, sort_type);
  //     sort = s.sort;
  //     sort_type = s.sort_type;
  //   }

  //   pagination = {
  //     ...pagination,
  //     current: paginations.current,
  //     pageSize: paginations.pageSize,
  //     pageNumber: paginations.current,
  //     reverse: sort_type,
  //     sortingOrder: sort,
  //   };
  //   setPagination(pagination);
  //   fetch(pagination);
  // };
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
  //const columns = [...STATIC_COLUMNS_ACTIVITY, ...action_culum];
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
              <th scope="col">ชื่อกิจกรรม</th>
              <th scope="col">หน้าที่รับผิดชอบ</th>
             
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => {
              return (
                <tr>
                  <td>{data.activity_name}</td>
                  <td>{data.responsible}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Form>
    </>
  );
};

export default DataManagerActivity;
