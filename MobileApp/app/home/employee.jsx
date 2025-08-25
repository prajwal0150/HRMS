import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const Employee = () => {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await axios.get("http://localhost:8000/employee/getAllEmployee", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        setEmployees(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
    console.log( employees);
  }, []);

  const renderEmployee = ({ item }) => (
    <View>
  
    <View className="bg-white p-4 rounded-2xl shadow-md mb-4">
     
      <View className="flex-row items-center">
        <View className="bg-gray-200 p-3 rounded-full mr-3">
          <Icon name="user" size={22} color="gray" />
        </View>

        <View className="flex-1">
          
          <Text className="text-gray-500">{item.email}</Text>
         
        </View>
        

        <View className="flex-row space-x-4">
          
          <TouchableOpacity>
            <Icon name="edit" size={20} color="green" />
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => handleDelete(item._id)}
          >
            <Icon name="trash" size={20} color="red" />

          </TouchableOpacity>
        </View>
      </View>
    </View>
    </View>
  );
    const handleDelete = async (_id) => {
   

    const token = AsyncStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:8000/employee/delete/:id${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployees((prev) => prev.filter((emp) => emp.id !== _id));
      alert("Employee deleted successfully");
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Something went wrong while deleting the employee");
    }
  };

  return (
    <View className="flex-1 bg-sky-100 p-4">
      <Text className="text-black font-bold text-xl mb-4 text-center">Employees</Text>
      <FlatList
        data={employees}
        keyExtractor={(item) => item._id}

        renderItem={renderEmployee}
      />
    </View>
  );
};

export default Employee;
