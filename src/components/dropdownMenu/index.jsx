import DownArrow from "../../assets/Icons/down_arrow.svg";
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function DropdownMenu(props) {
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
            <div className={`flex bg-white ${props.roundedCornerStyling} h-10 w-max ${props.customWidth} px-11 text-sm justify-center`}>
                <div ref={dropdownRef} className="my-auto flex cursor-pointer" onClick={toogleDropdown}>
                    <p className="font-semibold">{props.menuTitle}</p>
                    <img src={DownArrow} alt="Down Arrow" className={`h-3 w-fit my-auto ml-1 ${rotatingAnimation}`}/>
                </div>
            </div>

            <div className={`relative ${dropdownIsActive ? 'visible translate-y-2 opacity-1' : 'invisible translate-y-0 opacity-0'} transition-all duration-500 transform`}>
                <nav className={`absolute h-fit w-full`} >
                    <div className="bg-white rounded-md shadow block px-5 pt-5 pb-0.5 text-sm" >
                        {props.dropdownList.values.map((instance, index) => (
                            <div className="mb-5 text-center" key={index}>
                                {props.dropdownType === 'routing' ? 
                                    <Link to={instance.nextRoute} className="w-full font-semibold">{instance.menuName}</Link>
                                :
                                    <div value={instance.menuName} className="w-full font-semibold cursor-pointer" onClick={props.dropdownCallback}>{instance.menuName}</div>
                                }
                            </div>  
                        ))}           
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default DropdownMenu;