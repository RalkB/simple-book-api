'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Book, {
        foreignKey: 'id'
      });
      this.hasMany(models.Category, {
        foreignKey: 'id'
      });
    }
  }
  BookCategory.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    book_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BookCategory'
  });
  return BookCategory;
};