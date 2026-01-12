import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import { theme } from "../styles/theme";

export function OrderEditModal({ visible, onClose, children }: any) {
    return (
        <Modal transparent visible={visible} animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>Atualizar Pedido</Text>
                    {children}

                    <Pressable style={styles.close} onPress={onClose}>
                        <Text style={styles.closeText}>Fechar</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {
        backgroundColor: "#fff",
        width: "90%",
        borderRadius: 8,
        padding: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 12,
    },
    close: {
        marginTop: 12,
        alignItems: "flex-end",
    },
    closeText: {
        color: theme.colors.primary,
    },
});
