import { DollarSign, Book } from "lucide-react";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
export default function Dashboard() {
    const API_URL = import.meta.env.VITE_API_URL;
    const [loading, setLoading] = useState(true);
    const [dashboard, setDashboard] = useState([]);
    const token = localStorage.getItem("token");
    const [error, setError] = useState(null);
    const [ordersCount, setOrdersCount] = useState(null);
    const [revenue, setRevenue] = useState(null);
    const [averageOrderValue, setAverageOrderValue] = useState(null);
    const [deliveredOrders, setDeliveredOrders] = useState(null);
    const [pendingOrders, setPendingOrders] = useState(null);
    const [canceledOrders, setCanceledOrders] = useState(null);
    const [chartSeries, setChartSeries] = useState([]);
    const [chartCategories, setChartCategories] = useState([]);
    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await fetch(`${API_URL}/analytics`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!res.ok) throw new Error("Error fetching dashboard");

                const data = await res.json();
                setOrdersCount(data.ordersCount);
                setRevenue(data.revenue);
                setAverageOrderValue(data.averageOrderValue);
                setCanceledOrders(data.canceledOrdersCount);
                setPendingOrders(data.pendingOrdersCount);
                setDeliveredOrders(data.deliveredOrdersCount);

                setChartSeries([
                    { name: "Incomes", data: data.incomes },
                    { name: "Expenses", data: data.expenses },
                ]);
                setChartCategories(data.dates);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, [API_URL, token]);

    const OrdersStatusChart = ({ deliveredOrders, canceledOrders, pendingOrders }) => {
        const series = [
            deliveredOrders || 0,
            canceledOrders || 0,
            pendingOrders || 0,
        ];
        const options = {
            colors: ["#16a34a", "#dc2626", "#626262"],
            chart: { type: "pie" },
            labels: ["Delivered", "Canceled", "Pending"],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: { width: 200 },
                        legend: { position: "bottom" },
                    },
                },
            ],
        };
        return (
            <div className="w-full">
                <div id="chart">
                    <ReactApexChart options={options} series={series} type="pie" height={350} />
                </div>
                <div id="html-dist"></div>
            </div>
        );
    };
    const RevenueExpensesChart = ({ series, categories }) => {
        const options = {
            colors: ["#16a34a", "#dc2626"],
            chart: { type: "area", height: 350 },
            dataLabels: { enabled: false },
            stroke: { curve: "smooth" },
            xaxis: { type: "category", categories },
            tooltip: { x: { format: "dd/MM/yy" } },
        };

        return (
            <div className="w-full">
                <div id="chart">
                    <ReactApexChart
                        options={options}
                        series={series}
                        type="area"
                        height={350}
                    />
                </div>
                <div id="html-dist"></div>
            </div>

        );
    };
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen text-gray-600">
                <p>Loading dashboard...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen text-red-500">
                <p>{error}</p>
            </div>
        );
    }




    return (
        <div className="text-gray-700">
            <div className="ms-64">
                <div className="flex-1 p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        <div className="bg-white h-40  font-semibold p-5 flex justify-between rounded-xl">
                            <Book className="w-20 h-20 p-2 rounded-full bg-red-400 text-red-100" />
                            <div className="flex flex-col justify-between items-end">
                                <div className="text-4xl">{ordersCount}</div>
                                <div className="flex flex-col items-end">
                                    <div>Total Orders</div>
                                </div>
                            </div>

                        </div>
                        <div className="bg-white h-40 font-semibold p-5 flex justify-between rounded-xl">
                            <DollarSign className="w-20 h-20 p-2 rounded-full bg-red-400 text-red-100" />
                            <div className="flex flex-col justify-between items-end">
                                <div className="text-4xl">${revenue}</div>
                                <div className="flex flex-col items-end">
                                    <div>Total Revenue</div>
                                </div>
                            </div>

                        </div>
                        <div className="bg-white h-40 font-semibold p-5 flex justify-between rounded-xl">
                            <DollarSign className="w-20 h-20 p-2 rounded-full bg-red-400 text-red-100" />
                            <div className="flex flex-col justify-between items-end">
                                <div className="text-4xl">${averageOrderValue}</div>
                                <div className="flex flex-col items-end">
                                    <div>Average order value</div>
                                </div>
                            </div>

                        </div>
                        <div className="bg-white h-40 font-semibold p-5 flex justify-between rounded-xl">
                            <DollarSign className="w-20 h-20 p-2 rounded-full bg-red-400 text-red-100" />
                            <div className="flex flex-col justify-between items-end">
                                <div className="text-4xl">100</div>
                                <div className="flex flex-col items-end">
                                    <div>Total customers (TBI)</div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-5">
                        <div className="bg-white rounded-xl mt-5  p-5">
                            <div className="flex justify-between mb-10">
                                <div className="flex flex-col items-start">
                                    <div>Orders by Status</div>
                                </div>
                            </div>
                            <div className="flex">
                                <OrdersStatusChart
                                    deliveredOrders={deliveredOrders}
                                    canceledOrders={canceledOrders}
                                    pendingOrders={pendingOrders}
                                />
                            </div>
                        </div>
                        <div className="bg-white rounded-xl mt-5  p-5">
                            <div className="flex justify-between mb-10">
                                <div className="flex flex-col items-start">
                                    <div>Revenue & Expenses Over Time</div>
                                </div>

                            </div>
                            <div className="flex">
                                <RevenueExpensesChart series={chartSeries} categories={chartCategories} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}