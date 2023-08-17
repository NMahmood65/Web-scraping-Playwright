import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('https://www.ebay.com/')
  await page.getByPlaceholder('Search for anything').click()
  await page.getByPlaceholder('Search for anything').fill('jackets')
  await page.getByRole('button', { name: 'Search', exact: true }).press('Enter')
  // const page1Promise = page.waitForEvent('popup');
  // await page.getByRole('link', { name: 'Leomicci Jacket ExLarge XL Fullziper Black Opens in a new window or tab' }).click();
  // const page1 = await page1Promise;
  // await page1.getByTestId('x-item-title').getByText('Leomicci Jacket ExLarge XL Fullziper Black').click();
  // await page1.getByText('US $89.97').click();
})