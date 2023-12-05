const client = require('./client');

const createRobotCustomer = async(robotId, customerId) => {
  try {
    const { rows: [robotCustomer] } = await client.query(`
    INSERT INTO robot_customer (robot_id, customer_id)
    VALUES ($1, $2)
    RETURNING *;
    `, [robotId, customerId]);

    return robotCustomer
  }

  catch (err) {
    console.log(err);
  }
}

module.exports = {
   createRobotCustomer
  }