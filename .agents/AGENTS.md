# Project Rules - brandfocal/empowaworx

## Deployment & Version Control
- Whenever code changes are made, always provide the user with BOTH:
  1. The GitHub commands to commit and push changes:
     ```powershell
     git add .
     git commit -m "commit message"
     git push
     ```
  2. The direct Vercel CLI command to deploy to production instantly:
     ```powershell
     npx vercel --prod
     ```
