async function initDateTime() {
    const battery = 'getBattery' in navigator ? await navigator.getBattery() : null;

    function updateDateTime() {
        const now = new Date();
        const date = now.toLocaleDateString('en-GB');
        const time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

        let batteryInfo = '';
        if (battery) {
            const level = Math.round(battery.level * 100);
            batteryInfo = ' | ';
            if (battery.charging) batteryInfo += '⚡';
            batteryInfo += `${level}%`;
        }

        document.getElementById('datetime').textContent = `${time} | ${date}${batteryInfo}`;
    }

    if (battery) {
        battery.addEventListener('chargingchange', updateDateTime);
        battery.addEventListener('levelchange', updateDateTime);
    }

    setInterval(updateDateTime, 500);
    updateDateTime();
}

initDateTime();