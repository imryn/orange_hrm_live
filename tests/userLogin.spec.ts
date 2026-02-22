import { test } from '../fixture';

test.describe('login with user', () => {

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