export class UserInfo {
    constructor( { titleSelector, captionSelector } ) {
        this._profileTitle = document.querySelector(titleSelector);
        this._profileCaption = document.querySelector(captionSelector);
    }

    getUserInfo() {
        return { 
            title: this._profileTitle.textContent, 
            caption: this._profileCaption.textContent 
        }
    }

    setUserInfo(info) {
        this._profileTitle.textContent = info.title; 
        this._profileCaption.textContent = info.caption;
    }
}