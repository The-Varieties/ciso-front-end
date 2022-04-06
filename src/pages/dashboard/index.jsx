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

    const cardArr = [];

    for (let i = 0; i < 3; i++) {
        cardArr.push(
            <div className="my-10">
                <Card cardContent = {content} hasOnClick = {true} nextPageRoute = {"/data-vis-page"} />
            </div>
        );
    }

    return (
        <div className="h-screen">
            <p>This is dashboard</p>

            <div className="grid grid-cols-3 gap-8 items-center h-full">
                {/* Can make a loop to draw the card depend on the given map of instances list*/}
                {cardArr}
            </div>
        </div>
    )
}

export default Dashboard;