    var tabLinks = document.getElementsByClassName('tab-links');
    var tabConts = document.getElementsByClassName('tab-cont');

    function opentab(tabname){
        for(tablink of tabLinks){
            tablink.classList.remove('activL');
        }
        for(tabCont of tabConts){
            tabCont.classList.remove('activT');
        }
        event.currentTarget.classList.add('activL');
        document.getElementById(tabname).classList.add('activT');
    }

    var sidem = document.getElementById('sidem');
    function openm(){
        console.log('open');
        sidem.style.right = '0';
    }
    function closem(){
        console.log('close');
        sidem.style.right = '-200px';
    }


    // Form submission
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyuFy5azcQ8vs935XLWPDwgAxxQlJlYOT8jj6npIWsKz7bDMIyue8jBdr0G132GAuXg/exec'
    const form = document.forms['submit-to-google-sheet']
    
    const msg = document.getElementById('msg')

    form.addEventListener('submit', e => {
      e.preventDefault()
      fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            msg.innerHTML = "Message sent successfully"
            setTimeout(() => {
                msg.innerHTML = ""
            }, 5000);
            form.reset()
            console.log('Success!', response)
        })
        
        .catch(error => console.error('Error!', error.message))
    })

