const client = require("./client.js");
const {createRobot} = require("./robots.js")

const dropTables = async () => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS robot_task;
      DROP TABLE IF EXISTS robot_customer;
      DROP TABLE IF EXISTS robots;
      DROP TABLE IF EXISTS tasks;
      DROP TABLE IF EXISTS customers;
    `);
    console.log('Tables dropped successfully');
  } catch (err) {
    console.error('Error dropping tables:', err);
  }
};

const createTables = async () => {
  try {
    
    await client.query(`
      CREATE TABLE robots (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30),
        model VARCHAR(30),
        company VARCHAR(30),
        imgUrl VARCHAR(500),
        warranty_months INT,
        is_child_safe BOOLEAN,
        release_date DATE
      );

      CREATE TABLE tasks (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30)
      );

      CREATE TABLE customers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30)
      );

      CREATE TABLE robot_task (
        robot_id INT,
        task_id INT
      );

      CREATE TABLE robot_customer (
        robot_id INT,
        customer_id INT
      );
    `);
    console.log('Tables created successfully');
  } catch (err) {
    console.error('Error creating tables:', err);
  }
};

(async () => {
  try {
    await client.connect();
    console.log('connected to db')
    await dropTables();
    await createTables();
    console.log('Tables dropped and created successfully');
    await createRobot('Karen', 'CHUM3000', 'Chum Bucket', 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.giantbomb.com%2Fa%2Fuploads%2Fscale_small%2F17%2F174460%2F3461523-2475428144-latest.png&tbnid=tdEsNfimIEBAAM&vet=12ahUKEwj1tuyl6vaCAxXlkokEHcroDjcQMygDegQIARBn..i&imgrefurl=https%3A%2F%2Fwww.giantbomb.com%2Fkaren-plankton%2F3005-50123%2F&docid=H-FCjskHN6KiyM&w=340&h=640&q=plankton%27s%20wife&ved=2ahUKEwj1tuyl6vaCAxXlkokEHcroDjcQMygDegQIARBn', '1', 'true', '1800-01-01')
    client.end(); 
  } catch (err) {
    console.error('Error:', err);
    client.end(); 
  }
})();



