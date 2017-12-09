function show(){
    var data = myCollection.find();
    console.log(data);
}

var fdb = new ForerunnerDB();
// 創造資料庫
var db = fdb.db("billing");
// 創造資料表
var myCollection = db.collection('spending');
myCollection.load(show);


$("#btn_submit").on("click",function(){
    var newSpend = {
        date:  $(".form_date").val()  ,
        kind:  $(".form_kind").val()  ,
        price: $(".form_price").val() ,
        remark:$(".form_remark").val()
    }
    swal(
        "新增成功",
        "已經多新增一筆消費資訊",
        "success"
    );
    console.log(newSpend);
    myCollection.insert(newSpend);
    myCollection.save();
    $(".form_date").val(""); 
    $(".form_kind").val("");  
    $(".form_price").val(""); 
    $(".form_remark").val("");
})