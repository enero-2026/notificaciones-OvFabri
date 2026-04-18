import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Button, Title, Provider as PaperProvider } from 'react-native-paper';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';


//Holaaaa
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    cargarContador();
  }, []);

  useEffect(() => {
    guardarContador(contador);
  }, [contador]);

  const guardarContador = async (valor) => {
    try {
      await AsyncStorage.setItem("contador", JSON.stringify(valor));
    } catch (e) { console.log("Error guardando", e); }
  };

  const cargarContador = async () => {
    try {
      const data = await AsyncStorage.getItem("contador");
      if (data !== null) setContador(JSON.parse(data));
    } catch (e) { console.log("Error cargando", e); }
  };

  const enviarNotificacion = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "¡Reporte de Contador!",
        body: `Llevas un total de ${contador} clics.`,
      },
      trigger: null,
    });
  };

  return (
    <PaperProvider>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10 }}>
        <Title>Notificaciones + Storage</Title>
        <Text style={{ fontSize: 30, marginBottom: 20 }}>{contador}</Text>
        
        <Button mode="contained" onPress={() => setContador(contador + 1)}>
          Incrementar
        </Button>
        
        <Button mode="outlined" onPress={enviarNotificacion}>
          Notificar Valor
        </Button>
      </View>
    </PaperProvider>
  );
}