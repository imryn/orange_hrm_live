import { test } from '../fixture';
import { NAVBAR_LINKS } from '../utils/constants/constant';
import { ADMIN_USER_FORM } from '../utils/data/userManagementData';

test.describe('verify user management page', () => {
    // This runs before every test in this block
    test.beforeEach(async ({ factory, adminCredentials }) => {
        await factory.loginPage.loginAndVerifyUrl(
            adminCredentials.username, 
            adminCredentials.password,
            adminCredentials.expectedPath
        );

        await factory.clickMenu({ text: NAVBAR_LINKS[0].text}, 
            NAVBAR_LINKS[0].path, 
            factory.userManagementPage.navbarItems.first());
    });

 test('verify navbar links', async ({ factory }) => {
        await factory.userManagementPage.verifyNavbarLinks();
        await factory.userManagementPage.verifyUserManagementForm();
 });

  test('fill user management form', async ({ factory }) => {
        await factory.userManagementPage.fillForm(ADMIN_USER_FORM)
 });

})