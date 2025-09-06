import { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { InicioVista } from "./vistas/inicio.vista";
import { HomeVista } from "./vistas/home.vista";
import { RegistroVista } from "./vistas/registro.vista";
import { AddTorneo } from "./vistas/addtorneo.vista";
import { useAuth } from "./Hooks/useAuth";
import { Perfil } from "./vistas/perfil.vista";
import { AddResultadoDuelo } from "./vistas/addResultados.vista";

// diferentes pantallas
// se crea una constante llamada nav, donde estaran todas las vistas de la App, con un nombre y el componente

export const Nav = () => {
  const { Navigator, Screen, Group } = createNativeStackNavigator();
  // en la constante opciones sirve para decirle que el header no se muestre,
  // ademas que tenga una animacion que en este momento es la defaults
  const opciones = {
    headerShown: false,
    animation: "default",
  };
  const { authStatus, verificar } = useAuth();

  //verificacion de sesion, si antes habia una sesion iniciada se pasa en automatico
  useEffect(() => {
    const main = async () => await verificar();
    main();
  }, []);

  return (
    <NavigationContainer>
      <Navigator screenOptions={opciones}>
        {authStatus.loged ? (
          <Group>
            <Screen name="home" component={HomeVista} />
            <Screen name="addTorneo" component={AddTorneo} />
            <Screen name="addResultado" component={AddResultadoDuelo} />
            <Screen name="perfil" component={Perfil} />
          </Group>
        ) : (
          <Group>
            <Screen name="inicio" component={InicioVista} />
            <Screen name="registro" component={RegistroVista} />
          </Group>
        )}
      </Navigator>
    </NavigationContainer>
  );
};
