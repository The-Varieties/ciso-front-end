export const InstanceDetail = (instance) => {
    const instanceMap = {'name': 'instanceDetail', 'value': [
        {'title': 'Name', 'content': instance.instance_name},
        {'title': 'IPv4', 'content': instance.instance_ipv4},
        {'title': 'Region', 'content': instance.instance_region},
        {'title': 'Operating System', 'content': instance.instance_os},
        {'title': 'Volume Type', 'content': instance.instance_volume_type},
        {'title': 'Instance Type', 'content': instance.instance_type},
        {'title': 'Pricing Plan', 'content': instance.instance_pricing_plan},
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