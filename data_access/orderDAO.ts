import DAO from "./DAO";

export default class OrderDAO {
    private DAO: DAO;
    constructor() {
        this.DAO = new DAO();
    }

    async createOrder(content: string, orderedBy: string, location: string) {
        return await this.DAO.runQuery({
            text: `insert into "Order (content, orderedBy, location) values ($1,$2,$3)"`,
            values: [content, orderedBy, location]
        })
    }
    async getAllOrders() {
        return await this.DAO.runQuery(`select * from "Order"`);
    }
    async getOrderById(orderId: string) {
        return await this.DAO.runQuery({
            text: `select * from "Order" where id=$1 `,
            values: [orderId]
        });
    }
    async getOrderByCourier(userId: string) {
        return await this.DAO.runQuery({
            text: `select * from "Order" where courierId=$1 `,
            values: [userId]
        });
    }
    async assignOrder(orderId: string, courierId: string) {
        return await this.DAO.runQuery({
            text: `update "Order" set courierId=$2 where id = $1`,
            values: [orderId, courierId]
        });
    }
    async updateOrderStatus(orderId: string, state: number) {
        return await this.DAO.runQuery({
            text: `update "Order" set status=$1 where id = $1`,
            values: [orderId, state]
        });
    }
    async deleteOrderById(orderId: string) {
        return await this.DAO.runQuery(`delete from "Order" WHERE id = '${orderId}'; `);
    }
}