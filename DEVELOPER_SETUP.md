# Developer Setup Guide

## 🚀 Quick Start for New Developers

This guide will help new team members get up and running with the Coder's Club Attendance Management System.

---

## 📋 Prerequisites Checklist

Before starting, ensure you have the following installed:

- [ ] **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- [ ] **Git** - [Download here](https://git-scm.com/)
- [ ] **VS Code** (recommended) - [Download here](https://code.visualstudio.com/)
- [ ] **Browser Dev Tools** - Chrome or Firefox Developer Edition

### Check Your Installation
Run these commands to verify your setup:

```bash
node --version    # Should show v18.x.x or higher
npm --version     # Should show 8.x.x or higher
git --version     # Should show git version 2.x.x
```

---

## 🛠 Environment Setup

### 1. Clone the Repository
```bash
# Replace with your actual repository URL
git clone https://github.com/your-org/attendance-management-cc.git
cd attendance_management_cc
```

### 2. Install Dependencies
```bash
# Install all project dependencies
npm install --legacy-peer-deps

# Why --legacy-peer-deps?
# Our project uses some packages with peer dependency conflicts
# This flag ensures compatibility across all packages
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```bash
# Copy the example file
cp .env.example .env.local
```

Add your environment variables:

```env
# Clerk Authentication - Get from https://clerk.com/
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_secret_here

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Database - Use local SQLite for development
DATABASE_URL="file:./dev.db"

# Optional: For production deployment
# DATABASE_URL="postgresql://username:password@localhost:5432/attendance_db"
```

### 4. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Create and populate database
npx prisma db push

# (Optional) Open database browser
npx prisma studio
```

### 5. Start Development Server
```bash
npm run dev
```

Your application should now be running at `http://localhost:3000`

---

## 🧑‍💻 Development Environment Setup

### VS Code Extensions (Recommended)

Install these extensions for the best development experience:

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",           // Tailwind CSS IntelliSense
    "esbenp.prettier-vscode",              // Code formatting
    "ms-vscode.vscode-typescript-next",    // TypeScript support
    "Prisma.prisma",                       // Prisma schema support
    "ms-vscode.vscode-json",               // JSON support
    "christian-kohler.path-intellisense",  // Path autocompletion
    "formulahendry.auto-rename-tag",       // Auto rename paired HTML tags
    "ms-vscode.vscode-eslint"              // ESLint integration
  ]
}
```

### VS Code Settings

Create a `.vscode/settings.json` file:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.includeLanguages": {
    "javascript": "javascript",
    "javascriptreact": "javascriptreact"
  },
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```

### Git Configuration

Set up your Git identity:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@company.com"
```

Configure Git hooks for better commit messages:

```bash
# Install commitizen for better commit messages
npm install -g commitizen
npm install -g cz-conventional-changelog

# Set as default adapter
echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
```

---

## 🔧 Development Workflow

### Daily Development Process

1. **Start your day**
   ```bash
   git checkout main
   git pull origin main
   npm install  # In case new dependencies were added
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Make your changes** using the patterns described in the main documentation

5. **Test your changes**
   ```bash
   # Run linting
   npm run lint
   
   # Build to check for errors
   npm run build
   ```

6. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   # Or use commitizen: npm run commit
   ```

7. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

### Commit Message Convention

Use conventional commits for better project history:

```
feat: add new attendance export functionality
fix: resolve mobile navigation issue
docs: update API documentation
style: improve button hover effects
refactor: simplify student data fetching
test: add tests for attendance grid
chore: update dependencies
```

---

## 🧪 Testing Your Changes

### Manual Testing Checklist

Before submitting any PR, test these core features:

#### 🏠 Home Page
- [ ] Page loads without errors
- [ ] Responsive design works on mobile
- [ ] Neon circles animate properly
- [ ] Login button opens Clerk modal
- [ ] Navigation to dashboard works when signed in

#### 🔐 Authentication
- [ ] Sign in flow works correctly
- [ ] User button appears in navigation
- [ ] Protected routes redirect when not authenticated
- [ ] Sign out redirects to home page

#### 📊 Dashboard
- [ ] Dashboard loads with analytics
- [ ] Charts render correctly
- [ ] Status cards show proper data
- [ ] Mobile sidebar navigation works

#### 👥 Students Management
- [ ] Student list displays
- [ ] Add new student form works
- [ ] Edit student functionality
- [ ] Delete student with confirmation
- [ ] Search and filtering works

#### ✅ Attendance Tracking
- [ ] Attendance grid loads students
- [ ] Date selection works
- [ ] Bulk attendance marking
- [ ] Save functionality works
- [ ] Data persists after page reload

### Browser Testing

Test on these browsers:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (if on Mac)
- [ ] Edge (latest)

### Responsive Testing

Test on these breakpoints:
- [ ] Mobile (375px)
- [ ] Tablet (768px)
- [ ] Desktop (1024px)
- [ ] Large desktop (1440px)

---

## 🐛 Common Issues & Solutions

### Issue: npm install fails
```bash
# Solution: Clear cache and use legacy peer deps
npm cache clean --force
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Issue: Prisma client errors
```bash
# Solution: Regenerate Prisma client
rm -rf node_modules/.prisma
npx prisma generate
npm run dev
```

