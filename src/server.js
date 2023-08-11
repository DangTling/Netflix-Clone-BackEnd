import cors from "cors";
import express from "express";
import InitApiRoute from "./routes/Api";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

InitApiRoute(app);

app.listen(port, () => {
  console.log(`Server Started at http://localhost:${port}`);
});
