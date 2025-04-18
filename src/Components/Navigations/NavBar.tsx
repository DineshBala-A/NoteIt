import {useState, useEffect} from 'react';
import { useTheme } from '../ThemeProvider';
import { NavLink } from 'react-router';
import { useLocation } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { open, close, toggle } from './SidebarSlice';
import logo from '../../assets/logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function getLastPathName() {
  const location = useLocation();
  return location.pathname.split('/').pop() || 'home';
}

const NavBar: React.FC = () => {
  const lastPathName = getLastPathName();
  const sidebar = useAppSelector(state=>state.sidebar.value);
  const dispatch = useAppDispatch();

  const {theme, setTheme} = useTheme();
  useEffect(()=>{console.log(theme); console.log(document.documentElement.classList)}, [theme])

  const styles={
    'button': "hover:bg-stone-300 hover:shadow-sm dark:hover:bg-zinc-700 active:opacity-[0.5] p-2 rounded-md transition-all duration-300",
    'menuButton': "hover:bg-stone-300 hover:shadow-sm dark:hover:bg-zinc-700 active:opacity-[0.5] p-2 rounded-md ",
    'selectedButton': 'underline decoration-amber-300 underline-offset-2'
  }
  const [showThemeButton, setShowThemeButton] = useState<boolean>(false);
  const [showProfileButton, setShowProfileButton] = useState<boolean>(false);
  
  return (
    <nav className="sticky h-[50px] top-0 w-full flex justify-between items-center px-3 py-2 bg-white dark:bg-zinc-800  dark:text-white text-black shadow-md transition-all duration-300"> 
      <div className="flex justify-center items-center gap-4 select-none">
        {/* SideBar */}
        <div  onClick={()=>dispatch(toggle())}>
          {sidebar ? <MenuOpenIcon className="cursor-pointer"/> : <MenuIcon className="cursor-pointer"/>}
        </div>
        <div className="flex items-center gap-1">
          {/* Title & Logo */}
          <img alt="logo" src={logo} className="w-5 h-5"/>
          <strong className="cursor-pointer dark:text-white text-black">NoteIt</strong>
        </div>
      </div>
      
      <div className="hidden sm:flex justify-around items-center gap-5 select-none cursor-pointer">
        {/* Home page navigation */}
        <NavLink to="/" className={`${styles.button}  ${lastPathName=='home'?styles.selectedButton:''}`} >Home</NavLink >
        {/* About page navigation */}
        <NavLink to="/about" className={`${styles.button}  ${lastPathName=='about'?styles.selectedButton:''}`} >About</NavLink >
        {/* Theme */}
        <div className={`relative`} 
          onMouseEnter={()=>setShowThemeButton(true)} 
          onMouseLeave={()=>setShowThemeButton(false)} 
          >
          <div className={styles.button} >Theme <ArrowDropDownIcon/></div>
          {/* Theme Menu */}
          <span className={`${showThemeButton?'block':'invisible'} absolute top-12 left-0 bg-stone-100 dark:bg-zinc-800 p-2 cursor-pointer select-none rounded-md inset-shadow-2xs  ring ring-zinc-300 transition-all duration-300  `}>
            <ul>
              <li className={`${styles.menuButton} ${theme=='dark'?styles.selectedButton:''}`} onClick={()=>{setTheme('dark')}}>Dark</li>
              <li className={`${styles.menuButton} ${theme=='light'?`${styles.selectedButton} decoration-orange-300`:''}`} onClick={()=>{setTheme('light')}}>Light</li>
              <li className={`${styles.menuButton} ${theme=='system'?styles.selectedButton:''}`} onClick={()=>{setTheme('system')}}>System</li>
            </ul>
          </span>  
        </div > 
        {/* Profile */}
        <div className="relative flex justify-center items-center"  onMouseEnter={():void=>setShowProfileButton(true)} onMouseLeave={():void=>setShowProfileButton(false)}>
          {/* Profile circle placeholder */}
          <div className="w-6 h-6 items-center rounded-full bg-zinc-400 hover:bg-zinc-700 active:opacity-[0.5]" ></div>
          <br/>
          {/* Profile Menu */}
          <span className={`${showProfileButton?'block':'invisible'} absolute top-10 left-[-70px] bg-stone-100 dark:bg-zinc-800 p-2 cursor-pointer select-none rounded-md inset-shadow-2xs  ring ring-zinc-300 transition-all duration-300`}>
            <ul>
              <li className={styles.menuButton}>Profile</li>
              <li className={styles.menuButton}>Log-out</li>
            </ul>
          </span>  
        </div>
      </div>
    </nav>
  );
  };
  
  export default NavBar;