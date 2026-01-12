import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { theme } from "../styles/theme";
import { useState, useEffect } from "react";
import { DatePickerModal } from "./DatePickerModal";
import { Order } from "@/src/types/Order";
import { Menu, Button, Portal, RadioButton, Text as TextPaper } from "react-native-paper";

interface OrderFormProps {
    onSubmit: (data: any) => void;
    initialData?: Order | null;
    submitLabel?: string;
}

export function OrderForm({ onSubmit, initialData, submitLabel = "Criar pedido",}: OrderFormProps) {
    const [customerName, setCustomerName] = useState("");
    const [orderDate, setOrderDate] = useState<string | null>(null);
    const [deliveredAt, setDeliveredAt] = useState<string | null>(null);
    const [status, setStatus] = useState<Order["status"]>("pendente");
    const [statusMenuVisible, setStatusMenuVisible] = useState(false);

    const [showOrderCalendar, setShowOrderCalendar] = useState(false);
    const [showDeliveredCalendar, setShowDeliveredCalendar] = useState(false);

    const handleSubmit = () => {
        const payload: any = {
            customer_name: customerName,
            order_date: orderDate,
            delivered_at: deliveredAt,
        };

        if (initialData) {
            payload.status = status;
        }

        onSubmit(payload);

        if (!initialData) {
            setCustomerName("");
            setOrderDate(null);
            setDeliveredAt(null);
        }
    };

    const selectStatus = (value: Order["status"]) => {
        setStatus(value);
        setStatusMenuVisible(false);
    };

    useEffect(() => {
        if (initialData) {
            setCustomerName(initialData.customer_name);
            setOrderDate(initialData.order_date);
            setDeliveredAt(initialData.delivered_at ?? null);
            setStatus(initialData.status);
        }
    }, [initialData]);

    return (
        <View style={styles.card}>
            {!initialData && (
                <Text style={styles.header}>
                    Novo Pedido
                </Text>
            )}

            <TextInput
                style={styles.input}
                placeholder="Nome do cliente"
                placeholderTextColor="#6c757d"
                value={customerName}
                onChangeText={setCustomerName}
            />

            <Pressable
                style={styles.input}
                onPress={() => setShowOrderCalendar(true)}
            >
                <Text style={orderDate ? styles.text : styles.placeholder}>
                    {orderDate || "Data do pedido"}
                </Text>
            </Pressable>

            <Pressable
                style={styles.input}
                onPress={() => setShowDeliveredCalendar(true)}
            >
                <Text style={deliveredAt ? styles.text : styles.placeholder}>
                    {deliveredAt || "Data de entrega (opcional)"}
                </Text>
            </Pressable>

            {initialData && (
                <View style={styles.statusContainer}>
                    <Text style={styles.label}>Status do pedido</Text>

                    <RadioButton.Group
                        onValueChange={(value) =>
                            setStatus(value as Order["status"])
                        }
                        value={status}
                    >
                        <Pressable
                            style={styles.statusRow}
                            onPress={() => setStatus("pendente")}
                        >
                            <RadioButton
                                value="pendente"
                                color={theme.colors.warning}
                            />
                            <Text
                                style={[
                                    styles.statusText,
                                    { color: theme.colors.warning },
                                ]}
                            >
                                Pendente
                            </Text>
                        </Pressable>

                        <Pressable
                            style={styles.statusRow}
                            onPress={() => setStatus("entregue")}
                        >
                            <RadioButton
                                value="entregue"
                                color={theme.colors.success}
                            />
                            <Text
                                style={[
                                    styles.statusText,
                                    { color: theme.colors.success },
                                ]}
                            >
                                Entregue
                            </Text>
                        </Pressable>

                        <Pressable
                            style={styles.statusRow}
                            onPress={() => setStatus("cancelado")}
                        >
                            <RadioButton
                                value="cancelado"
                                color={theme.colors.danger}
                            />
                            <Text
                                style={[
                                    styles.statusText,
                                    { color: theme.colors.danger },
                                ]}
                            >
                                Cancelado
                            </Text>
                        </Pressable>
                    </RadioButton.Group>
                </View>
            )}

            <Pressable style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>
                    {submitLabel}
                </Text>
            </Pressable>

            <DatePickerModal
                visible={showOrderCalendar}
                title="Data do pedido"
                selectedDate={orderDate ?? undefined}
                onSelect={setOrderDate}
                onClose={() => setShowOrderCalendar(false)}
            />

            <DatePickerModal
                visible={showDeliveredCalendar}
                title="Data de entrega"
                selectedDate={deliveredAt ?? undefined}
                onSelect={setDeliveredAt}
                onClose={() => setShowDeliveredCalendar(false)}
            />
        </View>

    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: theme.colors.white,
        padding: 16,
        borderRadius: 8,
        elevation: 2,
    },
    header: {
        backgroundColor: theme.colors.primary,
        color: theme.colors.white,
        padding: 8,
        marginBottom: 12,
        borderRadius: 4,
        fontWeight: "600",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ced4da",
        borderRadius: 4,
        padding: 12,
        marginBottom: 10,
        justifyContent: "center",
        color: "#212529",
    },
    placeholder: {
        color: "#6c757d",
    },
    text: {
        color: "#212529",
    },
    button: {
        backgroundColor: theme.colors.primary,
        padding: 12,
        borderRadius: 4,
        alignItems: "center",
        marginTop: 8,
    },
    buttonText: {
        color: theme.colors.white,
        fontWeight: "600",
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 4,
    },
    statusContainer: {
        marginTop: 8,
        marginBottom: 12,
    },
    statusRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 6,
    },
    statusText: {
        fontSize: 15,
        fontWeight: "600",
    },
});
