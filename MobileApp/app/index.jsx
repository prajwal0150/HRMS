import "../global.css";
import { Redirect, useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from "react";
import { View, Text } from "react-native"
import axios from "axios"


export default function Index() {
  // const isLoggedIn = false;

  // if (!isLoggedIn) {
  //   return <Redirect href="/auth/login" />
  // }
  const router = useRouter();
  const verifyToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.get("http://localhost:8000", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response)

      if (response.status == 200) {
        router.replace('/home/homepage');
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      if (error.response?.status === 400 || error.response?.status === 401) {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("user");
        router.replace('/auth/login')
      }
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  // return (
  //   <View>
  //     <Text className="text-Black-500 text-center font-bold text-xl">This is Library</Text>
  //   </View>
  // );
}
