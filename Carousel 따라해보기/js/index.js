function carousel() {
    let slideshow = document.querySelector(".slideshow");
    let slideshow_slides = document.querySelector(".slideshow_slides");
    let slidesArray = document.querySelectorAll(".slideshow_slides a");
    let prev = document.querySelector(".prev");
    let next = document.querySelector(".next");
    let indicatorArray = document.querySelectorAll(".slideshow_indicator a");

    let currentIndex = 0;
    let timerID = null;
    let slideCount = slidesArray.length;

    for(let i=0; i<slideCount; i++) {
        let newLeft = (i*100)+`%`;
        slidesArray[i].style.left = newLeft;
    }

    function gotoslide(index) {
        currentIndex = index;
        let newLeft = (index *-100)+'%';
        slideshow_slides.style.left = newLeft;

        for(let i=0; i<slideCount; i++){
            indicatorArray[i].classList.remove('active');
        }
        indicatorArray[index].classList.add('active');
    }
    gotoslide(1);

    function startTimer() {
        timerID = setInterval(()=>{
            let index = (currentIndex + 1) % slideCount;
            currentIndex = index;
            gotoslide(index);
        },3000);
    }
    startTimer();

    slideshow_slides.addEventListener("mouseenter",(event)=>{
        clearInterval(timerID);
    });
    slideshow_slides.addEventListener("mouseleave",(event)=>{
        startTimer();
    });
    prev.addEventListener("mouseenter",(event)=>{
        clearInterval(timerID);
    });
    prev.addEventListener("mouseleave",(event)=>{
        startTimer();
    });
    next.addEventListener("mouseenter",(event)=>{
        clearInterval(timerID);
    });
    next.addEventListener("mouseleave",(event)=>{
        startTimer();
    });

    prev.addEventListener("click",(event)=>{
        event.preventDefault();
        currentIndex = currentIndex-1
        if(currentIndex < 0) {
            currentIndex = slideCount-1;
        }
        gotoslide(currentIndex);
    });
    next.addEventListener("click",(event)=>{
        event.preventDefault();
        currentIndex = currentIndex+1
        if(currentIndex > (slideCount-1)) {
            currentIndex = 0;
        }
        gotoslide(currentIndex);
    });
}

