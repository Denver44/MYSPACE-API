import app from "../app.js";
import route from "../routes/posts.js";

app.use("/api/", route);

export default app;
