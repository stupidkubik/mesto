export class UserInfo {
    constructor( { name, caption } ) {
        this._name = document.querySelector(name);
        this._caption = document.querySelector(caption);
    }

    getUserInfo() {
        return { profileName: this._name.textContent, profileCaption: this._caption.textContent }
    }

    setUserInfo(info) {
        this._name.textContent = info.profileName; 
        this._caption.textContent = info.profileCaption;
    }
}