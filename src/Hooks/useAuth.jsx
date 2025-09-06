import { useContext } from "react";
import { authContex } from "../contexto/auth.context";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../componentes/firebase.config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { torneosContext } from "../contexto/torneos.context";

export const useAuth = () => {
  const { authStatus, setauthStatus } = useContext(authContex);
  const { setTorneos } = useContext(torneosContext);

  //verificacion de sesion, si antes habia una sesion iniciada se pasa en automatico
  async function verificar() {
    const email = await AsyncStorage.getItem("user-email");
    const contra = await AsyncStorage.getItem("user-contra");

    if (email && contra) {
      // si existe email y contraseña "llama" al iniciar sesion y
      await iniciarSesion(email, contra);
    }
  }

  //funcion para registrarse
  async function registro(email, contra) {
    try {
      const datos = await createUserWithEmailAndPassword(auth, email, contra);
      if (datos.user.email) {
        const user = {
          loged: true,
          user: {
            email: datos.user.email,
          },
        };
        setauthStatus(user);
        await AsyncStorage.setItem("user-email", email);
        await AsyncStorage.setItem("user-contra", contra);
        return {
          ...user,
          mensaje: `iniciado sesion con ${datos.user.email}`,
        };
      }
      return {
        user: null,
        loged: false,
        mensaje: `error`,
      };
    } catch (error) {
      return {
        user: null,
        loged: false,
        mensaje: `error`,
      };
    }
  }
  //funcion cerrar sesion
  async function cerrarSesion() {
    try {
      await signOut(auth);

      await AsyncStorage.removeItem("user-email");
      await AsyncStorage.removeItem("user-contra");
      setTorneos([]);

      setauthStatus({
        loged: false,
        user: null,
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  //funcion iniciar sesion
  async function iniciarSesion(email, contra) {
    try {
      const datos = await signInWithEmailAndPassword(auth, email, contra);
      if (datos.user.email) {
        const user = {
          loged: true,
          user: {
            email: datos.user.email,
          },
        };
        setauthStatus(user);
        await AsyncStorage.setItem("user-email", email);
        await AsyncStorage.setItem("user-contra", contra);
        return {
          ...user,
          mensaje: `Se ha iniciado sesión`,
        };
      }
      return {
        user: null,
        loged: false,
        mensaje: `error`,
      };
    } catch (error) {
      console.log(error);
      return {
        user: null,
        loged: false,
        mensaje: `error`,
      };
    }
  }
  return {
    verificar,
    cerrarSesion,
    iniciarSesion,
    registro,
    authStatus,
    setauthStatus,
  };
};
