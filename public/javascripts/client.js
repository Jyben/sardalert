let played = false

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.getRegistrations().then(
		function (registrations) {
			try {
				for (let registration of registrations) {
					registration.unregister()
				}
			} catch (error) {
				console.log(error)
			}
		}
	)

	run().catch(error => console.error(error))
}

async function run() {
	const registration = await navigator.serviceWorker.
		register('sw.js', { scope: './' })

	Notification.requestPermission(function (result) {
		if (result === 'granted') {
			if (!navigator.serviceWorker) {
				return console.error("Service Worker not supported")
			}

			navigator.serviceWorker.ready
				.then(registration => registration.sync.register('syncData'))
				.then(() => console.log("Registered background sync"))
				.catch(err => console.error("Error registering background sync", err))
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