export const menus = [
  {
    icon: "fa-bookmark",
    menu_id: "home",
    menu_name_th: "หน้าแรก",
  },
  {
    icon: "fa-bookmark",
    menu_id: "aboutptg",
    menu_name_th: "รู้จักพีทีจี",
  },
  {
    hasChild: true,
    icon: "fa-cog",
    menu_id: "sustainability",
    menu_name_th: "ความยั่งยืน",
  },
  {
    hasChild: true,
    icon: "fa-tasks",
    menu_id: "productservice",
    menu_name_th: "ผลิตภัณฑ์และบริการ",
    submen: [],
  },
  {
    hasChild: true,
    icon: "fa-shopping-cart",
    menu_id: "opportunity",
    menu_name_th: "โอกาศทางธุรกิจ",
  },
  {
    hasChild: true,
    icon: "fa-calendar",
    menu_id: "activitysocial",
    menu_name_th: "กิจกรรมเพื่อสังคม",
  },
  {
    hasChild: true,
    icon: "fa-newspaper-o",
    menu_id: "procurement",
    menu_name_th: "จัดซื้อจัดจ้าง",
  },
  {
    hasChild: true,
    icon: "fa-newspaper-o",
    menu_id: "news",
    menu_name_th: "ข้อมูลข่าวสาร",
  },
  {
    hasChild: true,
    icon: "fa-newspaper-o",
    menu_id: "invester",
    menu_name_th: "นักลงทุนสัมพันธ์",
  },
  // {
  //   hasChild: true,
  //   icon: "fa-newspaper-o",
  //   menu_id: "joinus",
  //   menu_name_th: "ร่วมงานกับเรา ข้อมูลเว็บไซต์",
  // },
];

export const join_us = {
  hasChild: true,
  icon: "fa-users",
  menu_id: "joinus",
  menu_name_th: "ร่วมกับเรา",
  submenu: [
    {
      icon: "fa-dolly-flatbed",
      menu_id: "joinus",
      menu_name_th: "ข้อมูลเว็บไซต์",
      menu_name_en: "WebSite DATA",
      hasChild: false,
      status: "Active",
      //contents://contents
    },
    {
      icon: "fa-dolly-flatbed",
      menu_id: "businessgroup",
      menu_name_th: "กลุ่มธุรกิจ",
      menu_name_en: "Business Group",
      hasChild: false,
      status: "Active",
      //contents://contents
    },
    {
      icon: "fa-dolly-flatbed",
      menu_id: "department",
      menu_name_th: "ฝ่าย",
      menu_name_en: "department",
      hasChild: false,
      status: "Active",
      //contents://contents
    },
    {
      icon: "fa-dolly-flatbed",
      menu_id: "jobtype",
      menu_name_th: "ประเภทงาน",
      menu_name_en: "jobtype",
      hasChild: false,
      status: "Active",
      //contents://contents
    },
    {
      icon: "fa-dolly-flatbed",
      menu_id: "positionall",
      menu_name_th: "ตำแหน่งงานทั้งหมด",
      menu_name_en: "All Position",
      hasChild: false,
      status: "Active",
      //contents://contents
    },
    {
      icon: "fa-dolly-flatbed",
      menu_id: "member",
      menu_name_th: "สมาชิก ",
      menu_name_en: "Member",
      hasChild: false,
      status: "Active",
      //contents://contents
    },
    {
      icon: "fa-dolly-flatbed",
      menu_id: "applymember",
      menu_name_th: "สมัครงาน",
      menu_name_en: "Application Form",
      hasChild: false,
      status: "Active",
      //contents://contents
    },
    {
      icon: "fa-dolly-flatbed",
      menu_id: "chat",
      menu_name_th: "จัดการระบบแชท",
      menu_name_en: "Chat Management",
      hasChild: false,
      status: "Active",
      //contents://contents
    },
  ],
};

// export const join_us = {
//     hasChild: true,
//     icon: "fa-users",
//     menu_id: "joinus",
//     menu_name_th: "ร่วมกับเรา",
//     submenu: [
//         {
//             icon: 'fa-dolly-flatbed',
//             menu_id: 'businessgroup',
//             menu_name_th: "กลุ่มธุรกิจ",
//             menu_name_en: "Business Group",
//             hasChild: false,
//             status: 'Active',
//             //contents://contents
//         }, {
//             icon: 'fa-dolly-flatbed',
//             menu_id: 'positionall',
//             menu_name_th: "ตำแหน่งงานทั้งหมด",
//             menu_name_en: "All Position",
//             hasChild: false,
//             status: 'Active',
//             //contents://contents
//         }, {
//             icon: 'fa-dolly-flatbed',
//             menu_id: 'positionhotjob',
//             menu_name_th: "ตำแหน่งงานที่น่าสนใจ ",
//             menu_name_en: "Hot Job",
//             hasChild: false,
//             status: 'Active',
//             //contents://contents
//         },
//         {
//             icon: 'fa-dolly-flatbed',
//             menu_id: 'member',
//             menu_name_th: "สมาชิก ",
//             menu_name_en: "Member",
//             hasChild: false,
//             status: 'Active',
//             //contents://contents
//         }, {
//             icon: 'fa-dolly-flatbed',
//             menu_id: 'applymember',
//             menu_name_th: "ใบสมัครงาน ",
//             menu_name_en: "Application Form",
//             hasChild: false,
//             status: 'Active',
//             //contents://contents
//         },
//     ]
// };
