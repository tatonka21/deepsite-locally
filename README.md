


# DeepSite v2 🚀

> **Fork Notice:** This project is a fork of the original [DeepSite by enzostvs on Hugging Face Spaces](https://huggingface.co/spaces/enzostvs/deepsite).

> **Note:** If you want to access the previous version of DeepSite, check the `main-v1` branch on this repository.

![Banner Screenshot](./localconfig.png)

Run **DeepSite** in your own environment, without relying on external services!
Perfect for those who want to customize, integrate, or have full control over the platform.

---

## How to run DeepSite v2 locally

If you are new to local development, copy and run each command in order.  
Do **not** skip steps.

### 1. Clone the repository
```bash
git clone https://github.com/MartinsMessias/deepsite-locally.git
cd deepsite-locally
```

### 2. Confirm where the project files are on your computer
```bash
pwd
```

You should see the folder you are currently in.

Example in this environment:
`/home/runner/work/deepsite-locally/deepsite-locally`

On Windows PowerShell, you can use:
```powershell
Get-Location
```

### 3. Install dependencies
Make sure you have **Node.js** installed (recommended v18+).
```bash
npm install
```

### 4. Run in development mode
```bash
npm run dev
```

### 5. For linting, build and production
```bash
npm run lint
npm run build
npm run start
```

### 6. If something fails, use this quick troubleshooting checklist

1. **`next: not found`**
   - Run `npm install` again inside the project folder.
2. **Wrong folder**
   - Run `pwd` (or `Get-Location` on PowerShell) and confirm you are inside `deepsite-locally`.
3. **Port already in use**
   - Stop the other app using port `3000`, then run `npm run dev` again.
4. **Node version issue**
   - Check with `node -v` and use Node `18+` (Node `20` recommended).
5. **Fresh retry**
   - Delete `node_modules`, run `npm install`, then try `npm run dev` again.

---

## Available scripts

- `npm run dev` — Starts the development environment (Next.js + Turbopack)
- `npm run build` — Builds for production
- `npm run start` — Runs the server in production mode
- `npm run lint` — Runs the linter

## Main dependencies

Next.js, React 19, Mongoose, TailwindCSS, Radix UI, Lucide, Monaco Editor, React Query, Zod, Axios, Sonner, and more.

See all dependencies in [`package.json`](./package.json).

---

## Keywords
deepsite local hosting, deepsite run locally, deepsite self-hosted, how to run deepsite locally, install deepsite on your machine, deepsite local server setup, deepsite offline mode, deepsite localhost tutorial, deploy deepsite on your own server, deepsite self-install guide, how to host deepsite on localhost step-by-step, can deepsite run offline on my computer, deepsite docker installation guide, full guide to running deepsite locally without internet, deepsite self-host vs cloud hosting comparison, deepsite performance tips when running locally, requirements to run deepsite on local environment, best practices for self-hosting deepsite platform, how to speed up deepsite in a local environment, common errors when running deepsite locally and how to fix, deepsite vs other ai site builders local run comparison, top reasons to run deepsite on your own server, is deepsite open-source and local-friendly
