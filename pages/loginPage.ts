
import { Page, Locator, test } from '@playwright/test';
import { BasePage, step } from './basePage';

export class LoginPage extends BasePage{

    readonly userNameInput: Locator;
    readonly passwordInput: Locator
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.userNameInput = page.locator("input[name='username']");
        this.passwordInput = page.locator("input[name='password']");
        this.loginButton = page.locator("button[type='submit']");
        this.errorMessage = page.locator('div.oxd-alert-content--error')
                                .locator('p.oxd-alert-content-text');
    }

   async userLogin(username: string, password: string) {
        await this.fillInput(this.userNameInput, username);
        await this.fillInput(this.passwordInput, password);
        await this.findElementAndClick(this.loginButton);
    
   }

   async loginAndVerifyUrl(username: string, password: string, expectedUrl: string) {
        await this.userLogin(username, password);
        await this.checkingNewUrl(expectedUrl);
   }

   async verifyErrorMessage(expectedMessage: string) {
    await test.step('Verify error message is displayed', async () => {
        await this.waitElementIsVisible(this.errorMessage);
        const actualMessage = await this.errorMessage.textContent();
        if (actualMessage?.trim() !== expectedMessage) {
            throw new Error(`Expected error message: "${expectedMessage}", but got: "${actualMessage?.trim()}"`);
        }
    });
        
  }
}
