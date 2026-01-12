import { View, Text, StyleSheet } from "react-native";
import { theme } from "../styles/theme";

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>📦 Sistema de Pedidos</Text>
            </View>

            <View style={styles.content}>{children}</View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    © {new Date().getFullYear()} - Sistema de Pedidos Softsul
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f7f9fc",
    },
    header: {
        backgroundColor: theme.colors.primary,
        padding: 16,
        alignItems: "center",
    },
    headerText: {
        color: theme.colors.white,
        fontSize: 18,
        fontWeight: "600",
    },
    content: {
        flex: 1,
        padding: 16,
    },
    footer: {
        backgroundColor: theme.colors.dark,
        padding: 12,
        alignItems: "center",
    },
    footerText: {
        color: theme.colors.white,
        fontSize: 12,
    },
});
