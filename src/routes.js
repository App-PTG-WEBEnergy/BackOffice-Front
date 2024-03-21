import React from 'react'

import Profile from "views/pages/Profile.js";
//import Maps from "views/pages/Maps.js";
import Login from "views/pages/Login.js";
import Trees from "views/pages/Menu/Tree";
import UserGroup from "views/pages/UserGroup/UserGroup";
import { UnlockOutlined, UserSwitchOutlined, HomeOutlined, ApartmentOutlined } from '@ant-design/icons';
import AdminUser from 'views/pages/admin-user/AdminUser';
import Contents from 'views/pages/contents/Contents';
import Investor from 'views/pages/investor/Investor';
import PositionAll from 'views/pages/jobs/PositionAll';
import Jobtype from 'views/pages/jobs/Jobtype';
import Business from 'views/pages/jobs/Business';
import Department from 'views/pages/jobs/Department';
import Member from 'views/pages/jobs/Member';
import ApplyJob from 'views/pages/jobs/ApplyJob';
import Main from 'views/pages/main/Main';
import ChatManage from 'views/pages/chat/chat';


var routes = [
    {
        path: "/main",
        name: "หน้าแรก",
        icon: "ni ni-tv-2 text-primary",
        antIcon: < HomeOutlined className = "text-green" / > ,
        component: Main,
        layout: "/admin",

    },
    {
        path: "/home",
        name: "หน้าแรก",
        icon: "ni ni-tv-2 text-primary",
        antIcon: < HomeOutlined className = "text-green" / > ,
        component: Trees,
        layout: "/admin",

    },
    {
        path: "/aboutptg",
        name: "รู้จักพีทีจี",
        icon: "ni ni-planet text-blue",
        component: Trees,
        layout: "/admin"
    },
    {
        path: "/sustainability",
        name: "ความยั่งยืน",
        icon: "ni ni-building text-blue",
        component: Trees,
        layout: "/admin"
    },
    {
        path: "/productservice",
        name: "ผลิตภัณฑ์และบริการ",
        icon: "ni ni-briefcase-24 text-blue",
        component: Trees,
        layout: "/admin"
    },
    {
        path: "/opportunity",
        name: "โอกาสทางธุรกิจ",
        icon: "ni ni-bag-17 text-blue",
        component: Trees,
        layout: "/admin"
    },
    {
        path: "/activitysocial",
        name: "กิจกรรมเพื่อสังคม",
        icon: "ni ni-app text-blue",
        component: Trees,
        layout: "/admin"
    },
    {
        path: "/procurement",
        name: "จัดซื้อจัดจ้าง",
        icon: "ni ni-badge text-blue",
        component: Trees,
        layout: "/admin"
    },
    {
        path: "/news",
        name: "ข้อมูลข่าวสาร",
        icon: "ni ni-badge text-green",
        component: Trees,
        layout: "/admin"
    },

    {
        path: "/invester",
        name: "นักลงทุนสัมพันธ์",
        icon: "ni ni-planet text-blue",
        antIcon: < ApartmentOutlined className = "text-green" / > ,
        component: Investor,
        layout: "/admin"
    },
    {
        path: "/joinus",
        name: "ร่วมกับเรา",
        icon: "ni ni-circle-08 text-green",
        component: PositionAll,
        layout: "/admin",
        nodes: [{
                path: "/joinus",
                name: "ข้อมูลเว็บไซต์",
                icon: "ni ni-single-02 text-yellow",
                component: Trees,
                layout: "/admin"
            },
            {
                path: "/businessgroup",
                name: "กลุ่มธุรกิจ",
                icon: "ni ni-single-02 text-yellow",
                component: Business,
                layout: "/admin"
            },
            {
                path: "/department",
                name: "ฝ่าย",
                icon: "ni ni-single-02 text-yellow",
                component: Department,
                layout: "/admin"
            },
            {
                path: "/jobtype",
                name: "ประเภทงาน",
                icon: "ni ni-single-02 text-yellow",
                component: Jobtype,
                layout: "/admin"
            },
            {
                path: "/positionall",
                name: "ตำแหน่งงานทั้งหมด",
                icon: "ni ni-single-02 text-yellow",
                component: PositionAll,
                layout: "/admin"
            },

            {
                path: "/member",
                name: "สมาชิก",
                icon: "ni ni-single-02 text-yellow",
                component: Member ,
                layout: "/admin"
            },
            {
                path: "/applymember",
                name: "สมัครงาน",
                icon: "ni ni-single-02 text-yellow",
                component: ApplyJob,
                layout: "/admin"
            },
            {
                path: "/chat",
                name: "จัดการระบบแชท",
                icon: "ni ni-single-02 text-yellow",
                component: ChatManage,
                layout: "/admin"
            },
        ]
    },

    {
        path: "/user-permission",
        name: "User & Permission",
        icon: "ni ni-single-02 text-yellow",
        component: Profile,
        layout: "/admin",
        nodes: [{
                path: "/user-group",
                name: "User group & Permission setting",
                icon: "ni ni-single-02 text-yellow",
                antIcon: < UnlockOutlined / > ,
                component: UserGroup,
                layout: "/admin"
            },
            {
                path: "/admin-user",
                name: "Admin User",
                icon: "ni ni-single-02 text-yellow",
                antIcon: < UserSwitchOutlined / > ,
                component: AdminUser,
                layout: "/admin"
            },
        ]
    }, {
        path: "/contents/:id",
        name: "Contents",
        icon: "ni ni-single-02 text-yellow",
        component: Contents,
        layout: "/admin",
        contents: true
    },
    {
        path: "/login",
        name: "Login",
        icon: "ni ni-key-25 text-info",
        component: Login,
        layout: "/auth"
    },
];



export default routes;