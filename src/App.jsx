import { Nav } from "./Nav";
import { AuthProvider } from "./contexto/auth.context";
import { TorneosProvider } from "./contexto/torneos.context";

export const App = () => {
  return (
    <AuthProvider>
      <TorneosProvider children={<Nav />} />
    </AuthProvider>
  );
};
