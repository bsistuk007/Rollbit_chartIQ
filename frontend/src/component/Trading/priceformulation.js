import React from "react";
import tradingimg from "./../../assets/img/trading-shot.webp"

function PriceFormulation() {
    return (
        <div className="flex-1">
            <div className="mx-auto max-w-[1024px] pt-6 pb-7 px-5">
                <div className="flex flex-col-reverse md:flex-row md:items-start">
                    <img src={tradingimg} alt="Coin" className="align-middle w-full max-w-[320px] md:w-[35%] "/>
                    <div className="flex-1 md:pl-5">
                        <h1 className="mb-5 uppercase tracking-[1px] text-[24px]">Trading Price Formulation</h1>
                        <h3 className="mb-4 text-white text-[16px]">Rollbit Index Prices</h3>
                        <p className="mb-4 leading-relaxed text-[#B1B6C6]">
                            To provide fair and reliable pricing for the trading games, Rollbit calculates a composite index price every 500 milliseconds that is derived from real-time price feeds to the world's most liquid spot and derivative cryptocurrency exchanges. By incorporating many price sources, the Rollbit index is robust to market manipulation, technical issues, and other anomalous trading activity that may occur on individual exchanges from time to time.
                        </p>
                    </div>
                </div>
                <div className="mt-4">
                    <h1 className="uppercase text-white text-[24px] tracking-[1px]">
                        Funding Payments
                    </h1>
                    <p className="mb-3 leading-relaxed text-[14px] text-[#B1B6C6]">
                        Keep your bet open for longer than 8 hours and you might incur or receive hourly funding payments, depending on market conditions. When the market is bullish, the funding rate is positive and long traders pay short traders. When the market is bearish, the funding rate is negative and short traders pay long traders. Payment rate is 0.1% per day.
                    </p>
                    <p>
                        For example, if you have an open long BTC bet for $500 with a 10x multiplier, you will be charged $0.21 per hour after the first 8 hours. If the bet were short rather than long, then you would receive funding payments.
                    </p>
                    <p>
                        If your bet is closed within 8 hours, no funding payments will be made.
                    </p>
                    {/* 
                        -------------
                        <h1 class="css-1trx92" style="margin: 40px 0px 20px;">
                        Index constituents
                    </h1>
                    <h3 class="css-7n7wre">
                        Spot Exchanges
                    </h3>
                    <ul>
                        <li>
                            Binance
                        </li>
                        <li>
                            Bitfinex
                        </li>
                        <li>
                            Coinbase Pro
                        </li>
                        <li>
                            FTX
                        </li>
                        <li>
                            Gemini
                        </li>
                        <li>
                            Kraken
                        </li>
                        <li>
                            Huobi
                        </li>
                        <li>
                            OKEx
                        </li>
                    </ul>
                    <h3 class="css-7n7wre">
                        Derivative Exchanges
                    </h3>
                    <ul>
                        <li>
                            Binance (Coin-Margined)
                        </li>
                        <li>
                            Binance (USDT-Margined)
                        </li>
                        <li>
                            FTX
                        </li>
                        <li>
                            Huobi (Coin-Margined)
                        </li>
                        <li>
                            Huobi (USDT-Margined)
                        </li>
                        <li>
                            OKEx (Coin-Margined)
                        </li>
                        <li>
                            OKEx (USDT-Margined)
                        </li>
                    </ul>
                    <p>
                        The index price methodology has been designed to satisfy two important statistical properties of time series: the Markov and martingale properties. The Markov property refers to the memoryless nature of a stochastic process, which ensures that the conditional probability distribution of future values only depends on the current value. The martingale property implies that the current value of a stochastic process is also the expected value of future values. These two properties make Rollbit's index prices unbiased estimators of future prices, so that users can bet on the changes in value of the underlying cryptocurrencies without having to worry about the microstructure effects of individual exchanges.
                    </p>
                    <h3 class="css-7n7wre">
                        The calculation steps are as follows:
                    </h3>
                    <p>
                        1. Subscribe to as many levels of depth as available using each exchange's streaming APIs.
                    </p>
                    <p>
                        2. Remove any price feeds for which there have been no market data updates for the last 30 seconds.
                    </p>
                    <p>
                        3. Remove any price feeds with crossed buy and sell prices or whose top-of-book mid-price is more than 10% away from the median top-of-book mid-price across all price feeds.
                    </p>
                    <p>
                        4. Wait until there are at least 6 valid price feeds. If there are not enough price feeds, the Rollbit index price will not be updated.
                    </p>
                    <p>
                        5. Combine all resting limit orders from each price feed into a single composite order book. It is okay and expected that the price of some buy orders will exceed the price of some sell orders from other exchanges. Individual order sizes are capped to $1 million to limit the influence of a single large order.
                    </p>
                    <p>
                        6. Using the composite order book, a function is defined to represent the marginal price to buy or sell a given amount. For example, the marginal buying function is:
                    </p>
                    <pre>
                        P_buy(s) = max{p_i | sum_{i in 1..N}{s_i} &lt;= s}}
                    </pre>
                    <p>
                        where 
                        <code>
                            p_i | (i in (1).N)
                        </code> 
                        and 
                        <code>
                            s_i | (i in (1).N)
                        </code> 
                        are the buy prices and sizes sorted in increasing distance from the top-of-book. This function gives the maximum price one would pay to buy an amount 
                        <code>
                            s
                        </code>
                        .
                    </p>
                    <p>
                        7. The marginal buy and sell price functions are then used to define a marginal mid-price function given a size:
                    </p>
                    <pre>
                        P_mid(s) = (P_buy(s) + P_sell(s)) / 2
                    </pre>
                    <p>
                        8. The final index price is then calculated as the weighted average of the marginal mid-prices at each size. The weights are chosen to be the probability density of the exponential distribution, which is monotonically decreasing, resulting in a higher emphasis on prices closer to the top-of-book. The weights are given by:
                    </p>
                    <pre>
                        w_i = L * exp(-L * v_i)
                    </pre>
                    <p>
                        where 
                        <code>
                            v_i
                        </code> 
                        are the sizes at which the mid-prices are calculated and are defined as the union of the cumulative buy and sell sizes from the composite order book. 
                        <code>
                            L
                        </code> 
                        is a scaling factor defined as 
                        <code>
                            1 / V
                        </code>
                        , where 
                        <code>
                            V
                        </code>
                        is the maximum size at which a mid-price is calculated and is defined as the minimum of the sum of buying and selling sizes in the composite order book.
                    </p>
                    <p>
                        The output of this calculation is a single index price that is used for both long and short bets in the Rollbit trading game. Unlike with most other trading platforms, Rollbit does not charge a bid-offer spread. Trading with a single price makes it possible to speculate on short-term price moves for which a bid-offer spread would be prohibitively expensive.
                    </p> */}
                    
                </div>

            </div>
        </div>
    );
}

export default PriceFormulation;