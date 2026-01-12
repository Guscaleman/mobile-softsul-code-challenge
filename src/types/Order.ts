export interface Order {
    id: number;
    customer_name: string;
    order_date: string;
    delivered_at?: string | null;
    status: "pendente" | "entregue" | "cancelado";
}
