import React from 'react'
import { useState } from 'react';
import { Collapse, Radio } from 'antd';
const { Panel } = Collapse;

function RadioBox(props) {

    const [value, setValue] = useState(0)


    const renderRadioBox = () => (
        props.list && props.list.map(value => (
            <Radio key={value._id} 
            value={value._id}
            > {value.name} 
            </Radio>
        ))
    )

    const handleChange = (event) => {
        setValue(event.target.value)
        props.handleFilters(event.target.value)
    }


    return (
        <div>
            <Collapse defaultActiveKey={['0']}>
                <Panel header="Price" key="1">

                    {/* 위의 value 같으면 클릭이 된것 */}
                    <Radio.Group onChange={handleChange} value={value}>
                        {renderRadioBox()}
                    </Radio.Group>
                </Panel>
            </Collapse>
    </div>
  )
}

export default RadioBox