// -----------------------
// GLOBAL VARIABLES 
// -----------------------

// Variable to show if night mode is on or off 
let isNightMode = false;

// Gets body, nightMode, and card elements/tags
body = document.getElementsByTagName('body')[0];
const nightMode = document.querySelector('#nightMode');
const cards = document.querySelectorAll('.card');

// Gets Chat App Body
const chatAppBody = document.querySelector('#chat-app-body');

// Gets Chat input 
const chatAppInput = document.querySelector('#chat-app-input');
const chatAppInputContainer = document.querySelector('.chat-app-input-container')
const chatAppBottom = document.querySelector('.chat-app-bottom')

// Gets chatAppMessagePreview
const chatAppMessagePreview = document.querySelector('.chat-app-message-preview')



// -----------------------
// GREETING 
// -----------------------

// Gets #intro-greeting
const introGreeting = document.querySelector('#intro-greeting');

// Array of greetings
const greetings = [
    'Good moring!<span class="greeting-emoji">🌤️</span>',
    'Good afternoon!<span class="greeting-emoji">☀️</span>',
    'Good evening!<span class="greeting-emoji">🌙</span>'
]

// Gets current hour 
const date = new Date();
const currentHour = date.getHours();

// Dispalys intro greeting
function greetingsHTML (hour) {
    if (hour >= 0 && hour < 12 ) {
        introGreeting.innerHTML = greetings[0];
    }

    if (hour >= 12 && hour < 17 ) {
        introGreeting.innerHTML = greetings[1];
    }

    if (hour >= 17) {
        introGreeting.innerHTML = greetings[2];
    }
}

// Calls greetingsHTML function
greetingsHTML(currentHour);



// -----------------------
// NIGHT MODE
// -----------------------

// Displays Night Mode when checked
nightMode.addEventListener('change', () => {
    if (nightMode.checked === true) {
        isNightMode = nightMode.checked;
        body.classList.add('night');
        chatAppBody.classList.add('chat-app-body-night');
        chatAppInput.classList.add('chat-app-input-night');
        chatAppInputContainer.classList.add('chat-app-input-container-night');
        chatAppBottom.classList.add('chat-app-bottom-night');
        chatAppMessagePreview.classList.add('card-night');

        let chatAppMessageMsg = document.querySelectorAll('.chat-app-message-msg');

        chatAppMessageMsg.forEach( msg => {
            msg.classList.add('card-night');
        })
        
        cards.forEach( card => {
            card.classList.add('card-night')
        })
    } else {
        isNightMode = nightMode.checked;
        body.classList.remove('night');
        chatAppBody.classList.remove('chat-app-body-night');
        chatAppInput.classList.remove('chat-app-input-night');
        chatAppInputContainer.classList.remove('chat-app-input-container-night');
        chatAppBottom.classList.remove('chat-app-bottom-night');
        chatAppMessagePreview.classList.remove('card-night');

        let chatAppMessageMsg = document.querySelectorAll('.chat-app-message-msg');

        chatAppMessageMsg.forEach( msg => {
            msg.classList.remove('card-night');
        })

        cards.forEach( card => {
            card.classList.remove('card-night')
        })
    }
})

// Set Night Mode automatically if hour is greater than 17(5pm) and less than 24(12am)
function setNightMode(hour) {
    if (hour >= 17 && hour < 24) {
        nightMode.checked = true;
        isNightMode = nightMode.checked;
        body.classList.add('night');
        chatAppBody.classList.add('chat-app-body-night');
        chatAppInput.classList.add('chat-app-input-night');
        chatAppInputContainer.classList.add('chat-app-input-container-night');
        chatAppBottom.classList.add('chat-app-bottom-night');
        chatAppMessagePreview.classList.add('card-night');

        cards.forEach( card => {
            card.classList.add('card-night')
        })
    } else {
        isNightMode = nightMode.checked;
        body.classList.remove('night');
        chatAppBody.classList.remove('chat-app-body-night');
        chatAppInput.classList.remove('chat-app-input-night');
        chatAppInputContainer.classList.remove('chat-app-input-container-night');
        chatAppBottom.classList.remove('chat-app-bottom-night');
        chatAppMessagePreview.classList.remove('card-night');
        nightMode.checked = false;

        cards.forEach( card => {
            card.classList.remove('card-night')
        })
    }
}

// Sets Night Mode 
setNightMode(currentHour);



// -----------------------
// CHAT
// -----------------------

// Declares Chat variables
const chatIcon = document.querySelector('.chat-icon-container');
const chatBox = document.querySelector('.chat-box-container');
const chatBoxClose = document.querySelector('#chat-box-close');


