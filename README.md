This node server app provides an API for the expense-client front end app.

This server requires that mongo is installed and running.

To run:

```
git clone https://github.com/gopenshaw/expense-server/
cd expense-server
npm install
node server.js
```

To give a user admin priviledges:
```
mongo
use expense-server
db.users.update({"name": "<username>"}, { $set: {isAdmin: true}})
```
