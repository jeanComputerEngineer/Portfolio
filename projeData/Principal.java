package projeData;

import java.awt.BorderLayout; // Para definir o layout (organização) dos componentes na janela (JFrame)
import java.awt.Font; // Para configurar a fonte (tipo, tamanho) dos componentes gráficos
import java.math.BigDecimal; // Para operações com números de alta precisão (ex.: valores monetários)
import java.time.LocalDate; // Para trabalhar com datas (ano, mês, dia)
import java.time.Period; // Para calcular períodos/diferenças entre datas (ex.: idade)
import java.util.ArrayList; // Para utilizar listas dinâmicas (ArrayList)
import java.util.Comparator;
import java.util.HashMap; // Para utilizar mapas (HashMap) que relacionam chaves a valores
import java.util.List; // Interface List para trabalhar com listas
import java.util.Map; // Interface Map para trabalhar com mapas
import java.util.stream.Collectors;

import javax.swing.JFrame; // Para criar a janela principal da interface gráfica (JFrame)
import javax.swing.JScrollPane; // Para permitir a rolagem em componentes, como JTextArea, quando o conteúdo é grande
import javax.swing.JTextArea; // Para exibir áreas de texto (multilinhas) na interface
import javax.swing.SwingUtilities; // Para garantir que a criação e atualização da interface ocorra na thread correta (Event Dispatch Thread)

