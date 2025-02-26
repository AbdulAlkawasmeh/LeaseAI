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
    });

    return Posts;
};
