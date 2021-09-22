export  default class Button{
    _text=''
    _onClickClb=null
    constructor(text,clb) {
        this._text=text
        this._onClickClb=clb
    }
    onBtnClick(){
        if(typeof this._onClickClb === 'function'){
            this._onClickClb()
        }
    }
    getMainTemplate(){
        const btn=document.createElement('button')
        btn.classList.add('btn')
        return btn
    }
    getTemplate(){
        const btn=this.getMainTemplate()
        btn.innerHTML=this._text
        btn.addEventListener('click',()=>{
            this.onBtnClick()
        })
        return btn
    }
}