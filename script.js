const inputValue = document.querySelector('#inputValue');
const btnValue = document.querySelector('#btnValue');
const imgQrCode = document.querySelector('#imgQrCode');
const btnCopy = document.querySelector('#btnCopy');
const wrapper = document.querySelector('.wrapper');
let valueDefault;

// https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example 

btnValue.addEventListener('click', () => {
    let qrcodeValue = inputValue.value.trim();  
    if (!qrcodeValue || qrcodeValue === valueDefault) return;
    valueDefault = qrcodeValue;
    btnValue.innerText = 'Gerando QR Code...';
    imgQrCode.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${valueDefault}`;
    imgQrCode.addEventListener('load', () => {
        wrapper.classList.add('active');
        btnValue.innerText = 'Gerar QRCode';
        btnCopy.style.display = 'block'; // Mostrar o botão de copiar quando o QR code for gerado
        btnCopy.style.marginTop = "5px";
    });
});

btnCopy.addEventListener('click', () => {
    fetch(imgQrCode.src)
        .then(response => response.blob())
        .then(blob => {
            const item = new ClipboardItem({'image/png': blob});
            navigator.clipboard.write([item]).then(() => {
                alert('QR Code copiado para a área de transferência!');
            }).catch(err => {
                console.error('Falha ao copiar o QR Code:', err);
            });
        });
});
