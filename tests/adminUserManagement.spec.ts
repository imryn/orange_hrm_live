import { test, expect } from '../fixture';
import { FormField } from '../types/FormTypes';
import { NAVBAR_LINKS, SAVE_USER_MANAGEMENT_LINK } from '../utils/constants/constant';
import { NOT_EXIST_ADMIN_USER, 
       EXIST_ADMIN_USER,
       INVALID_EMPLOYEE_NAME, 
       getNewAdminUserData } from '../utils/data/userManagementData';
import { PageFactory } from '../utils/pageFactory';

async function verifySearchedUser(factory: PageFactory, userData: FormField[], expectedMessage: string) {
       const { count, rowData } = await factory.userManagementPage.searchForUser(userData);
       const verifyNoRecordsFound = await factory.userManagementPage.verifyRecordsMessage(expectedMessage);
       await expect(verifyNoRecordsFound).toBeVisible();

       return { count, rowData };
}

test.describe('verify user management page', () => {
    // This runs before every test in this block
    test.beforeEach(async ({ page, factory }) => {
        await page.goto('/');

        await factory.clickMenu({ text: NAVBAR_LINKS[0].text}, 
            NAVBAR_LINKS[0].path, 
            factory.userManagementPage.navbarItems.first());
    });

 test('verify navbar links', async ({ factory }) => {
        await factory.userManagementPage.verifyNavbarLinks();
        await factory.userManagementPage.verifyUserManagementForm();
 });

test('searching a not exist user in user management form', async ({ factory }) => {
       const { count, rowData } = await verifySearchedUser(factory, NOT_EXIST_ADMIN_USER, 'No Records Found');
       expect(count).toBe(0);
 });

test('searching exist user in user management form', async ({ factory }) => {
       const { count, rowData }  = await verifySearchedUser(factory, EXIST_ADMIN_USER, '(1) Record Found');
       expect(count).toBe(1);
       await factory.userManagementPage.verifyRecordsFound(rowData, EXIST_ADMIN_USER);
 });

test("searching with invalid Emplyee name in user management form", async ({ factory }) => {
      await factory.userManagementPage.searchForUser(INVALID_EMPLOYEE_NAME)
      const errorMessage = await factory.userManagementPage.getErrorFormField('Employee Name')
      expect(errorMessage).toHaveText('Invalid');
 });

test("add new user", async ({ factory }) => {
       await factory.userManagementPage.clickAddButton(SAVE_USER_MANAGEMENT_LINK);
       const userData = getNewAdminUserData()
       await factory.saveSystemUsersPage.addUserAndSave(userData, NAVBAR_LINKS[0].path);
       await factory.checkingNewUrl(NAVBAR_LINKS[0].path);
       const { count, rowData }  = await verifySearchedUser(factory, userData, '(1) Record Found');
       expect(count).toBe(1);
       await factory.userManagementPage.verifyRecordsFound(rowData, userData);
 });

});