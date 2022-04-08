// It will draw the information (i) icon along with determining which category
// the usage should be (under, optimized, over)

import BackArrow from "../../components/backArrow";
import RefreshIcon from "../../assets/Icons/refresh_icon.svg";
import ProfileIcon from "../../assets/Icons/profile_icon.svg";
import DownArrow from "../../assets/Icons/down_arrow.svg";

function RightSizingComponent(props){
    // 0 --> Optimized, 1 --> Under, 2 --> Over
    // This value can be changed to continuous value if needed
    const rightsizingCat = 1;

    return(
        <div className="flex h-10 mt-6">
            <BackArrow />

            {/* Right side */}
            <div className="relative w-full">
                <div className="absolute top-0 right-0">
                    <div className="flex">
                        <img src={RefreshIcon} alt="Refresh Icon" className="h-6 cursor-pointer my-auto"/>

                        <div className="flex bg-white rounded-md h-10 w-fit px-5 mx-5 text-sm">
                            <div className="my-auto flex w-fit cursor-pointer">
                                <p>Instance State</p>
                                <img src={DownArrow} alt="Down Arrow" className="h-3 w-fit my-auto ml-1"/>
                            </div>
                            <div className="my-auto ml-10 flex cursor-pointer">
                                <p>Action</p>
                                <img src={DownArrow} alt="Down Arrow" className="h-3 w-fit my-auto ml-1"/>
                            </div>
                        </div>

                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-7 my-auto ${rightsizingCat == 0 ? "stroke-green-500" : [rightsizingCat == 1 ? "stroke-yellow-300" : "stroke-red-600"]}`} viewBox="0 0 24 24" stroke-width="2" fill="none">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>

                        <img src={ProfileIcon} alt="Profile Icon" className="h-6 cursor-pointer ml-5 my-auto"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RightSizingComponent;