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
- svix (Used to verify the webhook signature)

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