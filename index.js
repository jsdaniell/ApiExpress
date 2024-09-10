import express from "express";
import logMiddleware from "./src/middlewares/logMiddleware.js";
import authMiddleware from "./src/middlewares/authMiddleware.js";
import carsRoutes from "./src/routes/carsRoutes.js";

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(logMiddleware);
app.use(authMiddleware);

app.use('/cars', carsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
