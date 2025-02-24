## Tutorial
- Youtuber: Web Dev Simplified
- URL: https://www.youtube.com/watch?v=pWV-8PW1l2A

<br>

# Tech Stack

- Next.js 15
- Shadcn
- Stripe
- Clerk
- Neon
- Drizzle
- t3-oss/env-nextjs
- zod
- date-fns
- svix (Used to verify the webhook signature)

### Dev dependence packages

- tsx (npm i --save-dev tsx)
	- Allows the running of TypeScript files without running anything else.
- @date-fns/tz
	- Part of date-fns but needs to be installed separately "npm i @date/fns/tz"

<br>

# Ports/Webhooks(clerk)

- Using VScode go to the ports tab and then click add port.
- Go to clerk and add the url of the port to clerk webhooks
- Make sure port visibility is on public.
- Might also require you to sign into github before creating a port

<br>

# Features

- Create a new Product
    - Product Name [required]
    - Product URL [required]
    - Product Description [optional]

- Sign in
- Sign up
    - Once the user has signed up the automatically get added a free subscription tier
    - This is done by using clerk webhooks to trigger a function to give the user the free tier subscription when creating an account
    - The subscription will be deleted when the user account is deleted

### Product Display Grid

- Product is displayed with name, url link, and description (optional)
- Can edit product
- Can add to site
- Can delete product
- Link to create new product page
- Link to products page

### Caching 

File for caching can be found in the lib folder file name cache

- Global cache
    - An example would be that there are the same amount of countries for every user and if one country changes then the entire cache for all countries will refresh.
- User cache
    - An example would be when a user creates a product only the users product cache will be refreshed and not refresh the cache for all products.
- Individual cache
    - An example would be when one product is deleted the update for the cache would be just for that one product and not updating the cache for everybody in the entire application.

### Country Discounts

What the feature does:

- This allows for each product to have different discount percentages on them based on the country group. 
- Can enter in a coupon name for each different country group discount.

<br>

- There is a json file in data folder that holds all the country groups discount information. 
- In folder tasks the file updateCountryGroups reads the json file to update all the country groups information.

<br>

To insert country discounts run the following command in the terminal - **npm run db:updateCountryGroups**

- Make sure to remove the following functions and imports:
	- revalidateDbCache({ tag: CACHE_TAGS.countries });
	- import { CACHE_TAGS, revalidateDbCache } from '@/lib/cache';


### Banner Customization

Allow for customization for of product banners and only giving access to subscription tiers that allow it.

<br>
<br>

What can be customized:
- Discount Message
- Background Color
- Text color
- Font size
- Sticky or Not Sticky
- Banner Container
- CSS Prefix

<br>

### User Permissions

All the restricts on based on the tier subscription and can be upgraded anytime.

- User will be restricted on how many products they can make.
- User will be restricted on how they can customize their products banner.


<br>

### Subscription Page

- Tracks the number of visits to pricing page monthly
- Tracks the amount of products you have created

<br>

### Banner

The Banner API is used to set a banner on any product or site that matches the url. When the url is visited the *Monthly Usage* increases.

<br>

## Stripe 

To create the different prices:
- Go to **Product catalog** on Stripe
- Then click on **Create product** button. Then fill in the following fields:
	- Name
	- Make sure **Recurring** is selected
	- Fill in amount
- Then click on each one made and then click on the price of the product (under Price).
- Then copy the ID of the price for the product
- Can manage subscription if not on free plan

### Stripe getting webhook secret key

- Search for Webhooks on stripe
- Then Click **Create an event destination** button
- Select the **Test in a local environment** tab
- Add the stripe listen to your package.json file:
	- "stripe:webhooks": "stripe listen --forward-to localhost:3000/api/webhooks/stripe"
- Then type in *npm run stripe:webhooks* into the terminal

OR

- Make sure to download stripe.exe from [Stripe Github](https://github.com/stripe/stripe-cli/releases/tag/v1.24.0)
- Add file Path to environment variables on system.
- Then open cmd in file Path the stripe.exe is added in
- Type in **stripe login**
- Then run *stripe listen --forward-to localhost:3000/api/webhooks/stripe* that command
- Put webhook secret key in .env

<br>

The key expires in 90 days

<br>

When testing the purchasing process make sure the card information is visa and 4242 4242 4242 4242

<br>

### Analytics

- There is a drop-down menu to select the different ranges
	- Last 7 Days
	- Last 30 Days
	- Last 365 Days
- Visitors Per Day
- Visitors Per PPP Group
- Visitors Per Country
- There is a drop-down menu for each different Product the user has or just all products
- There is a drop-down menu for different timezones
	- UTC
	- Users current timezone

<br>

## Functions

- What the code does below:
    - It inserts into country group table with all the data in **countryGroupInsertDate**.
    - Every single time there is a duplicate it will only update the recommended discount percent.
    - The excluded dot syntax is just getting the value of the recommended discount percentage would of been for the insert and instead use it for the update.

<br>

```bash
async function updateCountryGroups() {
	const countryGroupInsertData = countriesByDiscount.map(
		({ name, recommendedDiscountPercentage }) => {
			return { name, recommendedDiscountPercentage };
		}
	);

	
	const { rowCount } = await db
		.insert(CountryGroupTable)
		.values(countryGroupInsertData)
		.onConflictDoUpdate({
			target: CountryGroupTable.name,
			set: {
				recommendedDiscountPercentage: sql.raw(
					`excluded.${CountryGroupTable.recommendedDiscountPercentage.name}`
				),
			},
		});

	revalidateDbCache({ tag: CACHE_TAGS.countryGroups });

	return rowCount;
}
```