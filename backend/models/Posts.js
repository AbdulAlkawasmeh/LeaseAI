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

  
  Posts.prototype.isExpiringSoon = function () {
    const daysLeft = moment(this.leaseEndDate).diff(moment(), 'days');
    return daysLeft <= 60;  
  };

  Posts.prototype.isHighChanceOfRenewal = function () {
    return this.prediction === 'Likely to Renew';  
  };

  return Posts;
};
