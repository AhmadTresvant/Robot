const client = require("./client");

const createTask = async(name) => {
  try {
    const {rows: [task]} = await client.query(`
    INSERT INTO tasks (name)
    VALUES ($1)
    RETURNING *;
    `, [name])

    return task;
  }
  catch(err) {
    console.log(err);
  }
}

module.exports = {
  createTask,
}