import express from "express";

const app = express();

const PORT = 3000;

const AUTHORIZATION_UUID = "05679c7a-639e-4bf2-a28e-64c425387656"

let cars = [
    { id: 1, brand: 'BMW', model: 'X5', cilinders: 6 },
    { id: 2, brand: 'Audi', model: 'Q7', cilinders: 4 },
    { id: 3, brand: 'Mercedes', model: 'GLE', cilinders: 6 },
]

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} ${new Date().toTimeString()}`);

    next();
});

app.use((req, res, next) => {
    if(req.headers.authorization !== AUTHORIZATION_UUID) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
})

app.get('/cars', (req, res) => {
    res.json(cars);
});

app.post('/cars', (req, res) => {
    const newCar = req.body;

    if(!newCar.brand || !newCar.model || !newCar.cilinders) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    cars.push({
        ...newCar,
        id: cars.length + 1,
    });

    res.json(newCar);
})

app.delete('/cars/:id', (req, res) => {
    const { id } = req.params;

    cars = cars.filter(car => car.id !== Number(id));

    res.json({ message: 'Car deleted' });
})

app.put('/cars/:id', (req, res) => {
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
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
