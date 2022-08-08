import React from "react";
import { useParams } from "react-router-dom";
import Content from "../../component/Account/content";
import Deposits from "../../component/Account/deposits";
import Historys from "../../component/Account/historys";
import AccountPageLayout from "../../component/Account/layout";
import Profile from "../../component/Account/profile";
import Referrals from "../../component/Account/referrals";
import Settings from "../../component/Account/settings";
import Withdrawals from "../../component/Account/withdrawals";
import Layout from "../../layout";

const Account = () => {
    let { id  } = useParams();
    return (
        <Layout>
            <AccountPageLayout>
                {id === "profile" && (<Profile></Profile>)}
                {id === "referrals" && (<Referrals></Referrals>)}
                {id === "deposits" && (<Deposits></Deposits>)}
                {id === "withdrawals" && (<Withdrawals></Withdrawals>)}
                {id === "settings" && (<Settings></Settings>)}
            </AccountPageLayout>
        </Layout>
    );
}

export default Account;