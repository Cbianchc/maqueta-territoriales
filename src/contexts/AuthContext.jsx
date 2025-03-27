import React, { createContext, useContext, useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore"; 
import { auth } from "../services/firebase";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const db = getFirestore();
          const userRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();
            setUser({
              id: currentUser.uid,
              name: userData.name,
              role: userData.role,
            });
          }
        }
      } catch (error) {
        console.error("Error al obtener usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


// import React, { createContext, useContext, useState, useEffect } from "react";

// // Crea el contexto de autenticación
// const AuthContext = createContext();

// // Proveedor de contexto de autenticación
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // Guarda la información del usuario
//   const [loading, setLoading] = useState(true); // Controla el estado de carga

//   // Simula la autenticación (esto debería ir con Firebase, por ejemplo)
//   useEffect(() => {
//     const fetchUser = () => {
//       // Simulación: Reemplazar con lógica real de autenticación (Firebase u otro servicio)
//       const authenticatedUser = {
//         id: "1",
//         name: "Juan Pérez",
//         role: "admin" // Los roles pueden ser admin, user, guest, etc.
//       };
//       setUser(authenticatedUser);
//       setLoading(false);
//     };
//     fetchUser();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Hook personalizado para usar el contexto de autenticación
// export const useAuth = () => {
//   return useContext(AuthContext);
// };
