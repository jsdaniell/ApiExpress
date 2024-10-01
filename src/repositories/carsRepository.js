import { cars, query } from "../db/db.js";

const CarsRepository = {
    addCar: async (car) => {
        const text = 'INSERT INTO carros(brand, model, cilinders) VALUES($1, $2, $3) RETURNING *';

        const values = [car.brand, car.model, car.cilinders];

        const updated = await query(text, values);

        return updated.rows[0];
    },
    getCars: async () => {
        const text = 'SELECT * FROM carros';

        const result = await query(text);

        return result.rows;
    },
    deleteCar: async (id) => {
        const text = `DELETE FROM carros WHERE id = ${id}`;

        await query(text, values);
    },
    updateCar: async (id, car) => {
        const text = `UPDATE carros SET brand = $1, model = $2, cilinders = $3 WHERE id = ${id} RETURNING *`;

        const values = [car.brand, car.model, car.cilinders];

        const updated = await query(text, values);

        return updated.rows[0];
    }
}

export default CarsRepository;