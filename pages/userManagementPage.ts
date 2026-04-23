import { Page, Locator, expect } from '@playwright/test';
import { BasePage, step } from './basePage';
import { FormComponent } from '../components/formComponent';
import { DEFAULTCOLOR, FORM_TITLE_COLOR } from '../utils/constants/constant';
import { USER_MANAGEMENT_FORM_LABELS, NAVBAR_LINKS } from '../utils/data/userManagementData';
import { FormField } from '../types/FormTypes';
import { TableComponent } from '../components/tableResultComponent';
import { verifyRowMatchesForm } from '../utils/formAssertions';


export class UserManagementPage extends BasePage{
    readonly navbarItems: Locator;
    readonly pageFormTitle: Locator
    readonly form: FormComponent;
    public readonly table: TableComponent;

  constructor(page: Page) {
        super(page);
        this.navbarItems = page.locator(".oxd-topbar-body-nav-tab-item");
        this.pageFormTitle = this.page.getByRole('heading', { name: 'System Users', level: 5 });
        this.form = new FormComponent(this.page);
        this.table = new TableComponent(this.page);
    }

  async verifyNavbarLinks() {
    const actualTexts = await this.navbarItems.allTextContents();

    expect(actualTexts.length).toBe(NAVBAR_LINKS.length);

    for (let i = 0; i < NAVBAR_LINKS.length; i++) {
        expect(actualTexts[i].trim()).toBe(NAVBAR_LINKS[i]);
    }
  }

  async verifyUserManagementForm() {
    await this.waitElementIsVisible(this.pageFormTitle);
    const pickedNavbarItem = this.getElementByText('li', NAVBAR_LINKS[0]);
    await this.expectElementToHaveCSS(pickedNavbarItem, 'color', DEFAULTCOLOR); // Example CSS check
    await this.expectElementToHaveCSS(this.pageFormTitle, 'color', FORM_TITLE_COLOR); // Example CSS check
    await this.form.verifyLabels(USER_MANAGEMENT_FORM_LABELS);
    await this.form.verifyButtons()
  }

  async getErrorFormField(labelName: string): Promise<Locator> {
    return this.form.getFieldError(labelName);
  }

  async searchForUser(data: FormField[]) {
    await this.form.searchForUser(data);

    await this.page.locator(`${this.tableContainer} span`).first().waitFor({ state: 'visible' });

    const count = await this.table.getResultCount();
    const rowData = count > 0 ? await this.table.getRowData(0) : {};
    
    return { count, rowData };
  }

  async verifyRecordsMessage(RecordSearchText: string){
     return this.table.verifyRecordsMessage(RecordSearchText)
  }

  async verifyRecordsFound(rowData: Record<string, string>, searchData: FormField[]) {
      verifyRowMatchesForm(rowData, searchData);
  }
}