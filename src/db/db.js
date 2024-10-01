import pg from 'pg'

const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'store',
    password: '123456',
    port: 5432,
});

const query = async (text, params) => {
    try {
        const result = await pool.query(text, params);
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}

let cars = []

export {
    cars,
    query
};