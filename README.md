# Care Stock Inventory App

A TypeScript + React inventory management application for tracking stock levels.

## Features

- Add inventory items with SKU, quantity, and low-stock threshold.
- Increment/decrement quantity directly from the table.
- Highlight low-stock rows where quantity is at or below threshold.
- Remove items from inventory.

## Project Structure

- `package.json` — Scripts and dependencies.
- `src/App.tsx` — Main inventory management UI and logic.
- `src/main.tsx` — React entry point.
- `src/styles.css` — Styling.

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Build for production:

   ```bash
   npm run build
   ```
