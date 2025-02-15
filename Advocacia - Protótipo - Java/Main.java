import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class Main {
    public static void main(String[] args) {

        JFrame frame = new JFrame("Tela Inicial");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(1000, 500);
        frame.setLayout(null); // Desabilita o gerenciador de layout padrão
        frame.setLocationRelativeTo(null); // Centraliza a janela na tela

        JLabel labelTitulo = new JLabel("Bem-vindo à Advocacia");
        labelTitulo.setFont(new Font("Arial", Font.BOLD, 24));
        labelTitulo.setBounds(360, -100, 800, 300);

        JLabel labelDescricao = new JLabel("A Advocacia Que Facilita a Sua Vida!");
        labelDescricao.setFont(new Font("Arial", Font.PLAIN, 16));
        labelDescricao.setBounds(360, 100, 800, 300);

        JButton botaoLogin = new JButton("Login");
        botaoLogin.setBounds(360, 400, 100, 30); // Define as coordenadas e tamanho do botão 1

        JButton botaoCadastro = new JButton("Cadastro");
        botaoCadastro.setBounds(520, 400, 100, 30); // Define as coordenadas e tamanho do botão 2

        frame.add(botaoLogin);
        frame.add(botaoCadastro);
        frame.add(labelDescricao);
        frame.add(labelTitulo);
        frame.setVisible(true);
        frame.setResizable(false);

        // Redirecionamento caso clique em cadastro ou login

        botaoLogin.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                frame.setVisible(false);
                Login telaUsuario = new Login();

                telaUsuario.setVisible(true);

            }
        });

        botaoCadastro.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                frame.setVisible(false);
                // Como não há implementação web, precisa definir por aqui quem vai fazer o
                // login
                //CadAdvogado telaCliente = new CadAdvogado();
                CadUsuario telaCliente = new CadUsuario();
                telaCliente.setVisible(true);
                
            }
        });

    }
}
