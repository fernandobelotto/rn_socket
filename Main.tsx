import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { io } from "socket.io-client";
import Toast from 'react-native-root-toast';


// set the serverUrl to be the link grabbed from the ngrok terminal
const serverUrl = ""
export const socket = io(serverUrl);

export default function Main() {

  const [isConnected, setIsConnected] = useState(socket.connected);


  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("hello", (data) => {
      console.log(data)

      Toast.show(data, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
    });

    });
    return () => {
      socket.off('hello')
    }
  }, []);

  const sendMessage = () => {
    socket.emit("hello");
  };


  return (
    <View style={styles.container}>
      {isConnected ? (
        <Text style={styles.text}>Connected</Text>
      ) : (
        <Text style={styles.text}>Disconnected</Text>
      )}
      <Button onPress={sendMessage} title="Send Message" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
