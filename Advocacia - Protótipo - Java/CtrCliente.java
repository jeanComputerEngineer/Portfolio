import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class CtrCliente extends Cliente{
	protected static final JTextField True = null;
	

	private JTextField campoNome;
	private JTextField campoCpf;
	private JTextField campoSenha;
	private JTextField campoTelefone;
	private JTextField campoEmail;
	

	public CtrCliente() {
		

			JPanel painel = new JPanel();
			JFrame janelaConta = new JFrame("Serviços ao Usuário");

			janelaConta.setTitle("Minha Conta");
			janelaConta.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
			janelaConta.setSize(300, 200);
			janelaConta.setLocationRelativeTo(null); // Centraliza a janela na tela

			JButton botaoAlterarDados = new JButton("Alterar Dados");
			JButton botaoDeletar = new JButton("Deletar Conta");
			JButton botaoVer = new JButton("Ver Dados da Conta");

			painel.add(botaoAlterarDados);
			painel.add(botaoDeletar);
			painel.add(botaoVer);

			// Adição do painel à janela
			janelaConta.getContentPane().add(painel);

			// Exibição da janela
			janelaConta.setVisible(true);
			

			botaoAlterarDados.addActionListener(new ActionListener() {
				public void actionPerformed(ActionEvent e) {

					JPanel painel = new JPanel();
					JFrame janelaAlterar = new JFrame("Atualização do Nome do Usuário");

					janelaAlterar.setTitle("Minha Conta");
					janelaAlterar.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
					janelaAlterar.setSize(300, 200);
					janelaAlterar.setLocationRelativeTo(null); // Centraliza a janela na tela

					JButton botaoAlterarNome = new JButton("Alterar Nome");
					JButton botaoAlterarCpf = new JButton("Alterar CPF");
					JButton botaoAlterarSenha = new JButton("alterar Senha");
					JButton botaoAlterarTelefone = new JButton("Alterar Telefone");
					JButton botaoAlterarEmail = new JButton("Alterar Email");

					painel.add(botaoAlterarNome);
					painel.add(botaoAlterarCpf);
					painel.add(botaoAlterarSenha);
					painel.add(botaoAlterarTelefone);
					painel.add(botaoAlterarEmail);

					janelaAlterar.getContentPane().add(painel);
					janelaAlterar.setVisible(true);

					botaoAlterarNome.addActionListener(new ActionListener() {
						public void actionPerformed(ActionEvent e) {
							JPanel painel = new JPanel();
							JFrame janelaAlterar = new JFrame("Atualização do Nome do Usuário");

							janelaAlterar.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
							janelaAlterar.setSize(300, 200);
							janelaAlterar.setLocationRelativeTo(null); // Centraliza a janela na tela

							campoNome = new JTextField(20);

							JLabel labelNovoNome = new JLabel("Digite o novo Nome:");
							painel.add(new JLabel()); // Espaço vazio para alinhar o botão à direita
							

							painel.setLayout(new GridLayout(2, 2));

							JButton botaoAtualizarNome = new JButton("Atualizar");

							painel.add(labelNovoNome);
							painel.add(campoNome);
							painel.add(botaoAtualizarNome);

							String nome = campoNome.getText();
							cadUsuarioNome(nome);


							janelaAlterar.getContentPane().add(painel);
							janelaAlterar.setVisible(true);

							
						}

					});

					botaoAlterarCpf.addActionListener(new ActionListener() {
						public void actionPerformed(ActionEvent e) {
							JPanel painel = new JPanel();
							JFrame janelaAlterar = new JFrame("Atualização do CPF do Usuário");

							janelaAlterar.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
							janelaAlterar.setSize(300, 200);
							janelaAlterar.setLocationRelativeTo(null); // Centraliza a janela na tela

							campoCpf = new JTextField(20);

							JLabel labelNovoCpf = new JLabel("Digite o novo CPF");
							painel.add(new JLabel()); // Espaço vazio para alinhar o botão à direita
							

							painel.setLayout(new GridLayout(2, 2));

							JButton botaoAtualizarCpf = new JButton("Atualizar");

							painel.add(labelNovoCpf);
							painel.add(campoCpf);
							painel.add(botaoAtualizarCpf);

							String cpf = campoCpf.getText();
							cadUsuarioCpf(cpf);

							janelaAlterar.getContentPane().add(painel);
							janelaAlterar.setVisible(true);
						}
					});

					botaoAlterarSenha.addActionListener(new ActionListener() {
						public void actionPerformed(ActionEvent e) {
							JPanel painel = new JPanel();
							JFrame janelaAlterar = new JFrame("Atualização da Senha do Usuário");

							janelaAlterar.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
							janelaAlterar.setSize(300, 200);
							janelaAlterar.setLocationRelativeTo(null); // Centraliza a janela na tela

							campoSenha = new JTextField(20);

							JLabel labelNovaSenha= new JLabel("Digite a Nova Senha:");
							painel.add(new JLabel()); // Espaço vazio para alinhar o botão à direita
							

							painel.setLayout(new GridLayout(2, 2));

							JButton botaoAtualizarSenha = new JButton("Atualizar");

							painel.add(labelNovaSenha);
							painel.add(campoNome);
							painel.add(botaoAtualizarSenha);

							String senha = campoSenha.getText();
							cadUsuarioNome(senha);

							janelaAlterar.getContentPane().add(painel);
							janelaAlterar.setVisible(true);

						}
					});

					botaoAlterarTelefone.addActionListener(new ActionListener() {
						public void actionPerformed(ActionEvent e) {
							JPanel painel = new JPanel();
							JFrame janelaAlterar = new JFrame("Atualização do Telefone do Usuário");

							janelaAlterar.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
							janelaAlterar.setSize(300, 200);
							janelaAlterar.setLocationRelativeTo(null); // Centraliza a janela na tela

							campoTelefone = new JTextField(20);

							JLabel labelNovoTelefone= new JLabel("Digite o Novo Telefone:");
							painel.add(new JLabel()); // Espaço vazio para alinhar o botão à direita
							

							painel.setLayout(new GridLayout(2, 2));

							JButton botaoAtualizarTelefone = new JButton("Atualizar");

							painel.add(labelNovoTelefone);
							painel.add(campoNome);
							painel.add(botaoAtualizarTelefone);

							String senha = campoTelefone.getText();
							cadUsuarioNome(senha);

							janelaAlterar.getContentPane().add(painel);
							janelaAlterar.setVisible(true);


						}
					});

					botaoAlterarEmail.addActionListener(new ActionListener() {
						public void actionPerformed(ActionEvent e) {
							JPanel painel = new JPanel();
							JFrame janelaAlterar = new JFrame("Atualização do Email do Usuário");

							janelaAlterar.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
							janelaAlterar.setSize(300, 200);
							janelaAlterar.setLocationRelativeTo(null); // Centraliza a janela na tela

							campoEmail = new JTextField(20);

							JLabel labelNovoEmail= new JLabel("Digite o Novo Email:");
							painel.add(new JLabel()); // Espaço vazio para alinhar o botão à direita
							

							painel.setLayout(new GridLayout(2, 2));

							JButton botaoAtualzarEmail = new JButton("Atualizar");

							painel.add(labelNovoEmail);
							painel.add(campoEmail);
							painel.add(botaoAtualzarEmail);

							String senha = campoEmail.getText();
							cadUsuarioNome(senha);

							janelaAlterar.getContentPane().add(painel);
							janelaAlterar.setVisible(true);

						}
					});
				}
			});
				botaoDeletar.addActionListener(new ActionListener() {
						public void actionPerformed(ActionEvent e) {
							JOptionPane.showMessageDialog(null, "Conta Deletada");
							

						}});
				botaoVer.addActionListener(new ActionListener() {
						public void actionPerformed(ActionEvent e) {
							JOptionPane.showMessageDialog(null, "\n" + getUsuarioNome()+ "\n" + getUsuarioCpf()+ "\n" + getUsuarioSenha()+"\n" + getUsuarioTelefone()+"\n" + getUsuarioEmail());
							

						}});
	}
}



