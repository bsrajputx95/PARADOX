# Contributing to PARADOX

Thank you for your interest in contributing to PARADOX! This document provides guidelines and instructions for contributing.

## 📖 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone. We expect:

- Constructive feedback and criticism
- Empathy and respect for different viewpoints
- Focus on what's best for the community
- Graceful acceptance of constructive criticism

## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+ or pnpm 8+
- Git 2.30+

### Setup Development Environment

1. Fork the repository on GitHub

2. Clone your fork:
```bash
git clone https://github.com/your-username/paradox.git
cd paradox
```

3. Add upstream remote:
```bash
git remote add upstream https://github.com/original-org/paradox.git
```

4. Install dependencies:
```bash
npm install
```

5. Create a feature branch:
```bash
git checkout -b feature/your-feature-name
```

6. Copy environment file:
```bash
cp .env.example .env
```

## Development Workflow

### Branch Naming

Use the following prefixes:

| Prefix | Purpose |
|--------|---------|
| `feature/` | New features |
| `fix/` | Bug fixes |
| `hotfix/` | Urgent production fixes |
| `refactor/` | Code refactoring |
| `docs/` | Documentation updates |
| `test/` | Test additions/changes |
| `chore/` | Maintenance tasks |

Example: `feature/add-360-panorama-viewer`

### Running Development Server

```bash
npm run dev
```

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test -- --watch

# Run tests with coverage
npm run test:coverage
```

### Type Checking

```bash
npm run typecheck
```

### Linting

```bash
npm run lint
```

## Coding Standards

### TypeScript

- Use strict TypeScript with no `any` types
- Prefer interfaces over type aliases for object shapes
- Use explicit return types for functions
- Prefer named exports over default exports

### React Components

- Use functional components with hooks
- Use `FC` type from React for typed components
- Keep components focused and small (under 200 lines ideal)
- Use proper prop typing

Example:
```typescript
interface MyComponentProps {
  title: string;
  onAction: () => void;
  className?: string;
}

export const MyComponent: React.FC<MyComponentProps> = ({
  title,
  onAction,
  className = ''
}) => {
  // implementation
};
```

### Tailwind CSS

- Use Cosmos color palette defined in `tailwind.config.js`
- Use `glass-panel` and `glass-panel-hover` utility classes
- Use `btn-primary` and `btn-secondary` for buttons
- Keep responsive design in mind (use `md:`, `lg:` prefixes)

### File Organization

```
src/
├── components/
│   ├── ComponentName.tsx
│   └── ComponentName.test.tsx
├── context/
├── hooks/
├── services/
├── types/
├── utils/
└── test/
```

## Testing Guidelines

### Test Coverage Goals

- Aim for >80% code coverage
- All new features must include tests
- Bug fixes must include regression tests

### Writing Tests

Use Vitest and React Testing Library:

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('renders title correctly', () => {
    render(<MyComponent title="Test" onAction={() => {}} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

### Test File Naming

- Unit tests: `ComponentName.test.tsx`
- Integration tests: `ComponentName.integration.test.tsx`
- Test utilities: `test/setup.ts`

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

[optional body]

[optional footer(s)]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Code style changes (formatting) |
| `refactor` | Code refactoring |
| `test` | Adding or updating tests |
| `chore` | Maintenance tasks |

### Examples

```
feat(hologram): add gesture recognition to teacher avatar

fix(cinema): correct video playback progress bar

docs(readme): update deployment instructions

test(mockEngine): add coverage for scene generation
```

## Pull Request Process

### Before Submitting

1. Run all tests: `npm run test`
2. Run type check: `npm run typecheck`
3. Run linter: `npm run lint`
4. Ensure coverage didn't decrease
5. Update documentation if needed

### PR Description Template

```markdown
## Summary
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe testing performed

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] All tests pass
```

### Review Process

1. Maintainers will review within 48 hours
2. Address feedback promptly
3. Once approved, maintainers will merge

## Questions?

Feel free to:

- Open an issue for bugs or feature requests
- Join our community discussions
- Contact the maintainers directly

Thank you for contributing! 🎉
