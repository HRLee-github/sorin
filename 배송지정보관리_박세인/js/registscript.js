   
(function() {
    'use strict';
    //index값 선언
    let num=0;

    

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
    
    // 받으시는 분 css
    document.getElementById('username').addEventListener('blur', function(event) {
        const value = this.value,
              elParent = this.parentElement,
              parentClassList = elParent.classList;

        if(value) {
            if(value.length>10|| (/[<>]/.test(value))) {
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
            parentClassList.remove('success', 'error');
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
            parentClassList.remove('success', 'error');
        }
    });
    //주소 검색 및 text에 삽입, focus
    document.querySelector('#btn_find').addEventListener('click',function(event){
        event.preventDefault();
        new daum.Postcode({
            oncomplete: function(data) {
                let postcode = data.zonecode;
                let road = data.jibunAddress;
        
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
        const shipaddr = document.getElementById('shipaddr').value;
        const username = document.getElementById('username').value;
        const uphonefirst = document.getElementById('uphonefirst').value;
        const uphonemid = document.getElementById('uphonemid').value;
        const uphonelast = document.getElementById('uphonelast').value;
        const postcode = document.getElementById('postcode').value;
        const road = document.getElementById('road').value;
        const detail = document.getElementById('detail').value;
        const defaultYn = document.getElementById('defaultYn').checked? 'Y' : 'N';
        const privacyYn = document.getElementById('privacyYn').checked? 'Y' : 'N';

        //비어있지 않지만 정보를 잘못 입력했을 시 갯수
        let err = document.getElementsByClassName('field error');
        
        //사용자 정보 입력(유,무 확인)
        if(err.length||!shipaddr||!username||!uphonefirst||!uphonemid||!uphonelast||!postcode||!road||!detail||privacyYn=='N'){
            event.preventDefault();
            alert("비어있는 칸이 있습니다. 알맞게 입력하세요.");
            return;
        }
        //로컬스토리지 값의 유무를 통해 배열에 등록
        let arr = localStorage.getItem('arr') ? JSON.parse(localStorage.getItem('arr')):[];
        //배열에 마지막 index찾기        
        if(arr.length){
            num = arr[arr.length-1].index;
        } 
        //배송지 정보 입력
        const ck = {index:++num,
            shipaddr:shipaddr,
            username:username,
            uphonefirst:uphonefirst,
            uphonemid:uphonemid,
            uphonelast:uphonelast,
            postcode:postcode,
            road:road,
            detail:detail,
            defaultYn:defaultYn,
            privacyYn:privacyYn
        }
        //로컬 스토리지에 저장
        arr.push(ck);
        localStorage.setItem('arr',JSON.stringify(arr));

        console.log(ck);
        //리스트html로 이동
        location.href='list.html';
    });
})();
 