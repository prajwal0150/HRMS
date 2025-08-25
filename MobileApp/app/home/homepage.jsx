import {View, Text, TouchableOpacity} from 'react-native'
 import Icon from "react-native-vector-icons/FontAwesome";
 import {useRouter} from "expo-router";

const homepage = () => {
  const router = useRouter();
  return (
 
      <View className=" flex-1 bg-blue-600 flex flex-col">
      <View className="w-full h-[100px] flex flex-row p-5"> 
        <Icon name='align-left' size={40} color='#fff'/>
        <Text className=" text-white font-semibold w-full text-center text-2xl "> HRMS  </Text>
      </View>

      <View className="w-full h-full bg-white rounded-[40px] grid grid-cols-2 p-5 gap-y-6 place-items-center "
      > 
      <TouchableOpacity onPress={() => router.push('/home/employee')}>
      <View className="w-[200px] h-[180px]  rounded-2xl flex flex-col gap-3 p-4 justify-center shadow-lg  " >
        <View className="w-[80px] h-[80px] bg-purple-500 rounded-xl flex items-center justify-center"
        >
            <Icon name="home" size={40}color="#fff" />
                 </View>
        <Text className="font-normal text-black text-xl"
        > Dashboard</Text>
       
      </View>
       </TouchableOpacity>


      <View className="w-[200px] h-[180px]  rounded-2xl flex flex-col gap-3 p-4 justify-center shadow-lg " >
        <View className="w-[80px] h-[80px] bg-purple-500 rounded-xl flex items-center justify-center">
             <Icon name="user" size={40}color="#ffffffff" />
             </View>
        <Text className="font-normal text-black text-xl"> Employee</Text>
      </View>

       <View className="w-[200px] h-[180px]  rounded-2xl flex flex-col gap-3 p-4 justify-center shadow-lg " >
        <View className="w-[80px] h-[80px] bg-green-500 rounded-xl flex items-center justify-center">
             <Icon name="money" size={40}color="#fff" />
             </View>
        <Text className="font-normal text-black text-xl"> Payroll</Text>
      </View>

       <View className="w-[200px] h-[180px]  rounded-2xl flex flex-col gap-3 p-4 justify-center shadow-lg " >
        <View className="w-[80px] h-[80px] bg-yellow-500 rounded-xl flex items-center justify-center">
             <Icon name="calendar" size={40}color="#ffffffff" />
             </View>
        <Text className="font-normal text-black text-xl"> Attendance </Text>
      </View>
      
    </View>
    </View>

    
  )
}

export default homepage
