const addEmployeBtn = document.getElementById('add-employe');
const modalBox = document.getElementById('modal');
const closeModal = document.getElementById('close-modal');
const registerBtn = document.getElementById('register');
const updateBtn = document.getElementById('update');
const table = document.getElementById('table');
const idInput = document.getElementById('id');
const nameInput = document.getElementById('name');
const lastNameInput = document.getElementById('lastName');
const officeCodeInput = document.getElementById('officeCode');
const jobTitleInput = document.getElementById('jobTitle');
const emailInput = document.getElementById('email');
const form = document.getElementById('registerForm');
const clearBtn = document.getElementById('clear');
const searchBox = document.getElementById('search');


let userData = [];


clearBtn.addEventListener('click', () => {
    swal({
        title: "ایا میخواهید حافظه را کامل پاک کنید؟",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            localStorage.clear()
          swal("حافظه به صورت کامل پاک شد با رفرش شدن صفحه تمامی ایتم ها حذف میشوند", {
            icon: "success",
          });
        } else {
          swal("شما منصرف شدید");
        }
      });
    
})

addEmployeBtn.addEventListener('click', () => {
    modalBox.classList.add('active')
});
closeModal.addEventListener('click', () => {
    modalBox.classList.remove('active')
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    userData.push({
        id: idInput.velue,
        name: nameInput.value,
        lastname: lastNameInput.value,
        officeCode: officeCodeInput.value,
        jobtitle: jobTitleInput.value,
        email: emailInput.value
    });
    localStorage.setItem('personal', JSON.stringify(userData))
    
    form.reset()
    modalBox.classList.remove('active')
});

if(localStorage.getItem('personal') != null){
    userData = JSON.parse(localStorage.getItem('personal'))
}
function getLo(){
    userData.forEach((item, index) => {
        table.innerHTML += `
        <tr index='${index}' class="border-b-2 text-center text-[1.4em] search">
                <td>${index +1}</td>
                <td>${item.name}</td>
                <td>${item.lastname}</td> 
                <td>${item.email}</td>
                <td>${item.officeCode}</td>
                <td>${item.jobtitle}</td>
                <td class='text-green-600'><button class='delete'><i class='fa fa-trash'></i></button></td>
            </tr>
        `
    });
}
getLo()

searchBox.addEventListener('keyup', () => {
    let list = Array.from(document.getElementsByClassName('search'));
    list.filter((item) => {
    let reg = new RegExp(searchBox.value).test(item.innerText)
    if(!reg){
        item.classList.add('hidden')
    }else{
        item.classList.remove('hidden')
    }
   })

});

const deletBtn = document.querySelectorAll('.delete');
let a;
// let myArr = localStorage.getItem('personal')
for(a = 0; a < deletBtn.length; a++){
     deletBtn[a].addEventListener('click', function(){
        let tr = this.parentElement.parentElement;
        
        swal({
            title: "ایا میخواهید این ایتم  را پاک کنید؟",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                userData.splice(tr, 1);
                localStorage.setItem('personal', JSON.stringify(userData))
                tr.remove()
              swal("ایتم حذف شد", {
                icon: "success",
              });
            } else {
              swal("شما منصرف شدید");
            }
          });
     })
}

