import java.io.Serializable;
import java.util.Date;


public class Reserva implements Serializable {


	private static final long serialVersionUID = 1L;
	private Date dataEntrada;
	private Date dataSaida;
	private Integer qtdAdultos;
	private Integer qtdBebes;
	private Integer qtdCriancas;
	private Integer idUsuario;
	
	public Reserva(){
	
	}

	public Date getDataEntrada() {
		return dataEntrada;
	}

	public void setDataEntrada(Date dataEntrada) {
		this.dataEntrada = dataEntrada;
	}

	public Date getDataSaida() {
		return dataSaida;
	}

	public void setDataSaida(Date dataSaida) {
		this.dataSaida = dataSaida;
	}

	public Integer getQtdAdultos() {
		return qtdAdultos;
	}

	public void setQtdAdultos(Integer qtdAdultos) {
		this.qtdAdultos = qtdAdultos;
	}

	public Integer getQtdBebes() {
		return qtdBebes;
	}

	public void setQtdBebes(Integer qtdBebes) {
		this.qtdBebes = qtdBebes;
	}

	public Integer getQtdCriancas() {
		return qtdCriancas;
	}

	public void setQtdCriancas(Integer qtdCriancas) {
		this.qtdCriancas = qtdCriancas;
	}

	public Integer getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Integer idUsuario) {
		this.idUsuario = idUsuario;
	}
	
	
}
