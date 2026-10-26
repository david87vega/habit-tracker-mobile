
import React, {
  createContext,
  useContext,
  useState,
} from 'react';

const HabitsContext = createContext(null);

export function HabitsProvider({ children }) {
  const [habits, setHabits] = useState([]);
  const [nextId, setNextId] = useState(1);

  function addHabit(nombre, descripcion) {
    const nuevoHabito = {
      id: nextId,
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      completadoHoy: false,
    };

    setHabits((actuales) => [...actuales, nuevoHabito]);
    setNextId((actual) => actual + 1);
  }

  function toggleHabit(id) {
    setHabits((actuales) =>
      actuales.map((habito) =>
        habito.id === id
          ? {
              ...habito,
              completadoHoy: !habito.completadoHoy,
            }
          : habito
      )
    );
  }

  function deleteHabit(id) {
    setHabits((actuales) =>
      actuales.filter((habito) => habito.id !== id)
    );
  }

  return (
    <HabitsContext.Provider
      value={{
        habits,
        addHabit,
        toggleHabit,
        deleteHabit,
      }}
    >
      {children}
    </HabitsContext.Provider>
  );
}

export function useHabits() {
  const context = useContext(HabitsContext);

  if (!context) {
    throw new Error(
      'useHabits debe utilizarse dentro de HabitsProvider'
    );
  }

  return context;
}
