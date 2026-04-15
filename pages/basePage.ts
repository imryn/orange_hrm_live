import { Locator, Page, expect } from '@playwright/test';
import { test } from '@playwright/test';

export class BasePage {
    protected page: Page;
    readonly formLabels: Locator;
    readonly spanElement: string;
    readonly tableContainer: string;

    constructor(page: Page) {
        this.page = page;
        this.formLabels = this.page.locator('form .oxd-label');
        this.spanElement = 'span';
        this.tableContainer = '.orangehrm-horizontal-padding'
    }

    /**
     * Finds an element and clicks on it after ensuring it is visible.
     * @param page - The Playwright Page instance.
     * @param locator - The selector string to locate the element.
    */
    async findElementAndClick (locator: Locator, options?: { timeout?: number }) {
        const timeout = options?.timeout ?? 10000; // Default timeout of 10 seconds
        try  {
            await locator.click({timeout});
        } catch (error) {
            await this.page.screenshot({ path: `error-${Date.now()}.png` });
            throw error
        }
    }
    
    /**
    * Waits until the given element is visible.
    * @param element - The Locator instance of the element to check.
    */
    async waitElementIsVisible (element: Locator) {
        await expect(element).toBeVisible({ timeout: 10000 })
              .catch(() => { throw new Error(`Error: ${element} not found!`) });
    }

    /**
     * Fills an input field with the given text after ensuring it is visible.
     * @param page - The Playwright Page instance.
     * @param locator - The selector string to locate the input field.
     * @param text - The text to enter into the input field.
    */
    async fillInput (element: Locator, text: string) {
        await element.fill(text);
    };

    async checkingNewUrl (path: string) {
        await expect(this.page).toHaveURL(path);
    }

   getElementByText(element_name: string, text: string): Locator {
      return this.page.locator(element_name, { hasText: text });
   }

    async clickMenu(options: { text?: string; href?: string }, 
                    expectedUrl: string, 
                    elementToWait: Locator) {

        if (!options.href && !options.text) {
            throw new Error('You must provide either text or href to clickMenu');
        }

        let selector = 'li.oxd-main-menu-item-wrapper a';
        if (options.href) {
            selector += `[href="${options.href}"]`;
        }

        const locator = options.text
            ? this.page.locator(selector, { hasText: options.text })
            : this.page.locator(selector);

        await Promise.all([
            this.findElementAndClick(locator),
            this.checkingNewUrl(expectedUrl),
            this.waitElementIsVisible(elementToWait)
        ]);
    }

    async expectElementToHaveCSS(locator: Locator, property: string, value: string) {
        try {
            await expect(locator).toHaveCSS(property, value);
        } catch (error) {
            await this.page.screenshot({ path: `css-error-${Date.now()}.png` });
            throw error;
        }
    }

    async waitForElement(locator: Locator) {
       await locator.waitFor({ state: 'visible' });
    }

    async verifyTextExistsInContainer(container: Locator, elements: string[]) {
        for (const element of elements) {
        await expect(
            container.getByText(element, { exact: true })
            ).toBeVisible();
        }
    }
}

export function step(stepName?: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const name =
        stepName || `${this.constructor.name}.${propertyKey}`;

      return await test.step(name, async () => {
        return await originalMethod.apply(this, args);
      });
    };

    return descriptor;
  };
}
