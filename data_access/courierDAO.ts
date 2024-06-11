import DAO from "./DAO";

export default class CourierDAO {
    private DAO: DAO;
    constructor() {
        this.DAO = new DAO();
    }

    async getAllCouriers() {
        return await this.DAO.runQuery(`select u.id, u."name", u."location", ords.orders from "User" u left join (select o.courierid, jsonb_agg(json_build_object('id', o.id,'content', o."content", 'location',o."location",'status', o.status,'customer', (select json_build_object('id', c.id, 'name', c.name)  from "User" c where c.id = o.orderedby),'created_at',o.created_at)) as orders from "Order" o where o.status=2 and  o.courierid is not null group by o.courierid ) ords on ords.courierid = u.id where u.usertype= 1`);
    }
    async getCourierById(id: string) {
        return await this.DAO.runQuery({
            text: `select u.id, u."name", u."location", ords.orders from "User" u inner join (select o.courierid, jsonb_agg(json_build_object('id', o.id,'content', o."content", 'location',o."location",'status', o.status,'customer', (select json_build_object('id', c.id, 'name', c.name)  from "User" c where c.id = o.orderedby),'created_at',o.created_at)) as orders from "Order" o where o.status=2 and  o.courierid is not null group by o.courierid ) ords on ords.courierid = u.id where u.usertype= 1 and u.id = $1`,
            values: [id]
        });
    }
    async getCourierOrders(id: string) {
        return await this.DAO.runQuery({
            text: `select jsonb_agg(json_build_object('id', o.id,'content', o."content", 'location',o."location",'status', o.status,'customer', (select json_build_object('id', c.id, 'name', c.name)  from "User" c where c.id = o.orderedby),'created_at',o.created_at)) as orders from "Order" o where o.courierid = $1 and  o.courierid is not null group by o.courierid `,
            values: [id]
        });
    }
    
    async deleteCourierById(id: string) {
        return await this.DAO.runQuery(`delete from "User" WHERE id = '${id}'; `);
    }
}