import type { Coordinates } from "@/api/types"
import { useEffect, useState } from "react";
interface GeolocationState{
    coordinates: Coordinates | null;
    error: string | null;
    isLoading: boolean;
}
export function useGeoLoc() {
    const[locationData, setLocationData]= useState<GeolocationState>({
        coordinates: null,
        error: null,
        isLoading: true,
    });
    const getLocation = () => {
        setLocationData((prev)=>({...prev, isLoading:true, error:null}));

        if(!navigator.geolocation){
            setLocationData((prev)=>({...prev,
                coordinates:null,
                isLoading:false, error:"Geolocation is not supported"}));
            return;
        }
        navigator.geolocation.getCurrentPosition((position)=>{
            setLocationData((prev)=>({...prev,
                coordinates:{lat:position.coords.latitude, lon:position.coords.longitude},
                isLoading:false, error:null}));
        },(error)=>{
            let errorMessage: string;

            switch(error.code){
                case error.PERMISSION_DENIED:
                    errorMessage = "User denied the request for Geolocation";
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = "Location information is unavailable";
                    break;
                case error.TIMEOUT:
                    errorMessage = "The request to get user location timed out";
                    break;
                default:
                    errorMessage = "An unknown error occurred";
            }
            setLocationData({
                coordinates:null,
                error: errorMessage,
                isLoading:false,
            });
        }
    
    ,{
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    })
    }

    useEffect(()=>{
        getLocation();
    },[]);

    return{
        ...locationData,
        getLocation,
    }
}