export const DataVisRadioComponent = (props) => {
    return(
        <div>
            <h2 className="text-white w-fit font-medium text-2xl">Chosen Component</h2>

            <div className="flex mt-2">
                <div className="flex align-baseline mr-12">
                    <input type="radio" id="cpu_radio" name="cpu_radio" value="cpu" className="w-5 h-5 my-auto" checked={props.checked === "cpu"} onChange={props.radioCallback}/>
                    <label htmlFor="cpu_radio" className="text-base text-white ml-2">CPU</label>
                </div>

                <div className="flex align-baseline mr-12">
                    <input type="radio" id="ram_radio" name="ram_radio" value="ram" className="w-5 h-5 my-auto" checked={props.checked === "ram"} onChange={props.radioCallback}/>
                    <label htmlFor="ram_radio" className="text-base text-white ml-2">RAM</label>
                </div>
            </div>
        </div>
    )
}