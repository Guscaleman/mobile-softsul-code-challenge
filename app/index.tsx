import Toast from "react-native-toast-message";
import { Provider as PaperProvider, Portal } from "react-native-paper";
import { OrdersScreen } from "@/src/screens/OrdersScreen";

export default function App() {
    return (
        <PaperProvider>
            <Portal.Host>
                <OrdersScreen />
                <Toast />
            </Portal.Host>
        </PaperProvider>
    );
}
