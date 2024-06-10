import pg from 'pg';
import util from 'util';
import MessageHandler from '../utils/general/messageHandler';
import config from '../config'

const { Pool, Query } = pg;

class DAO extends MessageHandler {
    private pool;
    constructor() {
        super();
        this.init();
    }

    init() {
        console.log(config);
        this.pool = new Pool({
            user: config.POSTGRES_USER,
            host: config.POSTGRES_HOST,
            database: config.POSTGRES_DB,
            password: config.POSTGRES_PASSWORD,
            port: config.POSTGRES_PORT,
            ssl: false
        })
        this.pool.query = util.promisify(this.pool.query)
    }

    runQuery = async (query) => {
        console.log(query);
        try {
            const result = await this.pool.query(query)
            console.log("Database Response: "+result)
            return this.successMessageObj(result.rows)
        } catch (err) {
            console.log("Database Error: "+err)
            return this.errorMessageObj(err)
        }
    }
}

export default DAO;