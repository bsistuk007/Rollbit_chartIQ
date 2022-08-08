
import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

function PeriodSelect() {
    const [periodType, setPeriodType] = useState('Day');

    return (
        <Dropdown className='relative'>
            <Dropdown.Toggle id="dropdown-period" variant="secondary" className='table-datafilter-selector'>
                {periodType}
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark " className='!rounded-2 p-1 bg-[#1F2330] mt-4 absolute !-left-6'>
                <Dropdown.Item href="#" className={`rounded-3 my-1 px-2 ${periodType === 'Day' && "yellow-text"}`} onClick={() => {setPeriodType('Day');}}>Day</Dropdown.Item>
                <Dropdown.Item href="#" className={`rounded-3 my-1 px-2 ${periodType === 'Week' && "yellow-text"}`} onClick={() => {setPeriodType('Week');}}>Week</Dropdown.Item>
                <Dropdown.Item href="#" className={`rounded-3 my-1 px-2 ${periodType === 'Month' && "yellow-text"}`} onClick={() => {setPeriodType('Month');}}>Month</Dropdown.Item>
                {/* <Dropdown.Item href="#" onClick={setPeriodType('Day')}>Day</Dropdown.Item>
                <Dropdown.Item href="#" onClick={setPeriodType('Week')}>Week</Dropdown.Item>
                <Dropdown.Item href="#" onClick={setPeriodType('Month')}>Period</Dropdown.Item> */}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default PeriodSelect;