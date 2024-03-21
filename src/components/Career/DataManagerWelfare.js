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
 
 import { post, get } from "services/callAPI";
 import EditContentWalfare from "views/pages/contents/EditContentGrowWalfare";
 
 const DataManagerPepleTalk = ({ object, callbackitemContent }) => {
   const {
     ADDEDITOR,
     UPDATE_STATUS_URL,
     INIT_ORDER,
     FETCH_URL,
     DATA_FETCH,
     DELETE_URL,
     DELETE_FIELD,
     getSorter,
     STATIC_COLUMNS,
     PAGINATION_FIELD,
     invisibleStatus,
     SEND_DELETED_FILED,
     updateId,
     layoutType,
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
   const regex = /(<([^>]+)>)/gi;
   const [loading, setLoading] = useState(false);
 
   const fetch = (params = {}) => {
     if (updateId.menu_id !== undefined) {
       setLoading(true);
       get(FETCH_URL + updateId.menu_id).then((data) => {
         if (data[DATA_FETCH]) {
           //console.log(data[DATA_FETCH]);
           data[DATA_FETCH].forEach((element) => {
             if (element.description_th !== null) {
               element.description_title_th = element.description_th.replace(
                 regex,
                 ""
               );
             
                console.log("rex",regex.test(element.description_th));
               
             }
             else {
               element.description_title_th = "";
             }
           });
 
           setData(data[DATA_FETCH]);
 
           setPagination({
             ...pagination,
             total: data.total,
           });
         }
         setLoading(false);
       });
     }
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
   // const editContentTruck = (edit_data) => {
   //   setDone(false);
   //   setType("edit");
   //   setVisible(true);
   //   console.log(edit_data);
   //   setEditData(edit_data);
   //   setDone(true);
 
   //   // get(DATA_BY_ID_URL + edit_data.id).then((result) => {
   //   //   setEditData(result);
   //   //   setDone(true);
   //   // });
   // };
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
       content: "",
       okText: "Delete",
       okType: "danger",
       onOk() {
         // console.log({
         //   [SEND_DELETED_FILED]: selected.map((item) => item[DELETE_FIELD]),menu: updateId,
         // });
         post(DELETE_URL, {
           [SEND_DELETED_FILED]: selected.map((item) => item[DELETE_FIELD]),
         }).then((result) => {
           notification.success({
             message: "ลบข้อมูล Content",
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
   useEffect(() => {
     fetch(pagination);
   }, []);
 
   return (
     <>
       {/* <Header
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
                     </Form.Item> *
           </Form>
         }
       /> */}
 
       {/* <Container className="mt--7" fluid> */}
 
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
 
       <EditContentWalfare
         data={editData}
         done={done}
         callback={callback}
         visible={visible}
         type={type}
         layouttype={layoutType}
         setVisable={setVisible}
         menudata={updateId}
         datad={data[0]}
       />
     </>
   );
 };
 
 export default DataManagerPepleTalk;
 