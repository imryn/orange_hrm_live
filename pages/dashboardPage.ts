import { Page, Locator, test } from '@playwright/test';
import { BasePage, step } from './basePage';
import { DashboardMyActions } from '../utils/constants/constant';

export class DashboardPage extends BasePage{

     getLeaveRequestToApprove(): Locator {
        return this.getElementByText(DashboardMyActions.leaveRequestToApprove);
    }

      getPendingSelfReview(): Locator {
        return this.getElementByText(DashboardMyActions.pendingSelfReview);}
    
    getCandidateToInterview(): Locator {
        return this.getElementByText(DashboardMyActions.candidateToInterview);
    }
}