export function convertMsToDate(ms: number) {
    let d = new Date(1000 * (ms / 1000)); // round to nearest second

    function pad(i: any) {
        return ('0' + i).slice(-2);
    }
    let str = d.getUTCMinutes() + ':' + pad(d.getUTCSeconds()) + ':' + pad(d.getUTCMilliseconds());
    return str
}