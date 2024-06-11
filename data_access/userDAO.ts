import DAO from "./DAO";

class UserDAO {
    private DAO: DAO;
    constructor() {
        this.DAO = new DAO();
    }

    async getAllUsers() {
        return await this.DAO.runQuery(`SELECT * FROM "User"`)
    }
    async getUsersByType(type: number) {
        return await this.DAO.runQuery({
            text: `SELECT id, name FROM "User" WHERE usertype = $1`,
            values: [type]
            }
        )
    }
    async getUserById(id: string) {
        return await this.DAO.runQuery({
            text: `SELECT * FROM "User" WHERE id = $1`,
            values: [id]
            }
        )
    }
    async getUserByEmail(email: string) {
        return await this.DAO.runQuery({
                text: `SELECT * FROM "User" WHERE email = $1`,
                values: [email]
            }
        );
    }
    async getUserByUsername(username: string) {
        return await this.DAO.runQuery({
            text: `SELECT * FROM "User" WHERE username = $1`,
            values: [username]
            }
        )
    }
    async addUser(username: string, email: string, password: string, type: number, name:string, location: string) {
        return await this.DAO.runQuery({
            text: `INSERT INTO "User" (username, email, password, last_login, userType, name, location) VALUES ($1,$2,crypt($3,getSalt()),current_timestamp, $4,$5, $6) returning id`,
            values: [username,email,password, type, name, location]
            }
        );
    }
    async updateUserLocation(id: string, location: string) {
        return await this.DAO.runQuery({
            text: `update "User" set location = $2 where user_id = $1`,
            values: [id, location]
            }
        );
    }
    async updatePasswordUserByToken(newPassword: string, id: string) {
        return await this.DAO.runQuery({
            text:  `UPDATE "User" SET password = crypt($1, getSalt()) WHERE id = $2`,
            values: [newPassword,id]
            }
        );
    }
    async updatePasswordUserById(oldPassword: string, newPassword: string, id: string) {
        return await this.DAO.runQuery({
            text:  `UPDATE "User" SET password = crypt($2, getSalt()) WHERE id = $3 AND password = crypt($1, getSalt())`,
            values: [oldPassword,newPassword,id]
            }
        );
    }
    async updatePasswordUserByEmail(oldPassword: string, newPassword: string, email: string) {
        return await this.DAO.runQuery({
            text:  `UPDATE "User" SET password = crypt($2, getSalt()) WHERE email = $3 AND password = crypt($1, getSalt())`,
            values: [oldPassword,newPassword,email]
            }
        );
    }
    async updatePasswordUserByUsername(oldPassword: string, newPassword: string, username: string) {
        return await this.DAO.runQuery({
            text:  `UPDATE "User" SET password = crypt($2, getSalt()) WHERE username = $3 AND password = crypt($1, getSalt())`,
            values: [oldPassword,newPassword,username]
            }
        );
    }
    async deleteUserById(id: string) {
        return await this.DAO.runQuery({
            text:  `DELETE FROM "User" WHERE user_id = $1`,
            values: [id]
            }
        );
    }
    async deleteUserByEmail(email: string) {
        return await this.DAO.runQuery({
            text:  `DELETE FROM "User" WHERE email = $1`,
            values: [email]
            }
        );
    }
    async deleteUserByUsername(username: string) {
        return await this.DAO.runQuery({
            text:  `DELETE FROM "User" WHERE username = $1`,
            values: [username]
            }

        );
    }
    async deleteUserByType(type: number) {
        return await this.DAO.runQuery({
            text:  `DELETE FROM "User" WHERE usertype = $1`,
            values: [type]
            }

        );
    }
    async loginWithUsername(username: string, password: string) {
        return await this.DAO.runQuery({
            text: `SELECT * FROM "User" WHERE username=$1 AND password=crypt($2, getSalt()) AND usertype != 3`,
            values: [username, password]
        });
    }
    async loginWithEmail(email: string, password: string) {
        return await this.DAO.runQuery({
            
            text: `SELECT * FROM "User" WHERE email=$1 AND password=crypt($2, getSalt()) `,
            values: [email, password]
        });
    }
}

export default UserDAO;