'use strict';

module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define('Blog', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'categories',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    is_published: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    }
  }, {
    tableName: 'blogs',
    timestamps: false,
  });


  Blog.associate = function(){
   Blog.hasMany(Tag, {
      foreignKey: 'tagable_id',
      as: 'tags',  
      scope: {
        tagable_type: 'Blog' 
      }
    });

    Blog.belongsTo(Category , {
        foreignKey : 'category_id',
        as : 'category'
    })

    Blog.hasMany(Comment , {
        foreignKey : 'commentable_id',
        as: 'comments',
        scope : {
            commentable_type : 'Blog'
        }
    })
  }

  return Blog;
};
