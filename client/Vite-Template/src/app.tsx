import "@gear-js/vara-ui/dist/style.css";
import { useAccount, useApi } from "@gear-js/react-hooks";
import { ApiLoader } from "@/components";
import { Header } from "@/components/layout";
import { withProviders } from "@/app/hocs";
import { useWalletSync } from "@/features/wallet/hooks";
import { Home } from "./pages/home";
import { Mint } from "./fungibleToken/Mint";
import LoginPage from "./pages/LoginPage";
import { Routes, Route, useLocation  } from 'react-router-dom'
import NavBar from "./pages/NavBar/NavBar";
import Dashboard from "./pages/Dashboard/Dashboard";

function Component() {
  const { isApiReady } = useApi();
  const { isAccountReady } = useAccount();
  const location = useLocation();

  const shouldShowSidebar = ![ '/dashboard/plants'].includes(location.pathname);
  useWalletSync();

  const isAppReady = isApiReady && isAccountReady;

  // Si la app no está lista, mostrar ApiLoader.
  if (!isAppReady) {
    return <ApiLoader />;
  }

  return (
    <div>
            {shouldShowSidebar && 
        location.pathname !== '/dashboard' && <NavBar/>}  
          {/* <Header isAccountVisible={isAccountReady}/> */}
          <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/mint" element={<Mint />} />
              <Route path="/home" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard/>} />           
          </Routes>
      </div>
  );
}

export const App = withProviders(Component);