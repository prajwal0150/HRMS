import React, { useState } from 'react';
import axios from "axios";
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRouter} from 'expo-router'

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const router=useRouter();



  const handleLogin = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.email || !formData.password) {
      setError("Please fill all fields");
      return;
    } 
    if (!emailRegex.test(formData.email)) {
      setError("Invalid Email.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/auth/login", formData);

      if (response.status === 200) {
        const { token, user } = response.data;
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("user", JSON.stringify(user));
        console.log("Login success:", response.data);
        router.replace('/')
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <View className="flex-1 flex-col items-center gap-4 px-6 justify-center">
      <Text className="text-xl font-bold">Welcome Back</Text>

      <View className="flex flex-col gap-2 w-full">
        <Text className="text-lg">Email</Text>
        <TextInput
          className="border p-2 rounded"
          placeholder="example@gmail.com"
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, email: text }))
          }
          value={formData.email}
        />

        <Text className="text-lg">Password</Text>
        <TextInput
          className="border p-2 rounded"
          placeholder="********"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(text) =>
            setFormData((prev) => ({ ...prev, password: text }))
          }
          value={formData.password}
        />

        {error ? <Text className="text-red-500">{error}</Text> : null}
      </View>

      {/* Login Button */}
      <TouchableOpacity
        className="bg-black w-full p-2 rounded-md mt-4"
        onPress={handleLogin}
      >
        <Text className="text-white text-center">Login</Text>
      </TouchableOpacity>
    </View>
  );
}
