import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import {
    useContext,
    useEffect,
    useRef
} from 'react'
import {
    useObserveBottomSentinels,
    useObserveTopSentinels,
    useSentinelOffsets
} from '../../components/hooks/useSetHeader'
import {
    StickyProvider,
    StickySectionContext,
    useStickyActions,
    useStickyState
} from '../../context/contextsticky'
import styles from './Home.module.css'

function Sticky ({
  children,
  as = 'div',
  className = '',
  ...rest
}) {
  const { topSentinelRef, bottomSentinelRef } = useContext(StickySectionContext)
  const dispatch = useStickyActions()
  const addStickyRef = stickyRef => {
    dispatch.addStickyRef(topSentinelRef, bottomSentinelRef, stickyRef)
  }
  const Component = as
  // const VIEW_VISITOR = gql`
  //       mutation setVisitorStore($input: InputVisitorStoreType) {
  //       setVisitorStore(input: $input) {
  //           success
  //           message
  //       }
  //       }
  //   `
  // const [setVisitorStore] = useMutation(VIEW_VISITOR)
  // const location = useRouter()
  // useEffect(() => {
  //   const UserId = window.localStorage.getItem('usuario')
  //   setVisitorStore({
  //     variables: {
  //       input: {
  //         id: !!UserId && UserId,
  //         idStore: location.query.id
  //       }
  //     }
  //   // eslint-disable-next-line n/handle-callback-err
  //   }).catch(err => { return {} })
  // }, [location.query])
  return (
    <Component
      className={styles.sticky + className || ` ${className}`}
      ref={addStickyRef}
      {...rest}
    >
      {children}
    </Component>
  )
}

Sticky.propTypes = {
  as: PropTypes.string,
  children: PropTypes.object,
  className: PropTypes.string
}
const noop = () => { }
/**
 * A section, in which <Sticky /> element element is observed
 */
function StickyBoundary ({
  as = 'section',
  onChange = noop,
  onStuck = noop,
  onUnstuck = noop,
  children,
  ...rest
}) {
  const Component = as

  //  eslint-disable-next-line
  const { debug } = useStickyState()
  const topSentinelRef = useRef(null)
  const bottomSentinelRef = useRef(null)

  const { bottomSentinelHeight, topSentinelMarginTop } = useSentinelOffsets(
    topSentinelRef
  )

  useObserveTopSentinels(topSentinelRef, {
    events: {
      onChange,
      onStuck,
      onUnstuck
    }
  })

  useObserveBottomSentinels(bottomSentinelRef, {
    events: {
      onChange,
      onStuck,
      onUnstuck
    }
  })

  const value = { topSentinelRef, bottomSentinelRef }
  return (
    <StickySectionContext.Provider value={value}>
      <Component className={styles.sticky__section} {...rest}>
        <div
          ref={topSentinelRef}
          style={{ marginTop: `-${topSentinelMarginTop}` }}
        >
        </div>
        {children}
        <div
          ref={bottomSentinelRef}
          style={{
            height: `${bottomSentinelHeight}`
          }}
        >
        </div>
      </Component>
    </StickySectionContext.Provider>
  )
}

StickyBoundary.propTypes = {
  as: PropTypes.string,
  children: PropTypes.object,
  onChange: PropTypes.func,
  onStuck: PropTypes.func,
  onUnstuck: PropTypes.func
}

/**
 * Ref to the sticky viewport
 */
function StickyRoot ({
  children,
  as: Component = 'div',
  ...rest
}) {
  const dispatch = useStickyActions()

  const addContainerRef = containerRef => {
    dispatch.setContainerRef(containerRef)
  }
  return (
    <Component ref={addContainerRef} {...rest}>
      {children}
    </Component>
  )
}

StickyRoot.propTypes = {
  as: PropTypes.string,
  children: PropTypes.any
}

function StickyViewport ({
  children,
  as = 'div',
  ...rest
}) {
  return (
    <StickyProvider>
      <StickyRoot as={as} {...rest}>
        {children}
      </StickyRoot>
    </StickyProvider>
  )
}

StickyViewport.propTypes = {
  as: PropTypes.string,
  children: PropTypes.any
}

export { StickyViewport, StickyBoundary, Sticky }

