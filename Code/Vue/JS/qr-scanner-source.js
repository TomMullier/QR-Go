import QrScanner from 'qr-scanner';

new QrScanner(
    document.getElementById('qr-video'),
    result => console.log(result.data), {
      highlightCodeOutline: true,
      highlightScanRegion: true,
      returnDetailedScanResult: true
    }
).start();