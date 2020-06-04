const axios = require('axios')
const url = 'http://api.sardoche.tv/u/sardoche'

let notified = false

async function syncData(io) {
	try {
		setInterval(async () => {
			const result = await getData(io)
			if (result.live && !notified) {
				notified = true
				io.emit('data', result)
			}
			else if (!result.live) {
				notified = false
			}

		}, 60000)
	} catch (error) {
		console.log(error)
	}
}

async function getData(io) {
	const response = await axios.get(url)
	const status = response.data
	if (status.live.start && (new Date(status.live.start)).getTime() > Date.now()) {
		const time = new Date(status.live.start)
		const hours = time.getHours() + 2
		return { 'live': true, 'time': ('0' + hours).slice(-2) + ":" + ('0' + time.getMinutes()).slice(-2), 'onair': status.live.onair }
	}
	else {
		return { 'live': false, 'onair': status.live.onair }
	}
}

module.exports = {
	syncData,
	getData
}