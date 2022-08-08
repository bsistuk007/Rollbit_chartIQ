import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SvgLoading from '../Svg/svgloading';


function TransactionHistory() {
    // const { accountSelectionCryptoType } = useSelector(state => state.account);
    const [ historyLists, setHistoryList ] = useState([]);
    const [loadingState, setLoadingState] = useState(true);
    const [ transactionUrl, setTranscationUrl ] = useState();
    let { id, type } = useParams();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const dateTimeOptions = { 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: false, 
                            };
    // const [register, setRegister] = useState(false)
    useEffect(() => {
        setLoadingState(true);
        if(type == 'btc') {
            setTranscationUrl('https://btcscan.org/tx/')
        }
        if(type == 'eth'){
            setTranscationUrl('https://etherscan.io/tx/');
        }
        if(type == 'sol') {
            setTranscationUrl('https://solscan.io/tx/');
        }
        getCashierHistory(id, type);
    }, [id, type])

    const getCashierHistory = (cashierType, type) => {
        var coinType = 'bitcoin';
        if(type == 'eth')
            coinType = 'ethereum';
        if(type == 'sol')
            coinType = 'solana';
        const params = {
            cashierType: cashierType,
            coinType: coinType
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
            params: params
        };
      
        axios.get(`/api/users/cashierhistory`, config)
            .then(function(response) {
                if(response.status == 200) {
                    console.log(response.data);
                    setHistoryList(response.data);
                    setLoadingState(false);
                }
            })
            .catch(function(err){
                console.log(err)
            });
    }

    return (
        <>
            <div className='m-10'>
                {
                    loadingState == true ? (
                        <div className='flex justify-center'>
                            <SvgLoading width="40" height="40"></SvgLoading>
                        </div>
                    ) : (
                        <div>
                            {
                             historyLists.length == 0 ? (
                                 <div className='pt-4'>
                                     <p className='flex justify-center no-entry'>
                                         No entries
                                     </p>
                                 </div>
                             ) : (
                                 <div>
                                    <table className="statistics-table">
                                        <thead >
                                            <tr className='!text-[14px]'>
                                                <th className="statistics-table-header-1">
                                                    <div>
                                                        TRANSACTION
                                                    </div>
                                                </th>
                                                <th className="statistics-table-header-1">
                                                    <div>
                                                        DATE/TIME
                                                    </div>
                                                </th>
                                                <th className="statistics-table-header-1">
                                                    <div>
                                                        AMOUNT
                                                    </div>
                                                </th>
                                                <th className="statistics-table-header-1">
                                                    <div>
                                                        CREDIT AMOUNT
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="table-data-body">
                                            {
                                                historyLists.map((list) => 
                                                    <tr className="table-data-row text-[14px]">
                                                        <td>
                                                            <div>
                                                                <a href={`${transactionUrl}${list.txHash}`}  target="_blank" className='underline'>VIEW</a>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                {Intl.DateTimeFormat('en-US', dateTimeOptions).format(new Date(list.dateTime))}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                {list.amount} {type.toUpperCase()}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                $ {list.creditAmount}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                 </div>
                             )
                            } 
                        </div>
                    )       
                }
            </div>
        </>
    );
}
  
export default TransactionHistory;