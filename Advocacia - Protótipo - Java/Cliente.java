import javax.swing.JFrame;

public class Cliente extends JFrame {
	private String nomeCliente;
	private String cpfCliente;
	private String senhaCliente;
	private String telefoneCliente;
	private String emailCliente;


	
	
	public void cadUsuarioNome(String nomeCliente) {
		this.nomeCliente = nomeCliente;
	}
	public String getUsuarioNome(){
		return nomeCliente;
	}

	public void cadUsuarioCpf(String cpfCliente) {
		this.cpfCliente  = cpfCliente;

	}
	public String getUsuarioCpf(){
		return cpfCliente;
	}

	public void cadUsuarioSenha(String senhaCliente) {
		this.senhaCliente = senhaCliente;

	}
	public String getUsuarioSenha(){
		return senhaCliente;
	}

	public void cadUsuarioTelefone(String telefoneCliente) {
		this.telefoneCliente = telefoneCliente;

	}
	public String getUsuarioTelefone(){
		return telefoneCliente;
	}

	public void cadUsuarioEmail(String emailCliente) {
		this.emailCliente =  emailCliente;
	}
	public String getUsuarioEmail(){
		return emailCliente;
	}

}
