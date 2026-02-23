import { Page, Locator, test } from '@playwright/test';
import { BasePage, step } from './basePage';
import { DashboardMyActions } from '../utils/constants/constant';

export class DashboardPage extends BasePage{

     getLeaveRequestToApprove(): Locator {
        return this.getElementByText('p', DashboardMyActions.leaveRequestToApprove);
    }

      getPendingSelfReview(): Locator {
        return this.getElementByText('p',DashboardMyActions.pendingSelfReview);}
    
    getCandidateToInterview(): Locator {
        return this.getElementByText('p', DashboardMyActions.candidateToInterview);
    }
}