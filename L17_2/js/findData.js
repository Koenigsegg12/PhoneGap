function show(){
    $("#myTbody").text("");

    var fromDate = $("#from").val();
    var toDate = $("#to").val();

    var data = myCollection.find({
        date:{
            $gte:fromDate,
            $lte:toDate
        }
    },{
        $orderBy:{date:-1},
    });
    console.log(data);
    for(var i=0; i<data.length ; i++){
        $("#myTbody").append(
            $("<tr>")
                .append($("<td>").text(i + 1))
                .append($("<td>").text(data[i].date))
                .append($("<td>").text(data[i].kind))
                .append($("<td>").text(data[i].price))
                .append($("<td>").text(data[i].remark))
        )
    }
}

var fdb = new ForerunnerDB();
// 創造資料庫
var db = fdb.db("billing");
// 創造資料表
var myCollection = db.collection('spending');
myCollection.load();

$("#btn_search_date").on("click",show);