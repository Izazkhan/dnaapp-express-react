// run-migration.js
import 'dotenv/config';
import { Sequelize } from 'sequelize';
import Umzug from 'umzug';

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false
});

const umzug = new Umzug({
    migrations: {
        path: './migrations',
        params: [sequelize.getQueryInterface(), Sequelize]
    },
    storage: 'sequelize',
    storageOptions: { sequelize }
});

(async () => {
    try {
        const migrations = await umzug.up();
        console.log('Migrations applied:', migrations.map(m => m.file).join(', ') || 'none');
        process.exit(0);
    } catch (err) {
        console.error('Migration failed:', err.message);
        process.exit(1);
    }
})();