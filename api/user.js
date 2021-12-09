import app from "../app.js";
import route from "../routes/user.js";

app.use("/api/", route);

export default app;
