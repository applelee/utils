export const Co = generator => {
  const ge = generator()
  
  const geLoop = next => {
    !next.done && next.value.then(res => geLoop(ge.next(res)))
  }
  
  geLoop(ge.next())
}
