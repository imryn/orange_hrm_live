const INDEX = "/web/index.php"
const DOMAIN = "https://opensource-demo.orangehrmlive.com"

export const FORM_TITLE_COLOR = 'rgb(100, 114, 140)'
export const DEFAULTCOLOR = 'rgb(255, 123, 29)'
export const RESET_BUTTON_COLOR = 'rgb(118, 188, 33)'
export const SEARCH_BUTTON_FONT_COLOR = 'rgb(255, 255, 255)'

export const DashboardMyActions = {
    leaveRequestToApprove: 'Leave Request to Approve',
    pendingSelfReview: 'Pending Self Review',
    candidateToInterview: 'Candidate to Interview'
}

export const LOGIN_CREDENTIALS = {
    admin: {
        username: "Admin",
        password: "admin123",
        expectedPath: `${INDEX}/dashboard/index`
    }
};

export const NAVBAR_LINKS = [
    {path: `${INDEX}/admin/viewSystemUsers`, text: "Admin"},
    {path: `${INDEX}/pim/viewPim`, text: "PIM"}
]

export const SAVE_USER_MANAGEMENT_LINK = `${DOMAIN}${INDEX}/admin/saveSystemUser`