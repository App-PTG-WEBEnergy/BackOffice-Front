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

const DataManagerHistory = ({ object, callbackitemContent }) => {
  const {
    EDITORHISTORY,
    INIT_ORDER,
    FETCH_URL_HISTORY,
    DATA_FETCH,
    getSorter,
    STATIC_COLUMNS_HISTORY,
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
      get(FETCH_URL_HISTORY + datamember.member_id).then((data) => {

        if (data) {
          data.forEach(im => {
            im.start_date = im.start_date.replace("T00:00:00", "");
            im.end_date = im.end_date.replace("T00:00:00", "");
          });
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
  const columns = [...STATIC_COLUMNS_HISTORY, ...action_culum];
  useEffect(() => {
    fetch(pagination);
  }, []);

  return (
    <>

      <Col sm={12} md={12}>
        <Card className="bg-secondary shadow">
          <CardHeader className="bg-white border-0"></CardHeader>

          <div className="table-responsive bg-white">
            {/* {JSON.stringify(columns)+' '+JSON.stringify(data)} */}
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

      <EDITORHISTORY
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

export default DataManagerHistory;
