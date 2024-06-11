import DAO from "./DAO";

export default class OrderDAO {
    private DAO: DAO;
    constructor() {
        this.DAO = new DAO();
    }

    async createOrder(content: string, orderedBy: string, location: string) {
        return await this.DAO.runQuery({
            text: `insert into "Order" (content, orderedBy, location, status) values ($1,$2,$3, 1)`,
            values: [content, orderedBy, location]
        })
    }
    async getAllOrders() {
        return await this.DAO.runQuery(`select o.id, o."content", o.created_at, o."location" , o.status,  ( select jsonb_build_object('id', c.id, 'name', c.name) from "User" c where c.id = o.courierid) as courier, jsonb_build_object('id', u.id, 'name', u.name) as customer from "Order" o inner join "User" u on u.id  = o.orderedby  `);
    }
    async getOrderById(orderId: string) {
        return await this.DAO.runQuery({
            text: `select o.id, o."content", o.created_at, o."location" , o.status,  ( select jsonb_build_object('id', c.id, 'name', c.name) from "User" c where c.id = o.courierid) as courier, jsonb_build_object('id', u.id, 'name', u.name) as customer from "Order" o inner join "User" u on u.id  = o.orderedby   where o.id=$1 `,
            values: [orderId]
        });
    }
    async getOrderByCourier(userId: string) {
        return await this.DAO.runQuery({
            text: `select o.id, o."content", o.created_at, o."location" , o.status,  ( select jsonb_build_object('id', c.id, 'name', c.name) from "User" c where c.id = o.courierid) as courier, jsonb_build_object('id', u.id, 'name', u.name) as customer from "Order" o inner join "User" u on u.id  = o.orderedby   where o.courierId=$1 `,
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
            text: `update "Order" set status=$2 where id = $1`,
            values: [orderId, state]
        });
    }
    async deleteOrderById(orderId: string) {
        return await this.DAO.runQuery(`delete from "Order" WHERE id = '${orderId}'; `);
    }
}