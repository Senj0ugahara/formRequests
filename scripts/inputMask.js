let phoneInput = document.querySelector('.input[name="phone"]')
phoneInput.addEventListener('keydown', function(e) {
   if( !(e.key == 'ArrowLeft' || e.key == 'ArrowRight' || e.key == 'Backspace' || e.key == 'Tab')) { event.preventDefault() }
    let mask = '+7 (111) 111-11-11';
 
    if (/[0-9\+\ \-\(\)]/.test(e.key)) {
        let currentString = this.value;
        let currentLength = currentString.length;
        if (/[0-9]/.test(e.key)) {
            if (mask[currentLength] == '1') {
                this.value = currentString + e.key;
            } else {
                for (let i=currentLength; i<mask.length; i++) {
                if (mask[i] == '1') {
                    this.value = currentString + e.key;
                    break;
                }
                currentString += mask[i];
                }
            }
        }
    } 
});