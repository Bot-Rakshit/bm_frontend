# BMSamay.com Frontend

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Dan5py/react-vite-ui/blob/main/LICENSE)

This is Samay Raina's official community website for chess enthusiasts.

## 📑 Table of Contents

- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Project Structure](#-project-structure)
- [Contribution](#-contribution)
- [License](#-license)

## 🎉 Features

- **Community Dashboard** - An interactive dashboard which shows the chess community stats and leaderboard.
- **Chess News** - Chess news from all over the world powered by [ChessBase India](https://chessbase.in/).
- **Connect Your Chess.com Profile** - Connect your chess.com profile to see where you stand in the community leaderboard.
- **BM Points** - A point based scoring for correct guesses of samay's chess games.
- **Integrations** - Coming soon.
- **Streamers** - Coming soon.


## ⚙️ Prerequisites

Make sure you have the following installed on your development machine:

- Node.js (version 16 or above)
- pnpm (package manager) or npm

## 🚀 Getting Started

Follow these steps to get started with the BMSamay.com Frontend:

1. Clone the repository:

   ```bash
   git clone https://github.com/Bot-Rakshit/bm_frontend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd bm_frontend
   ```

3. Install the dependencies:

   ```bash
   pnpm install
   ```
   or 

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   pnpm dev
   ```
   ```bash
   npm run dev
   ```

## 📜 Available Scripts

- pnpm dev - Starts the development server.
- pnpm build - Builds the production-ready code.
- pnpm lint - Runs ESLint to analyze and lint the code.
- pnpm preview - Starts the Vite development server in preview mode.

## 📂 Project Structure

The project structure follows a standard React application layout:

```python
bm_frontend/
  ├── node_modules/      # Project dependencies
  ├── public/            # Public assets
  ├── src/               # Application source code
  │   ├── components/    # React components
  │   │   └── ui/        # shadc/ui components
  │   ├── styles/        # CSS stylesheets
  │   ├── lib/           # Utility functions
  │   ├── App.tsx        # Application entry point
  │   └── index.tsx      # Main rendering file
  ├── .eslintrc.json     # ESLint configuration
  ├── index.html         # HTML entry point
  ├── postcss.config.js  # PostCSS configuration
  ├── tailwind.config.js # Tailwind CSS configuration
  ├── tsconfig.json      # TypeScript configuration
  └── vite.config.ts     # Vite configuration
```

## 🤝 Contribution

We welcome contributions to the BMSamay.com Frontend project! To contribute:

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes and commit them (git commit -m 'Add some feature').
4. Push to the branch (git push origin feature-branch).
5. Open a pull request.

Please read our [Contributing Guidelines](Contributing.md) for more details.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](https://choosealicense.com/licenses/mit/) file for details.
