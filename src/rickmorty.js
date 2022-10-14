const fetchCharacters = async (ids) => {
  try {
    console.log(ids)
    const response = await fetch(`https://rickandmortyapi.com/api/character/${ids}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

export default fetchCharacters