// Chat App Messages 
const chatAppMessages = [
    'Hey there👋 How can I help you today?',
    'I have a question ✋',
    'Just taking a look around 👀',
    `Great! Can I grab your email in case I'm unable to answer your questions?`,
    `No problem! Click below if any questions come up.`,
    `Sorry, I didn't understand that.`,
    `Got it! Thanks for entering your email address.`,
    `How can I help you today?`,
    `Perfect! I'm away right now, but I have your message and email and will get back to you as soon as I can. Thanks, Leandro`,
    `Can I grab your email in case I'm unable to answer your questions?`,

];

// Displays Chat Start Time 
function chatStartTime() {
    const chatStart = document.querySelector('.chat-app-start');
    
    // Gets current date
    const date = new Date();

    // Formats current date to weekday, hour, minute - ex Tuesday 11:00 AM  
    const format = new Intl.DateTimeFormat('default', {
        weekday: 'long',
        hour: 'numeric',
        minute: '2-digit'
    });
    chatStart.innerHTML = `<p>${format.format(date)}</p>`;
}

// Displays 1st point of contact greeting
function chatAppGreeting (num) {
    const greeting = document.createElement('div');
    greeting.classList.add('app-greeting');
    greeting.classList.add('chat-app-message');
    greeting.innerHTML = `<p class="chat-app-message-msg">${chatAppMessages[num]}</p>`;
    chatAppBody.appendChild(greeting);

    if (nightMode.checked === true) {
        let chatAppMessageMsg = document.querySelectorAll('.chat-app-message-msg');

        chatAppMessageMsg.forEach( msg => {
            msg.classList.add('card-night');
        })
    } else {
        let chatAppMessageMsg = document.querySelectorAll('.chat-app-message-msg');

        chatAppMessageMsg.forEach( msg => {
            msg.classList.remove('card-night');
        })
    }
}

// Displays Chat Option
function createOption (num) {
    const option = document.createElement('div');
    option.classList.add('chat-option');
    option.classList.add(`option-${num}`);
    option.innerHTML = `<p class='opt-${num}'>${chatAppMessages[num]}</p>`;
    chatAppBody.appendChild(option);
}

// intialGreetingValue is set to false and turns true when intialGreeting function is executed.
let intialGreetingValue = false;

// Executes chatStartTime() and chatAppGreeting()
function intialGreeting () {
    chatStartTime();
    chatAppGreeting(0);
    createOption(1);
    createOption(2);
    intialGreetingValue = true;
}

// Opens ChatBox
chatIcon.addEventListener('click', () => {
    chatBox.classList.remove('none');
    chatIcon.classList.add('none');

    chatAppMessagePreviewContainer.remove();

    if (intialGreetingValue === false) {
        intialGreeting()
    }
})

// Closes ChatBox
chatBoxClose.addEventListener('click', () => {
    chatBox.classList.add('none');
    chatIcon.classList.remove('none');
})

// Declares Chat App Preview variables 
const chatAppMessagePreviewContainer = document.querySelector('.chat-app-message-preview-container');
const chatAppMessagePreviewCloseContainer = document.querySelector('.chat-app-message-preview-close-container')

// Displays Chat App Preview
function displayChatAppPreview () {
    chatAppMessagePreviewContainer.classList.remove('none');
}

// Waits 6 seconds before display Chat App Preview 
setTimeout( displayChatAppPreview, 6000)

// Shows Close Botton on Hover
chatAppMessagePreviewContainer.addEventListener('mouseenter', () => {
    chatAppMessagePreviewCloseContainer.classList.remove('none');
})

// Hides Close Bottn on Hover
chatAppMessagePreviewContainer.addEventListener('mouseleave', () => {
    chatAppMessagePreviewCloseContainer.classList.add('none');
})

// Hides and Removes Chat App Preview when clicked
chatAppMessagePreviewCloseContainer.addEventListener('click', () => {
    chatAppMessagePreviewContainer.remove();
})

// Opens ChatBox and hides/removes Chat App Preview when Clicked
chatAppMessagePreview.addEventListener('click', () => {
    chatAppMessagePreviewContainer.remove();
    chatBox.classList.remove('none');
    chatIcon.classList.add('none');

    // Executes intialGreeting function if it hasn't already been executed
    if (intialGreetingValue === false) {
        intialGreeting()
    }
})

// Creates Message bubble for User 
function createChatUserMessage (input) {
    const message = document.createElement('div');
    message.classList.add('chat-user-message');
    message.innerHTML = `<p>${input}</p>`;
    chatAppBody.appendChild(message);
}

