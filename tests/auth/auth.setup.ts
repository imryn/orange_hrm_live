import { test as setup } from '../../fixture'; // your factory fixture

setup('login and save auth.json', async ({ page, factory, adminCredentials }) => {
  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")

  await factory.loginPage.loginAndVerifyUrl(
    adminCredentials.username,
    adminCredentials.password,
    adminCredentials.expectedPath
  );

  await page.context().storageState({ path: 'auth.json' });
});