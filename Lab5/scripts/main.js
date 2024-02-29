import { Chat, User, createElement, createChatUser, createProfile, createChatMessage, setYTAPIHasLoaded, removeAllChildren, Queue } from "./lib.js";
import { Theme } from "./theme.js";

/**
 * App State
 */
let user = new User("https://gcdn.thunderstore.io/live/repository/icons/Casper-RavenPlayermodel-2.0.0.png.256x256_q95.png", "Raven");
let messages = new Set();
let messagesQueue = new Queue();
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
        loadingDisplay.style.display = "block";
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
    } finally {
        loadingDisplay.style.display = "none";
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

let loadingDisplay = createElement('div', `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    display: none;
`);
let loadingGif = createElement('img', `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
`, loadingDisplay);
loadingGif.src = "https://upload.wikimedia.org/wikipedia/commons/a/ad/YouTube_loading_symbol_3_%28transparent%29.gif";

// Chat rooms render logic
/**
    * @param {Chat} chat
    */
const fromChatToString = (chat) => `${chat.author}#${chat.message}`;

const updateMessagesDisplay = () => {
    let i = 0;
    const length = messagesQueue.length();
    while (!messagesQueue.isEmpty()) {
        const message = messagesQueue.dequeue();
        messages.add(fromChatToString(message));
        if (!authors.has(message.author)) {
            createChatUser(new User('https://thispersondoesnotexist.com/', message.author), panelElement);
        }
        authors.add(message.author);
        createChatMessage(message, chatRoomMessagesDisplay, length - i);
        i++;
    }
}

const fetchMessagesFromAPI = async (showLoading = true) => {
    console.log("Fetching messages from API!");
    console.log(showLoading ? "Will show loading component!" : "Won't show loading component");
    try {
        loadingDisplay.style.display = showLoading ? "block" : "none";
        const response = await fetch("http://uwu-guate.site:3000/messages");
        const body = await response.json();
				console.log("Fetched the messages", body);
        // console.log(JSON.stringify(body));
        // const body = JSON.parse(`[[26,\"Sofi G\",\"ha\",\"2024-02-23 03:17:18\"],[25,\"Bryan España\",\"test    https://www.galvanizeaction.org/wp-content/uploads/2022/06/Wow-gif.gif\",\"2024-02-23 03:17:06\"],[24,\"Bryan España\",\"https://www.galvanizeaction.org/wp-content/uploads/2022/06/Wow-gif.gif\",\"2024-02-23 03:16:29\"],[23,\"javilejo\",\"hola gente\",\"2024-02-23 03:12:01\"],[22,\"ludwing\",\"nuevo mensaje a guardar\",\"2024-02-23 03:01:11\"],[21,\"NombreUsuarioActual\",\"a\",\"2024-02-23 03:00:11\"],[20,\"ludwing\",\"Probando imagen https://www.google.com/url?sa=i&url=https%3A%2F%2Fnbxsoluciones.com%2F2022%2F06%2F17%2Fque-es-una-api-y-para-que-sirven%2F&psig=AOvVaw2uPW35nhWfc7JQgh3uIICs&ust=1708723921441000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOCJyeTyv4QDFQAAAAAdAAAAABAJ\",\"2024-02-23 02:58:56\"],[19,\"NombreUsuarioActual\",\"a\",\"2024-02-23 02:58:45\"],[18,\"NombreUsuarioActual\",\"a\",\"2024-02-23 02:58:15\"],[17,\"NombreUsuarioActual\",\"q\",\"2024-02-23 02:53:35\"],[16,\"Raven\",\"Link: https://www.uvg.edu.gt/\",\"2024-02-23 02:45:44\"],[15,\"NombreUsuarioActual\",\"a\",\"2024-02-23 02:43:52\"],[14,\"NombreUsuarioActual\",\"a´\",\"2024-02-23 02:40:09\"],[13,\"NombreUsuarioActual\",\"a\",\"2024-02-23 02:32:47\"],[12,\"NombreUsuarioActual\",\"a\",\"2024-02-23 02:32:12\"],[11,\"Gerax\",\"blabla\",\"2024-02-23 02:26:12\"],[10,\"Raven\",\"Testing images https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg otra imagen también https://www.gratex.in/uploads/ZARA/nature-themed-wallpaper-home-decoration-bedroom-natural-scenery-wall-murals-pictures-photos-coverings-shop-online-offer-best-price-free-shipping1.jpg?id=9\",\"2024-02-23 02:25:02\"],[9,\"Raven\",\"Elo!\",\"2024-02-23 02:23:22\"],[8,\"ludwing\",\"nuevo mensaje a guardar\",\"2024-02-23 02:18:34\"],[7,\"Julio\",\"hola\",\"2024-02-23 02:10:21\"],[6,\"Sofi G\",\"jajajjjajajaja\",\"2024-02-23 02:08:33\"],[5,\"Sofi G\",\"jajajjjajajaja\",\"2024-02-23 02:08:32\"],[4,\"Sofi G\",\"caca\",\"2024-02-23 02:07:45\"],[3,\"ludwing\",\"hola\",\"2024-02-23 02:07:24\"],[2,\"ludwing\",\"nuevo mensaje a guardar\",\"2024-02-23 01:21:28\"],[1,\"ludwing\",\"Hola jovenes, \\nbienvenidos al chat\",\"2024-02-22 19:30:43\"]]`);
        body
            .reverse()
            .map(([_id, author, message, _date]) => new Chat(message, author))
            .filter(c => !messages.has(fromChatToString(c)))
            .forEach(c => messagesQueue.queue(c));
    } catch (error) {
				console.error("An error ocurred while fetching chat messages!");
        console.error(error);
    } finally {
        loadingDisplay.style.display = "none";
        updateMessagesDisplay()
    }
};

const debugPushMessage = (author, message) => {
    const chat = new Chat(message, author);
    messagesQueue.queue(chat);
    updateMessagesDisplay();
};

const delay = (ms) => new Promise(res => setTimeout(res, ms));

setTimeout(async () => {
    fetchMessagesFromAPI();
    updateMessagesDisplay();

    messagesQueue.queue(new Chat("También tiene soporte para videos de YT! https://www.youtube.com/watch?v=tIJG7Lq3KRg. (Este mensaje no está subido dentro de la DB, es autogenerado por el cliente).", "El Admin"));
    while (true) {
        await delay(5000);
        fetchMessagesFromAPI(false);
        updateMessagesDisplay();
    }
});

// setTimeout(async () => {
//     await delay(6000);
//     debugPushMessage("Robin", "Hola!");
//
//     await delay(2000);
//     debugPushMessage("Robin", "Nos vemos en la reunión!");
//     debugPushMessage("Robin", "Nos vemos en la reunión!");
//     debugPushMessage("Robin", "Nos vemos en la reunión!");
//     debugPushMessage("Robin", "Nos vemos en la reunión!");
//     debugPushMessage("Robin", "Nos vemos en la reunión!");
//     debugPushMessage("Robin", "Nos vemos en la reunión!");
//     debugPushMessage("Robin", "Nos vemos en la reunión!");
//     debugPushMessage("Robin", "Nos vemos en la reunión!");
//     debugPushMessage("Robin", "Nos vemos en la reunión!");
//     debugPushMessage("Robin", "Nos vemos en la reunión!");
//     debugPushMessage("Robin", "Nos vemos en la reunión!");
//     debugPushMessage("Robin", "Nos vemos en la reunión!");
//     debugPushMessage("Robin", "Nos vemos en la reunión!");
//     debugPushMessage("Robin", "Nos vemos en la reunión!");
//     debugPushMessage("Robin", "Nos vemos en la reunión!");
//     debugPushMessage("Robin", "Nos vemos en la reunión!");
//     debugPushMessage("Robin", "Nos vemos en la reunión!");
//     debugPushMessage("Robin", "Nos vemos en la reunión!");
//     debugPushMessage("Robin", "Nos vemos en la reunión!");
//     debugPushMessage("BB", "Sick!");
// 		
// 		await delay(4000);
//     debugPushMessage("BBC", "Sick!");
// });
