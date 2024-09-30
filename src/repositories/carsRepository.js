import { cars } from "../db/db.js";

const CarsRepository = {
    addCar: (car) => {
        cars.push({
            ...car,
            id: cars.length + 1,
        });

        return cars
    },
    getCars: () => {
        return cars
    }
}

export default CarsRepository;