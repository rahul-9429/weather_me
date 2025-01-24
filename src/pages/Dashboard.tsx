import { Button } from '@/components/ui/button'
import { useGeoLoc } from '@/hooks/useGeoLoc'
import { MapPin, RefreshCw } from 'lucide-react'
import LWoading from '@/components/ui/loading'
import { AlertCircle } from "lucide-react"
import {Skeleton} from '@/components/ui/skeleton'
import CurrentWeather from '@/components/ui/currentWeather'
import { WeatherDetails } from '@/components/ui/weather_details'

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { useForecastQuery, useReverseGeoCodeQuery, useWeather } from '@/hooks/useWeather'
import { HourlyTemperature } from '@/components/ui/hourly'
import { WeatherForecast } from '@/components/ui/weather_forecast'
const Dashboard = () => {
const {coordinates, error, getLocation, 
  isLoading:locationLoading} = useGeoLoc();
console.log(coordinates);

const locationQuery = useReverseGeoCodeQuery(coordinates);
const forecastQuery = useForecastQuery(coordinates);
const weatherQuery = useWeather(coordinates);
 console.log("fcku", weatherQuery.data)
console.log(locationQuery, forecastQuery, weatherQuery);

const handleRefresh=()=>{
  getLocation();
  if(coordinates){
    weatherQuery.refetch();
    forecastQuery.refetch();
    locationQuery.refetch();
  }
};

if(locationLoading){
 return <LWoading/>
}
if(!locationLoading && error){
 return(  <Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Location Error</AlertTitle>
  <AlertDescription className='flex flex-col gap-5'>
   <p>{error}</p>
   <Button onClick={getLocation} variant={'outline'} className='w-fit'>

    <MapPin className='h-4 w-4'/> 
    Enable Location
   </Button>
  </AlertDescription>
</Alert>)
}
const locationName = locationQuery.data?.[0];
if(!weatherQuery.error && forecastQuery.error){
  return(  <Alert variant="destructive">
   <AlertCircle className="h-4 w-4" />
   <AlertTitle>Error</AlertTitle>
   <AlertDescription className='flex flex-col gap-5'>
    <p>Failed to fetch weather data. Please try again.</p>
    <Button onClick={getLocation} variant={'outline'} className='w-fit'
    disabled={weatherQuery.isFetching || forecastQuery.isFetching}>
 
     <RefreshCw className='h-4 w-4'/> 
    Refresh
    </Button>
   </AlertDescription>
 </Alert>)
 }
if(!weatherQuery.data || !forecastQuery.data){
  return <Skeleton/>;
}

console.log(locationName);
  return (
    <div className='space-y-4 '>
      {/* Favourite City */}
      <div className='flex justify-between items-center'>
        <h1 className='text-xl font-bold tracking-tight'>My Location</h1>
        <Button variant={'outline'}
        size={"icon"}
        onClick={handleRefresh}
        // disabled={false}
        >
          <RefreshCw  className={`h-4 w-4 ${weatherQuery.isFetching? "animate-spin":""} `}/>
        </Button>
      </div>
  
    <div className='grid gap-6'>
      <div className='flex gap-12'>

    <CurrentWeather data={weatherQuery.data} locationName={locationName}/>
    <HourlyTemperature data={forecastQuery.data}/>
      </div>


      <div className="grid gap-6 md:grid-cols-2 items-start">
          <WeatherDetails data={weatherQuery.data} />
          <WeatherForecast data={forecastQuery.data} />
        </div>
    </div>

    </div>
  )
}

export default Dashboard