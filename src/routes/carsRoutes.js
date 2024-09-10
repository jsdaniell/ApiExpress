import { Router } from "express";
import CarsController from "../controllers/cars.js";

const router = Router();

router.get('/', CarsController.getCars);
router.post('/', CarsController.newCar);
router.delete('/:id', CarsController.deleteCar);
router.put('/:id', CarsController.updateCar);

export default router;