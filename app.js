let port; // Declare a variable for the serial port object

// Function to request and connect to the serial port
async function connectToArduino() {
  try {
    console.log("Requesting port...");
    port = await navigator.serial.requestPort(); // Ask the user to select a port
    await port.open({ baudRate: 9600 }); // Open the selected port at 9600 baud rate
    console.log('Connected to Arduino');
  } catch (error) {
    console.error('Failed to connect to Arduino:', error); // If the connection fails, log an error
  }
}

// Function to send a command to Arduino over Serial
async function sendCommand(command) {
  if (port && port.writable) {
    console.log(`Sending command: ${command}`); // Log the command being sent
    const writer = port.writable.getWriter(); // Get the writer to send data
    const encoder = new TextEncoder(); // Text encoder to convert the string to bytes
    const commandBytes = encoder.encode(command + '\n'); // Convert the command to bytes and append a newline
    await writer.write(commandBytes); // Write the command to the serial port
    writer.releaseLock(); // Release the lock on the writer after sending
  } else {
    console.error("Serial port not connected or writable.");
  }
}

const Button = document.getElementById('button');
const LockButton = document.getElementById('lock-button');
const UnlockButton = document.getElementById('unlock-button');
const LockMessage = document.getElementById('lock-message');
const UnlockMessage = document.getElementById('unlock-message');

LockButton.addEventListener('click', function(){
    LockButton.style.display = 'none';
    LockMessage.style.display = 'none';
    UnlockButton.style.display = 'flex';
    UnlockMessage.style.display = 'flex';
});

UnlockButton.addEventListener('click', function(){
    LockButton.style.display = 'flex';
    LockMessage.style.display = 'flex';
    UnlockButton.style.display = 'none';
    UnlockMessage.style.display = 'none';
});

const firstButton = document.getElementById('hc-button');
const firstLockButton = document.getElementById('hc-lock-button');
const firstUnlockButton = document.getElementById('hc-unlock-button');
const firstLockMessage = document.getElementById('hc-lock-message');
const firstUnlockMessage = document.getElementById('hc-unlock-message');

firstLockButton.addEventListener('click', function(){
    firstLockButton.style.display = 'none';
    firstLockMessage.style.display = 'none';
    firstUnlockButton.style.display = 'flex';
    firstUnlockMessage.style.display = 'flex';
    sendCommand("LED_OFF")
});

firstUnlockButton.addEventListener('click', function(){
    firstLockButton.style.display = 'flex';
    firstLockMessage.style.display = 'flex';
    firstUnlockButton.style.display = 'none';
    firstUnlockMessage.style.display = 'none';
    sendCommand("LED_ON")
});

const locationSelect = document.getElementById('devices');
const defaultDev = document.getElementById('default-page');
const firstDev = document.getElementById('device-1-page');
 
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

window.onload = () => {
    connectToArduino();
};
