import { useEffect, useState } from 'react';
import {
    DollarSign,
    Laptop,
    Monitor,
    Package,
    ShoppingCart,
    TrendingDown,
    TrendingUp,
} from "lucide-react";
import InfoCard from "./components/InfoCard.tsx";
import { laptopsServerApi } from "../../../infrastructure/http/features/laptopsServerApi.ts";
import { aiPredictionsServerApi } from "../../../infrastructure/http/features/ai-predictionsServerApi.ts";
import { salesServerApi } from "../../../infrastructure/http/features/salesServerApi.ts"; // <-- Nuevo import
import type { LaptopDto } from "../../../contracts/laptop/laptopDto.ts";
import type { AiPredictionDto } from "../../../contracts/ai-prediction/ai-predictionDto.ts";
import {authServerApi} from "../../../infrastructure/http/features/authServerApi.ts";
import Modal from "./components/Modal.tsx";
import type {SaleDto} from "../../../contracts/sales/salesDto.ts";
import {ModalEditarLaptop} from "./components/ModalViewLaptop.tsx";

const DashboardView = () => {
    const [isOpen, setIsOpen] = useState(false);
    const close = () => setIsOpen(false);

    const [products, setProducts] = useState<LaptopDto[]>([]);
    const [predictions, setPredictions] = useState<AiPredictionDto[]>([]);
    const [sales, setSales] = useState<SaleDto  []>([]);
    const [loading, setLoading] = useState(true);

    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedLaptop, setSelectedLaptop] = useState<LaptopDto | null>(null);

    const refetchLaptops = async () => {
        await fetchData();
    };


    const fetchData = async () => {
        setLoading(true);
        try {
            const userId = await authServerApi.getUserId();
            if (!userId) throw new Error("Usuario no autenticado");

            // Cargar productos
            const productData = await laptopsServerApi.getByUserId(userId);
            if (!productData) throw new Error("No se pudieron cargar los productos");
            setProducts(productData);

            // Cargar predicciones
            const predictionData = await Promise.all(
                productData.map(product =>
                    aiPredictionsServerApi.getByLaptopId(product.id)
                )
            );
            setPredictions(predictionData.filter((p): p is AiPredictionDto => p !== null));

            // Cargar ventas del usuario (como vendedor)
            const salesData = await salesServerApi.getBySellerId(userId);
            if (!salesData) throw new Error("No se pudieron cargar las ventas");
            setSales(salesData);

        } catch (error) {
            console.error("Error al obtener datos del dashboard:", error);
            setProducts([]);
            setPredictions([]);
            setSales([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        fetchData();
    }, []);

    if (loading) {
        return <div className="text-center py-20 text-gray-500">Cargando datos del dashboard...</div>;
    }

    // Métricas calculadas con ventas
    const totalSales = sales.reduce((acc, sale) => acc + (sale.salePrice || 0), 0);
    const averageSales = sales.length ? totalSales / sales.length : 0;

    // Producto más y menos vendido según precio de venta (se puede cambiar a cantidad si hay info)
    const soldLaptopsMap: Record<string, { laptop: LaptopDto; totalSold: number }> = {};
    sales.forEach(sale => {
        if (!sale.laptopId) return;
        const laptop = products.find(p => p.id === sale.laptopId);
        if (!laptop) return;
        if (!soldLaptopsMap[laptop.id]) {
            soldLaptopsMap[laptop.id] = { laptop, totalSold: 0 };
        }
        soldLaptopsMap[laptop.id].totalSold += sale.salePrice || 0;
    });
    const soldLaptops = Object.values(soldLaptopsMap);
    const mostSoldProduct = soldLaptops.reduce((a, b) => (a.totalSold > b.totalSold ? a : b), soldLaptops[0] || null)?.laptop || null;
    const leastSoldProduct = soldLaptops.reduce((a, b) => (a.totalSold < b.totalSold ? a : b), soldLaptops[0] || null)?.laptop || null;

    const totalStock = products.reduce((acc, p) => acc + (p.stock || 0), 0);
    const outOfStock = products.filter(p => (p.stock || 0) === 0);
    const lowStock = products.filter(p => (p.stock || 0) <= 3 && (p.stock || 0) > 0);

    // Ventas por categoría (marca)
    const categorySalesMap: Record<string, number> = {};
    sales.forEach(sale => {
        const laptop = products.find(p => p.id === sale.laptopId);
        if (!laptop) return;
        const brand = laptop.brand || "Sin marca";
        categorySalesMap[brand] = (categorySalesMap[brand] || 0) + (sale.salePrice || 0);
    });
    const categoryData = Object.entries(categorySalesMap).map(([name, salesAmount]) => ({
        name,
        sales: Math.round(salesAmount), // monto total vendido por categoría
        color: 'bg-blue-500',
    }));

    // Ventas mensuales (simulado por ahora, podrías agrupar por mes usando saleDate)
    const monthlyData = [
        { month: 'Ene', sales: 180000 },
        { month: 'Feb', sales: 220000 },
    ];

    // const maxMonthly = Math.max(...monthlyData.map(m => m.sales || 0));

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value || 0);

    const salesData = {
        totalSales,
        averageSales,
        totalOrders: sales.length,
        totalCustomers: predictions?.length || 0,
        mostSoldProduct,
        leastSoldProduct,
        categoryData,
        monthlyData,
        recentProducts: products.map((product, idx) => ({
            id: product.id,
            name: product.title || "Sin título",
            category: product.brand || "Sin marca",
            sales: product.price || 0,
            trend: idx % 2 === 0 ? 'up' : 'down',
            icon: Laptop,
        })),
        totalStock,
        outOfStock,
        lowStock,
    };

    return (
        <main>
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-7xl mx-auto space-y-6">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Dashboard de Ventas</h1>
                        <p className="text-gray-600 mt-2">Resumen de rendimiento y métricas clave</p>
                    </div>

                    <div className='w-full flex justify-end py-4 px-8'>
                        <button
                            className='p-2 rounded-lg bg-blue-500 text-white semibold cursor-pointer'
                            onClick={() => setIsOpen(true)}
                        >
                            Publicar nueva Laptop
                        </button>
                    </div>

                    <Modal isOpen={isOpen} onClose={close} />

                    {showEditModal && selectedLaptop && (
                        <ModalEditarLaptop
                            laptopToEdit={selectedLaptop}
                            onClose={() => setShowEditModal(false)}
                            onUpdated={refetchLaptops}
                        />
                    )}


                    {/* KPIs principales */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <InfoCard
                            mainLabel=""
                            title="Producto Más Vendido"
                            Icon={TrendingUp}
                            iconColor="text-green-500"
                            mainValue={salesData.mostSoldProduct?.title || 'N/A'}
                            descriptor={salesData.mostSoldProduct ? formatCurrency(salesData.mostSoldProduct.price || 0) : ''}
                        />

                        <InfoCard
                            mainLabel=""
                            title="Producto Menos Vendido"
                            Icon={TrendingDown}
                            iconColor="text-red-500"
                            mainValue={salesData.leastSoldProduct?.title || 'N/A'}
                            descriptor={salesData.leastSoldProduct ? formatCurrency(salesData.leastSoldProduct.price || 0) : ''}
                        />
                        <InfoCard
                            title="Total de Ventas"
                            Icon={DollarSign}
                            iconColor="text-blue-500"
                            mainValue={formatCurrency(salesData.totalSales)}
                            mainLabel="Ingresos totales"
                            stats={[
                                { label: 'Pedidos', value: salesData.totalOrders },
                                { label: 'Clientes', value: salesData.totalCustomers },
                            ]}
                        />
                        <InfoCard
                            title="Promedio de Venta"
                            Icon={DollarSign}
                            iconColor="text-yellow-500"
                            mainValue={formatCurrency(salesData.averageSales)}
                            mainLabel="Promedio por venta"
                        />
                        <InfoCard
                            title="Stock Total"
                            Icon={Package}
                            iconColor="text-indigo-500"
                            mainValue={`${salesData.totalStock} unidades`}
                            mainLabel="Inventario total"
                        />
                        <InfoCard
                            title="Stock Bajo"
                            Icon={Monitor}
                            iconColor="text-orange-500"
                            mainValue={salesData.lowStock.length}
                            mainLabel="Productos ≤ 3 unidades"
                        />
                    </div>

                    {/* Ventas por Categoría */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                                            <span className="text-sm text-gray-500">{formatCurrency(cat.sales)}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className={`${cat.color} h-2 rounded-full`} style={{ width: `100%` }} />
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
                                    const Icon = prod.icon;
                                    return (
                                        <div
                                            key={idx}
                                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition"
                                            onClick={() => {

                                                const seLaptop = products.find(p => p.id == prod.id);

                                                if (seLaptop) {
                                                    setSelectedLaptop(seLaptop);
                                                    setShowEditModal(true);
                                                }

                                            }}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                                                    <Icon className="w-4 h-4 text-gray-600"/>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm text-gray-900">{prod.name}</p>
                                                    <p className="text-xs text-gray-500">{prod.category}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs font-semibold rounded ${
                            prod.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>{formatCurrency(prod.sales)}</span>
                                                {prod.trend === 'up' ? (
                                                    <TrendingUp className="w-4 h-4 text-green-500"/>
                                                ) : (
                                                    <TrendingDown className="w-4 h-4 text-red-500"/>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Aquí podrías descomentar y mejorar la tendencia mensual */}
                    {/* <div className="bg-white shadow rounded-lg">
            <div className="flex items-center p-4 border-b">
              <TrendingUp className="w-5 h-5 text-gray-600" />
              <h3 className="ml-2 font-medium text-gray-900">Tendencia de Ventas Mensuales</h3>
            </div>
            <div className="p-4 h-64 flex items-end justify-between gap-4">
              {salesData.monthlyData.map((data, idx) => {
                const height = (data.sales / maxMonthly) * 200;
                return (
                  <div key={idx} className="flex flex-col items-center gap-2 flex-1">
                    <span className="text-xs font-medium text-gray-600">{formatCurrency(data.sales)}</span>
                    <div className="w-full bg-blue-500 rounded-t-md transition-all duration-500 hover:bg-blue-600" style={{ height }} />
                    <span className="text-xs text-gray-500 font-medium">{data.month}</span>
                  </div>
                );
              })}
            </div>
          </div> */}
                </div>
            </div>
        </main>
    );
};

export default DashboardView;
