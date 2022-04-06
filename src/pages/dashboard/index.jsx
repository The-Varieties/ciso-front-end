// Components:
// - toolMenu
// - userProfileIcon
// - cards
// - deleteInstance

import Card from "../../components/cards";

function Dashboard(){
    const content = (
        <div className="pr-20 pb-56">
            <h2 className="text-black w-fit font-bold text-3xl">The Instances</h2>
        </div>
    )

    return (
        <div className="h-screen">
            <p>This is dashboard</p>

            <div className="flex items-center h-full">
                {/* Can make a loop to draw the card depend on the given map of instances list*/}
                <Card cardContent = {content} hasOnClick = {true} nextPageRoute = {"/data-vis-page"} />
            </div>
        </div>
    )
}

export default Dashboard;