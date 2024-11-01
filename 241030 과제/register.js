function carousel() {
    //화면객체 가져온다.
    let slideshow_slides = document.querySelector(".slideshow_slides");
    let slidesArray = document.querySelectorAll(".slideshow_slides a");
    let prev = document.querySelector(".prev");
    let next = document.querySelector(".next");
    let indicatorArray = document.querySelectorAll(".slideshow_indicator a");

    //현재이미지 인덱스, 인터벌 아이디, 슬라이드 갯수
    let currentIndex = 0;
    let timerID = null;
    let slideCount = slidesArray.length;
    //현재 이미지를 한 줄로 정렬한다.
    for (let i=0; i<slideCount; i++) {
        let newLeft = (i*100)+`%`;
        slidesArray[i].style.left = newLeft;
    }

    //화면 전환해주는 함수
    function gotoslide(index) {
        currentIndex = index;
        let newLeft = (index * -100)+`%`;
        slideshow_slides.style.left = newLeft;

        //indicator 그 위치를 가르켜줘야 한다.
        for(let i=0; i<slideCount; i++) {
            indicatorArray[i].classList.remove('active');
        }
        indicatorArray[index].classList.add('active');
    }//end of gotoslide

    gotoslide(1);
    //3초마다 gotoslide() 불러주자. 불러주되, index 0,1,2,3,0,1,2......식으로 불러주자
    function startTimer() {
        timerID = setInterval(()=>{
            let index = (currentIndex + 1) % slideCount;
            currentIndex = index;
            gotoslide(index);
        }, 3000);
    }
    startTimer();
    //이벤트등록 핸들러기능
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
        event.preventDefault(); //anchor tag가 가지고 있는 페이지이동 기본기능을 막아라.
        currentIndex =currentIndex-1;
        if(currentIndex < 0) {
            currentIndex = slideCount -1;
        }
        gotoslide(currentIndex);
    });
    next.addEventListener("click",(event)=>{
        event.preventDefault(); //anchor tag가 가지고 있는 페이지이동 기본기능을 막아라.
        currentIndex =currentIndex+1;
        if(currentIndex > (slideCount-1)) {
            currentIndex = 0;
        }
        gotoslide(currentIndex);
    });

    //indicator 클릭하면 해당된 페이지로 이동한다.
    for(let i=0; i<slideCount; i++) {
        indicatorArray[i].addEventListener("mouseenter",(event)=>{
            clearInterval(timerID);
        });
    }
    for(let i=0; i<slideCount; i++) {
        indicatorArray[i].addEventListener("mouseleave",(event)=>{
            startTimer();
        });
    }
    for(let i=0; i<slideCount; i++) {
        indicatorArray[i].addEventListener("click",(event)=>{
            event.preventDefault;
            gotoslide(i);
        });
    }
}//end of carousel

function onLoad(){
    //패턴검색
    const idPattern = /^[\w]{3,}$/; //[\w]는 영문자, 숫자, _만 입력 가능 {3,} 3글자이상가능
    const pwdPattern =/^[\w]{6,10}$/; //영문자와 숫자, _ 6~10  
    const namePattern =/^[가-힣]{2,4}|[A-Z]{1}[a-zA-Z\x20]{1,19}$/; //한글 2~4글자,영문자 2-20 첫글자는대문자 공백가능   
    const emailPattern =/^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/;
    const mobilePattern =/^010-(?:[\d]{3}|[\d]{4})-[\d]{4}$/; //\d 숫자만가능
    // const datePattern =/^[\d]{4}-[\d]{2}-[\d]{2}$/; //\d 숫자만가능
    //객체찾기
    const inputID = document.querySelector("#id"); 
    const inputPW1 = document.querySelector("#pwd"); 
    const inputPW2 = document.querySelector("#pwdconfirm"); 
    const inputName = document.querySelector("#name"); 
    const inputEmail= document.querySelector("#email"); 
    const inputMobile= document.querySelector("#phone2");
    // const inputDate= document.querySelector('#input-date');
   
    //폼객체찾기
    const myform= document.querySelector("#myform");
    //이벤트리스너등록및 핸들러처리
    inputID.addEventListener("blur",()=>validate(inputID, idPattern, "영문자, 숫자, _만 입력 가능" ));
    inputPW1.addEventListener("blur",()=>validate(inputPW1,pwdPattern, "영문자와 숫자, _ 6~10" ));
    inputPW2.addEventListener("blur",()=>{
        validate(inputPW2,pwdPattern, "영문자와 숫자, _ 6~10" );
        if(inputPW1.value !== inputPW2.value){
            inputPW2.nextSibling.textContent ="패스워드가 일치하지 않음";
            inputPW2.nextSibling.style.color ="red";
            inputPW1.value="";
            inputPW2.value="";
            inputPW1.focus(); 
            return; 
        }
    });
    inputName.addEventListener("blur",()=>validate(inputName,namePattern, "한글 2~4글자,영문자 2-10 첫글자는대문자 공백가능" ));
    inputEmail.addEventListener("blur",()=>validate(inputEmail,emailPattern, "이메일형식 안맞음" ));
    inputMobile.addEventListener("blur",()=>validate(inputMobile,mobilePattern, "모바일전화번호형식이 안맞음" ));
    // inputDate.addEventListener("blur",()=>validate(inputDate,datePattern, "날짜를 선택해주세요" ));
    
    //폼 이벤트등록및 핸들러처리
    myform.addEventListener("submit",(e)=>{
        e.preventDefault();  //서버에 전송하는 기본기능막는다.
        validate(inputID, idPattern, "영문자, 숫자, _만 입력 가능" );
        validate(inputPW1,pwdPattern, "영문자와 숫자, _ 6~10" );
        validate(inputPW2,pwdPattern, "영문자와 숫자, _ 6~10" );
        if(inputPW1.value !== inputPW2.value){
            inputPW2.nextSibling.textContent ="패스워드가 일치하지 않음";
            inputPW2.nextSibling.style.color ="red";
            inputPW1.value="";
            inputPW2.value="";
            inputPW1.focus(); 
            return; 
        }
        validate(inputName,namePattern, "한글 2~4글자,영문자 2-10 첫글자는대문자 공백가능" );
        validate(inputEmail,emailPattern, "이메일형식 안맞음" );
        validate(inputMobile,mobilePattern, "모바일전화번호형식이 안맞음" );
        // validate(inputDate,datePattern,"날짜를 선택해주세요");
        
        alert("서버로 전송하겠습니다.");
        myform.submit();  
    });
    //핸들러처리기능    
    function validate(userInput, pattern, message ){
        if(userInput.value.match(pattern)){
            userInput.nextSibling.innerHTML = "&nbsp;&nbsp;성공";
            userInput.nextSibling.style.color ="blue";
           }else{
            userInput.nextSibling.innerHTML = message;
            userInput.nextSibling.style.color ="red";
            userInput.value = "";
            userInput.focus();
            return; 
           }
    }
}