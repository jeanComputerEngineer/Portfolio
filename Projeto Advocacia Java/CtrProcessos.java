import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;


public class CtrProcessos extends Processo  {

	private JTextField campoNome;
	private JTextField campoNum;
	private JTextField campoData;

	public CtrProcessos() {
		
		JPanel painel = new JPanel();
		JFrame janelaConta = new JFrame("Processos");

		janelaConta.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		janelaConta.setSize(300, 200);
		janelaConta.setLocationRelativeTo(null); // Centraliza a janela na tela

		JButton botaoAlterarDados = new JButton("Alterar Processo");
		JButton botaoDeletar = new JButton("Deletar Processo");
		JButton botaoVer = new JButton("Ver Processo");

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
				JFrame janelaAlterar = new JFrame("Atualização do Processo");

				janelaAlterar.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
				janelaAlterar.setSize(300, 200);
				janelaAlterar.setLocationRelativeTo(null); // Centraliza a janela na tela

				JButton botaoAlterarNome = new JButton("Alterar Nome do Processo");
				JButton botaoAlterarNum = new JButton("Alterar Numero do Processo");
				JButton botaoAlterarData = new JButton("Alterar Data do Processo");

				painel.add(botaoAlterarNome);
				painel.add(botaoAlterarNum);
				painel.add(botaoAlterarData);
	

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
						cadNomeProcesso(nome);

						janelaAlterar.getContentPane().add(painel);
						janelaAlterar.setVisible(true);

						
					}

				});
				botaoAlterarNum.addActionListener(new ActionListener() {
					public void actionPerformed(ActionEvent e) {
						JPanel painel = new JPanel();
						JFrame janelaAlterar = new JFrame("Atualização do Número do Processo");

						janelaAlterar.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
						janelaAlterar.setSize(300, 200);
						janelaAlterar.setLocationRelativeTo(null); // Centraliza a janela na tela

						campoNum = new JTextField(20);

						JLabel labelNovoNome = new JLabel("Digite o novo Numero:");
						painel.add(new JLabel()); // Espaço vazio para alinhar o botão à direita
						

						painel.setLayout(new GridLayout(2, 2));

						JButton botaoAtualizarNome = new JButton("Atualizar");

						painel.add(labelNovoNome);
						painel.add(campoNum);
						painel.add(botaoAtualizarNome);

						String numProcesso = campoNum.getText();
						cadNumeroProcesso(numProcesso);

						janelaAlterar.getContentPane().add(painel);
						janelaAlterar.setVisible(true);

						
					}

				});

				botaoAlterarData.addActionListener(new ActionListener() {
					public void actionPerformed(ActionEvent e) {
						JPanel painel = new JPanel();
						JFrame janelaAlterar = new JFrame("Atualização da Data do Processo");

						janelaAlterar.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
						janelaAlterar.setSize(300, 200);
						janelaAlterar.setLocationRelativeTo(null); // Centraliza a janela na tela

						campoData = new JTextField(20);

						JLabel labelNovoCpf = new JLabel("Digite a Nova Data");
						painel.add(new JLabel()); // Espaço vazio para alinhar o botão à direita
						

						painel.setLayout(new GridLayout(2, 2));

						JButton botaoAtualizarCpf = new JButton("Atualizar");

						painel.add(labelNovoCpf);
						painel.add(campoData);
						painel.add(botaoAtualizarCpf);

						String cpf = campoData.getText();
						cadDataInicio(cpf);

						janelaAlterar.getContentPane().add(painel);
						janelaAlterar.setVisible(true);
					}
				});
			}});
			botaoDeletar.addActionListener(new ActionListener() {
				public void actionPerformed(ActionEvent e) {
					JOptionPane.showMessageDialog(null, "Conta Deletada");
					

				}});
			botaoVer.addActionListener(new ActionListener() {
				public void actionPerformed(ActionEvent e) {
					JOptionPane.showMessageDialog(null, "\n" + getNomeProcesso()+ "\n" + getNumeroProcesso()+ "\n" + getDataInicio());
					

				}});
	}}
