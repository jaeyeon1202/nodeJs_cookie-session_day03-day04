const index = (req,res) =>{
    res.render("session/index");
}
const setSession = (req,res)=>{
    req.session.name = "홍길동";
    req.session.age = 20;
    res.render("session/set_session");
}
const getSession = (req,res) =>{
    const sessionValue = {
        name : req.session.name,
        age: req.session.age
    };
    res.render("session/get_session",sessionValue);
}
const delSession = (req,res) =>{
    //특정 세셴 하나만 삭제
    //delete req.session.name;
    //모든 세셴 삭제
    req.session.destroy();

    res.render("session/del_session");
}

const login = (req,res) =>{
    res.render("session/login", {nick:req.session.nick});
}

const loginCheck =(req,res) =>{
    console.log("query",req.query);
    console.log("params",req.params);
    console.log("body",req.body); //post방식일때는 body사용
    console.log("===login check===");
    console.log(req.body.id);
    console.log(req.body["pwd"]);
    //console.log(req.body.pwd);


    const DBid = "aaa", DBpwd ="111", nick="홍길동";
    if(DBid == req.body.id && DBpwd == req.body["pwd"]){
        req.session.id2 = DBid;
        req.session.nick = nick;
        return res.redirect("/session/success");
    }
    const msg = `<script>
                    alert("로그인실패");
                    location.href="/session/login"
                </script>`
    res.send(msg);
}

const success = (req,res) => {
    console.log(req.session.id2);
    if(req.session.id2)
        return res.render("session/success", {nick: req.session.nick});

    const msg = `<script>
                    alert("로그인해라잉~!~!!");
                    location.href="/session/login"
                </script>`
    res.send(msg);
}

const logout = (req,res) =>{
    req.session.destroy(()=>{
        console.log("모든 세셴을 만료합니다.")
    })
    res.redirect("/session/login");
}
module.exports = {index, setSession, getSession, delSession,
                         login, loginCheck, success, logout}