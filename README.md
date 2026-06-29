# Ayaan Cafe Website

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

A modern and comprehensive web application for Ayaan Cafe, designed to enhance customer experience through an intuitive interface, dynamic content, and robust online services. Built with Next.js 15 and TypeScript, this platform offers everything from browsing the menu to placing online orders and reserving tables.

## ✨ Features

*   **Home Page:** Engaging landing page showcasing the cafe's ambiance and highlights.
*   **Dynamic Menu Display:** Browse the cafe's offerings with categories, descriptions, and prices.
*   **About Us Page:** Share the cafe's story, values, and team.
*   **Contact & Location Page:** Easy access to contact information, opening hours, and an interactive map.
*   **Online Ordering System (Pickup/Delivery):** Seamless process for customers to place orders for pickup or delivery.
*   **Online Table Reservation System:** Conveniently book a table in advance.
*   **Blog/News Section:** Keep customers updated with the latest news, events, and culinary insights.

## 🚀 Tech Stack

*   **Framework:** Next.js 15 (React Framework)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS (or similar, to be implemented)
*   **Database:** PostgreSQL
*   **ORM:** Prisma
*   **Authentication:** NextAuth.js (or similar, to be implemented)

## 📦 Database Schema

The application leverages a robust PostgreSQL database managed by Prisma, with the following core models:

```prisma
// User model for authentication, orders, and reservations
model User {
  id             Int             @id @default(autoincrement())
  name           String
  email          String          @unique
  password       String? // Hashed password for local auth
  image          String? // Profile image URL
  emailVerified  DateTime?
  createdAt      DateTime        @default(now())
  updatedAt      DateTime        @updatedAt
  orders         Order[]
  reservations   TableReservation[]
  posts          Post[] // If users can author blog posts
  comments       Comment[]
}

// Menu Item model
model MenuItem {
  id             Int        @id @default(autoincrement())
  name           String     @unique
  description    String?
  price          Decimal    @db.Decimal(10, 2)
  imageUrl       String?
  isAvailable    Boolean    @default(true)
  menuCategoryId Int
  category       MenuCategory @relation(fields: [menuCategoryId], references: [id])
  orderItems     OrderItem[]
  createdAt      DateTime   @default(now())
  updatedAt      DateTime   @updatedAt
}

// Menu Category model for organizing menu items
model MenuCategory {
  id        Int        @id @default(autoincrement())
  name      String     @unique
  slug      String     @unique
  menuItems MenuItem[]
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
}

// Order model for online ordering system
model Order {
  id              Int         @id @default(autoincrement())
  userId          Int
  user            User        @relation(fields: [userId], references: [id])
  status          String      @default("pending") // e.g., "pending", "confirmed", "preparing", "ready", "delivered", "picked_up", "cancelled"
  orderType       String      // "pickup" or "delivery"
  totalPrice      Decimal     @db.Decimal(10, 2)
  pickupTime      DateTime? // For pickup orders
  deliveryAddress String?   // For delivery orders
  deliveryFee     Decimal?    @db.Decimal(10, 2)
  notes           String?
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
  orderItems      OrderItem[]
}

// Order Item model for details within an order
model OrderItem {
  id         Int       @id @default(autoincrement())
  orderId    Int
  order      Order     @relation(fields: [orderId], references: [id])
  menuItemId Int
  menuItem   MenuItem  @relation(fields: [menuItemId], references: [id])
  quantity   Int
  price      Decimal   @db.Decimal(10, 2) // Price at the time of order
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @updatedAt
}

// Table Reservation model
model TableReservation {
  id          Int      @id @default(autoincrement())
  userId      Int
  user        User     @relation(fields: [userId], references: [id])
  date        DateTime @db.Date
  time        DateTime @db.Time(3)
  guests      Int
  status      String   @default("pending") // e.g., "pending", "confirmed", "cancelled", "completed"
  notes       String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// Contact Message model for the contact form
model ContactMessage {
  id        Int      @id @default(autoincrement())
  name      String
  email     String
  subject   String?
  message   String
  createdAt DateTime @default(now())
}

// Blog Post model
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  slug      String   @unique
  content   String
  imageUrl  String?
  published Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id])
  categoryId Int
  category  Category @relation(fields: [categoryId], references: [id])
  comments  Comment[]
}

// Blog Category model
model Category {
  id    Int    @id @default(autoincrement())
  name  String @unique
  slug  String @unique
  posts Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// Blog Comment model
model Comment {
  id        Int      @id @default(autoincrement())
  content   String
  createdAt DateTime @default(now())
  postId    Int
  post      Post     @relation(fields: [postId], references: [id])
  authorId  Int? // Optional, if anonymous comments are allowed
  author    User?    @relation(fields: [authorId], references: [id])
  authorName String? // If not logged in, or for display
}
```