public class Principal {

    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                criarInterface();
            }
        });
    }

    private static void criarInterface() {

        JFrame janela = new JFrame("Gerenciamento de Funcionários");
        janela.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        janela.setSize(800, 600);

        JTextArea areaTexto = new JTextArea();
        areaTexto.setEditable(false);
        areaTexto.setFont(new Font("Monospaced", Font.PLAIN, 12));
        JScrollPane scroll = new JScrollPane(areaTexto);

        StringBuilder saida = new StringBuilder();

        // 3.1 – Insere os funcionários
        List<Funcionario> listaFuncionarios = new ArrayList<>();

        listaFuncionarios
                .add(new Funcionario("Maria", LocalDate.of(2000, 10, 18), new BigDecimal("2009.44"), "Operador"));
        listaFuncionarios
                .add(new Funcionario("João", LocalDate.of(1990, 5, 12), new BigDecimal("2284.38"), "Operador"));
        listaFuncionarios
                .add(new Funcionario("Caio", LocalDate.of(1961, 5, 2), new BigDecimal("9836.14"), "Coordenador"));
        listaFuncionarios
                .add(new Funcionario("Miguel", LocalDate.of(1988, 10, 14), new BigDecimal("19119.88"), "Diretor"));
        listaFuncionarios
                .add(new Funcionario("Alice", LocalDate.of(1995, 1, 5), new BigDecimal("2234.68"), "Recepcionista"));
        listaFuncionarios
                .add(new Funcionario("Heitor", LocalDate.of(1999, 11, 19), new BigDecimal("1582.72"), "Operador"));
        listaFuncionarios
                .add(new Funcionario("Arthur", LocalDate.of(1993, 3, 31), new BigDecimal("4071.84"), "Contador"));
        listaFuncionarios.add(new Funcionario("Laura", LocalDate.of(1994, 7, 8), new BigDecimal("3017.45"), "Gerente"));
        listaFuncionarios
                .add(new Funcionario("Heloísa", LocalDate.of(2003, 5, 24), new BigDecimal("1606.85"), "Eletricista"));
        listaFuncionarios
                .add(new Funcionario("Helena", LocalDate.of(1996, 9, 2), new BigDecimal("2799.93"), "Gerente"));

        // 3.2 – Remove o joão da lista
        List<Funcionario> listaTemp = new ArrayList<>();
        for (int i = 0; i < listaFuncionarios.size(); i++) {
            Funcionario funcionarioAtual = listaFuncionarios.get(i);

            if (!funcionarioAtual.getNome().equalsIgnoreCase("João")) {
                listaTemp.add(funcionarioAtual);
            }
        }
        listaFuncionarios = listaTemp;

        // 3.3 – Imprime os funcionários
        saida.append("Lista de Funcionários\n");
        saida.append(String.format("%-10s %-12s %-15s %-15s\n", "Nome", "Data Nasc.", "Salário", "Função"));
        for (int i = 0; i < listaFuncionarios.size(); i++) {
            Funcionario f = listaFuncionarios.get(i);
            saida.append(String.format("%-10s %-12s %-15s %-15s\n",
                    f.getNome(),
                    formatarData(f.getDataNascimento()),
                    formatarSalario(f.getSalario()),
                    f.getFuncao()));
        }

        // 3.4 – Aumenta 10% em todos os salários

        for (int i = 0; i < listaFuncionarios.size(); i++) {
            Funcionario f = listaFuncionarios.get(i);
            BigDecimal salarioAtualizado = f.getSalario().multiply(new BigDecimal("1.10"));
            f.setSalario(salarioAtualizado);
        }

        saida.append("\nApós aumento de 10%:\n");
        saida.append(String.format("%-10s %-12s %-15s %-15s\n", "Nome", "Data Nasc.", "Salário", "Função"));
        for (int i = 0; i < listaFuncionarios.size(); i++) {
            Funcionario f = listaFuncionarios.get(i);
            saida.append(String.format("%-10s %-12s %-15s %-15s\n",
                    f.getNome(),
                    formatarData(f.getDataNascimento()),
                    formatarSalario(f.getSalario()),
                    f.getFuncao()));
        }

        // 3.5 – Agrupa o funcionário usando stream
        Map<String, List<Funcionario>> mapaPorFuncao = listaFuncionarios.stream()
                .collect(Collectors.groupingBy(Funcionario::getFuncao));

        // 3.6 – Imprime os grupos por função
        saida.append("\nFuncionários agrupados por função:\n");
        mapaPorFuncao.forEach((funcao, funcionarios) -> {
            saida.append("Função: " + funcao + "\n");
            funcionarios.forEach(f -> saida.append(" - " + f.getNome() + "\n"));
        });

        // 3.8 – Imprimir os funcionários que fazem aniversário nos meses 10 e 12:
        saida.append("\nFuncionários com aniversário nos meses de outubro ou dezembro:\n");
        for (int i = 0; i < listaFuncionarios.size(); i++) {
            Funcionario f = listaFuncionarios.get(i);
            int mesNascimento = f.getDataNascimento().getMonthValue();
            if (mesNascimento == 10 || mesNascimento == 12) {
                saida.append(" - " + f.getNome() + "\n");
            }
        }

        // 3.9 – Encontrar e imprimir o funcionário com a maior idade:
        listaFuncionarios.stream()
                .min(Comparator.comparing(Funcionario::getDataNascimento))
                .ifPresent(funcionarioMaisVelho -> {
                    int idade = Period.between(funcionarioMaisVelho.getDataNascimento(), LocalDate.now()).getYears();
                    saida.append("\nFuncionário com maior idade:\n");
                    saida.append("Nome: " + funcionarioMaisVelho.getNome() + " | Idade: " + idade + " anos\n");
                });

        // 3.10 – Ordem Alfabética

        for (int i = 0; i < listaFuncionarios.size() - 1; i++) {
            for (int j = 0; j < listaFuncionarios.size() - i - 1; j++) {
                Funcionario f1 = listaFuncionarios.get(j);
                Funcionario f2 = listaFuncionarios.get(j + 1);

                if (f1.getNome().compareToIgnoreCase(f2.getNome()) > 0) {
                    listaFuncionarios.set(j, f2);
                    listaFuncionarios.set(j + 1, f1);
                }
            }
        }
        saida.append("\nLista de funcionários em ordem alfabética:\n");
        for (int i = 0; i < listaFuncionarios.size(); i++) {
            saida.append(" - " + listaFuncionarios.get(i).getNome() + "\n");
        }

        // 3.11 – Total dos salários
        BigDecimal somaSalarios = BigDecimal.ZERO;
        for (int i = 0; i < listaFuncionarios.size(); i++) {
            somaSalarios = somaSalarios.add(listaFuncionarios.get(i).getSalario());
        }
        saida.append("\nSoma total dos salários: " + formatarSalario(somaSalarios) + "\n");

        // 3.12 – Imprimir quantos salários mínimos ganha cada funcionário:
        BigDecimal salarioMinimo = new BigDecimal("1212.00");
        saida.append("\nQuantidade de salários mínimos por funcionário:\n");
        for (int i = 0; i < listaFuncionarios.size(); i++) {
            Funcionario f = listaFuncionarios.get(i);
            BigDecimal qtdSalariosMinimos = f.getSalario().divide(salarioMinimo, 2, BigDecimal.ROUND_HALF_UP);
            saida.append(" - " + f.getNome() + ": " + qtdSalariosMinimos.toString() + " salários mínimos\n");
        }

        areaTexto.setText(saida.toString());
        janela.getContentPane().add(scroll, BorderLayout.CENTER);
        janela.setLocationRelativeTo(null);
        janela.setVisible(true);
    }

    // Método para formatar a data
    private static String formatarData(LocalDate data) {
        int dia = data.getDayOfMonth();
        int mes = data.getMonthValue();
        int ano = data.getYear();
        String sDia = (dia < 10 ? "0" : "") + dia;
        String sMes = (mes < 10 ? "0" : "") + mes;
        return sDia + "/" + sMes + "/" + ano;
    }

    // Método para formatar o salário
    private static String formatarSalario(BigDecimal salario) {
        salario = salario.setScale(2, BigDecimal.ROUND_HALF_UP);

        java.text.DecimalFormatSymbols simbolos = new java.text.DecimalFormatSymbols();
        simbolos.setGroupingSeparator('.');
        simbolos.setDecimalSeparator(',');

        java.text.DecimalFormat formatador = new java.text.DecimalFormat("#,##0.00", simbolos);
        return formatador.format(salario);
    }

}
