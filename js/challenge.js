let playing = true;
let interval = timer();
const minus = document.getElementById('minus');
const plus = document.getElementById('plus');
const heart = document.getElementById('heart');
const commentForm = document.querySelector("form");

minus.addEventListener('click', decreaseCounter);
plus.addEventListener('click', increaseCounter);
heart.addEventListener('click', like);
pause.addEventListener('click', pauseCounter);
commentForm.addEventListener('submit', addComment);

function timer() {
    return setInterval(() => {
        const counter = document.getElementById('counter');
        counter.textContent = parseInt(counter.textContent) + 1;
    }, 1000);
};

function addComment(event) {
    event.preventDefault();
    const commentInput = commentForm.children[0];
    const commentText = commentInput.value;
    commentInput.value = '';
    const commentsList = document.getElementById('list');
    const newComment = document.createElement('p');
    newComment.textContent = commentText;
    commentsList.appendChild(newComment);
};

function increaseCounter() {
    const counter = document.getElementById('counter');
    counter.textContent = parseInt(counter.textContent) + 1;
};

function decreaseCounter() {
    const counter = document.getElementById('counter');
    counter.textContent = parseInt(counter.textContent) - 1;
};

function pauseCounter() {
    const pauseButton = document.getElementById('pause')

    if(playing) {
        playing = false;
        clearInterval(interval);
        pauseButton.textContent = 'resume';
    } else {
        playing = true;
        interval = timer();
        pauseButton.textContent = 'pause';
    }

    const buttons = document.querySelectorAll('button:not(#pause)')
    buttons.forEach((button) => {
        button.disabled = playing;
    });
};

function like() {
    const counter = document.getElementById("counter");
    const currentCount = parseInt(counter.textContent);
    const likesList = document.querySelector(".likes");
    const existingLike = Array.from(likesList.children).find((like) => parseInt(like.dataset.num) === currentCount);

    if (existingLike) {
        const likeCount = parseInt(existingLike.children[0].textContent);
        existingLike.innerHTML = `${currentCount} has been liked <span>${likeCount + 1}</span> times`;
    } else {
        const newLike = document.createElement("li");
        newLike.dataset.num = currentCount;
        newLike.innerHTML = `${currentCount} has been liked <span>1</span> time`;
        likesList.appendChild(newLike);
    }
};
