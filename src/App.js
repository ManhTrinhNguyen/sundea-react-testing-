import Container from "react-bootstrap/Container";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./contexts/OrderDetails";

function App() {
  return (
    <Container>
      <OrderDetailsProvider />
      {/* {Summary page and entry page need provider} */}
      <OrderEntry />
      {/* {Confirmation page dose not need provider} */}
    </Container>
  );
}

export default App;
