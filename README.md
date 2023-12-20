# Web Programming HW#3

See the live demo here: [https://112-1-unit2-twitter-clone.vercel.app/](https://112-1-unit2-twitter-clone.vercel.app/)
If you have any questions about this repo, feel free to open an issue on this repo or contact me at [eewebprogramming@googlegroups.com](mailto:eewebprogramming@googlegroups.com?subject=twitter-clone%20question)

I update this repo every now and then, so make sure to pull the latest changes with `git pull` before you start working on the project. I will mostly be adding documentation and comments, so you don't have to worry about new updates breaking your code.

## Running the app

1. Clone the repo

2. Install dependencies

```bash
yarn install
```

3. Create a `.env.local` file in the root of the project and add a _valid_ Postgres URL. To get a Postgres URL, follow the instructions [here](https://ric2k1.notion.site/Free-postgresql-tutorial-f99605d5c5104acc99b9edf9ab649199?pvs=4).

This is just an example, you should replace the URL with your own.

```bash
POSTGRES_URL="postgres://postgres:postgres@localhost:5432/twitter"
```

4. Run the migrations

```bash
yarn migrate
```

4. Start the app

```bash
yarn dev
```

## Managing the database

`drizzle-kit` provides some useful commands to manage the database.

### Update database schema

Note that if your schema changes, some data might be deleted in the process. `drizzle-kit` would prompt you about destructive changes.

```bash
yarn drizzle-kit push:pg
```

### View or edit data

This command launches a web UI to view or edit data in the database.

```bash
yarn drizzle-kit studio
```

## Setup guide

1. Create a next app, and select `Yes` on all prompts

```bash
yarn create next-app
```

2. Install prettier and prettier plugins

```bash
yarn add -D prettier prettier-plugin-tailwindcss @trivago/prettier-plugin-sort-imports
```

3. Install eslint plugins, eslint is already installed by default when running `yarn create next-app`

```bash
yarn add -D eslint-config-prettier @typescript-eslint/eslint-plugin
```

4. Copy and paste the `.eslintrc.json` file and `.prettierrc.cjs` file from this repo to your project root

5. Follow the instructions [here](https://orm.drizzle.team/docs/quick-postgresql/node-postgres) to setup drizzle. If you want to use [neon](https://neon.tech/)'s serverless PostgreSQL feature, follow the instructions [here](https://orm.drizzle.team/docs/quick-postgresql/neon) (you can still use database URL to connect to neon's database like a regular PostgreSQL database).

6. Copy and paste the `drizzle.config.ts` file from this repo to your project root

7. I used `dotenv` to read environment variables in `drizzle.config.ts`, so you need to install it

```bash
yarn add -D dotenv
```

8. Refer to [this section](#what-is-shadcnui) to setup `shadcn/ui` if you want to use it

9. Install other dependencies if you run into import errors when copying and pasting code from this repo. This type of error is fairly common, the error message should tell you what dependency you need to install. Try to solve the problem by youself before reaching for help.

## Advanced Feature
I implemented the when2meet feature