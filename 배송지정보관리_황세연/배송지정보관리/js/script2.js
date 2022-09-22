/**localstorage 저장, 불러와서 list에 출력하기를 구현했습니다.  */

let shippingList = [];

function setIntial() {

  for(let i = 1; i <= localStorage.length; i++) {
    const element = document.getElementById("tbodyList");
    const newElement = document.createElement("tr");
    let shippingContents = JSON.parse(localStorage.getItem(i));
   
    // 나중에 쓸 배열 만들기
    shippingList.push(shippingContents);
    element.appendChild(newElement);
    newElement.innerHTML = `
                            <tr id="tr_${i}";>      
                            <td><input type="checkbox" id="check" /></td>
                            <td>${shippingContents.shipaddr}</td>
                            <td>${shippingContents.username}</td>
                            <td>${shippingContents.uphonelast}</td>
                            <td>${shippingContents.postcode}</td>
                            <td>${shippingContents.defaultYn}</td>
                            <td>${shippingContents.privacyYn}</td>
                            <td><a href="update.html" ><button class="updt" data-addr-index="0" >수정</button></a></td>
                            `;
  }
}

setIntial();

  let keySave = [];
  function inputInfo(clicked_id) {
    for(let i = 0; i <= shippingList.length - 1; i++) {
        if(shippingList[i].shipaddr === document.getElementById(clicked_id).innerHTML) {
            document.querySelector('#shipaddr').value = shippingList[i].shipaddr;
            document.querySelector('#username').value = shippingList[i].username;
            document.querySelector('#uphonelast').value = shippingList[i].uphonelast;
            document.querySelector('#postcode').value = shippingList[i].postcode;
            document.querySelector('#defaultYn').checked = shippingList[i].defaultYn;
            document.querySelector('#privacyYn').checked = shippingList[i].privacyYn;
            keySave.push(clicked_id.slice(6));
        }
    }
  }
  // input
  let id = 1;
  function input() {
    console.log('1111');
    if(document.getElementById("shipaddr").value === "" 
    || document.getElementById("postcode").value === ""
    || document.getElementById("username").value === ""
    || document.getElementById("uphonelast").value === ""
    || document.getElementById("privacyYn").value === "") {
        alert("배송지명, 받으시는 분, 휴대폰 번호, 주소, 배송정보수집 이용동의는 필수로 입력해주세요.")
    } else {
    const element = document.getElementById("tbodyList");
    const newElement = document.createElement("tr");
    if(id < localStorage.length) {
            id = localStorage.length;
            id += 1;
        }
    let shipaddr = document.getElementById("shipaddr").value;
    let username = document.getElementById("username").value;
    let uphonefirst = document.getElementById("uphonefirst").value;
    let uphonelast = document.getElementById("uphonelast").value;
    let uphonemid = document.getElementById("uphonemid").value;
    let postcode = document.getElementById("postcode").value;
    let road = document.getElementById("road").value;
    let detail = document.getElementById("detail").value;
    let defaultYn = document.getElementById("defaultYn").checked;
    let privacyYn = document.getElementById("privacyYn").checked;

    let arr = {
        id: id,
        shipaddr: shipaddr,
        username: username,
        uphonelast: uphonefirst + "-" + uphonemid +  "-" + uphonelast ,
        postcode: "("+ postcode +  ")"  +  road  + "(" + detail + ")",
        defaultYn: defaultYn,
        privacyYn: privacyYn,
    }

    // modify
    
    
    if(keySave.length !== 0) {
      let shipaddr = document.getElementById("shipaddr").value;
      let username = document.getElementById("username").value;
      let uphonelast = document.getElementById("uphonelast").value;
      let postcode = document.getElementById("postcode").value;
      let defaultYn = document.getElementById("defaultYn").checked;
      let privacyYn = document.getElementById("privacyYn").checked;

        let arr = {
            id: parseInt(keySave[keySave.length-1]),
            shipaddr: shipaddr,
            username: username,
            uphonelast: uphonelast,
            postcode: postcode,
            defaultYn: defaultYn,
            privacyYn: privacyYn,
        }
        localStorage.setItem(keySave[keySave.length-1], JSON.stringify(arr));
        location.reload();
    }
    
    element.appendChild(newElement)
    localStorage.setItem(id, JSON.stringify(arr));
    
    element.innerHTML = ``;
    
    if(keySave.length !== 0) {
        localStorage.removeItem(localStorage.length);
    }
    setIntial();
    
    keySave.pop();
    id++;
  }
  }
