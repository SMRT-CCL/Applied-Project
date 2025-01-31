const locationSelect = document.getElementById('devices');
const defaultDev = document.getElementById('default-page');
const firstDev = document.getElementById('device-1-page');
 
const Button = document.getElementById('button');
const LockButton = document.getElementById('lock-button');
const UnlockButton = document.getElementById('unlock-button');
const LockMessage = document.getElementById('lock-message');
const UnlockMessage = document.getElementById('unlock-message');

const firstButton = document.getElementById('hc-button');
const firstLockButton = document.getElementById('hc-lock-button');
const firstUnlockButton = document.getElementById('hc-unlock-button');
const firstLockMessage = document.getElementById('hc-lock-message');
const firstUnlockMessage = document.getElementById('hc-unlock-message');

LockButton.addEventListener('click', function(){
    LockButton.style.display = 'none';
    LockMessage.style.display = 'none';
    UnlockButton.style.display = 'flex';
    UnlockMessage.style.display = 'flex';
    sendCommand("LED_OFF");
});

UnlockButton.addEventListener('click', function(){
    LockButton.style.display = 'flex';
    LockMessage.style.display = 'flex';
    UnlockButton.style.display = 'none';
    UnlockMessage.style.display = 'none';
    sendCommand("LED_ON");
});

firstLockButton.addEventListener('click', function(){
    firstLockButton.style.display = 'none';
    firstLockMessage.style.display = 'none';
    firstUnlockButton.style.display = 'flex';
    firstUnlockMessage.style.display = 'flex';
});

firstUnlockButton.addEventListener('click', function(){
    firstLockButton.style.display = 'flex';
    firstLockMessage.style.display = 'flex';
    firstUnlockButton.style.display = 'none';
    firstUnlockMessage.style.display = 'none';
});

locationSelect.addEventListener('change', function(){
    defaultDev.style.display = 'block';
    Button.style.display = 'flex';
    LockButton.style.display = 'flex';
    LockMessage.style.display = 'flex';
    UnlockButton.style.display = 'none';
    UnlockMessage.style.display = 'none';

    firstDev.style.display = 'none';
    firstButton.style.display = 'none';
    firstLockButton.style.display = 'none';
    firstLockMessage.style.display = 'none';
    firstUnlockButton.style.display = 'none';
    firstUnlockMessage.style.display = 'none';

    if (this.value == 'default-device'){
        defaultDev.style.display = 'block';
        Button.style.display = 'flex';
        LockButton.style.display = 'flex';
        LockMessage.style.display = 'flex';
        UnlockButton.style.display = 'none';
        UnlockMessage.style.display = 'none';

        firstDev.style.display = 'none';
        firstButton.style.display = 'none';
        firstLockButton.style.display = 'none';
        firstLockMessage.style.display = 'none';
        firstUnlockButton.style.display = 'none';
        firstUnlockMessage.style.display = 'none';

    } else if (this.value == 'device-1'){
        defaultDev.style.display = 'none';
        Button.style.display = 'none';
        LockButton.style.display = 'none';
        LockMessage.style.display = 'none';
        UnlockButton.style.display = 'none';
        UnlockMessage.style.display = 'none';

        firstDev.style.display = 'block';
        firstButton.style.display = 'flex';
        firstLockButton.style.display = 'flex';
        firstLockMessage.style.display = 'flex';
        firstUnlockButton.style.display = 'none';
        firstUnlockMessage.style.display = 'none';
    };
});

let port; // This will hold the serial port object

// Function to connect to the Arduino via Web Serial API
async function connectToArduino() {
try {
    port = await navigator.serial.requestPort(); // Request a serial port
    await port.open({ baudRate: 9600 }); // Open the serial connection
    console.log('Connected to Arduino');
    firstLockButton.disabled = false;
    firstUnlockButton.disabled = false;
    } catch (error) {
        console.error('Failed to connect to Arduino:', error);
    }
}

// Function to send a command to the Arduino over USB
async function sendCommand(command) {
    if (port && port.writable) {
        const writer = port.writable.getWriter();
        const encoder = new TextEncoder();
        const commandBytes = encoder.encode(command + '\n'); // Append newline to the command
        await writer.write(commandBytes); // Send the command
        writer.releaseLock(); // Release the writer after sending
    }
}
