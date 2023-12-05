const client = require('./client');

const createRobotTask = async(robotId, taskId) => {
  try {
    const { rows: [robotTask] } = await client.query(`
    INSERT INTO robot_task (robot_id, task_id)
    VALUES ($1, $2)
    RETURNING *;
    `, [robotId, taskId]);

    return robotTask
  }

  catch (err) {
    console.log(err);
  }
}

module.exports = {
   createRobotTask 
  }