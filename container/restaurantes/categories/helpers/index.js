export const imagePaths = {
  japonesa: './images/japonesa.avif',
  comidarapida: './images/lanches.avif',
  pizza: './images/pizza.png',
  comidachina: './images/chinesa.avif',
  carnes: './images/carnes.avif'
}

export const handleJoinImage = ({ data }) => {
  const array = data.map((data) => {
    if (!data?.cName) return data
    const cName = data?.cName?.toLowerCase().replace(/\s+/g, '') || null
    const cPathImage = imagePaths[cName]
    return {
      ...data,
      cPathImage
    }
  })
  return array
}
