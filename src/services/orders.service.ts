import { api } from "../api/api";
import { Order } from "../types/Order";

export async function getOrders(): Promise<Order[]> {
    const response = await api.get("/orders");
    return response.data;
}

export async function createOrder(data: Partial<Order>) {
    return api.post("/orders", data);
}

export async function updateOrder(id: number, data: Partial<Order>) {
    return api.put(`/orders/${id}`, data);
}

export async function deleteOrder(id: number) {
    return api.delete(`/orders/${id}`);
}
