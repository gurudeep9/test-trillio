import PropTypes from 'prop-types'
import React from 'react'
import { ContainerTask, ListTask, OptionsFunction, Text } from './styled'

export const AddressList = ({ address }) => {
  return (
    <div>
      <ContainerTask
        selected={true}
        show={true}
      >
        <OptionsFunction>
          {/* <Button onClick={() => { return HandleDeleteUserLocations(index) }}><IconDelete color={PColor} size={30} /></Button> */}
        </OptionsFunction>
        asdafdsdf
        <ListTask>
          <div>
            <Text> {address?.description}</Text>
          </div>
        </ListTask>
        {/* <div style={{ display: 'contents' }}><Button onClick={() => { return setShow(index === show ? false : index) }}><IconDost color={show === index ? PColor : '#CCC'} size={30} /></Button></div> */}
      </ContainerTask>

    </div>
  )
}

AddressList.propTypes = {
  address: PropTypes.shape({
    description: PropTypes.any
  })
}
