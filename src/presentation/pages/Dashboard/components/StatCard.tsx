interface StatCardProps {
    Icon: React.ComponentType<{ className?: string }>
    iconBg?: string
    iconColor?: string
    value: number | string
    label: string
}

const StatCard: React.FC<StatCardProps> = ({ Icon, iconBg = 'bg-gray-100', iconColor = 'text-gray-600', value, label }) => (
    <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center gap-4">
            <div className={`${iconBg} w-12 h-12 rounded-lg flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${iconColor}`} />
            </div>
            <div>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                <p className="text-sm text-gray-500">{label}</p>
            </div>
        </div>
    </div>
)

export default StatCard