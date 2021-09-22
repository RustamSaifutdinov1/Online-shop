import Button from "./button";
import "/public/style.css"
class AbstractList{
    items=[]
    constructor(item=[]) {
        this.items=[]
    }
    add(item){
        const fundedItem=this.items.find((fitem,index,arr)=>{
            return  fitem.name===item.name
        })
        const{items}=this
        const addedPromise=new Promise(resolve => {
            if(fundedItem){
                fundedItem.counter++
            }else{
                this.items.push(item)
            }
            resolve()
        })
        addedPromise.then(()=>{this.render()})
    }
    remove(item){
        const addedPromise=new Promise(resolve => {
            if(item.counter>1){
                item.counter--
            }else{
                for(let i=0; i<this.items.length; i++){
                    if(item===this.items[i]){
                        this.items.splice(i,1)
                        break
                    }
                }
            }
            resolve()
        })
        addedPromise.then(()=>{this.render()})
    }
    render(){
        this.items.forEach(good=>{
            good.render()
        })
    }
}
class Cart extends AbstractList{
    constructor() {
        super()
        this.init()
    }
    init(){
        const block=document.createElement('div')
        block.classList.add('cart')
        const list=document.createElement('div')
        list.classList.add('cart_list')
        block.appendChild(list)
        const placeToRender=document.querySelector('header')
        const ButtonInstance= new Button('Корзина',()=>{
            list.classList.toggle('shown')
        })
        block.appendChild(ButtonInstance.getTemplate())
        if(placeToRender){
            placeToRender.appendChild(block)
        }
    }
    render(){
        const placeToRender=document.querySelector('.cart_list')
        placeToRender.innerHTML=''
        this.items.forEach(good=>{
            good.render(placeToRender)
        })
    }
}
class List extends AbstractList{
    items=[]
    _cartInstance=null
    _pageCounter=1
    constructor(cartInstance) {
        super()
        this._cartInstance=cartInstance
        this.initShowMoreBtn()
        let goodsPromise=this.fetchGoods()
        goodsPromise.then(()=>{
            this.render()
        })
    }
    initShowMoreBtn(){
        const btn=document.querySelector('.btnMore')
        btn.addEventListener('click',()=>{
            console.log("click")
            this.fetchGoods()
                .then(()=>{
                    this.render()
                })
        })
    }
    hideShowMoreBtn(){
        const btn=document.querySelector('.btnMore')
        btn.remove()
    }
    fetchGoods(){
        const result=fetch(`/database${this._pageCounter}.json`)
            .then(res=>{
                return res.json()
            })
            .then(data=>{
                this._pageCounter++
                this.items.push(...data.data.map(cur=>{
                    return new Good(cur,this._cartInstance)
                }))
            })
            .catch(e=>{
                this.hideShowMoreBtn()
            })
        return result
    }
    render(){
        const placeToRender=document.querySelector('.goods-list')
        if(placeToRender) {
            placeToRender.innerHTML = ''
            this.items.forEach(good => {
                good.render(placeToRender)
            })
        }
    }
}
class Good{
    name=''
    price=0
    counter=1
    _cartInstance=null
    constructor({name,price},cartInstance) {
        this.name=name
        this.price=price
        this._cartInstance=cartInstance
    }
    render(PlaceToRender){
        if(PlaceToRender){
            const block = document.createElement('div')
            block.innerHTML=`
        <div class="img">
          <img src="https://ae01.alicdn.com/kf/UTB8CCmompPJXKJkSahVq6xyzFXaz.jpg" width="200px" height="200px"/>
        </div>
        <div class="meta">
          <div class="meta__row">
            <span class="key">Товар:</span>
            <span class="value">${this.name}</span>
          </div>
          <div class="meta__row">
            <span class="key">Цена:</span>
            <span class="value">${this.price}</span>
          </div>
          <div class="btn_holder"></div>
        </div>
      `
            PlaceToRender.appendChild(block)
            const BtnAdd=new Button('Добавить в корзину',()=>{
                this._cartInstance.add(new CartGood(this,this._cartInstance))
            })
            const BtnRem=document.createElement('button')
            block.querySelector('.btn_holder').appendChild(BtnAdd.getTemplate())
        }
    }
}
class CartGood extends Good{
    sum=0
    constructor(props,cartInstance) {
        super(props)
        this._cartInstance=cartInstance
        this.sum=parseInt(this.price)*this.counter
    }
    render() {
        const PlaceToRender=document.querySelector('.cart_list')
        if(PlaceToRender){
            const block =document.createElement('div')
            block.innerHTML=`${this.name}=${this.price} *${this.counter} `
            PlaceToRender.appendChild(block)
            let addBtn=new Button('-',()=>{
                this._cartInstance.remove(this)
            })
            let BtnRem=document.createElement('div')
            block.appendChild(BtnRem)
            BtnRem.appendChild(addBtn.getTemplate())
            addBtn=new Button('+',()=>{
                this._cartInstance.add(this)
            })
            BtnRem=document.createElement('div')
            block.appendChild(BtnRem)
            BtnRem.appendChild(addBtn.getTemplate())
        }
    }
}
const CartInstance=new Cart()
const ListInstance=new List(CartInstance)

