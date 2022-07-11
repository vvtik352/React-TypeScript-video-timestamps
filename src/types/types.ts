export type TimeStampAnalytic = {
    id: string,
    timestamp: number,
    duration: number,
    zone: Zone,
}

type Zone = {
    left: number,
    top: number,
    width: number,
    height: number
}