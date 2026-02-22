const INDEX = "/web/index.php"

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