const client = require("./client.js");

const createRobot = async (
  name,
  model,
  company,
  imgUrl,
  warranty,
  safe,
  release
) => {
  try {
    const query = `
      INSERT INTO robots (name, model, company, imgUrl, warranty_months, is_child_safe, release_date)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const values = [name, model, company, imgUrl, warranty, safe, release];

    const { rows: [robot] } = await client.query(query, values);
    return robot;
  } catch (err) {
    console.error('Error creating robot:', err);
    throw err;
  }
};

module.exports = {
  createRobot,
};

