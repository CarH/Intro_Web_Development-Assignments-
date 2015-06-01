package servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import util.Contract;

/**
 * Servlet implementation class ServletHotel
 */
public class ServletHotel extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final boolean DEBUG = true;
	
	
	/*Contexto da aplicacao*/
	private ServletContext context;  
	
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ServletHotel() {
        super();
    }
    
    @Override
    public void init() throws ServletException {
       	super.init();
       	this.context = getServletConfig().getServletContext();
		this.context.setAttribute(Contract.USUARIOS_CADASTRADOS, new ArrayList<Usuario>());
    }
    
    
    /******************************************************************
     * Metodos relacionados com a lógica de CONTROLE da aplicacao
     * 
     */
    
    /**
     * TODO: usuario ja cadastrado(so na fase 3, obviamente c/ BD)
     * @param request
     * @return
     */
    private boolean cadastrarUsuario(HttpServletRequest request){
		/* Recuperando o contexto da aplicacao */
		ServletContext context = getServletConfig().getServletContext();
		ArrayList<Usuario> uCadastrados = (ArrayList<Usuario>) context.getAttribute(Contract.USUARIOS_CADASTRADOS);
		
		Usuario usuario = new Usuario();
		usuario.setNome(request.getParameter("nome"));
		usuario.setCpf(request.getParameter("cpf"));
		usuario.setDataNasc(request.getParameter("datanasc"));
		usuario.setSexo(request.getParameter("sexo"));
		usuario.setEstadoCivil(request.getParameter("estadocivil"));
		usuario.setCidade(request.getParameter("cidade"));
		usuario.setEstado(request.getParameter("estado"));
		usuario.setCep(request.getParameter("cep"));
		usuario.setEmail(request.getParameter("email"));
		usuario.setSenha(request.getParameter("senha"));
		
		uCadastrados.add(usuario);
		
		/* Atualiza no contexto da aplicacao */
		context.setAttribute(Contract.USUARIOS_CADASTRADOS, uCadastrados);
		
		if (ServletHotel.DEBUG) { 
			for (Usuario u : uCadastrados) {
				System.out.println("Usuario "+u.getNome());
			}
			
			System.out.println("usuario "+uCadastrados.get(uCadastrados.size()-1).getNome()+ " inserido com sucesso!");
		}
		return true;
    }
    
    private Usuario isCadastrado(String email) {
    	ArrayList<Usuario> lista = (ArrayList<Usuario>)this.context.getAttribute(Contract.USUARIOS_CADASTRADOS);
    	for (Usuario usuario : lista) {
			if ( usuario.getEmail().equals(email) ) return usuario;
		}
    	return null;
    }
    
    private boolean autenticar(HttpServletRequest request) {
    	String email = request.getParameter("email");
    	String senha = request.getParameter("password");
    	
    	// Verificar se o email do usuario esta cadastrado
    	Usuario usuario = this.isCadastrado(email);
    	if (usuario != null) {
    		// Se sim, testa a senha
    		if (senha.equals(usuario.getSenha())){
    			// Insere usuario em session p/ ser acessado na .jsp correspondente
    			request.setAttribute(Contract.USUARIO, usuario);
    			return true;
    		}
    	}
    	return false;
    }
    

    public void doGet (HttpServletRequest request, HttpServletResponse response){
		processar(request, response);
	}

	public void doPost (HttpServletRequest request, HttpServletResponse response){
		processar(request, response);
	}
	
	public void processar(HttpServletRequest request, HttpServletResponse response){

		try{

			/* recuperando acao */			
			String acao = request.getParameter("acao");
			String url = null;
			
			
			if(acao.equals("cadastrar")){
				if (ServletHotel.DEBUG){ System.out.println("acao = cadastrar"); } 
				if (this.cadastrarUsuario(request)){
					url = "home.jsp";					
				}
				
			} else if (acao.equals("login")){
				if (ServletHotel.DEBUG){ System.out.println("acao = login"); } 
				 url = (this.autenticar(request)) ? "home.jsp" : "erro_login.jsp";					
				
			} else {
				/* nenhuma acao foi definida */			
				url="erro.jsp";
			}

			RequestDispatcher dispatcher = request.getRequestDispatcher("../"+url);
			dispatcher.forward(request, response);

		}catch(Exception e){
			e.printStackTrace();
		}

	}

	
	
}
