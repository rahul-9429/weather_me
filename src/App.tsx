import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Layout from './Layout'
import { ThemeProvider } from "./context/theme-provider";
import Dashboard from './pages/Dashboard'
import {CityPage} from './pages/city-page'
import { QueryClient,
  QueryClientProvider,} from "@tanstack/react-query";
  import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime: 5*60*1000,
      gcTime:10*60*1000,
      retry:false,
      refetchOnWindowFocus:false,
    }
  }
})
function App() {

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/city/:cityName" element={<CityPage />} />
        </Routes></Layout>
    </ThemeProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}

export default App
