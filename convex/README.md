📝 Real-Time To-Do App (Expo + Convex)

A modern, real-time To-Do List application built with Expo (React Native) and Convex.
Designed with a clean, minimal UI and optimized for speed, scalability, and developer experience.

This project demonstrates real-time data handling, clean architecture, and cross-platform mobile development.

🚀 Live Features

➕ Create new tasks instantly

✅ Toggle task completion

🗑 Delete tasks

🔄 Real-time updates powered by Convex

📱 Cross-platform support (Android, iOS, Web)

🎨 Clean, modern, user-friendly interface

🛠 Tech Stack
Frontend

Expo (React Native)

Expo Router

TypeScript

React Hooks

Backend

Convex (Serverless, real-time backend)

📂 Folder Structure
├── app/
│   ├── (tabs)/
│   │   └── index.tsx        # Todo screen
│   └── _layout.tsx          # App layout
│
├── convex/
│   ├── todos.ts             # Queries & mutations
│   └── schema.ts            # Database schema
│
├── package.json
├── tsconfig.json
└── README.md

⚙️ Setup & Installation
Clone the repository
git clone https://github.com/Flow1313/to-do-list-app.git
cd to-do-list-app

Install dependencies
npm install

Start Convex
npx convex dev

Run the app
npx expo start


a → Android

w → Web

Scan QR → Expo Go

🧠 Architecture Overview

Convex handles database, mutations, and real-time subscriptions

Frontend listens to data using useQuery

UI updates automatically without manual refresh

Business logic is cleanly separated between UI and backend

🎯 Key Takeaways

Real-time systems don’t have to be complex

Convex simplifies backend logic

Expo enables fast, scalable cross-platform apps

Clean UI significantly improves user experience

🔮 Planned Improvements

Edit todo items

Authentication & user accounts

Animations and micro-interactions

Dark / Light theme support

Offline support

👤 Author

Bello Ibrahim
Software Developer
Focused on building clean, scalable, and user-friendly applications.

📄 License

MIT License