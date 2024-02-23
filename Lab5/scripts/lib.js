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

export class User {
    constructor(profilePicture, name) {
        this.profilePicture = profilePicture;
        this.name = name;
    }
}

export class Queue {
    /**
     * Constructs a queue of the given elements.
     * @param {any[]} initialElements The inital elements of the queue
     */
    constructor(initialElements = []) {
        this.elements = [];
        initialElements.forEach(a => this.queue(a))
    }
    length() {
        return this.elements.length;
    }

    isEmpty() {
        return this.elements.length == 0;
    }

    queue(element) {
        this.elements.unshift(element);
    }

    dequeue() {
        return this.elements.pop();
    }

    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.elements[this.elements.length - 1];
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
 * Creates an  HTML element inside a parent element.
 * @param {String} tagName The tag of the element to create.
 * @param {String} styles The list of styles to apply.
 * @param {HTMLElement} parent The parent of the element to create.
 * @returns {HTMLElement} The element attached to the parent element.
 */
export const createElementAtStart = (tagName, styles = '', parent = document.body) => {
    let element = document.createElement(tagName);

    element.setAttribute('style', styles);
    parent.prepend(element);

    return element;
};

/**
 * Creates a Room preview and appends it to the parent HTMLElement.
 *
 * @param {User} user User object to display.
 * @param {HTMLElement} parent parent HTML element.
 * @returns {HTMLElement} The Room HTML element appended to parent.
 */
export const createChatUser = (user, parent) => {
    let userContainer = createElement('div', `
		display: flex;
		align-items: flex-start;
        gap: 1rem;
		padding-top: .4rem;
        transition: .2s;
	`, parent);
    userContainer.classList.add("roomProfile");

    const imageStyles = `
        width: 20%;
        border-radius: 50%;
    `;
    let defaultImage = createElement('img', imageStyles, userContainer);
    defaultImage.src = "imgs/defaultProfile.png";

    const profileImage = new Image();
    profileImage.addEventListener('load', () => {
        defaultImage.src = profileImage.src;
    });
    setTimeout(() => {
        profileImage.src = user.profilePicture;
    }, Math.random() * 3000);


    let roomName = createElement('p', `
		color: ${Theme.text_on_background};
        width: 80%;
	`, userContainer);
    roomName.innerText = user.name;

    return userContainer;
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
        // Run the YT API logic in the background
        // If this is not run in the background only the first link is embedded correctly.
        setTimeout(() => YT.Player(iframe));
    });
}

/**
 * Creates and styles a chat element, also attaches it to the parent.
 * 
 * @param {Chat} chatMessage The message to display.
 * @param {HTMLElement} parent The parent element of this chat
 * @param {Number} i The index of the current chat.
 * @returns {HTMLElement} The chat element created.
 */
export const createChatMessage = (chatMessage, parent, i) => {
    const urlRegex = new RegExp(/(http|https|ftp):[\w?\/\.=\%_\-\?\&]+/, 'g');
    const linkStyles = `
        text-decoration: none;
        color: ${Theme.accent};
    `;
    const isImage = (url) => /\.(jpg|jpeg|png|webp|avif|gif|svg)[\?\w=\w]*$/.test(url);

    // The reverse is because of a CSS gotcha
    // You can't just use justify-content: flex-end and make the scroll still work
    // That's why the weird logic for styles is applied and the reverse is executed too.
    let messageContainer = createElementAtStart('div', `
            display: block;
            animation-name: entermessage;
            animation-duration: 0.5s;
            animation-delay: ${250 * i}ms;
            animation-fill-mode: backwards;
        `, parent);

    let authorElement = createElement('p', `
            color: ${Theme.accent_light};
            font-size: .8rem;
        `, messageContainer);
    authorElement.textContent = chatMessage.author + ":";

    let messageElement = createElement('p', `
            display: inline-block;
            width: 100%;
            color: white;
            word-break: break-all;
        `, messageContainer);
    let urlsFoundInMessage = [...chatMessage.message.matchAll(urlRegex)].map(m => m[0]);
    messageElement.innerHTML = chatMessage.message.replaceAll(urlRegex, match => {
        return `<a href="${match}" target="_blank" style="${linkStyles}">${match}</a>`;
    });

    let linksDisplayContainer = createElement('div', `
        display: flex;
        flex-wrap: wrap;
    `, messageContainer)

    urlsFoundInMessage.forEach(url => {
        if (url.includes("www.youtube.com")) {
            let iframeElement = createElement('iframe', `
            border: 0;
            min-height: 30%;
        `, linksDisplayContainer);
            YTIframes.push([url, iframeElement])
            loadYTIframes()
        } else if (isImage(url)) {
            let imageElement = createElement('img', `
                max-height: 30%;
                width: 40%;
            `, linksDisplayContainer)
            imageElement.src = url;
        }
    });

    return messageContainer;
}

/**
 * Removes all the children in the given container.
 * @param {HTMLElement} container The container to remove all children
 */
export const removeAllChildren = (container) => {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
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
