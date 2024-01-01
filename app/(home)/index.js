import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import * as Location from "expo-location";
import * as LocationGeocoding from "expo-location";


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
    <View>
        <Text>Home screen</Text>
    </View>
  )
}

export default index