import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '@/components/Icon'
import './index.scss'
import classNames from 'classnames'
import { billListData } from '@/constants'
import { useNavigate } from 'react-router-dom'
import {useState} from "react"
import { saveList } from "@/store/modules/index"
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs'
const New = () => {
    const navigate = useNavigate();
    const [type,setType]=useState('pay');
    const [money,setMoney]=useState(0)
    const [use,setUse]=useState('');
    const dispatch=useDispatch();
    const [date,setDate]=useState(new Date())
    const [visible,setVisible]=useState(false)
    const saveBill =async()=>{
        const data={
            type,
            money:type==='pay'?-money:money,
            date,
            useFor:use
        }
        //调用异步action
        await dispatch(saveList(data));
        navigate('/')
    }

    // 时间选择框确实事件
    const dateConfirm = (date) => {
        // 关闭弹框
        setVisible(false);
        setDate(date)
    }
    return (
        <div className="keepAccounts">
            <NavBar className="nav" onBack={() => navigate(-1)}>
                记一笔
            </NavBar>

            <div className="header">
                <div className="kaType">
                    <Button
                        shape="rounded"
                        className={classNames(type==='pay'?'selected':'')}
                        onClick={()=>setType('pay')}
                    >
                        支出
                    </Button>
                    <Button
                        shape="rounded"
                        className={classNames(type === 'income' ? 'selected' : '')}
                        onClick={() => setType('income')}
                    >
                        收入
                    </Button>
                </div>

                <div className="kaFormWrapper">
                    <div className="kaForm">
                        <div className="date" onClick={()=>setVisible(true)}>
                            <Icon type="calendar" className="icon" />
                            <span className="text">{dayjs(date).format('YYYY-MM-DD')}</span>
                            <DatePicker
                                className="kaDate"
                                title="记账日期"
                                max={new Date()}
                                visible={visible}
                                onClose={() => {
                                    setVisible(false)
                                }}
                                onConfirm={dateConfirm}
                                onCancel={() => setVisible(false)}
                            />
                        </div>
                        <div className="kaInput">
                            <Input
                                className="input"
                                placeholder="0.00"
                                type="number"
                                value={money}
                                onChange={(value)=>setMoney(value)}
                            />
                            <span className="iconYuan">¥</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="kaTypeList">
                {billListData[type].map(item => {
                    return (
                        <div className="kaType" key={item.type}>
                            <div className="title">{item.name}</div>
                            <div className="list">
                                {item.list.map(item => {
                                    return (
                                        <div
                                            className={classNames(
                                                'item',
                                                use===item.type?'selected':''
                                            )}
                                            key={item.type}
                                            onClick={()=>setUse(item.type)}
                                        >
                                            <div className="icon">
                                                <Icon type={item.type} />
                                            </div>
                                            <div className="text">{item.name}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="btns">
                <Button className="btn save" onClick={() => saveBill()}>
                    保 存
                </Button>
            </div>
        </div>
    )
}

export default New