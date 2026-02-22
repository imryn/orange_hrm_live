import { Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { UserManagementPage } from '../pages/userManagementPage';
import { BasePage } from '../pages/basePage';

export class PageFactory extends BasePage{

    private loginPageInstance?: LoginPage;
    private userManagementPageInstance?: UserManagementPage;

     constructor(page: Page) {
        super(page);
    }

    get loginPage(): LoginPage {
        return this.loginPageInstance ??= new LoginPage(this.page);
    }

    get userManagementPage() {
        return this.userManagementPageInstance ??= new UserManagementPage(this.page);
    }
}