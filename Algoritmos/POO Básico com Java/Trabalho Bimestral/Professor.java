public class Professor extends Funcionario{

   int horasAula;
   
   public Professor(String nome, String telefone, Data nascimento, String registro, double salario, int horasAula){
      super(nome, telefone, nascimento, registro, salario);
      this.horasAula = horasAula;
      }
   public Professor(String nome, Data nascimento, String registro, double salario, int horasAula){
      super(nome, nascimento, registro, salario);
      this.horasAula = horasAula;
      }
   
   public double calcularBonificacao(){
      double bonificacao;
      bonificacao = getSalario() * 0.2;
      return bonificacao;
      }
      
   public double getSalarioComBonificacao(){
      double salarioBonificado;
      salarioBonificado = getSalario() + 0.1;
      return salarioBonificado;
      }

   public void setHorasAula(int modificador){
      horasAula = modificador;
      }
   public int getHorasAula(){
      return horasAula;
      }
}
   
   