# MTG Pau Website - Development Commands

# Default recipe to display help
default:
    @just --list

# Install dependencies
install:
    cd frontend && npm install

# Run development server
dev:
    cd frontend && npm run dev

# Build for production
build:
    cd frontend && npm run build

# Preview production build locally
preview:
    cd frontend && npm run preview

# Run linter
lint:
    cd frontend && npm run lint

# Format code
format:
    cd frontend && npm run format

# Type check
type-check:
    cd frontend && npm run type-check

# Clean build artifacts
clean:
    rm -rf frontend/dist frontend/node_modules

# Full check (lint, format, type-check, build)
check: lint format type-check build
    @echo "All checks passed!"

# Deploy to GitHub Pages (use GitHub Actions instead)
deploy-info:
    @echo "This project uses GitHub Actions for deployment."
    @echo "Push to main branch to trigger automatic deployment to GitHub Pages."
