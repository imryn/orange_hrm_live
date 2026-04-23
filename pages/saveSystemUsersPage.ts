import { BasePage, step } from './basePage';
import { Page, Locator, expect } from '@playwright/test';
import { FormField } from '../types/FormTypes';
import { FormComponent } from '../components/formComponent';
import { FormFooterComponent } from '../components/formFooterComponent';

export class SaveSystemUsersPage extends BasePage{

     readonly form: FormComponent;
     readonly formFooter: FormFooterComponent;
    
     constructor(page: Page) {
            super(page);
            this.form = new FormComponent(this.page);
            this.formFooter = new FormFooterComponent(this.page);
     }

     async addUserAndSave(data: FormField[], expectedUrl: string) {
        await this.form.fillForm(data);
        await this.formFooter.clickSave();
        await this.waitForUrlToChange(expectedUrl);
     }
}
