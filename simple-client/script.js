
$("#getuserbtn").on("click",function(){
    var login = $("#login").val();
    if(login == "") {
		alert("Login field is required for this request :) ");
    }else {
        $.ajax({
			url: "http://192.168.75.26:8080/users/"+login,
			type: "get",
			data: {login :login},
			beforesend: function(){
				alert("loading");
			},
			success: function(data, textStatus, request){
                html = ' <div class="form-group"><label for="Status" class="text-info">Connected:</label>' + data.connected + '</br>';
                htmlloc = '<div class="form-group"><lable class="text-info">Location:</lable> <a href="#">'+data.login+'</a>';
                document.getElementById("login-form").innerHTML =  document.getElementById("login-form").innerHTML+  html + htmlloc;
			},
			error:function(request, status, error){ 
                alert(error);
			}   
		});
    }
});

$("#loginbtn").on("click",function(){
    var login = $("#login").val();
    var password = $("#password").val();
	
	if(login == "" || password == "") {
		alert("Login and password fields are required for this request");
	}else{
		$.ajax({
			url: "http://192.168.75.26:8080/login",
			type: "post",
			data: {login: login, password: password},
			beforesend: function(){
				alert("loading");
			},
			success: function(data, textStatus, request){
                sessionStorage.setItem("token",request.getResponseHeader('Authentication'));
                localStorage.setItem("login",login);
                document.getElementById("token").value = request.getResponseHeader('Authentication');
			},
			error:function(request, status, error){ 
                alert(error);
			}   
		});
	}
	return false;
});

$("#logoutbtn").on("click",function(){
    var tokenn = $("#token").val();
	if(tokenn == "") {
		alert("Token field is required for this request");
	}else{
		$.ajax({
			url: "http://192.168.75.26:8080/logout",
			type: "delete",
			data: tokenn,
			beforesend: function(){
				alert("loading");
			},
			success: function(data, textStatus, request){
                sessionStorage.removeItem("token");
			},
			error:function(request, status, error){ 
                alert(error,status,request);
			}   
		});
	}
	return false;
});

$("#authbtn").on("click",function(){
    var origin = $("#Origin").val();
    var token = $("#token").val();
	if(token == "" || origin == "" ) {
		alert("Token and Origin fields are required for this request");
	}else{
		$.ajax({
			url: "http://192.168.75.26:8080/authenticate",
			type: "get",
			data: {token : token, origin : origin},
			beforesend: function(){
				alert("loading");
			},
			success: function(data, textStatus, request){
			},
			error:function(request, status, error){ 
                alert(error,status,request);
			}   
		});
	}
	return false;
});