// Creates Bot Message bubble
function createBotMessage (num) {
    const message = document.createElement('div');
    message.classList.add('chat-app-message');
    message.innerHTML = `<p class="chat-app-message-msg">${chatAppMessages[num]}</p>`;
    chatAppBody.appendChild(message);

    if (nightMode.checked === true) {
        let chatAppMessageMsg = document.querySelectorAll('.chat-app-message-msg');

        chatAppMessageMsg.forEach( msg => {
            msg.classList.add('card-night');
        })
    } else {
        let chatAppMessageMsg = document.querySelectorAll('.chat-app-message-msg');
        
        chatAppMessageMsg.forEach( msg => {
            msg.classList.remove('card-night');
        })
    }
}

// Declares bot messages flow 
let waitingForEmail = false;
let waitingForReply = false;

// Declares chatUserMessageHolder
let chatUserMessageHolder;

// Gets send-icon id 
const sendIcon = document.querySelector('#send-icon')

// Sends User message when Enter key is clicked 
chatAppInput.addEventListener('keyup', (e) => {
    chatUserMessageHolder = chatAppInput.value

    if (chatAppInput.value.length > 0) {
        sendIcon.classList.add('send-icon-active');
    } else {
        sendIcon.classList.remove('send-icon-active')
    }

    if (e.keyCode === 13) {
        // String in chatUserMessageHolder is created into a message and posted in chat
        createChatUserMessage(chatUserMessageHolder);

        if (waitingForReply === true) {
            setTimeout( () => {createBotMessage(8)}, 1000);
            waitingForReply = false;
            setTimeout( () => {chatAppScrollToBottom()}, 1100);
        }

        if ( waitingForEmail === true) {
            if (chatUserMessageHolder.includes('@') && chatUserMessageHolder.includes('.')) {
                setTimeout( () => {createBotMessage(6)}, 1000);
                setTimeout( () => {createBotMessage(7)}, 1500);
                setTimeout( () => {chatAppScrollToBottom()}, 1800);
                waitingForEmail = false;
                waitingForReply = true;
            } else {
                setTimeout( () => {createBotMessage(5)}, 1000);
                setTimeout( () => {createBotMessage(9)}, 1500);
                setTimeout( () => {chatAppScrollToBottom()}, 1600);
            }           
        }

        chatUserMessageHolder = '';
        chatAppInput.value = '';
        sendIcon.classList.remove('send-icon-active')
        chatAppScrollToBottom();
    }
})

// Sends User message when sendIcon is clicked 
sendIcon.addEventListener('click', () => {
    createChatUserMessage(chatUserMessageHolder);

    if (waitingForReply === true) {
        setTimeout( () => {createBotMessage(8)}, 1000);
        waitingForReply = false;
        setTimeout( () => {chatAppScrollToBottom()}, 1100);
    }

    if ( waitingForEmail === true) {
        if (chatUserMessageHolder.includes('@') && chatUserMessageHolder.includes('.')) {
            setTimeout( () => {createBotMessage(6)}, 1000);
            setTimeout( () => {createBotMessage(7)}, 1500);
            setTimeout( () => {chatAppScrollToBottom()}, 1800);
            waitingForEmail = false;
            waitingForReply = true;
        } else {
            setTimeout( () => {createBotMessage(5)}, 1000);
            setTimeout( () => {createBotMessage(9)}, 1500);
            setTimeout( () => {chatAppScrollToBottom()}, 1600);
        }           
    }

    chatUserMessageHolder = '';
    chatAppInput.value = '';
    sendIcon.classList.remove('send-icon-active')
    chatAppScrollToBottom();
})

// Shows which question user selected 
chatAppBody.addEventListener('click', e => {

    // User chooses option 1 
    if (e.target.className === 'opt-1') {
        const options = document.querySelectorAll('.chat-option')
        options.forEach(option => {
            option.remove()
        })

        createChatUserMessage(e.target.textContent);
        setTimeout( () => {createBotMessage(3)}, 1000)
        setTimeout( () => {chatAppScrollToBottom()}, 1100)

        waitingForEmail = true;           
    }

    // User chooses option 2
    if (e.target.className === 'opt-2') {
        const options = document.querySelectorAll('.chat-option')
        options.forEach(option => {
            option.remove()
        })

        createChatUserMessage(e.target.textContent)
        setTimeout( () => {createBotMessage(4)}, 1000)
        setTimeout( () => {
            createOption(1);
            // createOption(2);
        }, 1500)
        setTimeout( () => {chatAppScrollToBottom()}, 1600)       
    }
})

// Chat scrolls to bottom 
function chatAppScrollToBottom () {
    chatAppBody.scrollTo(0, chatAppBody.scrollHeight)
}