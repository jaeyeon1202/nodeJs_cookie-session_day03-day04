const cookieConfig ={
    httpOnly : true, //웹 통신을 할때 내가 쿠키를 허용해 주겠다.http만 허용
    maxAge : 50000, //얼마동안 유지해줄건지, 5초동안 살려두겠다. 5초동안 변수 유지
    //f12새로고침 하면 -> 5초 유지 후 쿠키 사라짐, 웹 브라우저 새로고침 하면 쿠키 다시 받아옴
    signed : true //쿠키값에 대해서 암호화를 설정하는 것
}

const index = (req, res) =>{
    //사용자 요청으로 부터 쿠키 가져오기(req.cookies.변수이름)
    let userCookie = req.signedCookies.myCookie;
    //새로고침(새로 요청하면)하면 쿠키값 생김
    console.log("req.cookies");
    // => 위 코드는 오류가 난다. 최초에 요청을 하면 쿠키값이 없기 때문에
    // 화면에 출력해줄게 없어서(undefined)오류
    res.cookie("myCookie", "valueCookie", cookieConfig); //변수처럼 생각한다.사용자한테 전달
    // 쿠키의 유효기간을 설정할 수 있다(변수를 얼마나 살려둘건지)
    res.render("cookie/cookie01", {userCookie}); //res 응답에 대한 값, 유저쿠키 전달
}
const popup =(req,res)=>{
    res.render("cookie/popup");
}
const quiz =(req,res)=>{
    const userCookie = req.cookies.myCookie;
    res.render("cookie/quiz", {userCookie});
}
const quiz_popup=(req,res)=>{
    res.render("cookie/quizPopup");
}

const makeCookie = (req,res) => {
    res.cookie("myCookie", "value", cookieConfig);
    res.render("cookie/quizPopup");
}

const ser = require("../../service/cookie/cookie_service");
//보통 import하는 것은 맨위에 쓰지만 걍 밑에 씀
const cart = (req,res) =>{
    res.render("cookie/cart", {list: ser.cart()});
}

//물음표, 슬러시 둘다 param 가능하지만 경고가 뜸. 사용 지양
const save1 = (req,res)=>{ //물음표 값 넘기는 방식, query
    console.log("===save1===");
    console.log("param:", req.param("id"));
    console.log("query:", req.query); //{ id: '1' }
    console.log("params:", req.params); //{}
    res.send("save1 연결");
}
const save2 = (req,res)=>{ //슬러시 경로로 값 넘기는 방식, params
    console.log("===save2===");

    let cart_list=req.signedCookies.cart_list; //쿠키이름: cart_list
    if(cart_list === undefined){
        cart_list = {};
    }

    cart_list = ser.save2(cart_list, req.params.goods);//카트리스트, 상품번호 넘겨주기
    res.cookie("cart_list", cart_list, cookieConfig );

    console.log("cart_list: ",  cart_list);

    console.log("param:", req.param("goods"));
    console.log("query:", req.query); //{}
    console.log("params:", req.params); //{ goods: '1' }
    
    //const msg = "<h1>안녕 save2 <h1>";
    const msg = `<script>
                    alert("${req.params.goods}상품이 등록되었습니다.");
                    location.href = "/cookie/cart";
                </script>`;
    res.send(msg);
}

const viewlist = (req,res) => {

    let cart_list=req.signedCookies.cart_list; 
    if(!cart_list){ //cart_list === undefined 값이 기본은로 false, !cart_list==true
        const msg = `<script>
                        alert("저장된 목록이 없습니다.");
                        location.href = "/cookie/cart";
                    </script>`;
        res.send(msg);
    }
    res.render("cookie/view_list", {list : ser.view_list(cart_list)}); //값이 있다면 리스트 전달
}
module.exports = {index, popup, quiz, quiz_popup, makeCookie,
                         cart, save1, save2, viewlist};