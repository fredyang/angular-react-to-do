nx run-many -t build -p angular-to-do react-to-do --skip-nx-cache
mv dist/* ..
git checkout dist
git add -A && git commit -m "dist for $(date '+%B %-d, %Y %H:%M:%S')"