### Issue: Port already in use
```bash
# Solution: Kill process or use different port
npx kill-port 3000
# Or start on different port
npm run dev -- -p 3001
```

### Issue: Clerk authentication not working
1. Check your `.env.local` file has correct keys
2. Verify keys in Clerk dashboard
3. Ensure you're using the correct environment (development/production)

### Issue: Build errors with Radix UI
```bash
# Solution: Install missing dependencies
npm install @radix-ui/react-tooltip @radix-ui/react-dialog --legacy-peer-deps
```

### Issue: Styles not applying
1. Check Tailwind CSS is compiled
2. Restart development server
3. Clear browser cache
4. Verify class names are correct

---

## 📚 Learning Resources

### Required Reading
1. **Main Documentation**: `PROJECT_DOCUMENTATION.md`
2. **Technical Specs**: `TECHNICAL_SPECS.md`
3. **Responsive Design**: `RESPONSIVE_DESIGN_SUMMARY.md`

### Technology Documentation
- [Next.js App Router](https://nextjs.org/docs/app)
- [React 19 Features](https://react.dev/blog/2024/04/25/react-19)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Clerk Authentication](https://clerk.com/docs/nextjs)
- [Prisma ORM](https://www.prisma.io/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)

### Recommended Courses
- Next.js fundamentals
- React hooks and patterns
- Tailwind CSS mastery
- Modern authentication patterns

---

## 🎯 First Tasks for New Developers

### Beginner Tasks (1-2 days)
1. **Environment Setup**: Complete this setup guide
2. **Code Exploration**: Browse through the codebase structure
3. **UI Tweaks**: Make small styling improvements
4. **Documentation**: Fix typos or add clarifications

### Intermediate Tasks (3-5 days)
1. **Bug Fixes**: Resolve issues from the GitHub issues list
2. **Component Enhancement**: Improve existing components
3. **Responsive Fixes**: Address mobile layout issues
4. **Performance**: Optimize loading states

### Advanced Tasks (1+ weeks)
1. **New Features**: Implement new attendance features
2. **API Extensions**: Add new endpoints
3. **Testing**: Set up testing framework
4. **Optimization**: Improve performance and bundle size

---

## 👥 Team Communication

### Daily Standup Format
- **Yesterday**: What did you work on?
- **Today**: What will you work on?
- **Blockers**: Any issues preventing progress?

### Code Review Guidelines
- Test the changes locally
- Check responsive design
- Verify accessibility
- Review performance impact
- Ensure code follows project patterns

### Questions & Help
1. **Check documentation first** (this guide and main docs)
2. **Search existing issues** in project repository
3. **Ask in team chat** for quick questions
4. **Schedule pairing session** for complex issues

---

## 🔄 Staying Updated

### Daily Tasks
```bash
# Pull latest changes
git checkout main
git pull origin main

# Update dependencies (if needed)
npm install

# Start fresh development server
npm run dev
```

### Weekly Tasks
- Review new issues and PRs
- Update local documentation if you found something unclear
- Clean up unused branches: `git branch -d feature/old-branch`

### Monthly Tasks
- Update dependencies: `npm audit && npm update`
- Review and update documentation
- Clean up development database if needed

---

## ✅ Setup Verification

After completing this setup, you should be able to:

- [ ] Clone and run the project locally
- [ ] See the home page with animated background
- [ ] Sign in using Clerk authentication
- [ ] Navigate to the dashboard
- [ ] View students and attendance pages
- [ ] Make a small change and see it reflected
- [ ] Create a feature branch and push changes

If any of these don't work, refer to the troubleshooting section or ask for help!

---

## 📞 Getting Help

### Resources in Order of Preference
1. **This documentation** and related docs
2. **Project README** and code comments
3. **Team chat/Slack** for quick questions
4. **GitHub Issues** for bugs or feature requests
5. **Pairing session** with senior developer
6. **Team lead** for architectural decisions

### When Asking for Help
Include this information:
- What you're trying to do
- What you expected to happen
- What actually happened
- Steps to reproduce the issue
- Your environment (OS, Node version, etc.)
- Any error messages (full stack trace)

---

**Welcome to the team! 🎉**

*This setup guide will be updated as the project evolves. If you find anything unclear or outdated, please update it for future team members.*
