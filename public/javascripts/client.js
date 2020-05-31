let played = false;
let notified = false;

if ('serviceWorker' in navigator) {
	run().catch(error => console.error(error))
}

async function run() {
	const registration = await navigator.serviceWorker.
		register('./sw.js', { scope: '/' })

	Notification.requestPermission(function (result) {
		if (result === 'granted') {
			navigator.serviceWorker.ready.then(function (registration) {
				setInterval(async (callback) => {
					await fetch('/status', {
						method: 'GET'
					}).then(function (response) {
						response.json().then(function (result) {
							if (result.live) {
								callback(result.time)
							}
							else if (!result.onair) {
								notified = false;
							}
						});
					})
				},
					60000,
					(time) => {
						if (notified) return;

						notified = true;
						registration.showNotification('Sardoche Live Alert', {
							body: `Début du live de Sardoche prévu à ${time}`,
							icon: 'https://static-cdn.jtvnw.net/emoticons/v1/300746370/2.0'
						})
					})
			})
		}
	})
}

function play() {
	const audio = document.getElementById("audio")

	if (played) {
		played = false
		audio.pause()
	}
	else {
		played = true
		audio.play()
	}
}