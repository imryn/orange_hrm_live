import { Page, Locator, test, expect } from '@playwright/test';
import { BasePage, step } from './basePage';

export class UserManagementPage extends BasePage{
      private navbarLinks: string[] = [
    'User Management',
    'Job',
    'Organization',
    'Qualifications',
    'Nationalities',
    'Corporate Branding',
    'Configuration'
  ];

  async verifyNavbarLinks() {
    for (const link of this.navbarLinks) {
      await expect(this.page.getByText(link)).toBeVisible();
    }
  }
}