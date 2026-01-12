import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { theme } from "../styles/theme";

interface Props {
    visible: boolean;
    onClose: () => void;
    onSelect: (date: string) => void;
    selectedDate?: string;
    title: string;
}

export function DatePickerModal({visible, onClose, onSelect, selectedDate, title,}: Props) {
    return (
        <Modal transparent animationType="fade" visible={visible}>
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>{title}</Text>

                    <Calendar
                        onDayPress={day => {
                            onSelect(day.dateString); // YYYY-MM-DD
                            onClose();
                        }}
                        markedDates={
                            selectedDate
                                ? {
                                    [selectedDate]: {
                                        selected: true,
                                        selectedColor:
                                        theme.colors.primary,
                                    },
                                }
                                : {}
                        }
                        theme={{
                            todayTextColor: theme.colors.primary,
                            arrowColor: theme.colors.primary,
                        }}
                    />

                    <Pressable style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeText}>Fechar</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {
        backgroundColor: theme.colors.white,
        width: "92%",
        maxWidth: 420,
        borderRadius: 8,
        padding: 16,
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 12,
        color: "#212529",
    },
    closeButton: {
        marginTop: 12,
        paddingVertical: 8,
        alignItems: "flex-end",
    },
    closeText: {
        color: theme.colors.primary,
        fontWeight: "500",
    },
});
