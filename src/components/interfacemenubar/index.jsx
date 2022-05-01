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
            <div className="flex bg-white rounded-md h-10 text-sm">
                <div ref={dropdownRef} className="my-auto flex w-max cursor-pointer mx-auto" onClick={toogleDropdown}>
                    <p className="font-semibold">Instance Module</p>
                    <img src={DownArrow} alt="Down Arrow" className={`h-3 w-fit my-auto ml-1 ${rotatingAnimation}`}/>
                </div>
            </div>

            <div className={`relative ${dropdownIsActive ? 'visible translate-y-2 opacity-1' : 'invisible translate-y-0 opacity-0'} transition-all duration-500 transform`}>
                <nav className={`absolute h-fit w-full`} >
                    <div className="bg-white rounded-md shadow block py-5 text-sm text-center">
                        <div className="mb-5">
                            <Link to={"/add-new-instance"} className="w-full font-semibold">Adding Instance</Link>
                        </div>
                        <div className="mb-5">
                            <Link to={"/financial-report"} className="w-full font-semibold">Financial Report</Link>
                        </div>  
                        <div>
                            <Link to={"/database-page"} className="w-full font-semibold">Database</Link>
                        </div>  
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default InterfaceDropdownMenu;