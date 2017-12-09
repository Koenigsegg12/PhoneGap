function show(){
    $("#myTbody").html("");
    var data = myCollection.find();
    console.log(data);
    data.forEach(function(item,index){
        $("#myTbody").append(
            $("<tr>")
                .append($("<td>").text(index + 1))
                .append($("<td>").text(item.date))
                .append($("<td>").text(item.kind))
                .append($("<td>").text(item.price))
                .append($("<td>").text(item.remark))
        )
    })
}

var fdb = new ForerunnerDB();
// 創造資料庫
var db = fdb.db("billing");
// 創造資料表
var myCollection = db.collection('spending');
myCollection.load(show);


function randomNext(min,max){
    return Math.floor(Math.random() * (max-min+1))+min;
}
function formatDate( d ){
    var year = d.getUTCFullYear();
    var month = d.getUTCMonth()+1;
    var date = d.getUTCDate();
    var year = (year < 10)? "0"+year : ""+year
    var month = (month < 10)? "0"+month : ""+month
    var date = (date < 10)? "0"+date : ""+date
    return year + "-" + month + "-" + date;
}

$("#btn_randomAdd10Data").on("click",function(){
    for(var i=0 ; i<10 ; i++){
        var now = new Date();
        var randomDate = new Date( now - randomNext(0,10)*24*60*60*1000);
        var sDate = formatDate(randomDate);
        var kinds = ["食物","交通","日常用品"];
        var newSpend = {
            date:  sDate  ,
            kind:  kinds[randomNext(0,2)],
            price: randomNext(5,15)*10,
            remark:""
        }
        myCollection.insert(newSpend);
    }
    myCollection.save(show);
    swal(
        "新增成功",
        "已經多新增一筆消費資訊",
        "success"
    );
})

$("#btn_deleteAllData").on("click",function(){
    myCollection.remove();
    myCollection.save(show);
})