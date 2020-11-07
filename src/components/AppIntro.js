import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect } from 'react'
import {View, Image, Modal} from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider';
import { color } from 'react-native-reanimated';
import { scale } from 'react-native-size-matters';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Images, Metrics } from '../theme';
import Button from './common/Button';
import Text from './common/Text';


const slides = [
    {
      key: 'one',
      title: 'Learn',
      text: 'Make yourself better',
      image: Images.banner1,
      description:'Learn new stuffs and get professional'
    },
    {
      key: 'two',
      title: 'Earn',
      text: 'Earn money with youor knowledge',
      image: Images.banner2,
      description:'You can earn professionally with our bootcamps'
    },
    {
      key: 'three',
      title: 'Help',
      text: 'Help others by educating',
      image: Images.banner3,
      description:'Create your own bootcamps and help others'
    }
  ];

export default function AppIntro({visible,toggleModal}){
    useEffect(()=>{
        setFlag()
    },[])
    const setFlag=async ()=>{
        await AsyncStorage.setItem("visited","true")
    }
    const renderSlides=({item, index}) =>{
        return(
            <View>
                <Image
                    style={{width:Metrics.screenWidth, height:scale(270)}}
                    resizeMode="contain"
                    source={item.image}
                />
                <View style={{marginTop:Metrics.doubleBase}}>
                    <Text primaryColor bold mega centered>
                        {item.title}
                    </Text>
                    <Text primaryColor bold mega centered style={{marginTop:Metrics.halfBase}}>
                        {item.subtitle}
                    </Text>
                    <Text color='#666' centered style={{marginTop:Metrics.base}}>
                        {item.description}
                    </Text>
                </View>
                {index===slides.length-1 && <Button style={{width:200,alignSelf:"center", marginTop:Metrics.doubleBase}} title="Explore now" onPress={toggleModal}/>}
            </View>
        )
    }
    return(
        <Modal visible={visible}>
            <AppIntroSlider
            activeDotStyle={{backgroundColor:Colors.primary}}
            data={slides}
            renderItem={renderSlides}
            />
        </Modal>
    )
}
