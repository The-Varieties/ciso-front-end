import BackArrow from "../../components/backArrow";
import DropdownMenu from "../dropdownMenu";
import React, { useEffect, useState, useRef } from "react";
import {
    resetRecommendedInstanceType
} from "../../store/actions/instanceAction";
import {connect} from "react-redux";

const RightSizingComponent = (props) => {
    const dropdownRef = useRef(null);
    const [dropdownIsActive, setActive] = useState(false);

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

    useEffect(() => {
        if(!props.optimizedInstance.loading) {
            props.loadingSetter(false)
            props.resetRecommendedInstanceType()
        }
    }, //eslint-disable-next-line
    [props.optimizedInstance])

    return(
        <div className="flex h-10 mt-6">
            <BackArrow backPath = "/"/>

            <div className="relative w-full">
                <div className="absolute top-0 right-0">
                    <div className="flex">
                        <button onClick={props.optimizeButtonHandle} className='mr-3 border-2 rounded-md px-10 bg-white font-bold text-sm'>
                            Optimize
                        </button>

                        <div className="mr-10">
                            <DropdownMenu 
                                menuTitle={props.checked} 
                                dropdownCallback={props.dropdownCallback} 
                                dropdownList={props.dataVisTimeList} 
                                roundedCornerStyling="rounded-md"
                                customWidth="w-44"
                            />
                        </div>

                        <svg xmlns="http://www.w3.org/2000/svg" className={`ml-10 h-7 my-auto ${props.rightsizingCat === 'Optimized' ? "stroke-green-500" : [props.rightsizingCat === 'UnderUtilized' ? "stroke-yellow-300" : "stroke-red-600"]}`} viewBox="0 0 24 24" strokeWidth="2" fill="none">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({ optimizedInstance: state.optimizedInstance.optimizedInstance })

const mapDispatchToProps = {resetRecommendedInstanceType}

export default connect(mapStateToProps, mapDispatchToProps)(RightSizingComponent);