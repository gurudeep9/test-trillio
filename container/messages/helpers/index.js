export const removeDuplicatesByIdStore = (arr) => {
  const uniqueStoreOrders = arr.reduce((accumulator, currentOrder) => {
    const existingOrder = accumulator.find(
      (order) => { return order.getOneStore.idStore === currentOrder.getOneStore.idStore }
    )

    if (!existingOrder) {
      accumulator.push(currentOrder)
    }

    return accumulator
  }, [])

  return uniqueStoreOrders
}

// Uso del helper
