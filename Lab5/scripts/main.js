import { Chat, Room, User, createElement, createRoom, createProfile, between, createChatMessage, setYTAPIHasLoaded, removeAllChildren, Stack, Queue } from "./lib.js";
import { Theme } from "./theme.js";

/**
 * App State
 */
let rooms = [
    new Room("https://upload.wikimedia.org/wikipedia/commons/c/cb/Teen_Titans_-_logo_%28English%29.png", "Teen Titans", [new Chat("Test Message", "Local Pervert"), new Chat("Hi! Whatch this: https://www.youtube.com/watch?v=dQw4w9WgXcQ and this: https://w0.peakpx.com/wallpaper/328/44/HD-wallpaper-teen-titans-dc-dccomics-raven-robin-starfire.jpg", "Local Pervert"), new Chat("Also this other video! https://www.youtube.com/watch?v=hPQqEwgp8mE", "Local Pervert"), new Chat("Also this other video! https://www.youtube.com/watch?v=hPQqEwgp8mE", "Local Pervert"), new Chat("Also this other video! https://www.youtube.com/watch?v=hPQqEwgp8mE", "Local Pervert"), new Chat("Also this other video! https://www.youtube.com/watch?v=hPQqEwgp8mE", "Local Pervert")]),
    new Room("https://upload.wikimedia.org/wikipedia/commons/c/cb/Teen_Titans_-_logo_%28English%29.png", "Teen Titans", [new Chat("Test Message", "Local Pervert")]),
    new Room("https://upload.wikimedia.org/wikipedia/commons/c/cb/Teen_Titans_-_logo_%28English%29.png", "Teen Titans", [new Chat("Test Message", "Local Pervert")]),
    new Room("https://upload.wikimedia.org/wikipedia/commons/c/cb/Teen_Titans_-_logo_%28English%29.png", "Teen Titans", [new Chat("Test Message", "Local Pervert")]),
    new Room("https://upload.wikimedia.org/wikipedia/commons/c/cb/Teen_Titans_-_logo_%28English%29.png", "Teen Titans", [new Chat("Test Message", "Local Pervert")]),
    new Room("https://upload.wikimedia.org/wikipedia/commons/c/cb/Teen_Titans_-_logo_%28English%29.png", "Teen Titans", [new Chat("Test Message", "Local Pervert")]),
    new Room("https://upload.wikimedia.org/wikipedia/commons/c/cb/Teen_Titans_-_logo_%28English%29.png", "Teen Titans", [new Chat("Test Message", "Local Pervert")]),
    new Room("https://upload.wikimedia.org/wikipedia/commons/c/cb/Teen_Titans_-_logo_%28English%29.png", "Teen Titans", [new Chat("Test Message", "Local Pervert")]),
    new Room("https://upload.wikimedia.org/wikipedia/commons/c/cb/Teen_Titans_-_logo_%28English%29.png", "Teen Titans", [new Chat("Test Message", "Local Pervert")]),
    new Room("https://upload.wikimedia.org/wikipedia/commons/c/cb/Teen_Titans_-_logo_%28English%29.png", "Teen Titans", [new Chat("Test Message", "Local Pervert")]),
    new Room("https://upload.wikimedia.org/wikipedia/commons/c/cb/Teen_Titans_-_logo_%28English%29.png", "Teen Titans", [new Chat("Test Message", "Local Pervert")]),
    new Room("https://upload.wikimedia.org/wikipedia/commons/c/cb/Teen_Titans_-_logo_%28English%29.png", "Teen Titans", [new Chat("Test Message", "Local Pervert")]),
    new Room("https://upload.wikimedia.org/wikipedia/commons/c/cb/Teen_Titans_-_logo_%28English%29.png", "Teen Titans", [new Chat("Test Message", "Local Pervert")]),
    new Room("https://upload.wikimedia.org/wikipedia/commons/c/cb/Teen_Titans_-_logo_%28English%29.png", "Teen Titans", [new Chat("Test Message", "Local Pervert")]),
    new Room("https://upload.wikimedia.org/wikipedia/commons/c/cb/Teen_Titans_-_logo_%28English%29.png", "Teen Titans", [new Chat("Test Message", "Local Pervert")]),
    new Room("https://upload.wikimedia.org/wikipedia/commons/c/cb/Teen_Titans_-_logo_%28English%29.png", "Teen Titans", [new Chat("Test Message", "Local Pervert")]),
    new Room("https://upload.wikimedia.org/wikipedia/commons/c/cb/Teen_Titans_-_logo_%28English%29.png", "Teen Titans", [new Chat("Test Message", "Local Pervert")]),
];

let user = new User("https://gcdn.thunderstore.io/live/repository/icons/Casper-RavenPlayermodel-2.0.0.png.256x256_q95.png", "Raven");
// The reverse is because of a CSS gotcha
// You can't just use justify-content: flex-end and make the scroll still work
// That's why the weird logic for styles is applied and the reverse is executed too.
let messagesQueue = new Queue();

let currentRoomIndex = -1;

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
    from: { transform: translateX(-100%); }
    to: { transform: translateX(0%); }
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
    if (!between(0, rooms.length, currentRoomIndex)) {
        console.error("No room selected!");
        return;
    }

    messagesQueue.queue(new Chat(messageInputElement.value ?? '', user.name ?? 'LocalPervert'));
    messageInputElement.value = '';
    updateMessages()
});


let profileContainer = createElement('div', `
	border: .2rem solid ${Theme.accent};
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
    rooms.forEach((r, i) => createRoom(r, i === currentRoomIndex, () => {
        currentRoomIndex = i;
        removeAllChildren(chatRoomMessagesDisplay);
        removeAllChildren(panelElement);
        populateChatRoomPanel();
        rooms[currentRoomIndex].chats.forEach((c) => messagesQueue.queue(c));
        updateMessages();
    }, panelElement));
};

const updateMessages = () => {
    while (!messagesQueue.isEmpty()) {
        let message = messagesQueue.dequeue();
        createChatMessage(message, chatRoomMessagesDisplay);
    }
    // if (between(0, rooms.length, currentRoomIndex)) {
    //     rooms[currentRoomIndex].chats.slice().reverse().forEach(c => createChatMessage(c, chatRoomMessagesDisplay));
    // }
}

populateChatRoomPanel();