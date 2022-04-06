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

function DataVisPage() {
    const content = (
        <div className="pr-96 pb-80">
            <h2 className="text-black w-fit font-bold text-3xl">Recommendation</h2>
            <p className="text-black w-fit text-base">Lorem ipsum dolor sit amet</p>
        </div>
    )

    return (
        <div>
            <h1 className="w-fit">Top Component</h1>

            <div className="flex mt-10">
                <img src={pie_chart} alt="Dummy Pie Chart" className="w-5/12" />
                <img src={line_graph} alt="Dummy Line Graph" className="w-7/12 ml-4"/>
            </div>

            {/* Layout data vis page */}

            <div className="mt-16 mb-10">
                <Card cardContent = {content} />
            </div>
        </div>
    )
}

export default DataVisPage;