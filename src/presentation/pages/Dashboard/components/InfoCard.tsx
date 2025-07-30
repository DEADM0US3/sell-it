interface InfoCardProps {
    title: string
    Icon: React.ComponentType<{ className?: string }>
    iconColor?: string
    mainValue: number | string
    mainLabel: string
    mainColor?: string
    descriptor?: string
    stats?: { label: string; value: number | string }[]
}

const InfoCard: React.FC<InfoCardProps> = ({
                                               title,
                                               Icon,
                                               iconColor = 'text-gray-600',
                                               mainValue,
                                               mainLabel,
                                               mainColor = 'text-gray-900',
                                               descriptor,
                                               stats
                                           }) => (
    <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="flex items-center p-4 border-b">
            <Icon className={`w-5 h-5 ${iconColor}`} />
            <h3 className="ml-2 text-sm font-medium text-gray-600">{title}</h3>
        </div>
        <div className="p-4">
            {descriptor && (
                <div className="flex items-center gap-3 mb-4">
                    <Icon className={`w-6 h-6 ${iconColor}`} />
                    <div>
                        <p className={`font-semibold text-lg ${mainColor}`}>{mainValue}</p>
                        <p className="text-sm text-gray-500">{descriptor}</p>
                    </div>
                </div>
            )}
            {!descriptor && (
                <div className="mb-4">
                    <p className={`text-3xl font-bold ${mainColor}`}>{mainValue}</p>
                    <p className="text-sm text-gray-500">{mainLabel}</p>
                </div>
            )}
            {stats && (
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    {stats.map((stat, idx) => (
                        <div key={idx}>
                            <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
                            <p className="text-xs text-gray-500">{stat.label}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
)

export default InfoCard