class List{
    items=[]
    constructor() {
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
                    return new Good(cur)
                })
            })
        return result
    }
    render(){
        this.items.forEach(good=>{
            good.render()
        })
    }
}
class Good{
    name=''
    price=0
    constructor({name,price}) {
        this.name=name
        this.price=price
    }
    render(){
        const PlaceToRender = document.querySelector(".goods-list")
        if(PlaceToRender){
            const block = document.createElement("div")
            block.innerHTML="Имя:"+this.name+" Цена:"+this.price
            PlaceToRender.appendChild(block)
            const BtnAdd=document.createElement("button")
            const BtnRem=document.createElement("button")
            block.appendChild(BtnAdd)
            block.appendChild(BtnRem)
            BtnAdd.innerHTML="+"
            BtnRem.innerHTML="-"
        }
    }
    addCart(){
        const PlaceToRender = document.querySelector(".cart-list")
        if(PlaceToRender){
            const block = document.createElement("div")
            block.className=`${this.name}`
            block.innerHTML="Имя:"+this.name+" Цена:"+this.price
            PlaceToRender.appendChild(block)
        }
    }
}
class Cart extends List{

}
class CartGood{

}
const ListInstance=new List()
const BtnLoadMore=document.querySelector('.btn-load-more')
BtnLoadMore.onclick=function loadmore(){
    const good1=new Good({name:'Товар New', price:100})
    const good2=new Good({name:'Товар New', price:100})
    good1.render()
    good2.render()
}