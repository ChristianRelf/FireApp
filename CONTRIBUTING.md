# Contributing to FireApp

Thank you for your interest in contributing to FireApp! This document provides guidelines and information for contributors.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/fireapp.git
   cd fireapp
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a branch** for your feature:
   ```bash
   git checkout -b feature/amazing-feature
   ```

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Running the Project
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run type checking
npm run type-check

# Run linting
npm run lint
```

The project runs in demo mode by default, so you can start developing immediately without Firebase configuration.

## 📝 Code Guidelines

### TypeScript
- Use TypeScript for all new code
- Maintain strict type safety
- Add proper type definitions for new features

### Code Style
- Follow the existing code style
- Use ESLint and Prettier configurations
- Write meaningful variable and function names
- Add comments for complex logic

### Components
- Use functional components with hooks
- Follow the existing component structure
- Keep components focused and reusable
- Use proper prop types

### File Organization
- Keep files under 300 lines when possible
- Use clear, descriptive file names
- Follow the existing folder structure
- Group related functionality together

## 🧪 Testing

Currently, the project doesn't have automated tests, but we welcome contributions to add:
- Unit tests for utility functions
- Component tests for UI components
- Integration tests for Firebase operations
- E2E tests for critical user flows

## 📋 Pull Request Process

1. **Update documentation** if you're changing functionality
2. **Add or update tests** for new features
3. **Ensure the build passes**:
   ```bash
   npm run build
   npm run type-check
   npm run lint
   ```
4. **Write a clear PR description** explaining:
   - What changes you made
   - Why you made them
   - How to test the changes

### PR Title Format
Use conventional commit format:
- `feat: add new authentication provider`
- `fix: resolve dashboard loading issue`
- `docs: update installation instructions`
- `refactor: improve component structure`

## 🐛 Bug Reports

When reporting bugs, please include:
- **Clear description** of the issue
- **Steps to reproduce** the problem
- **Expected vs actual behavior**
- **Environment details** (OS, browser, Node version)
- **Screenshots** if applicable

Use the bug report template when creating issues.

## 💡 Feature Requests

For new features:
- **Check existing issues** to avoid duplicates
- **Describe the use case** and problem it solves
- **Provide examples** of how it would work
- **Consider the scope** and complexity

## 🎯 Areas for Contribution

We especially welcome contributions in these areas:

### High Priority
- **Testing framework** setup and initial tests
- **Documentation improvements** and examples
- **Performance optimizations**
- **Accessibility improvements**

### Medium Priority
- **Additional authentication providers**
- **More UI components and patterns**
- **Database schema examples**
- **Deployment guides for different platforms**

### Low Priority
- **Additional styling themes**
- **Developer tools and utilities**
- **Example applications**

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Community

- Be respectful and inclusive
- Help others learn and grow
- Share knowledge and best practices
- Provide constructive feedback

## 📄 License

By contributing to FireApp, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to FireApp! 🚀