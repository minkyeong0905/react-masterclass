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
    const candlestickData = data?.map((item) => ({
        x: new Date(item.time_close * 1000).toISOString()
       ,y: [parseFloat(item.open).toFixed(2), parseFloat(item.high).toFixed(2), parseFloat(item.low).toFixed(2), parseFloat(item.close).toFixed(2)]
    }));

    return (
        <div>
            {isLoading ? "Loading chart..." :
            <>
                <ApexChart type="line"
                           series={[{ name: "Price", data: data?.map((price) => parseFloat(price.close)) ?? [] }]}
                           options={{theme: {mode: "dark"}
                                    ,chart: { height: 300, width: 500, toolbar: {show: false}, background: "transparent" }
                                    ,grid: {show: false}
                                    ,yaxis: {show: true, axisBorder: {show: true}}
                                    ,xaxis: {type: "datetime", labels: {show: true}, axisTicks: {show: false}, axisBorder: {show: true}, categories: data?.map((date) => new Date(date.time_close * 1000).toISOString())}
                                    ,stroke: {curve: "smooth", width: 4}
                                    ,fill: {type: "gradient", gradient: {gradientToColors: ["#0be881"], stops: [0, 100]}}
                                    ,colors: ["#0fbcf9"]
                                    ,title: {text: "Line Chart - Price", align: "left"}
                                    ,tooltip: {y: {formatter: (value) => `$${value.toFixed(2)}`}}}} />
                <hr />
                <hr />
                <ApexChart type="candlestick"
                           series={[{name: "OHLC", data: candlestickData ?? []}]}
                           options={{theme: {mode: "dark"}
                                    ,chart: { height: 400, width: 500, toolbar: {show: false}, background: "transparent" }
                                    ,yaxis: {show: false}
                                    ,xaxis: {type: "datetime", labels: {show: true, formatter: (value:string) => {
                                                                                                                    const date = new Date(value);
                                                                                                                    const month = date.getMonth() + 1;
                                                                                                                    const day = date.getDate();
                                                                                                                    return `${month}/${day}`;
                                                                                                                 }
                                                                        }
                                            }
                                    ,title: {text: "CandleStick Chart - OHLC", align: "left"}
                                    ,tooltip: {enabled: true}}} />
             </>
            }
        </div>
    );
}

export default Chart;