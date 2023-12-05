const client = require("./client.js");
const {createRobot} = require("./robots.js");
const {createCustomer} = require("./customer.js");
const {createTask} = require("./task.js");
const {createRobotTask} = require('./robotTask.js')
const {createRobotCustomer} = require('./robotCustomer.js')

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

const syncAndSeed = async () => {
  try {
    await client.connect();
    console.log('connected to db')
    
    await dropTables();
    
    await createTables();
    console.log('Tables dropped and created successfully');
    
    const karen = await createRobot('Karen', 'CHUM3000', 'Chum Bucket', 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.giantbomb.com%2Fa%2Fuploads%2Fscale_small%2F17%2F174460%2F3461523-2475428144-latest.png&tbnid=tdEsNfimIEBAAM&vet=12ahUKEwj1tuyl6vaCAxXlkokEHcroDjcQMygDegQIARBn..i&imgrefurl=https%3A%2F%2Fwww.giantbomb.com%2Fkaren-plankton%2F3005-50123%2F&docid=H-FCjskHN6KiyM&w=340&h=640&q=plankton%27s%20wife&ved=2ahUKEwj1tuyl6vaCAxXlkokEHcroDjcQMygDegQIARBn', '1', 'true', '1800-01-01');
    const arwen = await createRobot('Arwen', 'SQL3000', 'robots R us', 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fmedia.wired.com%2Fphotos%2F5b3367031027fe1d7ddd1689%2Fmaster%2Fw_1600%252Cc_limit%2Frobot_roundup_07.jpg&tbnid=-ZC1dJ0-hPpUIM&vet=12ahUKEwig6vedqPeCAxVzlokEHRFbBCsQMygLegUIARCLAQ..i&imgrefurl=https%3A%2F%2Fwww.wired.com%2F2011%2F01%2Fbest-robots%2F&docid=BJnExKAhYBkBZM&w=1000&h=705&q=futurama%20robot&ved=2ahUKEwig6vedqPeCAxVzlokEHRFbBCsQMygLegUIARCLAQ', '2', 'true', '2023-02-03');
    const sheldon = await createRobot('Sheldon', 'Express3000', 'Bits and Bots', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.looper.com%2F1326320%2Ffuturama-who-oldest-robot-why-matters-bender-calculon%2F&psig=AOvVaw0Gaa0mdoWULiWl584HZDRp&ust=1701831962351000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIDFsJ6o94IDFQAAAAAdAAAAABAE', '3', 'false', '2000-12-21');
    
    const eugene = await createCustomer('Eugene');
    const dexter = await createCustomer('Dexter');
    const quinton = await createCustomer('Quinton');
    
    const laundry = await createTask('Laundry');
    const uber = await createTask('Uber');
    const spar = await createTask('Sparring Partner');

    await createRobotTask(sheldon.id, spar.id);
    await createRobotTask(sheldon.id, uber.id);
    await createRobotTask(karen.id, laundry.id);
    await createRobotTask(karen.id, uber.id);
    await createRobotTask(arwen.id, uber.id);
    console.log('created robot task')

    await createRobotCustomer(karen.id, eugene.id);
    await createRobotCustomer(arwen.id, eugene.id);
    await createRobotCustomer(sheldon.id, eugene.id);
    await createRobotCustomer(karen.id, dexter.id);
    await createRobotCustomer(karen.id, quinton.id);
    await createRobotCustomer(arwen.id, quinton.id);
    console.log('created robot customer')
    

    await 
    client.end(); 
  } catch (err) {
    console.error('Error:', err);
    client.end(); 
  }
} 

syncAndSeed();



