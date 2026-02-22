import { test } from '../fixture';
import { NAVBAR_LINKS } from '../utils/constants/constant';

test.describe('verify user management page', () => {

 test('verify navbar links', async ({ factory, adminCredentials }) => {
        await factory.loginPage.loginAndVerifyUrl(
            adminCredentials.username, 
            adminCredentials.password,
            adminCredentials.expectedPath);
        
        await factory.clickMenu({ text: NAVBAR_LINKS[0].text }, NAVBAR_LINKS[0].path);
        await factory.userManagementPage.verifyNavbarLinks();
 });

});