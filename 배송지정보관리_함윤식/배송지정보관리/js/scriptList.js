(function(){
    addTable();
    //데이터 테이블 생성
    function addTable(){

        

        let dataArr = JSON.parse(localStorage.getItem('user')) ?? [];
        
        let target = document.getElementById('target')
        let table = document.getElementById('table');

            for(let i of dataArr){
                let result = Object.values(i)
                //let insData = Object.values(j)
                let newRow = target.insertRow();
                let cell1 = newRow.insertCell(0);
                let cell2 = newRow.insertCell(1);
                let cell3 = newRow.insertCell(2);
                let cell4 = newRow.insertCell(3);
                let cell5 = newRow.insertCell(4);
                let cell6 = newRow.insertCell(5);
                let cell7 = newRow.insertCell(6);
                let cell8 = newRow.insertCell(7);
                cell1.innerHTML = '<input type="checkbox" class="check" value="' + result[11]  + '"/>';
                cell2.innerHTML = result[0];
                cell3.innerHTML = result[1];
                cell4.innerHTML = result[2]+ "-" + result[3]+ "-" + result[4];
                cell5.innerHTML = "(" + result[5] + ")"+result[6] +" " + result[7];
                cell6.innerHTML = result[8];
                cell7.innerHTML = result[9];
                cell8.innerHTML = '<button class="updt">수정</button>';
            }
                    
        
    }

    document.getElementById('cbx_chkAll').addEventListener('change', function(event) {
        const isChecked = this.checked;
        
        document.querySelectorAll('.check').forEach(element => {
            element.checked = isChecked;
        });
    });

    document.addEventListener('change', event => {
        if(event.target.classList.contains('check')) {
            document.getElementById('cbx_chkAll').checked = document.querySelectorAll('.check:checked').length === document.querySelectorAll('.check').length;
        }
    });


    //--삭제
    document.getElementById('del').addEventListener('click', function(event) {
        if(confirm('삭제하시겠습니까?')) {

            if(document.querySelectorAll('.check:checked').length > 0){
                document.querySelectorAll('.check:checked').forEach(function(element, index, array) {
                    removeUser(element.value);
                    
                    
                });
                location.reload();
                alert("삭제되었습니다"); 
                
            }else{
                alert("삭제할 데이터를 선택하세요");
            }
            
        }
    });

    function removeUser(index) {
        let removeIndex = -1;
        
        const user = getUser(),
              userLength = user.length;

        for(let i = 0; i < userLength; i++) {
            if(user[i].index == index) {
                removeIndex = i;

                break;
            }
        }

        if(~removeIndex) {
            user.splice(removeIndex, 1);

            localStorage.setItem('user', JSON.stringify(user));
        }
        function getUser() {
            return JSON.parse(localStorage.getItem('user')) ?? [];
        }
    }
    
    //수정
    document.querySelector('table').addEventListener('click', function(event){
        
        if(event.target.classList.contains('updt')){

            let input = event.target.parentElement.parentElement.children[2].innerHTML;
            let inputStr = JSON.stringify(input);
            //let inputIndex = inputStr.indexOf('value');
            //let inputValue = inputStr.charAt(inputIndex+8);

            

            location.href= "./update.html?username=" + inputStr;


            

           
        }


            //let start = inputStr.indexOf('>');
            //let end = inputStr.indexOf('<');

            //let inputValue = inputStr.substring(start,end);

            //console.log(inputStr);
            //console.log("start="+start+"end="+end+"넘어가는거="+inputValue);
    });

    //추가
    document.getElementById('ins').addEventListener('click', function(event) {
        location.href="./regist.html";
    });
    
})();


