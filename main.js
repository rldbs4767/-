//1.0~100사이의 랜덤숫자 생성
//2.인풋값과 비교 
//3.인풋값 미입력, 범위를 벗어난 경우, 문구 노출과 기회를 깍지않음
//4.이전에 입력했던 값 입력시, 문구 노출과 기회를 깍지않음
//5.리셋버튼 클릭 시, 이전 데이터 초기화


let computerNum;
let chance = 5;
let GameOver = false;
let history = [];

let PlayButton = document.getElementById("play-button");
let ResetButton = document.getElementById("reset-button");
let UserInput = document.getElementById("userInput");
let ResultText = document.getElementById("result-text");
let SubText = document.getElementById("sub-text");


PlayButton.addEventListener("click",play);
ResetButton.addEventListener("click",reset);
UserInput.addEventListener("focus",function(){
    UserInput.value = "";
});


//랜덤 숫자 생성
function createNumber() {
    computerNum = Math.floor(Math.random() * 100) + 1; //0 <= random < 1
    console.log(`정답: ${computerNum}`); //개발자도구에 정답제공
};
createNumber();


//시작 
function play(){
    let userInput = UserInput.value;

    if(userInput == ""){
        alert("0~100사이의 숫자를 입력하셔야 합니다!"); //아무것도 입력하지 않았을 때, 얼럿노출
        return;
    }

    if(userInput < 1 || userInput > 100){
        ResultText.textContent = `${userInput}은 범위를 벗어나네요. 다시 입력해주세요`; //범위 밖의 숫자입력 시, 얼럿노출 및 play함수 종료
        return;
    }
    
    if(history.includes(userInput)){
        ResultText.textContent = "이전에 입력했던 값입니다! 다시 입력하세요!"; //이전에 입력했던 값인 경우, 함수종료
        return;
    }

    chance --;
    SubText.textContent = `남은 기회는 ${chance}번이야!`;

    if(userInput < computerNum){
        ResultText.textContent = "UP!";
    }
    else if(userInput > computerNum){
        ResultText.textContent = "DOWN!";
    }
    else{
        ResultText.textContent = "정답입니다~!!";
        SubText.textContent = "축하합니다! 한번 더 도전해보세요!";
        GameOver = true;
    }

    history.push(userInput); //배열에 사용자가 입력한 값 저장 


    if(chance < 1){
        GameOver = true; //기회 5번 사용하면 게임오버
    }

    if(GameOver){
        PlayButton.disabled = true; //게임오버시, 시작버튼 비활성화
    }
}

//초기화
function reset(){
    chance = 5;
    ResultText.textContent = "숫자게임 맞추기 시작!";
    SubText.textContent = `남은 기회는 ${chance}번이야!`
    UserInput.value = "";
    PlayButton.disabled = false;
    
}