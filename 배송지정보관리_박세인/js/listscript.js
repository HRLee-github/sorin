(function() {
    'use strict';
    //로컬스토리지 정보를 배열로 가져오기
    let arr = localStorage.getItem('arr') ? JSON.parse(localStorage.getItem('arr')):[];
    
    //템플릿 태그를 통해 list보여주기
    for(let i =0;i<arr.length;i++){
        // 기존 HTML tbody 와 템플릿 열로 테이블을 인스턴스화
        let t = document.querySelector('#user_template');
        // 템플릿을 복사 (true 자식을 가져오고, false자식을 안 가져옴)
        var clone = document.importNode(t.content, true);
        let td = clone.querySelectorAll("td");
        
        td[1].innerText = arr[i].shipaddr;
        td[2].innerText = arr[i].username;
        td[3].innerText = arr[i].uphonefirst+'-'+arr[i].uphonemid+'-'+arr[i].uphonelast;
        td[4].innerText = '('+arr[i].postcode+') '+arr[i].road+' '+arr[i].detail;
        td[5].innerText = arr[i].defaultYn;
        td[6].innerText = arr[i].privacyYn;
        td[7].querySelector('button').setAttribute('data-index',arr[i].index);
        let tb = document.querySelector("tbody"); 
        tb.appendChild(clone);
    } 

    //삭제 event
    document.getElementById('delete').addEventListener('click',function(event){
        const getcks = document.querySelectorAll(`input[class="check"]`);
        let Jarr = JSON.parse(localStorage.getItem('arr'));

        //배열 순번이 꼬이지 않도록 뒤에서 삭제
        for(let i = getcks.length-1;i>= 0;i--){
            if(getcks[i].checked==true){
                Jarr.splice(i,1); 
                console.log(Jarr);
                localStorage.setItem('arr', JSON.stringify(Jarr));
                getcks[i].parentElement.parentElement.remove();
            }
        }
    });
     
    //배송지 등록 페이지로 이동
    document.getElementById('insert').addEventListener('click',function(){
        location.href='regist.html';
    });

    //전체 체크 클릭
    document.getElementById('cbx_chkAll').addEventListener('click',function(event){
        document.querySelectorAll('input[type="checkbox"]').forEach((el) => {
            el.checked = event.target.checked;
        });
    });

})();

//체크 박스
function selectCheckBox(){ 
    document.getElementById('cbx_chkAll').checked = document.querySelectorAll(`input[class="check"]:checked`).length == document.querySelectorAll(`input[class="check"]`).length;
}

//수정할 유저 index를 update html로 보내기 위해 로컬스토리지에 index 저장
function updateCheckBox(e){
   localStorage.setItem('useridx',e.getAttribute('data-index'));
   location.href='update.html';
}
 