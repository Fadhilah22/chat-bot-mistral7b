# Getting Started with chat-bot-mistral7b

In the project directory, you can run:
### `npm install`

Installs node_modules and all dependencies, should be light.

### `There are mode you can run, front-end server only mode, proxy only, and both`

### `1. Complete run:`

In the project directory, you should run:
### `npm run start-both`

Runs both the front-end and proxy server.

### `2. Frontend server:`

In the project directory, you should run:
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `3. Proxy server:`

In the project directory, you should run:
### `node src/proxy.js`

Runs the proxy to listen request from front end server and act as middleman.\
Listens to [http://localhost:3000](http://localhost:3001)(/api/chat).

