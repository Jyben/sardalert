let played = false

const socket = io.connect('https://sardalert.com')
socket.on('data', (resultData) => {
	if ('serviceWorker' in navigator) {
		run().catch(error => console.error(error))
	}

	async function run() {
		const registration = await navigator.serviceWorker.
			register('sw.js', { scope: './' })

		Notification.requestPermission(function (result) {
			if (result === 'granted') {
				registration.showNotification('Sardoche Live Alert', {
					body: `Début du live de Sardoche prévu à ${resultData.time}`,
					icon: 'https://static-cdn.jtvnw.net/emoticons/v1/300746370/2.0'
				})
			}
		})
	}
})

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