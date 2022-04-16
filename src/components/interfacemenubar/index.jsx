import DownArrow from "../../assets/Icons/down_arrow.svg";
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function InterfaceDropdownMenu(props) {
    const dropdownRef = useRef(null);
    const [dropdownIsActive, setActive] = useState(false);
    const toogleDropdown = () => {setActive(!dropdownIsActive)};
    const rotatingAnimation = `${dropdownIsActive ? 'rotate-180' : 'rotate-0'} transition-transform duration-200 transform`;
    
    useEffect(() => {
        const closeDropdown = (e) => {
            if(dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
                setActive(false);
            }
        }

        if(dropdownIsActive) {
            window.addEventListener('click', closeDropdown);
        }
        
        return() => {
            window.removeEventListener('click', closeDropdown);
        }
    }, [dropdownIsActive, dropdownRef])
    
    return(
        <div className="block">
            <div className="flex bg-white rounded-md h-10 w-fit px-5 mx-5 text-sm">
                <div ref={dropdownRef} className="my-auto flex w-fit cursor-pointer" onClick={toogleDropdown}>
                    <p>Instance Module</p>
                    <img src={DownArrow} alt="Down Arrow" className={`h-3 w-fit my-auto ml-1 ${rotatingAnimation}`}/>
                </div>
            </div>

            <div className={`relative mx-5 ${dropdownIsActive ? 'visible translate-y-2 opacity-1' : 'invisible translate-y-0 opacity-0'} transition-all duration-500 transform`}>
                <nav className={`absolute h-fit w-36`} >
                    <div className="bg-white rounded-md shadow block px-5 pt-3 pb-5 text-sm" >
                        <Link to={"/"} className="w-full">Adding Instance</Link>
                    </div>
                    <div className="bg-white rounded-md shadow block px-5 pt-3 pb-5 text-sm" >
                        <Link to={"/"} className="w-full">Financial Report</Link>
                    </div>
                    <div className="bg-white rounded-md shadow block px-5 pt-3 pb-5 text-sm" >
                        <Link to={"/"} className="w-full">Database</Link>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default InterfaceDropdownMenu;