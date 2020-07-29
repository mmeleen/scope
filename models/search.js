module.exports = function(sequelize, DataTypes) {
  var Search = sequelize.define("Search", {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
        notNull: {
          msg: 'Date cannot be null'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Description cannot be null'
        }
      }
    },
    // compatibility: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   validate: {
    //     isAlpha: true,
    //     notNull: {
    //       msg: 'Compatibility cannot be null'
    //     }
    //   }
    // },
    mood: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Mood cannot be null'
        }
      }
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Color cannot be null'
        }
      }
    },
    lucky_number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Lucky number cannot be null'
        }
      }
    },
    lucky_time: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Lucky time cannot be null'
        }
      }
    }
  });

  // Association
  Search.associate = function(models) {
    Search.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    })
  };

  return Search;
}