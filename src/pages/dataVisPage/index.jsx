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
        <div className="pl-10">
            <h2 className="text-black w-fit font-bold text-2xl">Recommendation</h2>
            <p className="text-black w-fit text-base">Lorem ipsum dolor sit amet</p>
        </div>
    )

    return (
        <div>
            <Card cardContent = {content} />
        </div>
    )
}

export default DataVisPage;