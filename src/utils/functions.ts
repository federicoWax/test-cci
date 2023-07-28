export const stringToNumber = (value: string | undefined) => {
  if (!value) return 0

  if (isFinite(+value)) {
    return +value
  }

  return 0;
}
