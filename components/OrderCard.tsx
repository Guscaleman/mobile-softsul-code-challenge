import { View, Text, StyleSheet, Pressable } from "react-native";
import { theme } from "../styles/theme";

interface Order {
    id: number;
    customer_name: string;
    order_date: string;
    delivered_at?: string;
    status: "pendente" | "entregue" | "cancelado";
}

export function OrderCard({order, onEdit, onDelete}: {
    order: Order;
    onEdit: () => void;
    onDelete: () => void;
}) {
    const statusColor = {
        pendente: theme.colors.warning,
        entregue: theme.colors.success,
        cancelado: theme.colors.danger,
    }[order.status];

    return (
        <View style={styles.card}>
            <Text style={styles.title}>{order.customer_name}</Text>

            <Text style={styles.text}>
                <Text style={styles.bold}>Data do pedido:</Text> {order.order_date}
            </Text>

            <Text style={styles.text}>
                <Text style={styles.bold}>Data de entrega:</Text>{" "}
                {order.delivered_at || "-"}
            </Text>

            <View style={[styles.badge, { backgroundColor: statusColor }]}>
                <Text style={styles.badgeText}>
                    {order.status.toUpperCase()}
                </Text>
            </View>

            <View style={styles.actions}>
                <Pressable style={styles.primaryButton} onPress={onEdit}>
                    <Text style={styles.buttonText}>Atualizar</Text>
                </Pressable>

                <Pressable style={styles.dangerButton} onPress={onDelete}>
                    <Text style={styles.buttonText}>Deletar</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: theme.colors.white,
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        elevation: 2,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
    },
    text: {
        fontSize: 14,
        marginBottom: 4,
    },
    bold: {
        fontWeight: "600",
    },
    badge: {
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        marginTop: 8,
    },
    badgeText: {
        color: theme.colors.white,
        fontSize: 12,
    },
    actions: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 8,
        marginTop: 12,
    },
    primaryButton: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
    },
    dangerButton: {
        backgroundColor: theme.colors.danger,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
    },
    buttonText: {
        color: theme.colors.white,
        fontSize: 12,
    },
});
