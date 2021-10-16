// 初始化
let data =[];
const list= document.querySelector('.list');
const totalNum =document.querySelector('.totalNum');

const tab = document.querySelector('.tab');
let all = document.querySelectorAll('.tab li');
let toggleTab ="all";


function renderData(){
    let str="";
    let count =0;
    data.forEach(function(item, index){
        if(!item.checked){
            count+=1;
            if(toggleTab ==="work" || toggleTab ==="all" ){
                str+=`<li>
                <label for="" class="checkbox">
                    <input type="checkbox" data-num="${index}">
                    <span data-num="${index}">${item.content}</span>
                    <a href="#" class="delete"></a>
                </label></li>`;
            }
        }else if ((item.checked && toggleTab =="all") || (item.checked && toggleTab == "done")){ // 狀態為checked 並且tab為all 或是狀態為check 並且為done 就列印內容
            str += `<li>
            <label class="checkbox" for="">
              <input type="checkbox" checked data-num="${index}"/>
              <span>${item.content}</span>
            </label>
            <a href="#" class="delete" data-num="${index}"></a>
          </li>`;
        }
    })
    list.innerHTML=str;
    totalNum.textContent=count;
    
}

renderData();

// 新增
const btn = document.querySelector(".btn_add");
const input =document.querySelector(".txt_add");

btn.addEventListener("click",function(additem){
    additem.preventDefault();
    if(input.value.trim()===""){
        alert("請輸入代辦事項");
        return;
    }
    let obj=[];
    obj.content=input.value;
    obj.checked=false;
    data.push(obj);
    input.value="";
    renderData();
})

// 刪除
list.addEventListener("click",function(deleteitem){
    deleteitem.preventDefault();
    let i = deleteitem.target.getAttribute("data-num");
    if(deleteitem.target.getAttribute("class")==="delete"){
        data.splice(i, 1);
    }
    else {
        if( !data[i].checked){
          data[i].checked = true;
        }else{
          data[i].checked = false;
        }
      }
    renderData();
   
})




// deleteAll
const deleteDone=document.querySelector(".deleteAll");
deleteDone.addEventListener("click",function(deleteDone){
    deleteDone.preventDefault();
    let newData=[];
    data.forEach(function(item){
        if(!item.checked){
            newData.push(item);
        }
    })
    data=newData;
    renderData();
})


// 切換tab

tab.addEventListener("click",function(switched){
    all.forEach(function(item){
        item.setAttribute('class','');
    });
    switched.target.setAttribute('class','active');
   toggleTab = switched.target.getAttribute("data-tab");
   console.log(toggleTab);
   renderData();
})


