import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import { useParams } from "react-router-dom";
import ApexChart from "react-apexcharts";

interface IHistorical {
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
}

function Chart() {
    const { coinId } = useParams();
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId!), { refetchInterval: 10000 });
    console.log(data?.map((price) => parseFloat(price.close)) ?? []);
    return (
        <div>
            {isLoading ? "Loading chart..." :
            <ApexChart type="line"
                       series={[{ name: "Price", data: data?.map((price) => parseFloat(price.close)) ?? [] }]}
                       options={{theme: {mode: "dark"}
                                ,chart: { height: 300, width: 500, toolbar: {show: false}, background: "transparent" }
                                ,grid: {show: false}
                                ,yaxis: {show: false}
                                ,xaxis: {type: "datetime", labels: {show: false}, axisTicks: {show: false}, axisBorder: {show: false}, categories: data?.map((date) => new Date(date.time_close * 1000).toISOString())}
                                ,stroke: {curve: "smooth", width: 4}
                                ,fill: {type: "gradient", gradient: {gradientToColors: ["#0be881"], stops: [0, 100]}}
                                ,colors: ["#0fbcf9"]
                                ,tooltip: {y: {formatter: (value) => `$${value.toFixed(2)}`}}}} />}
        </div>
    );
}

export default Chart;