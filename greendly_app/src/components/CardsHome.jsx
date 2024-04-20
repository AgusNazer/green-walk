import * as React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import CustomText from './CustomText';

export default function CardsHome(props) {
  const { toggleInputs } = props;

  return (
    <View className="flex-1 bg-[#fff]" style={{ zIndex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      <ScrollView>        

        <View className="relative h-64 mt-2 mx-2 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
          <Image
            source={{ uri: 'https://media.istockphoto.com/id/1210120932/photo/close-up-of-athletic-woman-putting-on-sneakers.jpg?s=612x612&w=0&k=20&c=U4jBfMvYjX0Jl2qj76z2XiMznGlYB9T7dgbFT7HflDw=' }}
            className="w-full h-full"
            resizeMode="cover"
          />
          <TouchableOpacity onPress={toggleInputs} style={{ position: 'absolute', bottom: '', left: '54%' }}>
            <LinearGradient
              className="px-7 py-3 m-4 rounded-full"
              colors={['#24B035', '#97E700']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <CustomText className="text-xl text-center text-gray-950 font-semibold">
                I'm Ready!    
              </CustomText>
            </LinearGradient>
           
          </TouchableOpacity>

          <CustomText className='absolute top-[73%] left-3 text-white text-xl bg-[#00000090] px-4 rounded-xl text-left w-[74%]'>
            Are you ready to start walking and earning tokens?
          </CustomText>
        </View>


        <View className="relative h-64 mt-2 mx-2 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
          <Image
            source={{ uri: 'https://www.goredforwomen.org/-/media/Images/Healthy-Living/Healthy-Lifestyle/pet-walking.jpg' }}
            className="w-full h-full"
            resizeMode="cover"
          />
          <TouchableOpacity onPress={toggleInputs} style={{ position: 'absolute', bottom: '', left: '51%' }}>
            <LinearGradient
              className="px-7 py-3 m-4 rounded-full"
              colors={['#24B035', '#97E700']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <CustomText className="text-xl text-center text-gray-950 font-semibold">
                Pet friendly
              </CustomText>
            </LinearGradient>
          </TouchableOpacity>

          <CustomText className='absolute top-[73%] left-3 text-white text-xl bg-[#00000090] px-4 rounded-xl text-left w-[65%]'>
            Earn tokens while walking your pet
          </CustomText>
        </View>


        <View className="relative h-64 mt-2 mx-2 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
          <Image
              source={{ uri: 'https://media.istockphoto.com/id/1396728049/es/foto/bien-hecho-este-fue-un-gran-entrenamiento.webp?b=1&s=170667a&w=0&k=20&c=sOlCjo1ax1PKTKeBtferZfRjo8D33i-AVlaR3ub-L9E=' }}
              className="w-full h-full absolute"
              style={{ transform: [{ scaleX: -1 }] }}
              resizeMode="cover"
            />
          <TouchableOpacity onPress={toggleInputs} style={{ position: 'absolute', bottom: '', left: '53%' }}>
            <LinearGradient
              className="px-7 py-3 m-4 rounded-full"
              colors={['#24B035', '#97E700']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <CustomText className="text-xl text-center text-gray-950 font-semibold">
                Challenges
              </CustomText>
            </LinearGradient>
          </TouchableOpacity>

          <CustomText className='absolute top-[73%] left-3 text-white text-xl bg-[#00000090] px-4 rounded-xl text-left w-[70%]'>
            Claim your token and prizes obtained
          </CustomText>
        </View>


        <View className="relative h-64 mt-2 mx-2 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
          <Image
            source={{ uri: 'https://www.webconsultas.com/sites/default/files/styles/wc_adaptive_noticia__medium__webp/public/media/2022/11/10/caminar_deprisa_jpg.webp' }}
            className="w-full h-full"
            resizeMode="cover"
          />
          <TouchableOpacity onPress={toggleInputs} style={{ position: 'absolute', bottom: '', left: '53%' }}>
            <LinearGradient
              className="px-7 py-3 m-4 rounded-full"
              colors={['#24B035', '#97E700']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text className="text-xl text-center text-gray-950 font-semibold">
                I'm Ready!!     
              </Text>
            </LinearGradient>
           
          </TouchableOpacity>

          <CustomText className='absolute top-[73%] left-3 text-white text-xl bg-[#00000090] px-4 rounded-xl text-left w-[74%]'>
            Are you ready to start walking and earning tokens?
          </CustomText>
        </View>

      </ScrollView>
    </View>
  );
}