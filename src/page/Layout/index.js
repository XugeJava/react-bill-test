import { Outlet, useNavigate } from "react-router-dom";
import { TabBar } from "antd-mobile"
import { getList } from "@/store/modules";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
    BillOutline,
    CalculatorOutline,
    AddCircleOutline
} from 'antd-mobile-icons'
import './index.scss';
const tabs = [
    {
        key: '/',
        title: '月度账单',
        icon: <BillOutline />,
    },
    {
        key: '/new',
        title: '记账',
        icon: <AddCircleOutline />,
    },
    {
        key: '/year',
        title: '年度账单',
        icon: <CalculatorOutline />,
    },
]
const Layout=()=>{
    //点击切换路由
    const navigate=useNavigate();
    const switchRoute=(path)=>{
        navigate(path)
    }
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(getList());
    }, [dispatch])
    return (
        <div className="layout">
            <div className="container">
                <Outlet />
            </div>
            <div className="footer">
                <TabBar onChange={switchRoute}>
                    {tabs.map(item => (
                        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                    ))}
                </TabBar>
            </div>
        </div>
    )
}
export default Layout