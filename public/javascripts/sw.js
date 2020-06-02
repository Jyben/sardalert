let notified = false

self.addEventListener('sync', function (event) {
	if (event.tag === 'syncData') {
		event.waitUntil(syncData()) // sending sync request
	}
})

async function syncData() {
	setInterval(async (callback) => {
		await fetch('/status', {
			method: 'GET'
		}).then(function (response) {
			response.json().then(function (result) {
				if (result.live) {
					callback(result.time)
				}
				else if (!result.onair) {
					notified = false
				}
			})
		})
	},
		60000,
		(time) => {
			if (notified) return

			notified = true
			registration.showNotification('Sardoche Live Alert', {
				body: `Début du live de Sardoche prévu à ${time}`,
				icon: 'https://static-cdn.jtvnw.net/emoticons/v1/300746370/2.0'
			})
		})
}