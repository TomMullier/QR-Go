import QrScanner from 'qr-scanner';

const qrScanner = new QrScanner(
    document.getElementById('qr-video'),
    result => alert(result.data), {returnDetailedScanResult: true}
);

qrScanner.start();


document.getElementById('qr-display').appendChild(qrScanner.$canvas);
