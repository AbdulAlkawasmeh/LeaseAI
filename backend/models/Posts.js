const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define('Posts', {
    tenantName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rentAmount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tenantEmail: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Active',
    },
    leaseStartDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    leaseEndDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    prediction: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  // Virtual column to check for expiring soon status
  Posts.prototype.isExpiringSoon = function () {
    const daysLeft = moment(this.leaseEndDate).diff(moment(), 'days');
    return daysLeft <= 60;  // Returns true if lease expires in 60 days or less
  };

  Posts.prototype.isHighChanceOfRenewal = function () {
    return this.prediction === 'Likely to Renew';  // Based on the AI model's prediction
  };

  return Posts;
};
