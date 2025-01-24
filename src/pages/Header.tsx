import { useTheme } from '@/context/theme-provider'
import { Link } from 'react-router-dom'
const Header = () => {
    const {theme, setTheme} = useTheme();
    const isDark = theme === "dark";
  return (
    <header className='sticky top-0 z-50 border-b backdrop-blur py-2 w-full '>
        <div className='container mx-auto flex justify-between items-center h-16 '>
            <Link to={'/'}>KLimate</Link>

            <div>
                <div onClick={()=> setTheme(isDark ? "light":"dark")}
                    className={` cursor-pointer flex items-center transition-transform duration-500 mr-12
                    ${isDark ? "translate rounded-full p-2 bg-gray-300" : "bg-gray-500 rounded-full p-2"}
                    `}
                    >
                    {isDark ? "Light" : "Dark"}
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header