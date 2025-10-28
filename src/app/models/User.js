import { AutoIncrement, PrimaryKey } from '@sequelize/core/decorators-legacy';
import { Attribute, DataTypes } from '@sequelize/core';

export class User extends Model {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    id;

    @Attribute(DataTypes.STRING(100))
    name;
    
    @Attribute(DataTypes.STRING(255))
    email;

    @Attribute(DataTypes.STRING(255))
    password;
}