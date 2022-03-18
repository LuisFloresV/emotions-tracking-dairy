const { v4: uuidv4 } = require('uuid');

const addUuid = (obj) => ({ id: uuidv4(), ...obj });

module.exports = {
  addUuid,
};
