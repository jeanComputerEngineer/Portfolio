import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;


public class CtrConsulta extends Consulta  {

	private JTextField campoData;
	private JTextField campoHorario;

	public CtrConsulta() {
		
		JPanel painel = new JPanel();
		JFrame janelaConta = new JFrame("Consultas");

		janelaConta.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		janelaConta.setSize(300, 200);
		janelaConta.setLocationRelativeTo(null); // Centraliza a janela na tela

		JButton botaoAlterarDados = new JButton("Alterar Consulta");
		JButton botaoDeletar = new JButton("Deletar Consulta");
		JButton botaoVer = new JButton("Ver Consulta");

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
				JFrame janelaAlterar = new JFrame("Atualização do Consulta");

				janelaAlterar.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
				janelaAlterar.setSize(300, 200);
				janelaAlterar.setLocationRelativeTo(null); // Centraliza a janela na tela

				JButton botaoAlterarHorario = new JButton("Alterar Horário do Consulta");
				JButton botaoAlterarData = new JButton("Alterar Data do Consulta");

				painel.add(botaoAlterarHorario);
				painel.add(botaoAlterarData);
	

				janelaAlterar.getContentPane().add(painel);
				janelaAlterar.setVisible(true);

				botaoAlterarHorario.addActionListener(new ActionListener() {
					public void actionPerformed(ActionEvent e) {
						JPanel painel = new JPanel();
						JFrame janelaAlterar = new JFrame("Atualização do Horário da Consulta");

						janelaAlterar.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
						janelaAlterar.setSize(300, 200);
						janelaAlterar.setLocationRelativeTo(null); // Centraliza a janela na tela

						campoHorario = new JTextField(20);

						JLabel labelNovoHorario = new JLabel("Digite o novo Horario:");
						painel.add(new JLabel()); // Espaço vazio para alinhar o botão à direita
						

						painel.setLayout(new GridLayout(2, 2));

						JButton botaoAtualizarHorario = new JButton("Atualizar");

						painel.add(labelNovoHorario);
						painel.add(campoHorario);
						painel.add(botaoAtualizarHorario);

						String horario = campoHorario.getText();
						cadHorarioConsulta(horario);

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

						JLabel labelNovaConsulta = new JLabel("Digite a Nova Data");
						painel.add(new JLabel()); // Espaço vazio para alinhar o botão à direita
						

						painel.setLayout(new GridLayout(2, 2));

						JButton botaoAtualizarConsulta = new JButton("Atualizar");

						painel.add(labelNovaConsulta);
						painel.add(campoData);
						painel.add(botaoAtualizarConsulta);

						String data = campoData.getText();
						cadDataConsulta(data);

						janelaAlterar.getContentPane().add(painel);
						janelaAlterar.setVisible(true);
					}
				});
			}});
			botaoDeletar.addActionListener(new ActionListener() {
				public void actionPerformed(ActionEvent e) {
					JOptionPane.showMessageDialog(null, "Consulta Deletada");
					

				}});
			botaoVer.addActionListener(new ActionListener() {
				public void actionPerformed(ActionEvent e) {
					JOptionPane.showMessageDialog(null, "\n" + getDataConsulta()+ "\n" + getHorarioConsulta());
					

				}});
	}}
