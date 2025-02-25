module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      tenantName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rentAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      leaseStartDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      leaseEndDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Active",
      },
    });
  
    return Posts;
  };
  