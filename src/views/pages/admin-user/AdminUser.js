import React from "react";
import {
    Form, Input
} from 'antd';


import EditAdminUser from "./EditAdminUser";
import DataManager from "components/DataManager";


const EDITOR = EditAdminUser;
const UPDATE_STATUS_URL = 'permission/updateAdminUserStatus'
const INIT_ORDER = 'u.FirstName';
const FETCH_URL = 'permission/searchAdminUser';
const DATA_FETCH = 'adminUsers';
const DATA_BY_ID_URL = 'permission/getAdminUserData/';
const DELETE_URL = 'permission/deleteAdminUsers';
const DELETE_FIELD = 'id';
const SEND_DELETED_FILED='UserIDs';
const getSorter = (sorter, sort, sort_type) => {
    sort = 'u.' + sorter.field.substring(0, 1).toUpperCase() + sorter.field.substr(1);
    sort = sorter.field === 'status' ? 'u.Activated' : sorter.field === 'groupName' ? 'GroupName' : sort;
    sort_type = sorter.order === 'descend' ? 'desc' : 'asc';
    return { sort, sort_type };
}

const STATIC_COLUMNS = [


    {
        title: 'Name',
        dataIndex: 'firstName',
        sorter: true,
        width: '35%',
        render: ((name, row) => {
            return row.firstName + ' ' + row.lastName
        })
    },
    {
        title: 'User ID',
        dataIndex: 'username',
        sorter: true,
        width: '25%'

    }, {
        title: 'User Group Name',
        dataIndex: 'groupName',
        sorter: true,
        width: '25%'
    },
    {
        title: 'Department',
        dataIndex: 'department',
        sorter: true,
        width: '25%'
    },
    // {
    //     title: 'Mobile Number',
    //     dataIndex: 'mobilePhoneNumber',
    //     sorter: true,
    //     width: '25%'
    // },
    // {
    //     title: 'Office Number',
    //     dataIndex: 'officePhoneNumber',
    //     sorter: true,
    //     width: '25%'
    // },
]
const PAGINATION_FIELD = {
    fullName: "",
    username: "",
}

const InputForm = (
    <>

        <Form.Item
            style={{ textColor: 'white' }}
            name="username"
            label={<span style={{ color: 'white' }}>User ID </span>}

        >
            <Input placeholder='User ID' />
        </Form.Item>
        <Form.Item
            style={{ textColor: 'white' }}
            name="fullname"
            label={<span style={{ color: 'white' }}>Name </span>}

        >
            <Input placeholder='Name' />
        </Form.Item>
    </>

)


const AdminUser = () => {
    return (
        <DataManager object={
            {
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
                SEND_DELETED_FILED
            }
        }>

        </DataManager>
    )
}

export default AdminUser;
