 let inp = $('#nameInput');
 let mySelect = $('#mySelect');
 let body =  $('body');



 mySelect.on('click', function (e) {

     this.style.display = 'inline-block';
     this.size = e.originalEvent.sizeView;
 })


 body.on('click', function (e) {
     if(e.target.tagName == 'OPTION'){
         inp[0].value = e.target.value;
     }
     mySelect[0].style.display = 'none';

 })



function createOption(dataStr){
    let dataArr = JSON.parse(dataStr);

    if(dataArr.length == 0){
        return
    }

    let options = mySelect.find("option");
    if(options.length > 0){
        mySelect.empty();
    }

    dataArr.forEach(function (item) {
            let option = $('<option value="'+item+'">');
        option[0].innerText = item;
        mySelect.append(option);
    });

    var evn = new Event("click");
    evn.sizeView = dataArr.length >= 10 ? 10 : dataArr.length;
    mySelect[0].dispatchEvent(evn);

}



inp.on('input ',function () {
    let myData = this.value;
    $.ajax({
        url: 'getHelp.php',
        type:'POST',
        data:{
            inpValue:myData
        },
        success: function(data){
            mySelect[0].style.display = 'none';
             createOption(data);
            //console.log(data);
        }
    });

});

