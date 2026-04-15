import { test } from '../fixture';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('login with user', () => {
       test.beforeEach(async ({ page }) => {
           await page.goto('/web/index.php/auth/login');
      });

 test('login with invalid pasword', async ({ factory }) => {

      await factory.loginPage.userLogin('Admin', '123');
      await factory.loginPage.verifyErrorMessage('Invalid credentials');
      
  });

   test('login with invalid user', async ({ factory }) => {

      await factory.loginPage.userLogin('Admin123', 'admin123');
      await factory.loginPage.verifyErrorMessage('Invalid credentials');
      
  });

    test('login with valid user', async ({ factory, adminCredentials }) => {
      await factory.loginPage.loginAndVerifyUrl(
            adminCredentials.username, 
            adminCredentials.password,
            adminCredentials.expectedPath);    
      });
});