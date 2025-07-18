const { connectDB } = require("./src/database/db");
const { app } = require("./src/app.js");
const port = process.env.PORT;
connectDB()
  .then(() => {
    app.listen(port || 5000, () => {
      console.log(
        `Example app listening on port ${port} url http://localhost:${port}`
      );
    });
  })
  .catch((err) => {
    console.log("Error from index.js while connecting the app.js port, ", err);
  });
