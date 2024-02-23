import { Chat, User, createElement, createChatUser, createProfile, createChatMessage, setYTAPIHasLoaded, removeAllChildren, Queue } from "./lib.js";
import { Theme } from "./theme.js";

/**
 * App State
 */
let user = new User("https://gcdn.thunderstore.io/live/repository/icons/Casper-RavenPlayermodel-2.0.0.png.256x256_q95.png", "Raven");
let messages = [new Chat("Test Message", "Local Pervert"), new Chat("Hi! Whatch this: https://www.youtube.com/watch?v=dQw4w9WgXcQ and this: https://w0.peakpx.com/wallpaper/328/44/HD-wallpaper-teen-titans-dc-dccomics-raven-robin-starfire.jpg", "Local Pervert"), new Chat("Also this other video! https://www.youtube.com/watch?v=hPQqEwgp8mE", "Local Pervert"), new Chat("Also this other video! https://www.youtube.com/watch?v=hPQqEwgp8mE", "Local Pervert"), new Chat("Also this other video! https://www.youtube.com/watch?v=hPQqEwgp8mE", "Local Pervert"), new Chat("Also this other video! https://www.youtube.com/watch?v=hPQqEwgp8mE", "Local Pervert")];
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
sendButtonElement.addEventListener('click', () => {
    messagesQueue.queue(new Chat(messageInputElement.value ?? '', user.name ?? 'LocalPervert'));
    messageInputElement.value = '';
    updateMessages()
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
    let authors = new Set(messages.map(m => new User('https://thispersondoesnotexist.com/', m.author)));
    authors.forEach(r => createChatUser(r, panelElement));
};

const updateMessages = () => {
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

updateMessages();