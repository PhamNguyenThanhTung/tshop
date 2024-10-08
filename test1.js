//---------------------slider-----------------------
let index=0;
const imgNumber=document.querySelectorAll('.slider_left_top img');
const rightbtn=document.querySelector('.fa-chevron-right');
const leftbtn=document.querySelector('.fa-chevron-left');
rightbtn.addEventListener('click', function(){
    if(index > imgNumber.length-1){
        index = 0;
    }  
    removeActive();
    index+=1;
    if(index >= imgNumber.length) index = 0;
    imgNumberLi[index].classList.add("active");
    document.querySelector('.slider_left_top').style.right=100*index+"%";
    })
leftbtn.addEventListener('click', function(){
    if(index < 0){
        index = imgNumber.length-1;
    } 
    removeActive();
    index-=1;
    if(index < 0) index = imgNumber.length-1;
    imgNumberLi[index].classList.add("active");
    document.querySelector('.slider_left_top').style.right=100*index+"%";
})
const imgNumberLi=document.querySelectorAll('.slider_left_bottom div');
let unactive= document.querySelector('.active');
index
imgNumberLi.forEach(function(image, index){
  //image chính là các img 
  // document.querySelector('.slider_content_left_top').style.right=100*index+"%";

  image.addEventListener("click", function(){
    removeActive();
    document.querySelector('.slider_left_top').style.right=100*index+"%";
    image.classList.add("active");
  })
})
function removeActive(){
  let unactive= document.querySelector('.active');
    unactive.classList.remove("active");
}
//------------------auto_slider--------------
function imgAuto(){
    index =index+1;
    if(index > imgNumber.length-1){
      index = 0;
    }
    // console.log(index);
    removeActive();
    imgNumberLi[index].classList.add("active");


    document.querySelector('.slider_left_top').style.right=100*index+"%";
  }
  setInterval(imgAuto,5000)// tinh theo ms
  
//---linh tinh---
 let rong= imgNumber[0].offsetWidth;
 document.querySelector('.slider_left_top_btn').style.width = `${rong}px`
 //------------review-----------------------
 const reviewButton = document.querySelector('#review');
 const closeButton = document.querySelector('#xclose');
 const formElement = document.querySelector('.review');
   const videoReview = document.querySelector('#video_review');
  const videoForm = document.querySelector('.video');
  reviewButton.addEventListener("click", function() {
    // Toggle the display of the form element
    // formElement.style.display = formElement.style.display === "flex" ? "none" : "flex"; nếu để như này thì tính cả trường hợp mình click vào cái container con nó sẽ tự tắt
       videoForm.style.display = "none";
       formElement.style.display = "flex";
 
  });
  closeButton.addEventListener("click", ()=>{
    formElement.style.display = "none";
  })
  //-------------video_review----------

  videoReview.addEventListener("click", ()=>{ 
     formElement.style.display = "none";
    videoForm.style.display = videoForm.style.display ==='flex' ? 'none' : 'flex';
  });

  const BinhLuan=document.querySelector('#BinhLuan');
  const BinhLuanForm=document.querySelector('.comments');
  BinhLuan.addEventListener("click", ()=>{
    BinhLuanForm.style.display= BinhLuanForm.style.display ==='block' ? 'none' : 'block';
  })
//--------------------comment----------------------------
const showHideBtn = document.querySelector('.show-hide');
const commentWraper = document.querySelector('.comment-wraper');
// commentWraper.style.display = "none";
showHideBtn.addEventListener("click", ToggleComments());
// showHideBtn.addEventListener("keydown", HandleKeyDown());
function ToggleComments(){
  let showHideText = showHideBtn.textContent;
  if(showHideText === "..."){
    showHideBtn.textContent = "ẩn bình luận";
    commentWraper.style.display = "block";
    showHideBtn.setAttribute('aria-expaned','true');
  }
  else {
    showHideBtn.textContent = "...";
    commentWraper.style.display = "none";
    showHideBtn.setAttribute('aria-expaned','false');
  }
}
///////////////////////////////

// Get the form and comment list elements
// const form = document.querySelector('#submit-btn');
// const commentList = document.getElementById('comment-list');

// // Add an event listener to the form's submit event
// form.addEventListener("click", () => {
//   console.log(form);
//   // e.preventDefault();

//   // Get the form data
//   const name = document.getElementById('name').value;
//   // const email = document.getElementById('email').value;
//   const comment = document.getElementById('comment').value;

//   // Create a new comment element
//   const commentElement = document.createElement('li');
//   commentElement.className = 'comment';
//   commentElement.innerHTML = `
//     <p>${name}</p>
//     <p>${comment}</p>
//   `;

//   // Add the comment element to the comment list
//   commentList.appendChild(commentElement);

//   // Reset the form fields
//   document.getElementById('name').value = '';
//   // document.getElementById('email').value = '';
//   document.getElementById('comment').value = '';
//   return false;
// });
// function onSubmit(e){
//   console.log(form);
//   e.preventDefault();

//   // Get the form data
//   const name = document.getElementById('name').value;
//   // const email = document.getElementById('email').value;
//   const comment = document.getElementById('comment').value;

//   // Create a new comment element
//   const commentElement = document.createElement('li');
//   commentElement.className = 'comment';
//   commentElement.innerHTML = `
//     <p>${name}</p>
//     <p>${comment}</p>
//   `;

//   // Add the comment element to the comment list
//   commentList.appendChild(commentElement);

//   // Reset the form fields
//   document.getElementById('name').value = '';
//   // document.getElementById('email').value = '';
//   document.getElementById('comment').value = '';
// }
//-------------------------------------------------------------

const form = document.querySelector('#submit-btn');
const commentList = document.getElementById('comment-list');

// Lấy dữ liệu từ localStorage
let comments = JSON.parse(localStorage.getItem('comments')) || [];

// Hàm hiển thị comment
function displayComments() {
  commentList.innerHTML = '';
  comments.forEach((comment, index) => {
    const commentElement = document.createElement('li');
    commentElement.className = 'comment';
    commentElement.innerHTML = `
      <p>${comment.name}</p>
      <p>${comment.comment}</p>
    `;
    commentList.appendChild(commentElement);
  });
}

// Hàm lưu comment vào localStorage
function saveComment(name, comment) {
  comments.push({ name, comment });
  localStorage.setItem('comments', JSON.stringify(comments));
}

// Hàm xóa comment khỏi localStorage
function deleteComment(index) {
  comments.splice(index, 1);
  localStorage.setItem('comments', JSON.stringify(comments));
  displayComments();
}

// Hiển thị comment khi trang tải
displayComments();

// Thêm sự kiện cho form
form.addEventListener("click", (e) => {
  e.preventDefault();

  // Lấy dữ liệu từ form
  const name = document.getElementById('name').value;
  const comment = document.getElementById('comment').value;

  // Lưu comment vào localStorage
  saveComment(name, comment);

  // Hiển thị comment
  displayComments();

  // Reset form
  document.getElementById('name').value = '';
  document.getElementById('comment').value = '';
});
localStorage.setItem('comments', JSON.stringify([
  {
      "name": "admin",
      "comment": "Shop uy tín top 1 sever trái đất. ngậy tuyệt đối!"
  }
]));

