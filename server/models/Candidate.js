const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Candidate = sequelize.define("Candidate", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  vision: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  mission: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  photo: {
    type: DataTypes.STRING,
  },

  votes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
})

module.exports = Candidate