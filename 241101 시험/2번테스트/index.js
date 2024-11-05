function onLoad(){
    //패턴검색
    const idPattern = /^[\w]{3,}$/; //[\w]는 영문자, 숫자, _만 입력 가능 {3,} 3글자이상가능
    const pwdPattern =/^[\w]{6,10}$/; //영문자와 숫자, _ 6~10  
    const namePattern =/^[가-힣]{2,4}|[A-Z]{1}[a-zA-Z\x20]{1,19}$/; //한글 2~4글자,영문자 2-20 첫글자는대문자 공백가능   
    const emailPattern =/^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/;
    const addressPattern =/^[가-힣]{2,20}|[\d]{6}$/; //\d 숫자만가능
    
    //객체찾기
    const inputID = document.querySelector("#id"); 
    const inputPW1 = document.querySelector("#pwd"); 
    const inputPW2 = document.querySelector("#pwd2"); 
    const inputName = document.querySelector("#name"); 
    const inputEmail = document.querySelector("#email"); 
    const inputAddress = document.querySelector("#address");
  
    //이벤트리스너등록및 핸들러처리
    
    inputID.addEventListener("blur",()=>validate(inputID, idPattern, "&nbsp;&nbsp;필수 입력 항목입니다" ));
    inputPW1.addEventListener("blur",()=>validate(inputID, idPattern, "&nbsp;&nbsp;필수 입력 항목입니다" ));
    inputPW1.addEventListener("click",()=>validate(inputPW1,pwdPattern, "&nbsp;&nbsp;영문자 대/소문자 특수문자, 숫자 포함 8~32자" ));
    inputPW2.addEventListener("blur",()=>{
        validate(inputPW2,pwdPattern, "&nbsp;&nbsp;필수 입력 항목 입니다" );
        if(inputPW1.value !== inputPW2.value){
            inputPW2.nextSibling.textContent ="\u00a0\ 패스워드가 일치하지 않음";
            inputPW2.nextSibling.style.color ="red";
            inputPW1.value="";
            inputPW2.value="";
            inputPW1.focus(); 
            return; 
        }
    });
    inputName.addEventListener("blur",()=>validate(inputName,namePattern, "&nbsp;&nbsp;한글 2~4글자,영문자 2-10 첫글자는대문자 공백가능" ));
    inputEmail.addEventListener("blur",()=>validate(inputEmail,emailPattern, "&nbsp;&nbsp;이메일형식 안맞음" ));
    inputAddress.addEventListener("blur",()=>validate(inputAddress,addressPattern, "&nbsp;&nbsp;전화번호형식이 안맞음" ));
 
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