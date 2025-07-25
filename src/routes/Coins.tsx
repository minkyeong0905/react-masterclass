import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";

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

const CoinsList = styled.ul``;

const Coin = styled.li`
    background-color: ${(props) => props.theme.cardBgColor};;
    color: ${(props) => props.theme.textColor};
    padding: 20px;
    border: 1px solid white;
    border-radius: 15px;
    margin-bottom: 10px;

    a {
        display: flex;
        align-items: center;
        padding: 20px;
        transition: color 0.2s ease-in;
    }

    &:hover {
        a {
            color: ${(props) => props.theme.accentColor}
        }
    }
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;

const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;

interface ICoin {
    id: string
   ,name: string
   ,symbol: string
   ,rank: number
   ,is_new: boolean
   ,is_active: boolean
   ,type: string
}

function Coins() {
    // const [coins, setCoins] = useState<CoinInterface[]>([]);
    // const [loading, setLoading] = useState(true);
    // const { state } = useLocation() as { state: { name: string } };

    // useEffect(() => {
    //     (async() => {
    //         const response = await fetch("https://api.coinpaprika.com/v1/coins");
    //         const json = await response.json();
    //         setCoins(json.slice(0, 100));
    //         setLoading(false);
    //     })();
    // }, []);

    const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

    return (
        <Container>
            <Helmet>
                <title>Coin List</title>
            </Helmet>
            <Header>
                <Title>Coin List</Title>
            </Header>
            {isLoading ?
            (<Loader>Loading...</Loader>) : (
            <CoinsList>
                {data?.slice(0, 100).map((coin) => (
                    <Coin key={coin.id}>
                        <Link to={`/${coin.id}`} state={ coin.name } >
                            <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} />
                            {coin.name} &rarr;
                        </Link>
                    </Coin>))}
            </CoinsList>)}
        </Container>
    );
}

export default Coins;