## 🛠️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

*   Node.js (v18.x or higher)
*   pnpm (recommended package manager) or npm/yarn
*   PostgreSQL database server

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/ayaan-cafe-website.git
    cd ayaan-cafe-website
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory based on `.env.example` (if provided) or the following:
    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/ayaancafe?schema=public"
    NEXTAUTH_process.env.SECRET_REDACTED
    NEXTAUTH_URL="http://localhost:3000"
    # Add any other environment variables as needed (e.g., API keys)
    ```
    *Replace `user`, `password`, and `ayaancafe` with your PostgreSQL credentials and database name.*
    *Generate a strong secret for `NEXTAUTH_SECRET`.*

4.  **Database Setup:**
    *   Ensure your PostgreSQL server is running.
    *   Run Prisma migrations to create the database schema:
        ```bash
        pnpm prisma migrate dev --name init
        ```
    *   (Optional) Seed the database with initial data (if `prisma/seed.ts` is implemented):
        ```bash
        pnpm prisma db seed
        ```

### Running the Development Server

To start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

To build the application for production:

```bash
pnpm build
```

To start the production server:

```bash
pnpm start
```

## 🌐 API Endpoints

The application exposes several API endpoints for data interaction:

*   **`GET /api/posts`**: Fetches a list of all blog posts.
*   **`GET /api/posts/{slug}`**: Fetches a single blog post by its unique slug.
*   **`POST /api/posts`**: Creates a new blog post (requires authentication/authorization).
*   *(More endpoints for menu, orders, reservations, etc., to be implemented)*

## 📂 Project Structure

```
ayaan-cafe-website/
├── prisma/                 # Prisma schema and migrations
├── public/                 # Static assets
├── src/
│   ├── app/                # Next.js App Router pages, layouts, and API routes
│   │   ├── api/            # API routes (e.g., /api/posts)
│   │   ├── (auth)/         # Authentication related pages (e.g., login, signup)
│   │   ├── about/          # About Us page
│   │   ├── blog/           # Blog section pages (e.g., /blog, /blog/[slug])
│   │   ├── contact/        # Contact & Location page
│   │   ├── menu/           # Dynamic Menu display
│   │   ├── order/          # Online Ordering system
│   │   ├── reservations/   # Online Table Reservation system
│   │   └── page.tsx        # Home page
│   ├── components/         # Reusable React components
│   ├── lib/                # Utility functions, database client, auth config
│   ├── styles/             # Global styles (e.g., Tailwind CSS base)
│   └── types/              # TypeScript type definitions
├── .env.example            # Example environment variables
├── next.config.ts          # Next.js configuration
├── package.json            # Project dependencies and scripts
├── pnpm-lock.yaml          # pnpm lock file
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project README
```

## ✅ Progress

The following core files and configurations have been set up:

*   `package.json`
*   `tsconfig.json`
*   `next.config.ts`
*   `prisma/schema.prisma`
*   `src/lib/db.ts`
*   `src/lib/auth.ts`
*   `src/types/index.ts`
*   `src/app/api/posts/route.ts`
*   `src/app/api/posts/[slug]/route.ts`

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please feel free to open an issue or submit a pull request.

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
