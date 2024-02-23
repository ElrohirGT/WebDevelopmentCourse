import { Chat, User, createElement, createChatUser, createProfile, createChatMessage, setYTAPIHasLoaded, removeAllChildren, Queue } from "./lib.js";
import { Theme } from "./theme.js";

/**
 * App State
 */
let user = new User("https://gcdn.thunderstore.io/live/repository/icons/Casper-RavenPlayermodel-2.0.0.png.256x256_q95.png", "Raven");
let messages = [];
let messagesQueue = new Queue(messages.slice());
let authors = new Set();

/**
 * Load YT API
 */
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

window.onYouTubeIframeAPIReady = () => {
    console.log("The API is now ready!")
    setYTAPIHasLoaded()
}


/**
 * Reset body styles
 */
document.body.setAttribute('style', `
    margin: 0px;
    padding: 2rem;
    width: 100vw;
    height: 100vh;
	
	display: grid;
	gap: .4rem;
	grid-template-columns: 20% 80%;
	grid-template-rows: 90% 10%;
	grid-template-areas:
	"panel chats"
	"profile chats";

	background-color: ${Theme.background};
`);

/**
 * Basic styles
 */
const styles = `
* {
    box-sizing: border-box;
}
.roomProfile:hover {
    background-color: ${Theme.primary_dark};
}
@keyframes entermessage {
    from { transform: translateX(-100%); }
    to { transform: translateX(0%); }
}
`;
let stylesElement = document.createElement('style');
stylesElement.appendChild(document.createTextNode(styles))
document.getElementsByTagName('head')[0].appendChild(stylesElement);

/**
 * Create basic items
 */
let panelElement = createElement('div', `
	border: .2rem solid ${Theme.accent};
	grid-area: panel;
	overflow-y: scroll;

    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
`);

let chatRoomDisplay = createElement('div', `
	border: .2rem solid ${Theme.accent};
	grid-area: chats;
    
    display: grid;
    grid-template-rows: 90% 10%;
    padding: 1rem;
    gap: 1rem;
`);
let chatRoomMessagesDisplay = createElement('div', `
    display: flex;
    flex-direction: column-reverse;
    justify-content: flex-start;
    gap: 1rem;
    overflow-y: auto;
`, chatRoomDisplay);

let chatRoomInputDisplay = createElement('div', `
    display: flex;
    justify-content: space-around;
`, chatRoomDisplay);
let messageInputElement = createElement('textarea', `
    width: 75%;
    resize: none;
`, chatRoomInputDisplay);
messageInputElement.setAttribute('autofocus', '');

let sendButtonElement = createElement('button', `
    background-color: transparent;
    border: 0 solid;
`, chatRoomInputDisplay);
sendButtonElement.innerHTML = `
    <img src="imgs/send.png">
`;
sendButtonElement.addEventListener('click', async () => {
    const message = messageInputElement.value?.trim();
    const username = user.name ?? 'LocalPervert';
    if (!message) {
        return;
    }
    try {
        await fetch('http://uwu-guate.site:3000/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                message
            })
        });
        messagesQueue.queue(new Chat(message, username));
        messageInputElement.value = '';
        updateMessagesDisplay()
    } catch (error) {
        console.log(error);
    }
});


let profileContainer = createElement('div', `
	border: .2rem solid ${Theme.accent};
    background-color: ${Theme.accent_dark};
	grid-area: profile;

	display: flex;
	justify-content: space-around;
	align-items: center;
	padding: .4rem;
`);
// Profile render logic
createProfile(user, profileContainer);

// Chat rooms render logic
const populateChatRoomPanel = () => {
    authors.forEach(name => createChatUser(new User('https://thispersondoesnotexist.com/', name), panelElement));
};

const updateMessagesDisplay = () => {
    let i = 0;
    while (!messagesQueue.isEmpty()) {
        let message = messagesQueue.dequeue();
        authors.add(message.author);
        removeAllChildren(panelElement);
        populateChatRoomPanel();
        createChatMessage(message, chatRoomMessagesDisplay, i);
        i++;
    }
}

const fetchMessagesFromAPI = async () => {
    console.log("Fetching messages from API!");
    try {
        const response = await fetch("http://uwu-guate.site:3000/messages");
        const body = await response.json();
        body.reverse().map(messageInfo => new Chat(messageInfo[2], messageInfo[1])).forEach(c => messagesQueue.queue(c));
    } catch (error) {
        console.error(error);
    } finally {
        messagesQueue.queue(new Chat("También tiene soporte para videos de YT! https://www.youtube.com/watch?v=tIJG7Lq3KRg", "El Admin"));
        updateMessagesDisplay()
    }
};

fetchMessagesFromAPI();
updateMessagesDisplay();