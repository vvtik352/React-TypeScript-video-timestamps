import { TimeStampAnalytic } from "../types/types"

export default async function fetchTimeStamps() {
    return fetch('http://www.mocky.io/v2/5e60c5f53300005fcc97bbdd', {
        headers: {
            'content-type': 'application/json'
        }
    })
        .then((response: Response) => {
            return response.json()
        })
        .then((data: Array<TimeStampAnalytic>) => {
            return (data.sort((a: TimeStampAnalytic, b: TimeStampAnalytic) => {
                return a.timestamp - b.timestamp
            }))
        })
        .catch((err: any) => {
            console.error(err)
        })
}