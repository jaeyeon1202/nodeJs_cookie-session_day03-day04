const  dbCart = require("../../database/cookie/user_cart");

const cart = ()=>{
    return dbCart;
};

const save2 = (cart_list, goods) => {
    //{1: 개수, 2:개수,,,}
    //{}
    if(!cart_list[goods]){ 
        //cart_list ={1:0}
        cart_list[goods]=0; //최초에 값이 없으면 0으로 초기화
    }
    cart_list[goods] += 1; //cart_list ={1:1}
    return cart_list;
    /*
    for(var i=0; i<dbCart.length; i++){
        if(dbCart[i].goods_id == goods){
            cart_list = dbCart[i];
            break;
        }
    }
    return cart_list;
    */
}
const view_list = (cart_list) =>{
    console.log("===ser view_list===");
    //console.log(cart_list);
    let list = [];
    for( i in cart_list){
        console.log("key: ", i)
        let item = {};
        item['goods_id'] = i;
/*
        [
                0: {goods_id : 1, title : "장난감", price : 5000},
                1: {goods_id : 2, title : "컴퓨터", price : 10000},
                2: {goods_id : 3, title : "자동차", price : 200},
        ]

*/
        item['title'] = dbCart[i-1].title;
        item['price'] = dbCart[i-1].price;
        item['number'] = cart_list[i];
        item['total'] = dbCart[i-1].price*cart_list[i];
        list = list.concat(item);
        //list.puch(item)
    }
    return list;
}
module.exports = {cart, save2, view_list};

