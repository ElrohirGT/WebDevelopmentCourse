import { Chat, Room, User, createElement, createRoom, createProfile, between, createChatMessage, setYTAPIHasLoaded } from "./lib.js";
import { Theme } from "./theme.js";

/**
 * App State
 */
let rooms = [
    new Room("https://upload.wikimedia.org/wikipedia/commons/c/cb/Teen_Titans_-_logo_%28English%29.png", "Teen Titans", [new Chat("Test Message", "Local Pervert"), new Chat("Hi! Whatch this: https://www.youtube.com/watch?v=dQw4w9WgXcQ and this: https://w0.peakpx.com/wallpaper/328/44/HD-wallpaper-teen-titans-dc-dccomics-raven-robin-starfire.jpg", "Local Pervert"), new Chat("Also this other video! https://www.youtube.com/watch?v=hPQqEwgp8mE", "Local Pervert")]),
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

let currentRoomIndex = 0;

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

	background-color: ${Theme.background}
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

rooms.forEach((r, i) => createRoom(r, i === currentRoomIndex, panelElement));

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
    flex-direction: column;
    gap: 1rem;
`, chatRoomDisplay);
if (between(0, rooms.length, currentRoomIndex)) {
    rooms[currentRoomIndex].chats.forEach(c => createChatMessage(c, chatRoomMessagesDisplay));
}

let chatRoomInputDisplay = createElement('div', `
    background-color: white;
`, chatRoomDisplay);


let profileContainer = createElement('div', `
	border: .2rem solid ${Theme.accent};
	grid-area: profile;

	display: flex;
	justify-content: space-around;
	align-items: center;
	padding: .4rem;
`);
createProfile(user, profileContainer);
