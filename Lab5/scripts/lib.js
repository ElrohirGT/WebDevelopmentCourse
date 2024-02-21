import { Theme } from "./theme.js";

export class Chat {
    /**
     * Construct a message.
     * 
     * @param {String} message The chat message
     * @param {String} author The Author name
     */
    constructor(message, author) {
        this.message = message;
        this.author = author;
    }
}

export class Room {
    /**
     * Constructs a chat room.
     *
     * @param {String} profilePicture URL to the room profile picture.
     * @param {String} name name of the room.
     * @param {Chat[]} chats history of chats of the given room.
     */
    constructor(profilePicture, name, chats) {
        this.profilePicture = profilePicture;
        this.name = name;
        this.chats = chats;
    }
}

export class User {
    constructor(profilePicture, name) {
        this.profilePicture = profilePicture;
        this.name = name;
    }
}

/**
 * Creates an  HTML element inside a parent element.
 * @param {String} tagName The tag of the element to create.
 * @param {String} styles The list of styles to apply.
 * @param {HTMLElement} parent The parent of the element to create.
 * @returns {HTMLElement} The element attached to the parent element.
 */
export const createElement = (tagName, styles = '', parent = document.body) => {
    let element = document.createElement(tagName);

    element.setAttribute('style', styles);
    parent.appendChild(element);

    return element;
};

/**
 * Creates a Room preview and appends it to the parent HTMLElement.
 *
 * @param {Room} room Room object to display.
 * @param {Boolean} isCurrentRoom the room is currently selected.
 * @param {HTMLElement} parent parent HTML element.
 * @returns {HTMLElement} The Room HTML element appended to parent.
 */
export const createRoom = (room, isCurrentRoom, parent) => {
    let roomContainer = createElement('div', `
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding-top: .4rem;

		background-color: ${isCurrentRoom ? Theme.accent_dark : ''};
        font-weight: ${isCurrentRoom ? "bold" : "normal"};
        transition: .2s;
	`, parent);
    roomContainer.classList.add("roomProfile")

    let image = createElement('img', `
		width: 20%;
		border-radius: 50%;
	`, roomContainer);
    image.src = room.profilePicture;

    let roomName = createElement('p', `
		color: ${Theme.text_on_background}
	`, roomContainer);
    roomName.innerText = room.name;

    return roomContainer;
}

/**
 * Create the profile HTML elements to render the user profile.
 *
 * @param {User} user user to render.
 * @param {HTMLElement} parent parent to render this profile to.
 */
export const createProfile = (user, parent) => {
    let profileImage = createElement('img', `
	border-radius: 50%;
	height: 100%;
	`, parent);
    profileImage.src = user.profilePicture;

    let profileName = createElement('p', `
	color: ${Theme.text_on_background}
	`, parent);
    profileName.innerText = user.name;
}

let YTIframes = []
let YTAPILoaded = false;
export const setYTAPIHasLoaded = () => {
    YTAPILoaded = true;
    loadYTIframes();
}
export function loadYTIframes() {
    if (!YTAPILoaded) {
        console.log("The API is not ready!")
        return;
    }

    YTIframes.forEach(([url, iframe]) => {
        let videoId = url.substring(url.indexOf('?v=') + 3)
        iframe.src = `http://www.youtube.com/embed/${videoId}?enablejsapi=1`;
        YT.Player(iframe)
    });
}

/**
 * Creates and styles a chat element, also attaches it to the parent.
 * 
 * @param {Chat} chatMessage The message to display.
 * @param {HTMLElement} parent The parent element of this chat
 * @returns {HTMLElement} The chat element created.
 */
export const createChatMessage = (chatMessage, parent) => {
    const urlRegex = new RegExp(/(http|https|ftp):[\w?\/\.=\%_\-]+/, 'g');
    const linkStyles = `
        text-decoration: none;
        color: ${Theme.accent};
    `;

    let messageContainer = createElement('div', `
            display: block;
        `, parent);

    let authorElement = createElement('p', `
            color: ${Theme.accent_light};
            font-size: .8rem;
        `, messageContainer);
    authorElement.textContent = chatMessage.author + ":";

    let messageElement = createElement('p', `
            color: white;
        `, messageContainer);
    let urlsFoundInMessage = [...chatMessage.message.matchAll(urlRegex)].map(m => m[0]);
    messageElement.innerHTML = chatMessage.message.replaceAll(urlRegex, match => {
        return `<a href="${match}" target="_blank" style="${linkStyles}">${match}</a>`;
    });

    let iframesContainer = createElement('div', `
        display: flex;
    `, messageContainer)

    urlsFoundInMessage.forEach(url => {
        let iframeElement = createElement('iframe', `
        `, iframesContainer);
        if (url.includes("www.youtube.com")) {
            YTIframes.push([url, iframeElement])
            loadYTIframes()
        } else {
            iframeElement.src = url;
        }
    });

    return messageContainer;
}

/**
 * Returns true if value is between min and max (inclusive).
 * @param {Number} min minimum value.
 * @param {Number} max maximum value.
 * @param {Number} value value to check.
 * @returns {Boolean} True if the value is between the two limits (inclusive).
 */
export const between = (min, max, value) => {
    return value >= min && value <= max;
}
