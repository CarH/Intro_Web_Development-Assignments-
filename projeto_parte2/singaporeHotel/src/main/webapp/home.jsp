<%@page import="util.Contract"%>
<%@page import="servlets.Usuario"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<%@ page import="java.util.*" %>

<html lang="pt-BR">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>.: Singapore Hotel</title>
    <link rel="stylesheet" href="/singaporeHotel/css/main.css" />
    <link rel="stylesheet" href="/singaporeHotel/css/home.css" />
    <script src="/singaporeHotel/js/jquery-2.1.3.js"></script>
    <script src="/singaporeHotel/js/general_events_handler.js"></script>  
    <script src="/singaporeHotel/js/validation.js"></script>
    <script src="/singaporeHotel/js/layout_adjusts.js"></script>  
    <script src="/singaporeHotel/js/user_class.js"></script>
    <!-- <script src="/singaporeHotel/js/login_controller.js"></script> TODO: remanejar-->
    <script>
      /* Utilizei script interno pois cada página terá um background diferente. Se fosse inserir tudo num CSS externo o mesmo ficaria excessivamente grande, além de prejudicar a manutenibilidade. */

      $(document).ready( function(){
        document.getElementById("home_body").style.backgroundImage = "url(/singaporeHotel/img/hotel.jpg)";
      });

    </script>

  </head>

  <body id="home_body">
    
    <!-- Recuperando o bean cliente -->  
    
    <nav class="nav_container barfont">
      
      <div class="login_container barfont">
      
          <%
            Usuario usuario = (Usuario) request.getAttribute(Contract.USUARIO);
            if (usuario == null){
              %> 
              <button id="loginbtn" class="btnpattern"> Entrar </button>
              <button id="registerbtn" class="btnpattern"> Cadastre-se </button>
              <%
            } else {
              %> 
              <div>
                <%=usuario.getNome()%>
                <button id="logoutbtn" class="btnpattern "> Sair </button>
              </div>
              <%
            }
         %>
      
      </div>
    </nav>
    
  </body>
</html>