(function(){

    
    let toggle = true;
    //필수입력요소
    let formElements = [
        document.querySelector("#shipaddr"),    //배송지명
        document.querySelector("#username"),    //받으시는 분
        //document.querySelector("#uphonefirst"), //휴대폰번호
        //document.querySelector("#uphonemid"),   //휴대폰번호
        //document.querySelector("#uphonelast"),  //휴대폰번호
        document.querySelector("#postcode"),    //우편번호
        document.querySelector("#road"),        //주소
        document.querySelector("#detail"),      //상세정보
        document.querySelector("#privacyYn"),   //배송정보수집 동의
        ];
       

    //### 1,2 글자수 제한 = html코드에서 옵션
    
    window.addEventListener('load',function(){
        if(toggle){
            document.querySelector("#uphonemid").disabled = true;
            document.querySelector("#uphonemid").value = "";
            document.querySelector("#uphonelast").disabled = true;
            document.querySelector("#uphonelast").value = "";
        }else if(!toggle){
            document.querySelector("#uphonemid").disabled = false;
            document.querySelector("#uphonelast").disabled = false;
        }
    })
    
    //### 3. 휴대폰 번호 "없음" 선택시 inputbox비활성화
    document.addEventListener('change', event => {
       
        toggle = false;
        document.querySelector("#uphonemid").disabled = false;
        document.querySelector("#uphonelast").disabled = false;

        if(event.target.classList.contains('uphonefirst')){
            if(document.querySelector("#uphonefirst").value == ""){
                document.querySelector("#uphonemid").disabled = true;
                document.querySelector("#uphonemid").value = "";
                document.querySelector("#uphonelast").disabled = true;
                document.querySelector("#uphonelast").value = "";
                toggle = true;
            }
        }
    })

    //### 필수입력요소 체크
    document.querySelector('#submit').addEventListener("click", function(event){
        for(let element of formElements) {
            if(!document.querySelector("#uphonefirst").value=="" && (!document.querySelector("#uphonemid").value || !document.querySelector("#uphonelast").value)){
                alert("휴대폰번호 뒷자리를 입력해주세요")
                event.preventDefault();
                break;
            }
            if(!element.value || (element.type === 'checkbox' && !element.checked)) {
                alert(`${document.querySelector(`label[for="${element.id}"]`).innerText} 필수입력 요소입니다.`);
                event.preventDefault();
                break;
            }

            
            
        }
        
    });

    //### 4. 주소
    document.querySelector('#btn_find').addEventListener('click', function(event){
        new daum.Postcode({
            oncomplete: function(data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var addr = ''; // 주소 변수
                var extraAddr = ''; // 참고항목 변수

                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    addr = data.roadAddress;
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    addr = data.jibunAddress;
                }

                // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                if(data.userSelectedType === 'R'){
                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        extraAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if(extraAddr !== ''){
                        extraAddr = ' (' + extraAddr + ')';
                    }
                    // 조합된 참고항목을 해당 필드에 넣는다.
                    document.getElementById("road").value = extraAddr;
                
                } else {
                    document.getElementById("detail").value = '';
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById('postcode').value = data.zonecode;
                document.getElementById("road").value = addr;
                // 커서를 상세주소 필드로 이동한다.
                document.getElementById("detail").focus();
            }
        }).open();


    });

    //### 6. 모든 text inputbox "<" , ">" 입력금지
    document.querySelector('body').addEventListener('keyup', function(event){
        document.querySelectorAll('input').forEach(function(element){
            let regExp = /[<>]/gi;
            if(regExp.test(element.value)){
                alert("특수문자는 입력하실 수 없습니다");
                element.value="";
                element.focus();
            }
        });
    });

    
    //-------------------- 배송지 데이터 저장

    document.getElementById('form').addEventListener('submit', function(event) {
        event.preventDefault();
        let formData =  Object.fromEntries(new FormData(this).entries())
        formData.defaultYn = document.querySelector("#defaultYn").checked;
        formData.privacyYn = document.querySelector("#privacyYn").checked;
        formData.extra = document.querySelector("#extra").value;
        addUser(formData);
        
        location.href="./list.html";
    });

    function addUser(data) {
        if(data) {
            const user = getUser();

            data.index = getMaxUserIndex() + 1;
            
            user.push(data);

            localStorage.setItem('user', JSON.stringify(user));
        }
    }
    function getUser() {
        return JSON.parse(localStorage.getItem('user')) ?? [];
    }
    function getMaxUserIndex() {
        const userIndex = [-1];

        for(let data of getUser()) {
            userIndex.push(data.index);
        }

        return Math.max(...userIndex);
    }


    

})();




