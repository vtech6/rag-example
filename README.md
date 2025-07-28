How to run the app:
- Clone this repo
- cd into both directories and do `npm i`
- on the frontend side, run `npm run dev`
- on the backend side do `docker compose up`
- add env variables in both directories following the structure found in `.env.dist`
- once the database is created, you have to do `npx @better-auth migrate --y`
- now you're ready to go
