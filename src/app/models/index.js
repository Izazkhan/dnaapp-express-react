import DataCity from './DataCity.js';
import DataCountry from './DataCountry.js';
import DataState from './DataState.js';
import PasswordReset from './PasswordReset.js';
import User from './User.js';
// Define associations here
PasswordReset.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasOne(PasswordReset, { foreignKey: 'user_id', as: 'passwordReset' });

DataCountry.hasMany(DataState, { foreignKey: 'data_country_id', as: 'state' });
DataState.hasMany(DataCity, { foreignKey: 'data_state_id', as: 'city' });

DataCity.belongsTo(DataState, { foreignKey: 'data_state_id', as: 'state' });
DataState.belongsTo(DataCountry, { foreignKey: 'data_country_id', as: 'country' });

export {
    User,
    PasswordReset,
    DataCountry,
    DataState,
    DataCity
}