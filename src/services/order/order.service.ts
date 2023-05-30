import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Order, OrderDocument} from "../../schemas/order";
import {Model} from "mongoose";
import {OrderDto} from "../../dto/order-dto";

@Injectable()
export class OrderService {

    constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

// метод создает новую запись
    async sendOrder(data: OrderDto): Promise<Order>{
        const orderData = new this.orderModel(data);
        return orderData.save()
    }
}
