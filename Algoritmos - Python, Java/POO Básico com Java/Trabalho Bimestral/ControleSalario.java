public class ControleSalario extends Funcionario{

   public ControleSalario(String nome, String telefone, Data nascimento, String registro, double salario){
      super(nome, telefone, nascimento, registro, salario);
      }

   private double somaBase;
   private double somaBonificada;
  

   public double getSomaBase(){
      somaBase = getSalario();
      return somaBase;
   }
   public double getSomaBonificada(){
      somaBonificada =  somaBonificada + getSalarioComBonificacao();
      return somaBonificada;
   }
   
}
   