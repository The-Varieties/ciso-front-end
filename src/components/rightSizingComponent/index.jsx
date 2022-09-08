import BackArrow from "../../components/backArrow";
import RefreshIcon from "../../assets/Icons/refresh_icon.svg";
import ProfileIcon from "../../assets/Icons/profile_icon.svg";
import DropdownMenu from "../dropdownMenu";
import {connect} from 'react-redux';
import React from "react";
import {getInstance} from '../../store/actions/instanceAction';
import { useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom';


function RightSizingComponent(props){
    // 0 --> Optimized, 1 --> Under, 2 --> Over
    // This value can be changed to continuous value if needed
    const [rightsizingCat, setRightsizingCat] = useState();
    const dropdownRef = useRef(null);
    const [dropdownIsActive, setActive] = useState(false);
    const toogleDropdown = () => {setActive(!dropdownIsActive)};
    
    useEffect(() => {
        props.getInstance();
        setRightsizingCat(props.instance.instance.usage_cat);
    }, [props]);

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

    const instanceDropdownList = {name: "instanceDropdownList", values: [
            {nextRoute: "/", menuName: "Start Instance"},
            {nextRoute: "/", menuName: "Stop Instance"},
            {nextRoute: "/", menuName: "Reboot Instance"},
        ]
    }

    const actionDropdownList = {name: "actionDropdownList", values: [
            {nextRoute: "/", menuName: "RAM Setting"},
            {nextRoute: "/", menuName: "Storage Setting"},
            {nextRoute: "/", menuName: "Security Setting"},
        ]
    }

    const profileDropdownList ={name:"profileDropdownList", values:[
            {nextRoute:"/profile", menuName: "Profile"},
            {nextRoute:"/", menuName:"Log Out"},
        ]
    }

    return(
        <div className="flex h-10 mt-6">
            <BackArrow backPath = "/"/>

            {/* Right side */}
            <div className="relative w-full">
                <div className="absolute top-0 right-0">
                    <div className="flex">
                        <img src={RefreshIcon} alt="Refresh Icon" className="h-6 cursor-pointer my-auto mr-10"/>

                        <DropdownMenu menuTitle="Instace State" dropdownList={instanceDropdownList} roundedCornerStyling={"rounded-l-md"}/>
                        <DropdownMenu menuTitle="Action" dropdownList={actionDropdownList} roundedCornerStyling={"rounded-r-md"}/>

                        <svg xmlns="http://www.w3.org/2000/svg" className={`ml-10 h-7 my-auto ${rightsizingCat === 0 ? "stroke-green-500" : [rightsizingCat === 1 ? "stroke-yellow-300" : "stroke-red-600"]}`} viewBox="0 0 24 24" strokeWidth="2" fill="none">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                        {/* <Link to={"/profile"}></Link> */}
                        <div className="block my-auto mx-10">
                            <img src={ProfileIcon} alt="Profile Icon" className="h-6 cursor-pointer mx-auto my-auto" ref={dropdownRef} onClick={toogleDropdown}/>
                            <div className={`relative ${dropdownIsActive ? 'visible translate-y-4 opacity-1' : 'invisible translate-y-0 opacity-0'} transition-all duration-500 transform -translate-x-9`}>
                                <nav className={`absolute h-fit w-24`} >
                                    <div className="bg-white rounded-md shadow block px-5 pt-5 pb-0.5 text-sm" >
                                        {profileDropdownList.values.map((instance, index) => (
                                            <div className="mb-5 text-center" key={index}>
                                                <Link to={instance.nextRoute} className="w-full font-semibold">{instance.menuName}</Link>
                                            </div>  
                                        ))}           
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({instance: state.instance})

export default connect(mapStateToProps, {getInstance})(RightSizingComponent)