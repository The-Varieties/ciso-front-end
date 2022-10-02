import React from 'react'

export const InstanceDetail = (props) => {
    const instanceMap = {'name': 'instanceDetail', 'value': [
        {'title': 'Name', 'content': props.instance.instance_name},
        {'title': 'IPv4', 'content': props.instance.instance_ipv4},
        {'title': 'Region', 'content': props.instance.instance_region},
        {'title': 'Operating System', 'content': props.instance.instance_os},
        {'title': 'Volume Type', 'content': props.instance.instance_volume_type},
        {'title': 'Instance Type', 'content': props.instance.instance_type},
        {'title': 'Pricing Plan', 'content': props.instance.instance_pricing_plan},
    ]}

    return(
        <div>
            <h2 className="text-black w-fit font-bold text-2xl mb-2">Instance Details</h2>

            {instanceMap && instanceMap.value.map((instance, index) => (
                <p key={index} className="text-base"><span className="font-bold">{instance.title}:</span> {instance.content}</p>
            ))}
        </div>
    )
}