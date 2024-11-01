function onLoad(){
    //객체찾기
    const btnopen = document.querySelector("#open");
    const btnclose = document.querySelector("#close");
    const idobj = document.querySelector("#userid");
    const pwd = document.querySelector("#pwd");
    //팝업 윈도우 === window 핸들변수
    let win = null;
    
    //이벤트리스너 등록 및 핸들러처리
    btnopen.addEventListener("click",()=>{
        win = window.open("./ex8_2_formName.html","_blank","width=400, height=400, left=30, top=30");
        setTimeout(()=>{
            win.document.querySelector("#userid").value = idobj.value;
            win.document.querySelector("#pwd").value = pwd.value;
        },1000);
    });
    btnclose.addEventListener("click",()=>{
        win.close();
    });
}