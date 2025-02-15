import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.sql.SQLException;


public class CadUsuario extends JFrame {

	// tela de cadastro //

	private JTextField campoNome;
	private JTextField campoCpf;
	private JTextField campoTelefone;
	private JTextField campoEmail;
	private JTextField campoSenha;
	private JButton botaoCadastrar;

	public CadUsuario() {
		// Configurações básicas da janela

		JPanel painel = new JPanel();
		JFrame janelaCad = new JFrame("Cadastro do Cliente");

		janelaCad.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		janelaCad.setSize(300, 310);
		janelaCad.setLocationRelativeTo(null); // Centraliza a janela na tela

		// Criação dos componentes
		JLabel labelNome = new JLabel("Nome:");
		JLabel labelCpf = new JLabel("Cpf:");
		JLabel labelSenha = new JLabel("Senha:");
		JLabel labelTelefone = new JLabel("Telefone:");
		JLabel labelEmail = new JLabel("Email:");

		campoNome = new JTextField(25);
		campoCpf = new JTextField(25);
		campoSenha = new JTextField(25);
		campoTelefone = new JTextField(25);
		campoEmail = new JTextField(25);
		botaoCadastrar = new JButton("Cadastrar");

		// Configuração do layout
		setLayout(new GridLayout(6, 2));

		// Adiciona os componentes à janela
		painel.add(labelNome);
		painel.add(campoNome);
		painel.add(labelCpf);
		painel.add(campoCpf);
		painel.add(labelSenha);
		painel.add(campoSenha);
		painel.add(labelTelefone);
		painel.add(campoTelefone);
		painel.add(labelEmail);
		painel.add(campoEmail);

		painel.add(new JLabel()); // Espaço vazio para alinhar o botão à direita
		painel.add(botaoCadastrar);

		janelaCad.getContentPane().add(painel);

		// Exibição da janela
		janelaCad.setVisible(true);
		// Configuração do evento de clique do botão Cadastrar
		botaoCadastrar.addActionListener(new ActionListener() {
public void actionPerformed(ActionEvent e) {
    String nome = campoNome.getText();
    String cpf = campoCpf.getText();
    String senha = campoSenha.getText();
    String telefone = campoTelefone.getText();
    String email = campoEmail.getText();

    Cliente clienteTemp = new Cliente();
    clienteTemp.cadUsuarioNome(nome);
    clienteTemp.cadUsuarioCpf(cpf);
    clienteTemp.cadUsuarioSenha(senha);
    clienteTemp.cadUsuarioTelefone(telefone);
    clienteTemp.cadUsuarioEmail(email);

    DAOCliente daoCliente = new DAOCliente();

    try {
        daoCliente.salvarDadosCadastro(clienteTemp);
    } catch (ClassNotFoundException | SQLException e1) {
        e1.printStackTrace();
    }

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

	}
}
