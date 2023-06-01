export class UserInfo {
    constructor( { title, caption } ) {
        this._title = document.querySelector(title);
        this._caption = document.querySelector(caption);
    }

    getUserInfo() {
        return { 
            title: this._title.textContent, 
            caption: this._caption.textContent 
        }
    }

    setUserInfo(info) {
        this._title.textContent = info.title; 
        this._caption.textContent = info.caption;
    }
}