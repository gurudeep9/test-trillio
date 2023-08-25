import PropTypes from 'prop-types'
import { AsideCheckout } from '../../components/AsideCheckout'

export const AsideCheckoutC = ({ handleMenu, menu }) => {
  return <AsideCheckout handleMenu={handleMenu} menu={menu} />
}

AsideCheckoutC.propTypes = {
  handleMenu: PropTypes.func,
  menu: PropTypes.bool
}
