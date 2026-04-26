import { FormField } from "../../types/FormTypes";
import { getDynamicUsername } from "../constants/userUtil";

export const NOT_EXIST_ADMIN_USER: FormField[] = [
  {label: "Username", value: "ABC Test 1"},
  {label: "User Role", value: "Admin", type: 'dropdown'},
  {label: "Status", value: "Enabled", type: 'dropdown'},
];

export const EXIST_ADMIN_USER: FormField[] = [
  {label: "Username", value: "Admin"},
  {label: "User Role", value: "Admin", type: 'dropdown'},
];

export const INVALID_EMPLOYEE_NAME: FormField[] = [
  {label: "Employee Name", value: "Invalid Employee"},
];

export const getNewAdminUserData = () : FormField[] => [
  {label: "User Role", value: "Admin", type: 'dropdown'},
  {label: "Status", value: "Enabled", type: 'dropdown'},
  {label: "Password", value: "tesT!234"},
  {label: "Employee Name", value: "Peter Mac Anderson", type: 'autocomplete'},
  {label: "Username", value: getDynamicUsername()},
  {label: "Confirm Password", value: "tesT!234"}
];

export const NAVBAR_LINKS: string[] = [
    'User Management',
    'Job',
    'Organization',
    'Qualifications',
    'Nationalities',
    'Corporate Branding',
    'Configuration'
  ];

export const USER_MANAGEMENT_FORM_LABELS: string[] = [
    'Username',
    'User Role',
    'Employee Name',
    'Status'
];