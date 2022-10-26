/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'

export const FetchMoreInteractions = ({
  render,
  fetchMore = true,
  callback = () => {}
}) => {
  const loadingRef = useRef()

  const useOnScreen = ref => {
    const [isIntersecting, setIsIntersecting] = useState(false)

    const observer = new IntersectionObserver(
      ([entry]) => { return setIsIntersecting(entry.isIntersecting) }
    )

    useEffect(() => {
      if (ref.current) observer.observe(ref.current)
      // Remove the observer as soon as the component is unmounted
      return () => { observer.disconnect() }
    }, [ref, observer])

    return isIntersecting
  }

  const isVisible = useOnScreen(loadingRef)

  useEffect(() => {
    if (isVisible && fetchMore && callback) callback()
  }, [isVisible, fetchMore])

  return <div ref={loadingRef}>
    {
      isVisible && fetchMore ? render || <div style={{ background: 'red' }} >Loading...{isVisible && 'lol'}</div> : <></>
    }
  </div>
}

FetchMoreInteractions.propTypes = {
  callback: PropTypes.func,
  fetchMore: PropTypes.bool,
  render: PropTypes.any
}
