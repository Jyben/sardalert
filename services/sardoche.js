const axios = require('axios')
const url = 'http://api.sardoche.tv/u/sardoche'

exports.getData = async function () {
    try {
        const response = await axios.get(url)
        const status = response.data

        if (status.live.start && (new Date(status.live.start)).getTime() > Date.now()) {
            const time = new Date(status.live.start).getTime()
            return { 'live': true, 'time': time, 'onair': status.live.onair }
        }
        else {
            return { 'live': false, 'onair': status.live.onair }
        }
    } catch (error) {
        console.log(error)
    }
}