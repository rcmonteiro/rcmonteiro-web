import { expect, test } from '@playwright/test'

test('should render the home with 4 posts', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await expect(page).toHaveTitle(/rcmonteiro/)

  const posts = page.getByTestId('post-item')
  await expect(posts).toHaveCount(4)
})

test('should navigate to the post page', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByTestId('post-item').first().getByRole('link').first().click()
  await expect(page).toHaveTitle(/\| rcmonteiro/)
  await expect(page).toHaveURL(/\/post\//)
  await expect(
    page.getByTestId('post-contribute').getByRole('heading'),
  ).toHaveText('Contribute to the Project')
})
