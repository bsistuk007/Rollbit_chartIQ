
import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

function PnlRoi() {
    const [type, setPeriodType] = useState('PNL');

    return (
        <Dropdown className='relative'>
            <Dropdown.Toggle id="dropdown-period" variant="secondary" className='table-datafilter-selector'>
                {type}
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark " className='!rounded-2 p-1 bg-[#1F2330] mt-4 absolute !-left-6'>
                <Dropdown.Item href="#" className={`rounded-3 my-1 px-2 ${type === 'PNL' && "yellow-text"}`} onClick={() => {setPeriodType('PNL');}}>PNL</Dropdown.Item>
                <Dropdown.Item href="#" className={`rounded-3 my-1 px-2 ${type === 'ROI' && "yellow-text"}`} onClick={() => {setPeriodType('ROI');}}>ROI</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default PnlRoi;