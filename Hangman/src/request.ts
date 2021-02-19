export const getPuzzle = async () => {
  const response = await fetch(`//puzzle.mead.io/puzzle?wordCount=1`)
  if (response.status === 200) {
      const data = await response.json()
      return data.puzzle
  }
  else {
      throw new Error('Could not fetch data')
  }
}