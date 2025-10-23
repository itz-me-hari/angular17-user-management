## Setup

1. Extract the project
2. Install dependencies:
   npm install
   if failed use npm install --legacy-peer-deps
3. Start json-server:
   npm run server
   (http://localhost:3000/users)
4. Start Angular dev server:
   npm start
   (http://localhost:4200)

Notes:
- Ensure environment
  Angular CLI: 17.3.17
  Node: 18.18.2
  Package Manager: npm 9.8.1
- NgRx is used only for user CRUD (load, add, update, delete)

- Credentials
username: admin
password: admin123