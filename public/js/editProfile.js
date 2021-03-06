function checkPortfolio() {
    // Get the checkbox
    var checkBox = document.getElementById("slideOne");
    // Get the output text
    var btnDisplay = document.getElementById("btn-edit");
  
    // If the checkbox is checked, display the output text
    if (checkBox.checked == true){
        btnDisplay.style.display = "block";
    } else {
        btnDisplay.style.display = "none";
    }
}
showModalType = document.getElementById("btn-editType");
showModalConfirm = document.getElementById("btn-confirmModal");
showModalPortfolio = document.getElementById("btn-edit");
showModalDelete = document.getElementById("btn-delete");

modalEdit = document.getElementById("modalEditType");
modalEditConfirm = document.getElementById("modalEditTypeConfirm");
modalEditPortfolio = document.getElementById("modalEditPortfolio");
modalDeleteAccount = document.getElementById("modalDeleteAccount");

exitModalType = document.getElementById("btn-cancelModal");
exitModalConfirm = document.getElementById("btn-ok");
exitModalPortfolio = document.getElementById("btn-cancelPortfolio");
exitModalDelete = document.getElementById("btn-cancelDelete");

savePortfolio = document.getElementById("btn-confirmPortfolio");

showModalType.onclick = function(){
    modalEdit.style.display = "block";
}

showModalConfirm.onclick = function(){



    $.get(`/api/user/setIsProducer?id=${getCookie('userId')}`, function(data) {

        const err = data.err

        if (!err) {
            modalEditConfirm.style.display = "block";
            modalEdit.style.display = "none";
        }

    })
}

showModalPortfolio.onclick = function(){
    modalEditPortfolio.style.display = "block";
}

showModalDelete.onclick = function(){
    modalDeleteAccount.style.display = "block";
} 

exitModalConfirm.onclick = function(){
    modalEditConfirm.style.display = "none";
    document.getElementById("active").style.display = "block";
    document.getElementById("checkb").style.display = "block";
    document.getElementById("btn-editType").style.display = "none";
}

exitModalType.onclick = function(){
    modalEdit.style.display = "none";
}

exitModalPortfolio.onclick = function(){
    modalEditPortfolio.style.display = "none";
}

exitModalDelete.onclick = function(){
    modalDeleteAccount.style.display = "none";
}

savePortfolio.onclick = function(){
    modalEditPortfolio.style.display = "none";
    $("#textFeedback").text("Alterações salvas");
    $("#feedbackBar").animate({opacity: '1'});
    $("#feedbackBar").show();
    function esconder(){
        $("#feedbackBar").animate({opacity: '0'});
    }
    function darHide(){
        $("#feedbackBar").hide();
    }
    setTimeout(esconder, 3000);
    setTimeout(darHide, 3200);
}