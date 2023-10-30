import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import {useState} from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs'
import { useSelector } from 'react-redux';
import {useMemo} from 'react'
import _ from "lodash";
import { useEffect } from 'react';
import DailyBill from "./components/Day/index"
const Month = () => {
    const [visible,setVisible]=useState(false);
    //时间切换
    const [current, setCurrent] = useState(() => {
        return dayjs().format('YYYY-MM')
    })
    //当前月度数据列表
    const [monthList,setMonthList]=useState([])
    // 时间选择框确实事件
    const dateConfirm = (date) => {
        // 关闭弹框
        setVisible(false);
        //当前月key
        const month = dayjs(date).format('YYYY-MM')
        //设置当前月
        setCurrent(month)
        setMonthList(monthGroup[month])
    }
    //获取账单列表
    const billList = useSelector(state => state.bill.billList);
    //分组数据
    const monthGroup=useMemo(()=>{
        return _.groupBy(billList,item=>dayjs(item.date).format('YYYY-MM'))
    },[billList])
    
    //首次加载
    useEffect(()=>{
        const list=monthGroup[dayjs().format('YYYY-MM')]
        setMonthList(list?list:[])
    },[monthGroup])

    //计算统计
    const overview=useMemo(()=>{
        if(!monthList) return {income:0,pay:0,total:0}

        const income=monthList.filter(item=>item.type==='income').reduce((a,c)=>a+c.money,0)
        const pay=monthList.filter(item=>item.type==='pay').reduce((a,c)=>a+c.money,0)
        return {
            income,
            pay,
            total:income+pay
        }
    }, [monthList])
    // 把当前月按日分组账单数据
    const dayGroup = useMemo(() => {
        const group = _.groupBy(monthList, (item) => dayjs(item.date).format('YYYY-MM-DD'))
        return {
            dayKeys: Object.keys(group),
            group
        }
    }, [monthList])

   
    return (
        <div className="monthlyBill">
            <NavBar className="nav" backArrow={false}>
                月度收支
            </NavBar>
            <div className="content">
                <div className="header">
                    {/* 时间切换区域 */}
                    <div className="date" onClick={() => setVisible(true)}>
                        <span className="text">
                            {current}月账单
                        </span>
                        <span  className={classNames('arrow',visible&&'expand')} ></span>
                    </div>
                    {/* 统计区域 */}
                    <div className='twoLineOverview'>
                        <div className="item">
                            <span className="money">{overview.pay.toFixed(2)}</span>
                            <span className="type">支出</span>
                        </div>
                        <div className="item">
                            <span className="money">{overview.income.toFixed(2)}</span>
                            <span className="type">收入</span>
                        </div>
                        <div className="item">
                            <span className="money">{overview.total.toFixed(2)}</span>
                            <span className="type">结余</span>
                        </div>
                    </div>
                   
                    {/* 时间选择器 */}
                    <DatePicker
                        className="kaDate"
                        title="记账日期"
                        precision="month"
                        onClose={() => {
                            setVisible(false)
                        }}
                        visible={visible}
                        max={new Date()}
                        onConfirm={dateConfirm}
                        onCancel={()=>setVisible(false)}
                    />
                </div>
                {
                    dayGroup.dayKeys.map(item=>{
                        return <DailyBill key={item} billList={dayGroup.group[item]} date={item}/>
                    })
                }
            </div>
        </div >
    )
}

export default Month