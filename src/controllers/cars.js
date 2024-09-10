import { cars } from "../db/db.js";

const CarsController = {
    getCars: (req, res) => {
        res.json(cars);
    },
    newCar: (req, res) => {
        const newCar = req.body;
    
        if(!newCar.brand || !newCar.model || !newCar.cilinders) {
            return res.status(400).json({ message: 'All fields are required' });
        }
    
        cars.push({
            ...newCar,
            id: cars.length + 1,
        });
    
        res.json(newCar);
    },
    deleteCar: (req, res) => {
        const { id } = req.params;
    
        cars = cars.filter(car => car.id !== Number(id));
    
        res.json({ message: 'Car deleted' });
    },
    updateCar: (req, res) => {
        const { id } = req.params;
        const updatedCar = req.body;
    
        const updatedCarKeys = Object.keys(updatedCar);
        const updatedCarValues = Object.values(updatedCar);
    
        if(updatedCarKeys.some(key => !['brand', 'model', 'cilinders'].includes(key)) ) {
            return res.status(400).json({ message: 'Invalid field' });
        }
    
        if(!updatedCarValues.every(value => value)) {
            return res.status(400).json({ message: 'All fields are required' });
        }
    
        cars = cars.map(car => {
            if(car.id === Number(id)) {
                return {
                    ...car,
                    ...updatedCar,
                }
            }
    
            return car;
        })
    
        res.json({ message: 'Car updated' });
    }
}

export default CarsController;