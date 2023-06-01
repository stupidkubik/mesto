export class UserInfo {
    constructor( { title, caption } ) {
        this._profileTitle = document.querySelector(title);
        this._profileCaption = document.querySelector(caption);
    }

    getUserInfo() {
        return { 
            "title": this._profileTitle.textContent, 
            "caption": this._profileCaption.textContent 
        }
    }

    setUserInfo(info) {
        this._profileTitle.textContent = info.title; 
        this._profileCaption.textContent = info.caption;
    }
}