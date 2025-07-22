import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import { useParams } from "react-router-dom";

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
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId!));

    return <h1>Chart</h1>;
}

export default Chart;