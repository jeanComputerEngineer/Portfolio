import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class Login extends JFrame {
    protected static final JTextField True = null;
    private JTextField loginCPF;
    private JPasswordField loginSenha;
    private JTextField campoData;
    private JTextField campoHorario;
    private JTextField campoDescricao;

    public Login() {
        setTitle("Login");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(300, 200);
        setLocationRelativeTo(null); // Centraliza a janela na tela

        JLabel labelUsuario = new JLabel("CPF:");
        JLabel labelSenha = new JLabel("Senha:");
        loginCPF = new JTextField(20);
        loginSenha = new JPasswordField(20);
        JButton botaoLogin = new JButton("Login");

        setLayout(new GridLayout(3, 2));

        add(labelUsuario);
        add(loginCPF);
        add(labelSenha);
        add(loginSenha);
        add(new JLabel()); // Espaço vazio para alinhar o botão à direita
        add(botaoLogin);

        botaoLogin.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                setVisible(false);
                String usuario = loginCPF.getText();
                String senha = new String(loginSenha.getPassword());

                if (usuario.equals("123") && senha.equals("123")) {

                    JPanel painel = new JPanel();
                    JFrame janelaLogin = new JFrame("Serviços ao Usuário");

                    janelaLogin.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
                    janelaLogin.setSize(400, 200);
                    janelaLogin.setLocationRelativeTo(null);

                    // Criação dos botões tela login
                    JButton botaoGerenciarConta = new JButton("Minha Conta");
                    JButton botaoMarcarConsulta = new JButton("Marcar Consulta");
                    JButton botaoGerenciarConsulta = new JButton("Editar / Remarcar Consulta");

                    painel.add(botaoGerenciarConta);
                    painel.add(botaoMarcarConsulta);
                    painel.add(botaoGerenciarConsulta);

                    // Adição do painel à janela
                    janelaLogin.getContentPane().add(painel);

                    // Exibição da janela
                    janelaLogin.setVisible(true);

                    botaoGerenciarConta.addActionListener(new ActionListener() {
                        public void actionPerformed(ActionEvent e) {

                            janelaLogin.setVisible(false);
                            CtrCliente telaMinhaConta = new CtrCliente();
                            telaMinhaConta.setVisible(false);

                        }

                    });
                    botaoMarcarConsulta.addActionListener(new ActionListener() {
                        public void actionPerformed(ActionEvent e) {

                            janelaLogin.setVisible(false);

                            JPanel painelConsulta = new JPanel();
                            JFrame janelaConsulta = new JFrame("Agende Sua Consulta");

                            setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                            janelaConsulta.setSize(600, 250);
                            janelaConsulta.setLocationRelativeTo(null);

                            JLabel labelData = new JLabel("Data:");
                            JLabel labelHorario = new JLabel("Horario:");
                            JLabel labelDescricao = new JLabel("Descrição dos fatos:");
                            JButton botaoMarcar = new JButton("Marcar Consulta");

                            campoData = new JTextField(55);
                            campoHorario = new JTextField(55);
                            campoDescricao = new JTextField(55);

                            setLayout(new GridLayout(4, 2));

                            painelConsulta.add(labelData);
                            painelConsulta.add(campoData);
                            painelConsulta.add(labelHorario);
                            painelConsulta.add(campoHorario);
                            painelConsulta.add(labelDescricao);
                            painelConsulta.add(campoDescricao);
                            painelConsulta.add(new JLabel()); // Espaço vazio para alinhar o botão à direita
                            painelConsulta.add(botaoMarcar);

                            janelaConsulta.getContentPane().add(painelConsulta);
                            janelaConsulta.setVisible(true);

                        }
                    });
                    botaoGerenciarConsulta.addActionListener(new ActionListener() {
                        public void actionPerformed(ActionEvent e) {

                            janelaLogin.setVisible(false);

                            JPanel painelGerConsulta = new JPanel();
                            JFrame janelaGerConsulta = new JFrame("Sua Consulta");

                            setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                            janelaGerConsulta.setSize(300, 200);
                            janelaGerConsulta.setLocationRelativeTo(null);

                            JButton botaoExcluir = new JButton("Excluir Consulta");
                            JButton botaoAlterar = new JButton("Remarcar Consulta");
                            JButton botaoVisualizar = new JButton("Visualizar Consulta");

                            painelGerConsulta.add(botaoExcluir);
                            painelGerConsulta.add(botaoAlterar);
                            painelGerConsulta.add(botaoVisualizar);

                            janelaGerConsulta.getContentPane().add(painelGerConsulta);
                            janelaGerConsulta.setVisible(true);

                        }
                    });
                    // Adição dos botões aos painel na condicional

                } else if (usuario.equals("advogado") && senha.equals("advogado")) {
                    JPanel painel = new JPanel();
                    JFrame janelaLogin = new JFrame("Serviços ao Advogado");

                    janelaLogin.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
                    janelaLogin.setSize(400, 200);
                    janelaLogin.setLocationRelativeTo(null);

                    JButton botaoGerenciarContaAdvogado = new JButton("Minha Conta");
                    JButton botaoGerenciarConsultas = new JButton("Minhas Consultas");
                    JButton botaoGerenciarProcessos = new JButton("Meus Processos");

                    painel.add(botaoGerenciarContaAdvogado);
                    painel.add(botaoGerenciarConsultas);
                    painel.add(botaoGerenciarProcessos);

                    // Adição do painel à janela
                    janelaLogin.getContentPane().add(painel);

                    // Exibição da janela
                    janelaLogin.setVisible(true);

                    botaoGerenciarContaAdvogado.addActionListener(new ActionListener() {
                        public void actionPerformed(ActionEvent e) {

                            janelaLogin.setVisible(false);
                            CtrAdvogado telaMinhaConta = new CtrAdvogado();
                            telaMinhaConta.setVisible(false);

                        }
                    });

                    //
                    botaoGerenciarConsultas.addActionListener(new ActionListener() {

                        public void actionPerformed(ActionEvent e) {

                            janelaLogin.setVisible(false);

                            CtrConsulta janelaConsulta = new CtrConsulta();
                            janelaConsulta.setVisible(true);

                        }
                    });

                    botaoGerenciarProcessos.addActionListener(new ActionListener() {
                        public void actionPerformed(ActionEvent e) {
                            janelaLogin.setVisible(false);
                            CtrProcessos janelaProcessos = new CtrProcessos();
                            janelaProcessos.setVisible(true);
                        }
                    });

                } else

                {
                    JOptionPane.showMessageDialog(null, "CPF ou Senha Inválidos!");
                }
            }
        });
    }
}