// It will draw the information (i) icon along with determining which category
// the usage should be (under, optimized, over)

import BackArrow from "../../components/backArrow";
import RefreshIcon from "../../assets/Icons/refresh_icon.svg";
import ProfileIcon from "../../assets/Icons/profile_icon.svg";
import DropdownMenu from "../dropdownMenu";

function RightSizingComponent(props){
    // 0 --> Optimized, 1 --> Under, 2 --> Over
    // This value can be changed to continuous value if needed
    const rightsizingCat = 1;

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

    return(
        <div className="flex h-10 mt-6">
            <BackArrow />

            {/* Right side */}
            <div className="relative w-full">
                <div className="absolute top-0 right-0">
                    <div className="flex">
                        <img src={RefreshIcon} alt="Refresh Icon" className="h-6 cursor-pointer my-auto"/>

                        <DropdownMenu menuTitle="Instace State" dropdownList={instanceDropdownList}/>
                        <DropdownMenu menuTitle="Action" dropdownList={actionDropdownList}/>

                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-7 my-auto ${rightsizingCat === 0 ? "stroke-green-500" : [rightsizingCat === 1 ? "stroke-yellow-300" : "stroke-red-600"]}`} viewBox="0 0 24 24" strokeWidth="2" fill="none">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                        <img src={ProfileIcon} alt="Profile Icon" className="h-6 cursor-pointer ml-5 my-auto"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RightSizingComponent;