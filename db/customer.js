const client = require('./client.js');

const createCustomer = async(name) => {
  try {
     const {rows: [customer]} = await client.query(`
     INSERT INTO customers (name)
     VALUES ($1)
     RETURNING *;
     `, [name])

     return customer;
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = {
  createCustomer,
}