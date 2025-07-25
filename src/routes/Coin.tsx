import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import { Link, Outlet, useLocation, useMatch, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";

const Loader = styled.span`
    text-align: center;
    display: block;
`;

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${(props) => props.theme.accentColor};
`;

const Button = styled.div`
    background-color: rgba(0, 0, 0, 0.2);
    width: 48px;
    height: 48px;
    margin-right: 20px;

    a {
        display: flex;
        align-items: center;
    }
`;

const Overview = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px 20px;
    border-radius: 10px;
`;

const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    span:first-child {
        font-size: 10px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 5px;
    }
`;

const Description = styled.p`
    margin: 20px 0px;
`;

const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 25px 0px;
    gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 400;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 7px 0px;
    border-radius: 10px;
    color: ${(props) => props.isActive ? props.theme.accentColor : props.theme.textColor};

    a {
        display: block;
    }
`;

interface RouteParams {
    coinId: string;
}

// interface RouteState {
//     name: string;
// }

interface ILocation {
    state: string;
}

// interface ITag {
//     coin_counter: number;
//     ico_counter: number;
//     id: string;
//     name: string;
// }

interface IInfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    logo: string;
    //tags: ITag[];
    //team: object;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    //links: object;
    //links_extended: object;
    //whitepaper: object;
    first_data_at: string;
    last_data_at: string;
}

interface IPriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        }
    };
}

function Coin() {
    //const [loading, setLoading] = useState(true);
    const { coinId } = useParams() as unknown as RouteParams;
    const { state } = useLocation() as ILocation;
    //const [info, setInfo] = useState<IInfoData>();
    //const [priceInfo, setPriceInfo] = useState<IPriceData>();
    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");

    // useEffect(() => {
    //     (async () => {
    //         const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
    //         const priceData=  await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
            
    //         setInfo(infoData);
    //         setPriceInfo(priceData);
    //         setLoading(false);
    //     })();
    // }, [coinId]);

    const {isLoading: infoLoading, data: infoData} = useQuery<IInfoData>(["info", coinId], () => fetchCoinInfo(coinId));
    const {isLoading: tickersLoading, data: tickersData} = useQuery<IPriceData>(["tickers", coinId], () => fetchCoinTickers(coinId), { refetchInterval: 5000 });

    const loading = infoLoading || tickersLoading;
    
    return (
        <Container>
            <Helmet>
                <title>{state !== null ? state : loading ? "Loading..." : infoData?.name}</title>
            </Helmet>
            <Header>
                <Button>
                    <Link to={"/"}>
                        <svg data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"></path>
                        </svg>
                    </Link>
                </Button>
                <Title>{state !== null ? state : loading ? "Loading..." : infoData?.name}</Title>
            </Header>
            {loading ?
            (<Loader>Loading...</Loader>) : (
                <>
                    <Overview>
                        <OverviewItem>
                            <span>Rank :</span>
                            <span>{infoData?.rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Symbol :</span>
                            <span>{infoData?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Price :</span>
                            <span>${tickersData?.quotes?.USD?.price?.toFixed(3)}</span>
                        </OverviewItem>
                    </Overview>
                    <Description>{infoData?.description}</Description>
                    <Overview>
                        <OverviewItem>
                            <span>Total Supply :</span>
                            <span>{tickersData?.total_supply}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Max Supply :</span>
                            <span>{tickersData?.max_supply}</span>
                        </OverviewItem>
                    </Overview>

                    <Tabs>
                        <Tab isActive={chartMatch !== null}>
                            <Link to={`/${coinId}/chart`}>Chart</Link>
                        </Tab>
                        <Tab isActive={priceMatch !== null}>
                            <Link to={`/${coinId}/price`}>Price</Link>
                        </Tab>
                    </Tabs>

                    <Outlet />
                </>
            )}
        </Container>
    );
}

export default Coin;