import PasswordReset from './PasswordReset.js';
import User from './User.js';
// Define associations here
PasswordReset.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasOne(PasswordReset, { foreignKey: 'user_id', as: 'passwordReset' });

export {
    User,
    PasswordReset,
}