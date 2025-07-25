import app from "./app.js";
import { env } from "./config/env.js";

app.listen(env.port, () => {
  console.log(`Server running on port http://localhost:${env.port}`);
});

//Create async function to start server with db, redis, notification worker, port and error catcher