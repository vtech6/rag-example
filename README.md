How to run the app:
- Clone this repo
- cd into both directories and do `npm i`
- add env variables in both directories following the structure found in `.env.dist`
- on the frontend side, run `npm run dev`
- on the backend side do `docker compose up`
- once the database is created, you have to do `npx @better-auth migrate --y`
- now you're ready to go
