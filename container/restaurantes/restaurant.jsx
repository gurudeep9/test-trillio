import { useMutation } from '@apollo/client'
import { PUSH_RECOMMENDED } from 'gql/Recommendation'
import Image from 'next/image'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { PVColor, WColor } from '../../public/colors'
import { IconLoveFill, IconRate } from '../../public/icons'
import {
  Content,
  ItemWrapper,
  MerchantListWrapper
} from './styled'

export const ListRestaurant = ({
  data = [],
  catStoreId = '',
  like = false
}) => {
  const [pushOneRecommendation] = useMutation(PUSH_RECOMMENDED, {
    context: { clientName: '' }
  })

  return (
    <Content>
      <MerchantListWrapper>
        {data?.map((store) => {
          const nameStore = store?.storeName || store?.getOneStore?.storeName
          const isOpen = store?.open || store?.getOneStore
          const formattedNameStore = nameStore?.replace(/\s/g, '-').toLowerCase()
          const city = (like ? store?.getOneStore?.city?.cName : store?.city?.cName)?.toLowerCase()

          const calculateAverageRating = (ratings) => {
            let sum = 0
            const avgRatings = ratings.map((rating, index) => {
              sum += rating.rScore
              return sum / (index + 1)
            })
            return avgRatings
          }

          const avgRatings = calculateAverageRating(store?.getAllRatingStar || [])

          return (
            <div key={store.idStore || store.fIStoreId}>
              <Link
                href={{
                  pathname: catStoreId
                    ? `/delivery/${encodeURIComponent(city)}-${encodeURIComponent(store?.department?.dName || store?.getOneStore?.department?.dName?.toLowerCase())}/${formattedNameStore}/${store.idStore}`
                    : `/delivery/${encodeURIComponent(city)}-${encodeURIComponent(store?.department?.dName || store?.getOneStore?.department?.dName?.toLowerCase())}/${formattedNameStore}/${store?.idStore}`,
                  query: { categories: catStoreId }
                }}
                passHref
                shallow
              >
                <a>
                  <ItemWrapper
                    isOpen={isOpen === 1}
                    key={store.idStore}
                    onClick={() => { return pushOneRecommendation({ variables: { input: { id: '', carProId: !like ? store.catStore : store.getOneStore.catStore } } }) }}
                  >
                    <div>
                      <Image
                        alt='Picture of the author'
                        className='store_image'
                        height={100}
                        src='/images/b70f2f6c-8afc-4d75-bdeb-c515ab4b7bdd_BRITS_GER85.jpg'
                        width={100}
                      />
                    </div>
                    <div>
                      <h2 className='Name'>{nameStore}</h2>
                      <span className='store_info'>{store?.cateStore?.cName || store?.getOneStore?.cateStore?.cName} {avgRatings?.length > 0 && <><IconRate color={WColor} size={18} /> {avgRatings[avgRatings.length - 1]?.toFixed(1)}</>}</span>
                      <div>
                        {!isOpen && <span className='store_info close'>Cerrado</span>}
                      </div>
                    </div>
                    {store.fState === 1 && <IconLoveFill color={PVColor} size={20} />}
                  </ItemWrapper>
                </a>
              </Link>
            </div>
          )
        })}
      </MerchantListWrapper>

    </Content>
  )
}


ListRestaurant.propTypes = {
  data: PropTypes.array,
  map: PropTypes.func,
  catStoreId: PropTypes.string,
  like: PropTypes.bool

}
