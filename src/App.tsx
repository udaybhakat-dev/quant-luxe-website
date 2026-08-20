import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { SolarisPage } from "./pages/SolarisPage";
import { JournalIndexPage } from "./pages/JournalIndexPage";
import { HowToChoosePage } from "./pages/journal/HowToChoosePage";
import { BestPerfumeSummerPage } from "./pages/journal/BestPerfumeSummerPage";
import { HowToApplyPage } from "./pages/journal/HowToApplyPage";
import { BagPage } from "./pages/BagPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { OrderConfirmationPage } from "./pages/OrderConfirmationPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/solaris" element={<SolarisPage />} />
        <Route path="/journal" element={<JournalIndexPage />} />
        <Route path="/journal/how-to-choose-mens-perfume-for-summer" element={<HowToChoosePage />} />
        <Route path="/journal/best-perfume-for-men-in-summer" element={<BestPerfumeSummerPage />} />
        <Route path="/journal/how-to-apply-perfume" element={<HowToApplyPage />} />
        <Route path="/bag" element={<BagPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
      </Route>
    </Routes>
  );
}

export default App;
