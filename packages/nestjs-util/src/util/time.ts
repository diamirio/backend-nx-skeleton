export function getDuration (start: number, finish: number): number {
  // Since it is possible to do calculations with dates this weird type conversion is needed
  return ((finish || (new Date() as any as number)) - start) / 1000
}
