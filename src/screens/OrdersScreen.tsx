import { ScrollView, Text } from "react-native";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { Layout } from "@/components/Layout";
import { OrderCard } from "@/components/OrderCard";
import { OrderForm } from "@/components/OrderForm";
import { OrderEditModal } from "@/components/OrderEditModal";
import { OrderEditDialog } from "@/components/OrderEditDialog";
import { Order } from "../types/Order";
import {
    getOrders,
    createOrder,
    deleteOrder,
    updateOrder
} from "../services/orders.service";

export function OrdersScreen() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);

    async function loadOrders() {
        try {
            const data = await getOrders();
            setOrders(data);
        } catch {
            Toast.show({
                type: "error",
                text1: "Erro",
                text2: "Não foi possível carregar os pedidos",
            });
        } finally {
            setLoading(false);
        }
    }

    async function handleCreate(data: any) {
        try {
            await createOrder(data);
            Toast.show({
                type: "success",
                text1: "Sucesso",
                text2: "Pedido criado com sucesso",
            });
            loadOrders();
        } catch {
            Toast.show({
                type: "error",
                text1: "Erro",
                text2: "Erro ao criar pedido",
            });
        }
    }

    async function handleUpdate(data: any) {
        if (!selectedOrder) return;

        try {
            await updateOrder(selectedOrder.id, data);
            Toast.show({
                type: "success",
                text1: "Pedido atualizado com sucesso",
            });
            handleCloseModal();
            loadOrders();
        } catch {
            Toast.show({
                type: "error",
                text1: "Erro ao atualizar pedido",
            });
        }
    }

    async function handleDelete(id: number) {
        await deleteOrder(id);
        Toast.show({
            type: "success",
            text1: "Pedido removido",
        });
        loadOrders();
    }

    const handleEdit = (order: Order) => {
        setSelectedOrder(order);
        setShowEditModal(true);
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
        setShowEditModal(false);
    };

    useEffect(() => {
        loadOrders();
    }, []);

    return (
        <Layout>
            {loading ? (
                <Text>Carregando...</Text>
            ) : orders.length === 0 ? (
                <Text>Seus novos pedidos serão listados aqui...</Text>
            ) : (
                <>
                    <Text style={{ fontSize: 18, marginBottom: 12 }}>
                        Lista de pedidos
                    </Text>

                    <ScrollView style={{ maxHeight: 350 }}>
                        {orders.map(order => (
                            <OrderCard
                                key={order.id}
                                order={order}
                                onEdit={() => handleEdit(order)}
                                onDelete={() => handleDelete(order.id)}
                            />
                        ))}
                    </ScrollView>
                </>
            )}

            {selectedOrder && (
                <OrderEditDialog
                    visible={showEditModal}
                    onClose={handleCloseModal}
                >
                    <OrderForm
                        initialData={selectedOrder}
                        onSubmit={handleUpdate}
                        submitLabel="Salvar alterações"
                    />
                </OrderEditDialog>
            )}

            <OrderForm onSubmit={handleCreate} />
        </Layout>
    );
}
