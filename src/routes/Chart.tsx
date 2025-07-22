import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import { useParams } from "react-router-dom";

function Chart() {
    const { coinId } = useParams();
    const { isLoading, data } = useQuery(["ohlcv", coinId], () => fetchCoinHistory(coinId!));
    
    return <h1>Chart</h1>;
}

export default Chart;