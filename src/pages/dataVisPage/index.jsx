// Components:
// - backArrow
// - dataVisToolMenu (included userProfileIcon)
// - dataVisualization (TB-Developed)
// - cards:
//      - financialReport
//      - instance option (no component yet)
//      - rightsizingRecommnedation

import Card from "../../components/cards";
import pie_chart from "../../assets/DummyImages/pie_chart.svg";
import line_graph from "../../assets/DummyImages/line_graph.svg";

import { useEffect } from 'react';
import RightSizingComponent from "../../components/rightSizingComponent";

function DataVisPage() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const content = (
        <div>
            <p className="text-black w-fit text-base">
                Instances Detail <br/> <br /> Cupidatat in qui dolor magna laborum dolore deserunt mollit sunt. 
                Ullamco aliquip dolor ipsum cupidatat eu excepteur quis do incididunt. 
                Aliqua sit qui eiusmod mollit cillum labore laborum tempor mollit et sit amet Lorem veniam. 
                Nisi consequat reprehenderit ut magna ea anim anim duis sint sit eiusmod quis non. 
                Duis adipisicing incididunt pariatur deserunt ad sunt. Ullamco laboris reprehenderit mollit minim Lorem duis do. 
                Sunt qui est laboris laboris velit. Laboris tempor excepteur deserunt ipsum. 
                Deserunt pariatur aliquip quis cillum consequat dolor aliqua ipsum. 
                Ut ut et Lorem aliquip amet aliquip cupidatat Lorem proident proident tempor elit aliquip.
                Aute est nostrud eu Lorem duis. Incididunt cillum ipsum velit culpa do consequat sunt exercitation tempor veniam. 
                Elit cupidatat et labore veniam.
            </p>
        </div>
    )

    const financialContent = (
        <div>
            <h2 className="text-black w-fit font-bold text-3xl">Financial Report</h2>
            <p className="text-black w-fit text-base">
                Id sint aute nisi ipsum in minim elit et. 
                Consequat proident sit nostrud irure commodo. 
                Consectetur sit consectetur occaecat aliquip deserunt amet aute adipisicing in. 
                Ut magna officia quis dolor.
                Tempor duis consectetur nulla esse do fugiat culpa nostrud velit non cillum nisi aliquip. 
                Id labore reprehenderit mollit nisi pariatur excepteur nostrud occaecat cupidatat. 
                Ullamco fugiat ad ex veniam dolore enim tempor commodo adipisicing sunt anim. 
                Adipisicing ea esse nulla aliqua. Ullamco veniam cillum dolore minim incididunt veniam qui id ullamco.
            </p>
        </div>
    )

    const recommendationContent = (
        <div>
            <h2 className="text-black w-fit font-bold text-3xl">Recommendation</h2>
            <p className="text-black w-fit text-base">Duis deserunt reprehenderit magna minim pariatur deserunt elit enim sit. Nisi esse exercitation aute id reprehenderit duis cupidatat eu aliqua. Incididunt velit ut nisi officia non labore occaecat ex in. Consectetur mollit deserunt cillum deserunt non aliqua anim mollit aliquip aliqua dolore ad duis voluptate. Eiusmod in proident aute voluptate ipsum aute elit minim occaecat qui consectetur.</p>
        </div>
    )

    return (
        <div className="mx-16 my-5">
            <RightSizingComponent />

            <div className="flex mt-10">
                <img src={pie_chart} alt="Dummy Pie Chart" className="w-5/12" />
                <img src={line_graph} alt="Dummy Line Graph" className="w-7/12 ml-4"/>
            </div>

            {/* Layout data vis page */}

            <div className="mt-16 mb-10 grid grid-cols-5 gap-5">
                <div className="col-span-3 row-span-2"> <Card cardContent = {content} /> </div>
                <div className="col-span-2"> <Card cardContent = {financialContent} /> </div>
                <div className="col-span-2"> <Card cardContent = {recommendationContent} /> </div>
            </div>
        </div>
    )
}

export default DataVisPage;