class AbstractList{
    items=[]
    constructor(item=[]) {
        this.items=[]
    }
    add(item){
        this.items.push(item)
        this.render()
    }
    remove(){

    }
    render(){
        this.items.forEach(good=>{
            good.render()
        })
    }
}


class List extends AbstractList{
    items=[]
    _cartInstance=null
    constructor(cartInstance) {
        super()
        this._cartInstance=cartInstance
        let goodsPromise=this.fetchGoods()
        goodsPromise.then(()=>{
            this.render()
        })
    }
    fetchGoods(){
        const result=fetch('http://localhost:3000/database.json')
            .then(res=>{
                return res.json()
            })
            .then(data=>{
                this.items=data.data.map(cur=>{
                    return new Good(cur,this._cartInstance)
                })
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

class Good{
    name=''
    price=0
    _cartInstance=null
    constructor({name,price},cartInstance=null) {
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
                this._cartInstance.add(new CartGood(this))
            })
            const BtnRem=document.createElement('button')
            block.querySelector('.btn_holder').appendChild(BtnAdd.getTemplate())
        }
    }
}
class CartGood extends Good{
    constructor(props) {
        super(props)
    }
    render() {
        const PlaceToRender=document.querySelector('.cart_list')
        if(PlaceToRender){
            const block =document.createElement('div')
            block.innerHTML=`${this.name}=${this.price}`
            PlaceToRender.appendChild(block)
        }
    }
}
const CartInstance=new Cart()
const ListInstance=new List(CartInstance)

