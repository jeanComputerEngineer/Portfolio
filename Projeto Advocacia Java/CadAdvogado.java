import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class CadAdvogado extends JFrame {

	// tela de cadastro //
	private JTextField campoNome;
	private JTextField campoCpf;
	private JTextField campoTelefone;
	private JTextField campoEmail;
	private JTextField campoSenha;
	private JTextField campoHistoria;
	private JButton botaoCadastrar;

	public CadAdvogado() {
		// Configurações básicas da janela
		setTitle("Tela de Cadastro do Advogado");
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setSize(300, 200);
		setLocationRelativeTo(null); // Centraliza a janela na tela

		// Criação dos componentes
		JLabel labelNome = new JLabel("Nome:");
		JLabel labelCpf = new JLabel("Cpf:");
		JLabel labelSenha = new JLabel("Senha:");
		JLabel labelTelefone = new JLabel("Telefone:");
		JLabel labelEmail = new JLabel("Email:");
		JLabel labelHistoria = new JLabel("Historico:");

		campoNome = new JTextField(20);
		campoCpf = new JTextField(20);
		campoSenha = new JTextField(20);
		campoTelefone = new JTextField(20);
		campoEmail = new JTextField(20);
		campoHistoria = new JTextField(20);
		botaoCadastrar = new JButton("Cadastrar");

		// Configuração do layout
		setLayout(new GridLayout(7, 2));

		// Adiciona os componentes à janela
		add(labelNome);
		add(campoNome);
		add(labelCpf);
		add(campoCpf);
		add(labelSenha);
		add(campoSenha);
		add(labelTelefone);
		add(campoTelefone);
		add(labelEmail);
		add(campoEmail);
		add(labelHistoria);
		add(campoHistoria);

		add(new JLabel()); // Espaço vazio para alinhar o botão à direita
		add(botaoCadastrar);

		// Configuração do evento de clique do botão Cadastrar
		botaoCadastrar.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				String nome = campoNome.getText();
				String cpf = campoCpf.getText();
				String senha = campoSenha.getText();
				String telefone = campoTelefone.getText();
				String email = campoEmail.getText();
				String historia = campoHistoria.getText();

				Advogado advogadoTemp = new Advogado();
				advogadoTemp.cadAdvogadoNome(nome);
				advogadoTemp.cadAdvogadoCpf(cpf);
				advogadoTemp.cadAdvogadoSenha(senha);
				advogadoTemp.cadAdvogadoTelefone(telefone);
				advogadoTemp.cadAdvogadoEmail(email);
				advogadoTemp.cadAdvogadoHistoria(historia);

				// Aqui você pode adicionar a lógica para processar os dados do cadastro

				JOptionPane.showMessageDialog(null, "Cadastro realizado com sucesso!");
				limparCampos();

				

			}
		});
	}

	private void limparCampos() {
		campoNome.setText("");
		campoCpf.setText("");
		campoSenha.setText("");
		campoTelefone.setText("");
		campoEmail.setText("");
		campoHistoria.setText("");

	}
}


