   
(function() {
    'use strict';
    //로컬스토리지에서 수정할 유저 index값 가져오기
    let useridx = Number(localStorage.getItem('useridx'));
    //로컬스토리지에서 배열로 받아오기
    let arr = localStorage.getItem('arr') ? JSON.parse(localStorage.getItem('arr')):[];
    //update할 유저만 가져오기 위한 변수선언
    let updateuser;
    //update할 index 가져오기 위한 변수선언
    let idxnum;

    for(let i=0;i<arr.length;i++){
        if(useridx===arr[i].index){
            updateuser=arr[i];
            idxnum=i;
        }
    }

    document.getElementById('shipaddr').value = updateuser.shipaddr;
    document.getElementById('username').value = updateuser.username;
    document.getElementById('uphonefirst').value = updateuser.uphonefirst;
    document.getElementById('uphonemid').value = updateuser.uphonemid;
    document.getElementById('uphonelast').value = updateuser.uphonelast;
    document.getElementById('postcode').value = updateuser.postcode;
    document.getElementById('road').value = updateuser.road;
    document.getElementById('detail').value = updateuser.detail;

    // 배송지명 css
    document.getElementById('shipaddr').addEventListener('blur', function(event) {
        const value = this.value,
              elParent = this.parentElement,
              parentClassList = elParent.classList;

        if(value) {
            if(value.length>20 || (/[<>]/.test(value))) {
                parentClassList.add('error');
                parentClassList.remove('success');
            }else{
                parentClassList.add('success');
                parentClassList.remove('error');
            }
        }else{
            parentClassList.remove('success', 'error');
        }
    });
    
    // 받으시는 분  css
    document.getElementById('username').addEventListener('blur', function(event) {
        const value = this.value,
              elParent = this.parentElement,
              parentClassList = elParent.classList;

        if(value) {
            if(value.length>10 || (/[<>]/.test(value))) {
                parentClassList.add('error');
                parentClassList.remove('success');
            }else{
                parentClassList.add('success');
                parentClassList.remove('error');
            }
        }else{
            parentClassList.remove('success', 'error');
        }
    });
    //번호 text on//off 
    document.getElementById('uphonefirst').addEventListener('change', function(){

        if(this.value){
            document.querySelector('#uphonemid').disabled=false;
            document.querySelector('#uphonelast').disabled=false;
        }else{
            document.querySelector('#uphonemid').disabled=true;
            document.querySelector('#uphonemid').value='';
            document.getElementById('uphonemid').parentElement.classList.remove('success', 'error');

            document.querySelector('#uphonelast').disabled=true; 
            document.querySelector('#uphonelast').value='';
            document.getElementById('uphonelast').parentElement.classList.remove('success', 'error');
        }
    });

    
    // 휴대폰 중간번호(번호 4자리 오류) css
    document.getElementById('uphonemid').addEventListener('blur', function(event){
        const value = this.value,
        elParent = this.parentElement,
        parentClassList = elParent.classList;
        
        if(value) {
            if(value.length!=4 || !(/^[0-9]*$/.test(value))) {
                parentClassList.add('error');
                parentClassList.remove('success');
            }else{
                parentClassList.add('success');
                parentClassList.remove('error');
            }
        }else{
            parentClassList.add('error');
        }
    });
    
    // 휴대폰 마지막번호(번호 4자리 오류) css
    document.getElementById('uphonelast').addEventListener('blur', function(event){
        const value = this.value,
              elParent = this.parentElement,
              parentClassList = elParent.classList;

        if(value) {
            if(value.length!=4 || !(/^[0-9]*$/.test(value))) {
                parentClassList.add('error');
                parentClassList.remove('success');
            }else{
                parentClassList.add('success');
                parentClassList.remove('error');
            }
        }else{
            parentClassList.add('error');
        }
    });

    //주소 검색 및 text에 삽입, focus
    document.querySelector('#btn_find').addEventListener('click',function(event){
        event.preventDefault();
        new daum.Postcode({
            oncomplete: function(data) { 
                let postcode = data.zonecode;
                let road = data.jibunAddress;
        
                console.log(postcode+"  "+road);
                document.getElementById('postcode').value = postcode;
                document.getElementById('road').value = road;
                document.getElementById('detail').parentElement.classList.add('error');
                document.getElementById('detail').focus();
            }
        }).open();
        
    });   

    //상세 주소 css
    document.getElementById('detail').addEventListener('blur', function(event){
        const value = this.value,
              elParent = this.parentElement,
              parentClassList = elParent.classList;
        if(value && !(/[<>]/.test(value))) {
            parentClassList.add('success');
            parentClassList.remove('error');
        }else{
           parentClassList.add('error');
            parentClassList.remove('success');
        }
    });

    //배송지 등록
    document.getElementById('form').addEventListener('submit', function(event) {
        
        // 배송지 shipaddr,수령인 username, 연락처 uphonefirst,uphonemid,uphonelast
        // 주소 postcode road detail 기본 배송지 defaultYn 배송정보 수집 privacyYn
        event.preventDefault();
        updateuser.shipaddr = document.getElementById('shipaddr').value;
        updateuser.username = document.getElementById('username').value;
        updateuser.uphonefirst = document.getElementById('uphonefirst').value;
        updateuser.uphonemid = document.getElementById('uphonemid').value;
        updateuser.uphonelast = document.getElementById('uphonelast').value;
        updateuser.postcode = document.getElementById('postcode').value;
        updateuser.road = document.getElementById('road').value;
        updateuser.detail = document.getElementById('detail').value;
    
        //비어있지 않지만 정보를 잘못 입력했을 시 갯수
        let err = document.getElementsByClassName('field error');
        
        //사용자 정보 입력(유,무 확인)
        if(err.length||!updateuser.shipaddr||!updateuser.username||!updateuser.uphonefirst||!updateuser.uphonemid
            ||!updateuser.uphonelast||!updateuser.postcode||!updateuser.road||!updateuser.detail){
            event.preventDefault();
            alert("정보를 알맞게 입력하세요.");
            return;
        }

        //수정된 값 update
        arr[idxnum].shipaddr = updateuser.shipaddr;
        arr[idxnum].username = updateuser.username;
        arr[idxnum].uphonefirst = updateuser.uphonefirst;
        arr[idxnum].uphonemid = updateuser.uphonemid;
        arr[idxnum].uphonelast = updateuser.uphonelast;
        arr[idxnum].postcode = updateuser.postcode;
        arr[idxnum].road = updateuser.road;
        arr[idxnum].detail = updateuser.detail;
       
         //로컬 스토리지에 저장
        localStorage.setItem('arr',JSON.stringify(arr));

        //list html로 이동
        location.href='list.html';
    });
})();
 