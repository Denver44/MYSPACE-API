import app from "./app.js";
import mongoose from "mongoose";
import routes from "./routes/router.js";

const CONNECTION_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.k04xt.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 5000;

app.use("/", routes);

// DB SETUP
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`listening the port at  ${PORT}`))
  )
  .catch((e) => {
    console.log(e);
  });
