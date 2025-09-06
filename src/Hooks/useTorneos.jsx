import { useContext } from "react";
import { torneosContext } from "../contexto/torneos.context";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { BD } from "../componentes/firebase.config";
import { authContex } from "../contexto/auth.context";

export const useTorneos = () => {
  const { Torneos, setTorneos } = useContext(torneosContext);
  const { authStatus } = useContext(authContex);

  //función para crear la jornada del torneo
  async function CrearTorneo(torneo) {
    const data = await addDoc(
      collection(BD, `torneos-${authStatus.user.email}`),
      torneo
    );
    return data;
  }

  //funcion para obtener los datos de la jornada y mostrar los datos
  async function GetTorneos() {
    const data = await getDocs(
      collection(BD, `torneos-${authStatus.user.email}`)
    );
    // se crea la constante torneos como array vacio,
    const torneos = [];
    // por cada torneo que se obtiene, se agrega al array vacio con los datos y la id
    data.forEach((torneo) => {
      const resultados = torneo.data().resultados.sort((equipo1, equipo2) => {
        return equipo1.id - equipo2.id;
      });

      torneos.push({
        ...torneo.data(),
        resultados,
        id: torneo.id,
      });
    });

    setTorneos(torneos);
  }

  //funcion para borrar la jornada / delate doc
  async function DeleteTorneo(id) {
    await deleteDoc(doc(BD, `torneos-${authStatus.user.email}`, id));
    //filtra los torneos para eliminar el torneo con la id especificada
    const duelos = Torneos.filter((t) => t.id !== id);

    // se actualizan los torneos/jornadas para que no apareza
    setTorneos(duelos);
  }

  //actualizar los datos de la jornada/torneo (añadir goles)
  async function UpdateTorneo(torneo) {
    await updateDoc(
      doc(BD, `torneos-${authStatus.user.email}`, torneo.id),
      torneo
    );
  }

  return {
    Torneos,
    setTorneos,
    CrearTorneo,
    GetTorneos,
    UpdateTorneo,
    DeleteTorneo,
  };
};
