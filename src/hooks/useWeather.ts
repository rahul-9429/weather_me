import type { Coordinates } from "@/api/types"
import { weather } from "@/api/weather"
import { useQuery } from "@tanstack/react-query"

export const Weather_keys={
   weather:(coords:Coordinates)=>['weather',coords] as const,
   forecast:(coords:Coordinates)=>['forecast',coords] as const,
   location:(coords:Coordinates)=>['location',coords] as const
} as const


export  function useWeather(coordinates : Coordinates | null) {
   return useQuery({
    queryKey:Weather_keys.weather(coordinates ?? {lat:0,lon:0}),
      queryFn:()=>coordinates?weather.GetCurrentWeather(coordinates):null,
      enabled:!!coordinates,
   })   
}

export  function useForecastQuery(coordinates : Coordinates | null) {
   return useQuery({
    queryKey:Weather_keys.forecast(coordinates ?? {lat:0,lon:0}),
      queryFn:()=>coordinates?weather.GetForecast(coordinates):null,
      enabled:!!coordinates,
   })   
}


export  function useReverseGeoCodeQuery(coordinates : Coordinates | null) {
   return useQuery({
    queryKey:Weather_keys.location(coordinates ?? {lat:0,lon:0}),
      queryFn:()=>coordinates?weather.ReverseGeoCode(coordinates):null,
      enabled:!!coordinates,
   })   
}
