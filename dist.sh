nx run-many -t build -p angular-to-do react-to-do --skip-nx-cache
NX_VITE_BASE_URL=/angular-react-to-do/react-to-do/ pnpm nx build react-to-do --skip-nx-cache
pnpm nx build angular-to-do --base-href=/angular-react-to-do/angular-to-do/ --skip-nx-cache
mv dist/* .
git checkout dist
git add -A && git commit -m "dist for $(date '+%B %-d, %Y %H:%M:%S')"
