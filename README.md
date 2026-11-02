# Webpack Static Site Starter Kit

A starter for static sites: HTML, SCSS and JavaScript, bundled with webpack 5.

New to webpack? Read [how-to-start.md](how-to-start.md) first.

## Requirements

- **Node.js, the current LTS version** (npm comes with it). The minimum is 24.11.
- Git

### Installing Node.js

**Windows** — choose one:

- Download the **LTS** installer from [nodejs.org](https://nodejs.org/en/download) and run it.
- Or, in PowerShell: `winget install OpenJS.NodeJS.LTS`
- Or, if you use [nvm-windows](https://github.com/coreybutler/nvm-windows/releases), give it the exact version (nvm-windows does not read `.nvmrc`):

  ```powershell
  nvm install 26.12.1
  nvm use 26.12.1
  ```

  Pick the latest LTS version from [nodejs.org](https://nodejs.org/en/about/previous-releases).

**macOS / Linux** — with [nvm](https://github.com/nvm-sh/nvm), run in the project folder (the version is taken from `.nvmrc`):

```bash
nvm install
nvm use
```

Close and reopen the terminal (and VS Code) after installing, then check the version. It must be **24.11.0 or newer**:

```bash
node -v
```

---

## Usage

1. Clone the repository:

   ```bash
   git clone https://github.com/Habsida-Projects/webpack-static-template
   ```

   **Windows:** keep the project in a short path, such as `C:\dev\my-project`. In very deeply nested folders, paths inside `node_modules` can exceed Windows' 260-character limit, and the build fails with confusing errors like `Package import specifier "#..." is not defined`.

2. Open a terminal in the `webpack-static-template` folder.

3. Delete the `.git` folder in File Explorer / Finder, or with a command:

   ```bash
   # PowerShell
   Remove-Item -Recurse -Force .git

   # macOS / Linux / Git Bash
   rm -rf .git
   ```

   The old `.git` folder is linked to the template repository. You will create a new one linked to your own repository.

4. Install the dependencies:

   ```bash
   npm install
   ```

5. Start the dev server. The site opens at http://localhost:9000 and reloads when you save a file:

   ```bash
   npm start
   ```

## Scripts

| Command          | What it does                                          |
| ---------------- | ----------------------------------------------------- |
| `npm start`      | Dev server at http://localhost:9000 with live reload  |
| `npm run build`  | Production build into `dist/` (minified)              |
| `npm run dev`    | Development build into `dist/` (not minified)         |
| `npm run watch`  | Development build that rebuilds `dist/` on every save |
| `npm run deploy` | Build and publish `dist/` to GitHub Pages             |
| `npm run lint`   | Check JavaScript with ESLint                          |
| `npm run format` | Format all files with Prettier                        |

---

## Creating Your Own GitHub Repository

Create an empty repository on github.com (without a README), then in the project folder:

```bash
git init -b main
git add .
git commit -m "initial commit"
```

_If `git init -b main` fails, your Git version is outdated; update Git._

Link it to your repository. Replace _USER_ (your GitHub username) and _REPO_ (your repository name):

```bash
git remote add origin https://github.com/USER/REPO.git
git remote -v
git push -u origin main
```

---

## Deploying to GitHub Pages

Your project must be pushed to GitHub first (see above).

1. Build and publish:

   ```bash
   npm run deploy
   ```

   This builds the project and pushes the contents of `dist/` to a branch called `gh-pages`.

2. On github.com open your repository → **Settings** → **Pages**. Under **Build and deployment** choose **Deploy from a branch**, branch **`gh-pages`**, folder **`/ (root)`**, and save.

3. After a minute the site is available at `https://USER.github.io/REPO/`.

Run `npm run deploy` again whenever you want to publish changes.

Things to know:

- `dist/` is in `.gitignore`. Don't commit it to `main`; it only lives on the `gh-pages` branch.
- The site lives in a subfolder (`/REPO/`), so **always use relative paths**: `./img/logo.svg`, not `/img/logo.svg`. A path starting with `/` works on localhost but breaks on GitHub Pages.

---

Further reading: [Webpack 5 guide for beginners](https://dev.to/anitaparmar26/webpack-5-guide-for-beginners-314c).
