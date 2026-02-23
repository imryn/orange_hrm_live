import { Page, Locator, test, expect } from '@playwright/test';
import { BasePage, step } from './basePage';

export class UserManagementPage extends BasePage{
    readonly navbarItems: Locator;

    private navbarLinks: string[] = [
    'User Management',
    'Job',
    'Organization',
    'Qualifications',
    'Nationalities',
    'Corporate Branding',
    'Configuration'
  ];

  constructor(page: Page) {
        super(page);
        this.navbarItems = page.locator(".oxd-topbar-body-nav-tab-item");
    }

  async verifyNavbarLinks() {
    const actualTexts = await this.navbarItems.allTextContents();

    expect(actualTexts.length).toBe(this.navbarLinks.length);

    for (let i = 0; i < this.navbarLinks.length; i++) {
        expect(actualTexts[i].trim()).toBe(this.navbarLinks[i]);
    }
  }
}