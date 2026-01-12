import { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { Dialog, Portal, Button, Text } from "react-native-paper";

interface Props {
    visible: boolean;
    onClose: () => void;
    children: ReactNode;
}

export function OrderEditDialog({ visible, onClose, children }: Props) {
    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onClose} style={styles.dialog}>
                <Dialog.Title>Atualizar Pedido</Dialog.Title>

                <Dialog.Content>
                    {children}
                </Dialog.Content>

                <Dialog.Actions>
                    <Button onPress={onClose}>Fechar</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}

const styles = StyleSheet.create({
    dialog: {
        borderRadius: 8,
    },
});
