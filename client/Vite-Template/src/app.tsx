import "@gear-js/vara-ui/dist/style.css";
import { useAccount, useApi } from "@gear-js/react-hooks";
import { ApiLoader } from "@/components";
import { Header } from "@/components/layout";
import { withProviders } from "@/app/hocs";
import { useWalletSync } from "@/features/wallet/hooks";
import { Home } from "./pages/home";
import { Mint } from "./fungibleToken/Mint";
import LoginPage from "./pages/LoginPage";
import { Routes, Route  } from 'react-router-dom'

function Component() {
  const { isApiReady } = useApi();
  const { isAccountReady } = useAccount();

  useWalletSync();

  const isAppReady = isApiReady && isAccountReady;

  // Si la app no está lista, mostrar ApiLoader.
  if (!isAppReady) {
    return <ApiLoader />;
  }

  return (
    <div>
          <Header isAccountVisible={isAccountReady}/>
          <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/mint" element={<Mint />} />
              <Route path="/home" element={<Home />} />
          </Routes>
      </div>
  );
}

export const App = withProviders(Component);