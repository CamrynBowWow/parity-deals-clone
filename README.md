## Tutorial
- Youtuber: Web Dev Simplified
- URL: https://www.youtube.com/watch?v=pWV-8PW1l2A

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

# Ports/Webhooks(clerk)

- Using VScode go to the ports tab and then click add port.
- Go to clerk and add the url of the port to clerk webhooks
- Make sure port visibility is on public.
- Might also require you to sign into github before creating a port

# Features

- Create a new Product
    - Product Name [required]
    - Product URL [required]
    - Product Description [optional]