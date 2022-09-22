(function() {
    'use strict';

    if (window.location.href.match('list.html') == null) {
        
        document.getElementById('shipaddr').addEventListener('blur', function(event) {
            const value = this.value,
                elParent = this.parentElement,
                parentClassList = elParent.classList;

            if(value.length > 20) {
                parentClassList.add('error');
                parentClassList.remove('success');
            }else if(value) {
                if(/^\s*$/g.test(value) || /[,]/g.test(value)) {
                    parentClassList.add('error');
                    parentClassList.remove('success');
                }
                else{
                    parentClassList.add('success');
                    parentClassList.remove('error');
                }
            }else{
                parentClassList.remove('success', 'error');
            }
        });

        /* 받으시는 분 */
        document.getElementById('username').addEventListener('blur', function(event) {
            const value = this.value,
                elParent = this.parentElement,
                parentClassList = elParent.classList;

            if(value.length > 10) {
                parentClassList.add('error');
                parentClassList.remove('success');
            }else if(value) {
                if(!/^[ㄱ-ㅎㅏ-ㅣ가-힣]+$/g.test(value)) {
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

        /* 휴대폰번호 확인 */
        /** focus */
        document.getElementById('uphonemid').addEventListener('focus', function(event) {
            const value = this.value, 
                firstValue = document.getElementById('uphonefirst').value,
                elParent = this.parentElement,
                parentClassList = elParent.classList;
            
            if (!firstValue) {
                this.disabled = true
            }
        });

        document.getElementById('uphonelast').addEventListener('focus', function(event) {
            const value = this.value, 
                firstValue = document.getElementById('uphonefirst').value,
                elParent = this.parentElement,
                parentClassList = elParent.classList;
            
            if (!firstValue) {
                this.disabled = true
            }
        });
        
        /** blur */
        document.getElementById('uphonefirst').addEventListener('blur', function(event) {
            const value = this.value, 
                elParent = this.parentElement,
                midEl = document.getElementById('uphonemid'),
                lastEl = document.getElementById('uphonelast'),
                parentClassList = elParent.classList;
            
            if(value) {
                midEl.disabled = false;
                lastEl.disabled = false;
                parentClassList.add('success');
                parentClassList.remove('error');
            }else{
                parentClassList.remove('success', 'error');
                midEl.value = "";
                lastEl.value = "";
            }
        });

        document.getElementById('uphonemid').addEventListener('blur', function(event) {
            const value = this.value, 
                firstValue = document.getElementById('uphonefirst').value,
                elParent = this.parentElement,
                parentClassList = elParent.classList;
            
            if(firstValue) {
                if(!/^\d+$/g.test(value) || value.length > 4) {
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
        
        document.getElementById('uphonelast').addEventListener('blur', function(event) {
            const value = this.value, 
                firstValue = document.getElementById('uphonefirst').value,
                elParent = this.parentElement,
                parentClassList = elParent.classList;
            
            if(firstValue) {
                if(!/^\d+$/g.test(value) || value.length > 4) {
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

        /** 주소창 */

        document.getElementById('btn_find').addEventListener('click', function(event) {
            event.preventDefault();
            sample4_execDaumPostcode();
        })

        document.getElementById('postcode').addEventListener('blur', function(event) {
            const value = this.value, 
                postValue = document.getElementById('postcode').value,
                roadValue = document.getElementById('road').value,
                elParent = this.parentElement,
                parentClassList = elParent.classList;
            
            if(postValue) {
                if(!/^\d+$/g.test(value) && roadValue) {
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

        document.getElementById('detail').addEventListener('blur', function(event) {
            const value = this.value,
                elParent = this.parentElement,
                parentClassList = elParent.classList;
            if(value) {
                if (/[,]/g.test(value)) {
                    parentClassList.add('error');
                    parentClassList.remove('success');
                } else{
                    parentClassList.add('success');
                    parentClassList.remove('error');
                }
            }else{
                parentClassList.remove('success', 'error');
            }                
        });

        document.getElementById('extra').addEventListener('blur', function(event) {
            const value = this.value,
                elParent = this.parentElement,
                parentClassList = elParent.classList;
            if(value) {
                if (/[,]/g.test(value)) {
                    parentClassList.add('error');
                    parentClassList.remove('success');
                } else{
                    parentClassList.add('success');
                    parentClassList.remove('error');
                }
            }else{
                parentClassList.remove('success', 'error');
            }
        });

        document.getElementById('form').addEventListener('submit', function(event) {
            const formElements = [
                document.getElementById('shipaddr'), 
                document.getElementById('username'), 
                document.getElementById('uphonefirst'),
                document.getElementById('uphonemid'),
                document.getElementById('uphonelast'), 
                document.getElementById('postcode'),
                document.getElementById('road'),
                document.getElementById('privacyYn'),
                document.getElementById('detail'),
                document.getElementById('defaultYn')
            ];

            let submission = true;

            formElements.forEach((element) => {
                if (!(element.value) || element.parentElement.classList.contains('error')) {
                    element.parentElement.classList.add('error');
                    element.parentElement.classList.remove('success');
                    event.preventDefault();
                    submission = false;
                } else if (element.id == 'privacyYn' && element.checked == false) {
                    alert(`${document.querySelector(`label[for="${element.id}"]`).innerText}가(이) 입력되지 않았습니다.`);
                    event.preventDefault();
                    submission = false;
                }
            });

            if (submission) {
                
                var user_data =  {
                    "shipaddr":formElements[0].value,
                    "username":formElements[1].value,
                    "uphonefirst":formElements[2].value,
                    "uphonemid":formElements[3].value,
                    "uphonelast":formElements[4].value,
                    "postcode":formElements[5].value,
                    "road":formElements[6].value,
                    "privacyYn":formElements[7].checked,
                    "detail":formElements[8].value,
                    "defaultYn":formElements[9].checked
                };
                
                const pageUrl = window.location.href;

                if (pageUrl.match('update.html') != null) {
                    const queryString = window.location.search;
                    const urlParams = new URLSearchParams(queryString);
                    const keyword = urlParams.get('key');
                    update_localStorage(user_data, keyword);
                } else {
                    save_localStorage(user_data);
                }

                window.location.href = '/list.html';

            }
        });
    } else {
        document.getElementById('cbx_chkAll').addEventListener('click', function(event) {

            const checks = document.querySelectorAll('tbody tr td input');
            const allcheck = document.getElementById('cbx_chkAll').checked
            for (var i = 0; i < checks.length; i++) {
                if (allcheck == true) {
                    checks[i].checked = true;
                }
                else {
                    checks[i].checked = false;
                }
            }
        })
        
        document.getElementById('delete').addEventListener('click', function(event) {
            const checks = document.querySelectorAll('tbody tr td input')
            let del_list = [];
            
            for (var i = 0; i < checks.length; i++) {
                if (checks[i].checked) {
                    del_list.push(checks[i].value);
                }
            }
            
            for (let j of del_list) {
                window.localStorage.removeItem(j);
            }
    
            location.reload();
    
            
        }) 
    }
    
})();

window.onload = function() {
    if (window.location.href.match('list.html') != null) {        
        load_localStorage();
        activateBtn();
        activateCheck();
    } else if (window.location.href.match('update.html') != null) {
        update_page();
    }
};

function activateCheck() {
    const checks = document.querySelectorAll('tbody tr td input');

    for (var i = 0; i < checks.length; i++) {
        checks[i].addEventListener('click', function(event) {
            if (!(this.checked == true)) {
                document.getElementById('cbx_chkAll').checked = false;
            }
            
        })
    }
};

function update_page() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const keyword = urlParams.get('key');
    const info = JSON.parse(localStorage.getItem(keyword));

    const formElements = [
        document.getElementById('shipaddr'), 
        document.getElementById('username'), 
        document.getElementById('uphonefirst'),
        document.getElementById('uphonemid'),
        document.getElementById('uphonelast'), 
        document.getElementById('postcode'),
        document.getElementById('road'),
        document.getElementById('privacyYn'),
        document.getElementById('detail'),
        document.getElementById('defaultYn')
    ];

    formElements.forEach((element) => {
        const tempid = element.id;
        if (element.type == 'checkbox') {
            if (info[`${tempid}`] == true) {
                element.checked = true;
            }
        } else {
            element.value = info[`${tempid}`];
        }
        
    });
    
}

function update_localStorage(user_data, keyword) {
    const user = JSON.stringify(user_data);
    window.localStorage.setItem(`${keyword}`,user);
}

function activateBtn() {
    const btn = document.querySelectorAll(".updt");
    [].forEach.call(btn, function(btn) {
        btn.addEventListener("click", function(event) {
            const keyword = this.parentNode.parentNode.querySelector('input').value
            edit(keyword);    
        });
    });

    function edit(keyword) {
        const keyuri = '/update.html?' + 'key=' + keyword;
        window.location.href = keyuri;
    }
}

// <template id="user_template">
//               <tr>
//                 <td><input type="checkbox" class="check" value="{index}"></td>
//                 <td>{shipaddr}</td>
//                 <td>{username}</td>
//                 <td>{uphone}</td>
//                 <td>{fulladdr}</td>
//                 <td>{main_addr_check}</td>
//                 <td>{privacy}</td>
//                 <td><button class="updt" data-addr-index="0">수정</button></td>
//               </tr>
// </template>

/** 함수 */

function sample4_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var roadAddr = data.roadAddress; // 도로명 주소 변수
            var extraRoadAddr = ''; // 참고 항목 변수

            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraRoadAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '' && data.apartment === 'Y'){
               extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if(extraRoadAddr !== ''){
                extraRoadAddr = ' (' + extraRoadAddr + ')';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('postcode').value = data.zonecode;
            document.getElementById("road").value = roadAddr;
            //document.getElementById("sample4_jibunAddress").value = data.jibunAddress;
            
            // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
            if(roadAddr !== ''){
                document.getElementById("detail").value = extraRoadAddr;
            } else {
                document.getElementById("detail").value = '';
            }
        }
    }).open();
}

function load_localStorage() {
    
    const users = window.localStorage;

    if (users) {
        var t = document.querySelector('#user_template');
        var tb = document.querySelector('tbody');

        objlen = Object.keys(users);

        for (var keys of objlen) {        
            var clone = document.importNode(t.content, true);
            td = clone.querySelectorAll("td");
            ti = clone.querySelector("input");

            const user = users[keys];
            const thisuser = JSON.parse(user);
            const uphone = thisuser.uphonefirst + thisuser.uphonemid + thisuser.uphonelast;
            const fulladdr = `(${thisuser.postcode}) `+ thisuser.road + ` ${thisuser.detail}`;
            
            ti.value = keys;
            td[1].textContent = thisuser.shipaddr;
            td[2].textContent = thisuser.username;
            td[3].textContent = uphone
            td[4].textContent = fulladdr;
            
            if (thisuser.defaultYn == true) {
                td[5].textContent = "O";
            } else {
                td[5].textContent = "";
            }

            if (thisuser.privacyYn == true) {
                td[6].textContent = "O";
            } else {
                td[6].textContent = "";
            }
                

            tb.appendChild(clone);

        }
    }   
}

function save_localStorage(user_data) {

    const user = JSON.stringify(user_data);
    const key = user_data.username + user_data.uphonelast;
    window.localStorage.setItem(`${key}`,user);
    
}

