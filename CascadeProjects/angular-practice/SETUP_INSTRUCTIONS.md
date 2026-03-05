# Section 0 Setup Instructions

## ✅ Completed Tasks

- [x] Created `src/environments/environment.ts`
- [x] Created `src/environments/environment.development.ts`
- [x] Updated `.gitignore` to exclude environment files

## 🚨 Required: Node.js Upgrade

Your current Node.js version is **v18.16.0**, but Angular 21 requires **v20.19+** or **v22.12+**.

### Upgrade Node.js (Choose one method):

#### Option 1: Using nvm (Recommended)
```bash
# Install nvm if you don't have it
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install Node.js v22 (LTS)
nvm install 22
nvm use 22
nvm alias default 22

# Verify installation
node --version  # Should show v22.x.x
```

#### Option 2: Using Homebrew (macOS)
```bash
brew update
brew upgrade node

# Verify installation
node --version  # Should show v20.19+ or v22.x.x
```

#### Option 3: Download from nodejs.org
Visit https://nodejs.org/ and download the LTS version (v22.x.x)

## 📦 Next: Install Angular CDK

After upgrading Node.js, run:

```bash
cd /Users/trangm/CascadeProjects/angular-practice
ng add @angular/cdk --skip-confirmation
```

This will install the Angular Component Dev Kit needed for drag-and-drop functionality.

## 🔑 Spoonacular API Setup

### Step 1: Sign Up for Spoonacular API

1. Visit: https://spoonacular.com/food-api
2. Click "Get Started" or "Sign Up"
3. Create a free account
4. Navigate to your profile/dashboard

### Step 2: Get Your API Key

1. After logging in, go to "My Console" or "API Keys"
2. Copy your API key (looks like: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`)
3. **Free tier includes**: 150 requests/day

### Step 3: Add API Key to Environment Files

Open both environment files and replace `YOUR_API_KEY_HERE` with your actual API key:

**File: `src/environments/environment.ts`**
```typescript
export const environment = {
  production: false,
  spoonacularApiKey: 'YOUR_ACTUAL_API_KEY_HERE',  // ← Replace this
  spoonacularBaseUrl: 'https://api.spoonacular.com'
};
```

**File: `src/environments/environment.development.ts`**
```typescript
export const environment = {
  production: false,
  spoonacularApiKey: 'YOUR_ACTUAL_API_KEY_HERE',  // ← Replace this
  spoonacularBaseUrl: 'https://api.spoonacular.com'
};
```

### Step 4: Verify Setup

Test that your API key works by making a test request:

```bash
# Replace YOUR_API_KEY with your actual key
curl "https://api.spoonacular.com/recipes/random?apiKey=YOUR_API_KEY&number=1"
```

You should get a JSON response with recipe data.

## ⚠️ Security Notes

- **Never commit your API key to Git** - The environment files are already in `.gitignore`
- **Don't share your API key publicly**
- **Monitor your usage** at https://spoonacular.com/food-api/console to avoid hitting rate limits

## 🎯 Section 0 Completion Checklist

- [ ] Node.js upgraded to v20.19+ or v22.12+
- [ ] Angular CDK installed (`ng add @angular/cdk`)
- [ ] Spoonacular account created
- [ ] API key obtained
- [ ] API key added to both environment files
- [ ] API key tested with curl command
- [x] Environment files created
- [x] `.gitignore` updated

## 🚀 Ready for Section 1?

Once all checklist items are complete, you're ready to move on to **Section 1: Data Models & Types**!

## 📞 Troubleshooting

### Node.js Upgrade Issues
- If `nvm` command not found, restart your terminal after installation
- Check your shell config file (`.zshrc` or `.bashrc`) for nvm initialization

### Angular CDK Installation Issues
- Make sure you're in the project directory
- Try `npm install @angular/cdk` if `ng add` fails
- Clear npm cache: `npm cache clean --force`

### API Key Issues
- Verify you're logged into Spoonacular
- Check for typos when copying the key
- Ensure no extra spaces before/after the key
- Free tier limit is 150 requests/day - check your usage

### Still Having Issues?
- Check Angular version: `ng version`
- Check Node version: `node --version`
- Check npm version: `npm --version`
- Verify you're in the correct directory: `pwd`
