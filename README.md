# Getting Started with chat-bot-mistral7b

In the project directory, you can run:
### `npm install`

Installs node_modules and all dependencies, should be light.

### `Now you will have to prepare two terminal to run 2 server, the frontend (react) and the proxy:`

### `1. Frontend server:`

In the project directory, you should run:
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `2. Proxy server:`

In the project directory, you should run:
### `node src/proxy.js`

Runs the proxy to listen request from front end server and act as middleman.\
Listens to [http://localhost:3000](http://localhost:3001)(/api/chat).

