//menu admin
export const adminMenu = [
    //quan ly nguoi dung - Admin
    {
        name: "menu.admin.system-admin",
        menus: [
            // {
            //     name: "menu.admin.crud",
            //     link: "/system/user-manage",
            // },

            // {
            //     name: "menu.admin.crud-redux",
            //     link: "/system/user-redux",
            // },

            {
                name: "menu.admin.manage-user-studentmanage",
                link: "/system/user-studentmanage",
            },

            {
                name: "menu.admin.manage-user-lecturer",
                link: "/student-manage/user-lecturer",
            },

            {
                name: "menu.admin.manage-user-student",
                link: "/student-manage/user-student",
                // subMenus: [
                //     {
                //         name: "menu.system.system-administrator.user-manage",
                //         link: "/system/user-manage",
                //     },
                //     {
                //         name: "menu.system.system-administrator.user-redux",
                //         link: "/system/user-redux",
                //     },
                // ],
            },

            {
                name: "menu.admin.manage-user-employee",
                link: "/student-manage/user-employee",
            },

            {
                name: "menu.admin.manage-user-admin",
                link: "/system/user-admin",
            },
        ],
    },
];

//menu giao vu
export const studentManageMenu = [
    //quan ly dang ky tt - Giao vu
    {
        name: "menu.admin.system-studentmanage",
        menus: [
            {
                name: "menu.admin.manage-subscribe",
                link: "/student-manage/manage-subscribe",
            },

            {
                name: "menu.admin.manage-internship-location",
                link: "/student-manage/manage-internship-location",
            },

            {
                name: "menu.admin.manage-user-lecturer",
                link: "/student-manage/user-lecturer",
            },

            {
                name: "menu.admin.manage-user-student",
                link: "/student-manage/user-student",
            },

            {
                name: "menu.admin.manage-user-employee",
                link: "/student-manage/user-employee",
            },
        ],
    },
];

//menu giang vien
export const lecturerMenu = [
    //quan ly tien do, cham diem - Giang vien
    {
        name: "menu.admin.system-lecturer",
        menus: [
            {
                name: "menu.admin.manage-score",
                link: "/lecturer/manage-score",
            },
            {
                name: "menu.admin.manage-student-support",
                link: "/lecturer/manage-student-support",
            },
        ],
    },
];

//menu nhan vien
export const employeeMenu = [
    //quan ly cong viec, cham diem danh gia  - Nhan vien
    {
        name: "menu.admin.system-employee",
        menus: [
            {
                name: "menu.admin.manage-job-requirements",
                link: "/employee/manage-job-requirements",
            },
            {
                name: "menu.admin.manage-rating",
                link: "/employee/manage-rating",
            },
        ],
    },
];
