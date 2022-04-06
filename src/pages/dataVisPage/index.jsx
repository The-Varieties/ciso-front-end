// Components:
// - backArrow
// - dataVisToolMenu (included userProfileIcon)
// - dataVisualization (TB-Developed)
// - cards:
//      - financialReport
//      - instance option (no component yet)
//      - rightsizingRecommnedation

import Card from "../../components/cards";

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
            <h1 className="mt-10 w-fit">Graphs</h1>

            {/* Layout data vis page */}

            <div className="mt-10 mb-10">
                <Card cardContent = {content} />
            </div>
        </div>
    )
}

export default DataVisPage;