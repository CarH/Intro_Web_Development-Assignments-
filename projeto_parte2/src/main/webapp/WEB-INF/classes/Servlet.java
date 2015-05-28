

import java.io.IOException;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class Servlet
 */
public class Servlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final String CLASS_NAME = Servlet.class.getCanonicalName();
	/**
	 * @see Servlet#init(ServletConfig)
	 */
	public void init(ServletConfig config) throws ServletException {
		// TODO Auto-generated method stub
    	System.out.println(" (!) A Servlet intance was created.");
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.process(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		this.process(request, response);
	}
	
	public void process(HttpServletRequest request, HttpServletResponse response){
		try{
			/* se nao existe lista de clientes na sessao, entao criar uma */				
			HttpSession session = request.getSession();
			if(session.getAttribute("clientList")==null) session.setAttribute("clientList",new ArrayList());

			/* recuperando acao */			
			String acao = request.getParameter("acao");
			String url;
			if(acao.equals("cadastrar")){
				System.out.println(CLASS_NAME+" Cadastrar ");
				

			} else if (acao.equals("ver_cliente")){
			
			} else {
				/* nenhuma acao foi definida */				
				/* selecionando pagina para o dispatcher */				
				url="erro.jsp";
			}

			RequestDispatcher dispatcher = request.getRequestDispatcher("../"+url);
			dispatcher.forward(request, response);

		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
}
