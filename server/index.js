/* Import packages */
import express from "express";
import userRoute from "./routes/user.route";
import  diaryRoutes from "./routes/diary.route";

const app = express();

const PORT = 2000;

app.use(express.json());

app.use("/api/v1", userRoute, diaryRoutes);

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

export default app;