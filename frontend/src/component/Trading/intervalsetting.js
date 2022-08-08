
import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

function IntervalSetting() {
    const [periodType, setPeriodType] = useState('Tick');

    return (
        <Dropdown className='relative'>
            <Dropdown.Toggle id="dropdown-period" variant="secondary" className='table-datafilter-selector !w-full !text-[14px]'>
                {periodType}
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark " className='!rounded-2 p-1 bg-[#1F2330] mt-4 absolute !-left-6'>
                <Dropdown.Item href="#" className={`rounded-3 my-1 px-2 ${periodType === 'Tick' && "yellow-text"}`} onClick={() => {setPeriodType('Tick');}}>Tick</Dropdown.Item>
                <Dropdown.Item href="#" className={`rounded-3 my-1 px-2 ${periodType === '5s' && "yellow-text"}`} onClick={() => {setPeriodType('5s');}}>5s</Dropdown.Item>
                <Dropdown.Item href="#" className={`rounded-3 my-1 px-2 ${periodType === '15s' && "yellow-text"}`} onClick={() => {setPeriodType('15s');}}>15s</Dropdown.Item>
                <Dropdown.Item href="#" className={`rounded-3 my-1 px-2 ${periodType === '30s' && "yellow-text"}`} onClick={() => {setPeriodType('30s');}}>30s</Dropdown.Item>
                <Dropdown.Item href="#" className={`rounded-3 my-1 px-2 ${periodType === '1m' && "yellow-text"}`} onClick={() => {setPeriodType('1m');}}>1m</Dropdown.Item>
                <Dropdown.Item href="#" className={`rounded-3 my-1 px-2 ${periodType === '3m' && "yellow-text"}`} onClick={() => {setPeriodType('3m');}}>3m</Dropdown.Item>
                <Dropdown.Item href="#" className={`rounded-3 my-1 px-2 ${periodType === '5m' && "yellow-text"}`} onClick={() => {setPeriodType('5m');}}>5m</Dropdown.Item>
                <Dropdown.Item href="#" className={`rounded-3 my-1 px-2 ${periodType === '15m' && "yellow-text"}`} onClick={() => {setPeriodType('15m');}}>15m</Dropdown.Item>
                <Dropdown.Item href="#" className={`rounded-3 my-1 px-2 ${periodType === '30m' && "yellow-text"}`} onClick={() => {setPeriodType('30m');}}>30m</Dropdown.Item>
                <Dropdown.Item href="#" className={`rounded-3 my-1 px-2 ${periodType === '1h' && "yellow-text"}`} onClick={() => {setPeriodType('1h');}}>1h</Dropdown.Item>
                <Dropdown.Item href="#" className={`rounded-3 my-1 px-2 ${periodType === '2h' && "yellow-text"}`} onClick={() => {setPeriodType('2h');}}>2h</Dropdown.Item>
                <Dropdown.Item href="#" className={`rounded-3 my-1 px-2 ${periodType === '4h' && "yellow-text"}`} onClick={() => {setPeriodType('4h');}}>4h</Dropdown.Item>
                <Dropdown.Item href="#" className={`rounded-3 my-1 px-2 ${periodType === '6h' && "yellow-text"}`} onClick={() => {setPeriodType('6h');}}>6h</Dropdown.Item>
                <Dropdown.Item href="#" className={`rounded-3 my-1 px-2 ${periodType === '12h' && "yellow-text"}`} onClick={() => {setPeriodType('12h');}}>12h</Dropdown.Item>
                <Dropdown.Item href="#" className={`rounded-3 my-1 px-2 ${periodType === '1d' && "yellow-text"}`} onClick={() => {setPeriodType('1d');}}>1d</Dropdown.Item>
                
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default IntervalSetting;