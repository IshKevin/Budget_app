# WalletPro

WalletPro is a powerful financial management application designed to help users track their expenses and manage their financial data with ease. Built using modern technologies, WalletPro is secure, responsive, and user-friendly.

---

## Project Stack

- **Framework**: [Next.js](https://nextjs.org/)  
- **Language**: TypeScript  
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)  
- **UI Components**: [ShadCN](https://shadcn.dev/)  
- **Authentication**: [Kinde](https://kinde.com/)  
- **Database**: [Neon](https://neon.tech/) with [Drizzle ORM](https://orm.drizzle.team/)

---

## Hosted Version

You can try the live version of the project here: [WalletPro on Vercel](https://walletpro.vercel.app/)

To get started with the hosted version:
1. Visit the link above.
2. Sign up for a new account using the provided authentication system.

---

## Running WalletPro Locally

Follow the steps below to set up and run WalletPro on your local environment:

### 1. Clone the Repository

```bash
git clone https://github.com/IshKevin/Budget_app.git
cd walletpro
```

### 2. Install Dependencies

Install all required packages using npm:

```bash
npm install
```

### 3. Set Up Kinde Authentication

1. Refer to the [Kinde Documentation](https://docs.kinde.com/) to create a project on Kinde.
2. Obtain your Kinde project credentials.
3. Add the credentials to the environment variables in the `.env` file:
   ```env
   KIND_AUTH_DOMAIN=<your-kinde-domain>
   KIND_AUTH_CLIENT_ID=<your-client-id>
   KIND_AUTH_CLIENT_SECRET=<your-client-secret>
   ```

### 4. Set Up Neon Database

1. Visit [Neon](https://neon.tech/) and create a new database project.
2. Follow the steps in [Neon Documentation](https://neon.tech/docs/introduction) to connect your database to WalletPro.
3. Add your database connection details to the `.env` file:
   ```env
   DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<database>
   ```

### 5. Generate and Migrate Database

Run the following commands to set up the database:

```bash
npm run db:generate
npm run db:migrate
```

- **`db:generate`**: Generates the database schema using Drizzle ORM.
- **`db:migrate`**: Applies the migrations to your Neon database.

### 6. Start the Development Server

Run the development server:

```bash
npm run dev
```

Access the project at: (<http://localhost:3000/home>)

---

## Features

- **Authentication**: Secure user authentication via Kinde.
- **Expense Tracking**: Manage and track your financial data.
- **Responsive Design**: Fully responsive UI built with Tailwind CSS.
- **Modern Database**: Leveraging Neon for reliable database management with Drizzle ORM for migrations and schema generation.

---

## Application Pages and Their Functionalities

### 1. Dashboard Page
- Provides an overview of financial statistics in graphical format.
- Displays detailed information about money flow and budgets.

### 2. Budget Page
- Used to input and manage budget data.
- Provides detailed insights into budgeting.

### 3. Transaction Page
- Displays a list of all transactions.
- Provides detailed information for each transaction.

### 4. Report Page
- Generates comprehensive reports about financial data.
- Details spending patterns and financial summaries.

### 5. Category Page
- Organizes transactions into categories.
- Helps in better classification and tracking of financial activities.

### 6. Account Page
- Allows users to create and manage accounts.
- Provides detailed account information and data management.

---

## Environment Variables

Ensure the following variables are set in your `.env` file:

```env
# Kinde Authentication
KIND_AUTH_DOMAIN=<your-kinde-domain>
KIND_AUTH_CLIENT_ID=<your-client-id>
KIND_AUTH_CLIENT_SECRET=<your-client-secret>

# Neon Database
DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<database>
```

---

## Scripts

Below are the key npm scripts available in the project:

- **Install Packages**: `npm install`
- **Run Development Server**: `npm run dev`
- **Generate Database Schema**: `npm run db:generate`
- **Run Database Migrations**: `npm run db:migrate`

---

## Additional Resources

- [Kinde Documentation](https://docs.kinde.com/)
- [Neon Documentation](https://neon.tech/docs/introduction)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)

---

## License

This project is licensed under the MIT License. Feel free to use, modify, and distribute it as needed.
