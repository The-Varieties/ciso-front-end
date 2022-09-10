import ProfileIcon from "../../assets/Icons/profile_icon.svg";
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import DropdownMenu from "../dropdownMenu";


function InterfaceDropdownMenu(props) {
    const dropdownRef = useRef(null);
    const [dropdownIsActive, setActive] = useState(false);
    const toogleDropdown = () => {setActive(!dropdownIsActive)};
    
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

    const instancemodule = {name: "actionDropdownList", values: [
        {nextRoute: "/add-new-instance", menuName: "Adding Instance"},
        {nextRoute: "/financial-report", menuName: "Financial Report"},
        {nextRoute: "/database-page", menuName: "Database"},
    ]
}

    const profileDropdownList ={name:"profileDropdownList", values:[
        {nextRoute:"/profile", menuName: "Profile"},
        {nextRoute:"/", menuName:"Log Out"},
    ]
}
    
    return(
    <div className="relative w-full">
            <div className="flex">
                <DropdownMenu menuTitle="Instance Module" dropdownType='routing' dropdownList={instancemodule} roundedCornerStyling={"rounded-md"}/>

                <div className="block my-auto">
                    <img src={ProfileIcon} alt="Profile Icon" className="ml-14 h-6 cursor-pointer mx-auto my-auto" ref={dropdownRef} onClick={toogleDropdown}/>
                    <div className={`relative ${dropdownIsActive ? 'visible translate-y-4 opacity-1' : 'invisible translate-y-0 opacity-0'} transition-all duration-500 transform translate-x-5`}>
                        <nav className={`absolute h-fit w-24`} >
                            <div className="bg-white rounded-md shadow block px-5 pt-5 pb-0.5 text-sm" >
                                {profileDropdownList.values.map((instance, index) => (
                                    <div className="mb-5 text-center" key={index}>
                                        <Link to={instance.nextRoute} className="w-full font-semibold" state={{from: "dashboard"}}>{instance.menuName}</Link>
                                    </div>  
                                ))}           
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
    </div>
    )
}

export default InterfaceDropdownMenu;