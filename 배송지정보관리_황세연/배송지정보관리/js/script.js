/**배송지명, 받으시는 분, 휴대폰 번호, 주소, 배송정보수집 이용동의 필수 입력  */

document.getElementById('form').addEventListener('submit', function(event){
  event.preventDefault();

  const formElements = [
      document.getElementById('shipaddr'),
      document.getElementById('username'),
      document.getElementById('uphonemid'), 
      document.getElementById('uphonelast'), 
      document.getElementById('postcode'),  
      document.getElementById('privacyYn'),
  ];
  
  // const uphoneNumValue = document.getElementById('uphoneNum').value;
  // const postcodeValue = document.getElementById('postcode').value;
  // const  defaultYnchecked = document.getElementById('defaultYn').checked;


  for(let element of formElements){
      if(!element.value || (element.type === 'checkbox' && !element.checked)) {
          alert(`${document.querySelector(`label[for="${element.id}"]`).innerText}이(가) 입력되지 않았습니다.`);
        
          return;
      }
  }
})

/** 휴대폰 번호 없음 선택 시 나머지 input text 비활성화 */

function phoneNum(e){
  const value = e.value;
  const  uphonemid = document.getElementById('uphonemid');
  const uphonelast = document.getElementById('uphonelast');

  if(value == "") {
      uphonemid.disabled = true;
      uphonelast.disabled = true;
  }else{
      uphonemid.disabled = false;
      uphonelast.disabled = false;
  }
}

/** 글자수 제한은 regist.html에 maxlength를 적용하여서 제한했습니다 ! */


/**  input text에 숫자만 입력가능하게 하는 함수 */

function onlyNumber(num){
  num.value = num.value.replace(/[^0-9]/g, "");
}

/** 우편번호 찾기 api */

function kakaopost() {
  new daum.Postcode({
      oncomplete: function(data) {
        document.querySelector("#postcode").value = data.zonecode;
        document.querySelector("#road").value =  data.address;
      }
  }).open();
 
}


/**모든 textbox에 "< "," >" 금지 ! 자동으로 지워주는 함수  */
    
function regExp(str){
  str.value = str.value.replace(/[\ , <> /"]/g, "");
}


 // 전체 체크시 하위 체크박스들 모두 체크

    document.querySelector("input[id=check_all]").addEventListener("change",function(e){
      e.preventDefault();
      var checkList = document.querySelectorAll("input[id=check]");
      for(var i = 0; i < checkList.length; i++){
          checkList[i].checked = this.checked;
      }
  });

  

//체크박스를 통해서 삭제 

document.querySelector("button[id=delete]").addEventListener("click",function(e){
  e.preventDefault();

  if(!confirm("항목을 삭제하시겠습니까?")){
      
  }else{
      document.querySelector("tbody[id=tbodyList]").remove();
     window.localStorage.clear()  // 전체 삭제

  }

})

/**수정하기 버튼 클릭 시, update.html로 이동합니다 !! <a>태그 사용했습니다. */





/**update.html 로컬스토리지의 데이터를 각 항목에 세팅하기 */



/**데이터 수정하면 로컬스토리지에도 수정된 데이터로 업데이트 !! */




    

