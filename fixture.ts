import { test as base } from '@playwright/test';
import { PageFactory } from './utils/pageFactory';
import { LOGIN_CREDENTIALS } from './utils/constants/constant';


export const test = base.extend<{ 
    factory: PageFactory;
    adminCredentials: { username: string; password: string; expectedPath: string };

    }>({
    factory: 
        async ({ page }, use) => {
        const factory = new PageFactory(page);
        await use(factory);
    },

     adminCredentials: async ({}, use) => {
        await use(LOGIN_CREDENTIALS.admin);
    },
   
});



export { expect } from '@playwright/test';