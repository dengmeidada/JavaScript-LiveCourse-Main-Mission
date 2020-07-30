export default (value) => {
  const intPart = value.toString().split('.')
  intPart[0] = intPart[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return 'NT$' + intPart.join('.')
}
