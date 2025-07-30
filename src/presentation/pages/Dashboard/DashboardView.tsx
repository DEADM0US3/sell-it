// import Modal from '../../components/Modal';
import {
    DollarSign,
    Headphones,
    Laptop,
    Monitor,
    Package,
    ShoppingCart,
    Smartphone, TrendingDown,
    TrendingUp,
} from "lucide-react";
import InfoCard from "./components/InfoCard.tsx";

const DashboardView = () => {

    const salesData = {
        totalSales: 1250000,
        totalOrders: 3420,
        totalCustomers: 1890,
        mostSoldProduct: {
            name: 'MacBook Pro 16',
            sales: 145,
            revenue: 435000,
            image: '/placeholder.svg?height=40&width=40',
        },
        leastSoldProduct: {
            name: 'Gaming Headset Pro',
            sales: 12,
            revenue: 3600,
            image: '/placeholder.svg?height=40&width=40',
        },
        recentProducts: [
            { name: 'MacBook Pro 16', category: 'Laptops', sales: 145, trend: 'up', icon: Laptop },
            { name: 'iPhone 15 Pro', category: 'Smartphones', sales: 132, trend: 'up', icon: Smartphone },
            { name: 'Dell XPS 13', category: 'Laptops', sales: 98, trend: 'up', icon: Laptop },
            { name: 'Samsung Monitor 4K', category: 'Monitors', sales: 76, trend: 'down', icon: Monitor },
            { name: 'Gaming Headset Pro', category: 'Audio', sales: 12, trend: 'down', icon: Headphones },
        ],
        categoryData: [
            { name: 'Laptops', sales: 45, color: 'bg-blue-500' },
            { name: 'Smartphones', sales: 30, color: 'bg-green-500' },
            { name: 'Monitors', sales: 15, color: 'bg-purple-500' },
            { name: 'Audio', sales: 10, color: 'bg-orange-500' },
        ],
        monthlyData: [
            { month: 'Ene', sales: 180000 },
            { month: 'Feb', sales: 220000 },
            { month: 'Mar', sales: 190000 },
            { month: 'Abr', sales: 250000 },
            { month: 'May', sales: 280000 },
            { month: 'Jun', sales: 320000 },
        ],
    }
    const maxMonthly = Math.max(...salesData.monthlyData.map(d => d.sales))


    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR',
        }).format(amount)
    }

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('es-ES').format(num)
    }

    return (
        <main>
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Dashboard de Ventas</h1>
                        <p className="text-gray-600 mt-2">Resumen de rendimiento y métricas clave</p>
                    </div>

                    {/* KPIs principales */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <InfoCard
                            title="Producto Más Vendido"
                            Icon={TrendingUp}
                            iconColor="text-green-500"
                            mainValue={salesData.mostSoldProduct.name}
                            descriptor={`${salesData.mostSoldProduct.sales} unidades vendidas`} mainLabel={""}
                            // stats={[{ label: salesData.mostSoldProduct.metricLabel, value: formatCurrency(salesData.mostSoldProduct.value) }]}
                        />

                        <InfoCard
                            title="Producto Menos Vendido"
                            Icon={TrendingDown}
                            iconColor="text-red-500"
                            mainValue={salesData.leastSoldProduct.name}
                            descriptor={`${salesData.leastSoldProduct.sales} unidades vendidas`} mainLabel={""}
                            // stats={[{ label: salesData.leastSoldProduct.metricLabel, value: formatCurrency(salesData.leastSoldProduct.value) }]}
                        />

                        <InfoCard
                            title="Total de Ventas"
                            Icon={DollarSign}
                            iconColor="text-blue-500"
                            mainValue={formatCurrency(salesData.totalSales)}
                            mainLabel="Ingresos totales este mes"
                            stats={[
                                { label: 'Pedidos', value: formatNumber(salesData.totalOrders) },
                                { label: 'Clientes', value: formatNumber(salesData.totalCustomers) },
                            ]}
                        />
                    </div>

                    {/* Gráficos y métricas adicionales */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Ventas por Categoría */}
                        <div className="bg-white shadow rounded-lg">
                            <div className="flex items-center p-4 border-b">
                                <Package className="w-5 h-5 text-gray-600" />
                                <h3 className="ml-2 font-medium text-gray-900">Ventas por Categoría</h3>
                            </div>
                            <div className="p-4 space-y-4">
                                {salesData.categoryData.map((cat, idx) => (
                                    <div key={idx} className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                                            <span className="text-sm text-gray-500">{cat.sales}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className={`${cat.color} h-2 rounded-full`} style={{ width: `${cat.sales}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Top Productos */}
                        <div className="bg-white shadow rounded-lg">
                            <div className="flex items-center p-4 border-b">
                                <ShoppingCart className="w-5 h-5 text-gray-600" />
                                <h3 className="ml-2 font-medium text-gray-900">Top Productos</h3>
                            </div>
                            <div className="p-4 space-y-4">
                                {salesData.recentProducts.map((prod, idx) => {
                                    const Icon = prod.icon
                                    return (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                                                    <Icon className="w-4 h-4 text-gray-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm text-gray-900">{prod.name}</p>
                                                    <p className="text-xs text-gray-500">{prod.category}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded ${
                          prod.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>{prod.sales}</span>
                                                {prod.trend === 'up' ? (
                                                    <TrendingUp className="w-4 h-4 text-green-500" />
                                                ) : (
                                                    <TrendingDown className="w-4 h-4 text-red-500" />
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Tendencia Mensual */}
                    <div className="bg-white shadow rounded-lg">
                        <div className="flex items-center p-4 border-b">
                            <TrendingUp className="w-5 h-5 text-gray-600" />
                            <h3 className="ml-2 font-medium text-gray-900">Tendencia de Ventas Mensuales</h3>
                        </div>
                        <div className="p-4 h-64 flex items-end justify-between gap-4">
                            {salesData.monthlyData.map((data, idx) => {
                                const height = (data.sales / maxMonthly) * 200
                                return (
                                    <div key={idx} className="flex flex-col items-center gap-2 flex-1">
                                        <span className="text-xs font-medium text-gray-600">{formatCurrency(data.sales)}</span>
                                        <div className="w-full bg-blue-500 rounded-t-md transition-all duration-500 hover:bg-blue-600" style={{ height: height }} />
                                        <span className="text-xs text-gray-500 font-medium">{data.month}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Métricas adicionales */}
                    {/*<div className="grid grid-cols-1 md:grid-cols-4 gap-6">*/}
                    {/*    {metrics.map((metric, idx) => (*/}
                    {/*        <StatCard key={idx} Icon={metric.Icon} iconBg={metric.iconBg} iconColor={metric.iconColor} value={metric.value} label={metric.label} />*/}
                    {/*    ))}*/}
                    {/*</div>*/}
                </div>
            </div>
        </main>
    )
}

export default DashboardView;