import React, { useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import * as Location from "expo-location";
import * as LocationGeocoding from "expo-location";
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Octicons, Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Carousel from '../../components/Carousel';
import Categories from '../../components/Categories';


const index = () => {
    const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
    const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
        "fetching your location ..."
    );

    useEffect(() => {
        CheckIfLocationEnabled();
        GetCurrentLocation();
    }, []);

    const CheckIfLocationEnabled = async () => {
        let enabled = await Location.hasServicesEnabledAsync();
    
        if (!enabled) {
          Alert.alert(
            "Location Services not enabled",
            "Please enable your location services to continue",
            [{ text: "OK" }],
            { cancelable: false }
          );
        } else {
          setLocationServicesEnabled(true);
        }
      };

      const GetCurrentLocation = async () => {
        let { status } = await Location.requestBackgroundPermissionsAsync();
    
        if (status !== "granted") {
          Alert.alert(
            "Permission not granted",
            "Allow the app to use the location service",
            [{ text: "OK" }],
            { cancelable: false }
          );
        }
    
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        console.log(location);
        let { coords } = await Location.getCurrentPositionAsync();
        if (coords) {
          const { latitude, longitude } = coords;
    
          let response = await Location.reverseGeocodeAsync({
            latitude,
            longitude,
          });
    
          const address = await LocationGeocoding.reverseGeocodeAsync({
            latitude,
            longitude,
          });
    
          const streetAddress = address[0].name;
          for (let item of response) {
            let address = `${item.name}, ${item?.postalCode}, ${item?.city}`;
    
            setDisplayCurrentAddress(address);
          }
        }
    };
      console.log("my address", displayCurrentAddress);

    

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          padding: 10,
        }}
      >
        <Octicons name="location" size={24} color="#E52850" />
        <View style={{flex:1}}>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>Deliver To</Text>
          <Text style={{ color: "gray", fontSize: 16, marginTop: 3 }}>
            {displayCurrentAddress}
          </Text>
        </View>
        <Pressable 
           style={{
            backgroundColor: "#6CB4EE",
            width: 40,
            height: 40,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>S</Text>
        </Pressable>
      </View>

      <View
         style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderWidth: 1,
          borderColor: "#C0C0C0",
          paddingVertical: 8,
          paddingHorizontal: 10,
          borderRadius: 11,
          marginTop: 10,
          marginHorizontal: 10,
        }}
      >
         <TextInput placeholder="Search for food, hotels" />
        <AntDesign name="search1" size={24} color="#E52B50" />
      </View>

      <Carousel />
      <Categories/>
    </ScrollView>
  )
}

export default index