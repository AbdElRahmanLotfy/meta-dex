# 🛠️ Real Estate DEX Platform - Local Setup Guide

Welcome! This document will guide you through setting up the DEX platform locally for development and testing.

---

## 📦 Prerequisites

Ensure the following are installed on your system:

- [Node.js](https://nodejs.org/) v18+  
- [npm](https://www.npmjs.com/) (Node.js package manager)
- [Git](https://git-scm.com/)

**⚠️ Important:** This project is configured to work specifically with npm. Please use npm for package management and avoid using yarn, pnpm, or bun as they may cause dependency conflicts.  

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/[your-repo-name]/meta-dex.git
cd meta-dex
```

### 2. Install Dependencies

```bash
npm install
```

## 📋 Package Management

This project is specifically configured for npm and includes dependency overrides to ensure compatibility. 

**✅ Use:**
- `npm install` - Install dependencies
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run client` - Start React development server only
- `npm run server` - Start Express server only

**❌ Avoid:**
- `yarn install` - May cause dependency conflicts
- `pnpm install` - Not tested with this project
- `bun install` - Not compatible with current setup

### 3. Start the project

```bash
npm start
```