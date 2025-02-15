public class ProfessorTIDE extends Professor{

   public ProfessorTIDE(String nome, String telefone, Data nascimento, String registro, double salario, int horasAula){
      super(nome, telefone, nascimento, registro, salario, horasAula);
      }
      
   public ProfessorTIDE(String nome, Data nascimento, String registro, double salario, int horasAula){
      super(nome, nascimento, registro, salario, horasAula);
      }
   
   public double calcularBonificacao(){
      double bonificacao;
      bonificacao = getHorasAula() * 10;
      return bonificacao;
      }
      
   public double getSalarioComBonificacao(){
      double salarioBonificado;
      salarioBonificado = (getSalario() + calcularBonificacao()) * 1.5;
      return salarioBonificado;
      }
 }