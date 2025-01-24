import type { PropsWithChildren } from 'react'
import Header from './pages/Header'
const Layout = ({children}: PropsWithChildren) => {
  return (
    <div className=" bg-gradient-to-br from-background to-muted">
        <Header/>
        <main className="min-h-screen container mx-auto px-4 py-8">
        {children}
        </main>
        <footer className="border-t backdrop-blur"> 
            <div className='container mx-auto px-4 py-8 text-center text-gray-500'>
            <p className='text-sm'>Built with Shadcn ui.</p></div>
        </footer>
        </div>
  )
}

export default Layout