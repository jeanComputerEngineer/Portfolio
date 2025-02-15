public class Funcionario extends Pessoa{

   private String registro;
   private double salario;
   
   public Funcionario(String nome, String telefone, Data nascimento, String registro, double salario){
      super(nome, telefone, nascimento);
      this.registro = registro;
      this.salario = salario;
   }
  public Funcionario(String nome, Data nascimento, String registro, double salario){
      super(nome, nascimento);
      this.registro = registro;
      this.salario = salario;
   }
   
   public double calcularBonificacao(double salario){
      double bonificacao;
      bonificacao = salario * 0.1;
      return bonificacao;
      }
   public double getSalarioComBonificacao(){
      salario = salario + 0.1;
      return salario;
      }
   
     
   public String toString(){
      String temp;
      temp = super.toString() + "\nRegistro: " + registro + "\nSalario: "+ salario;
      return temp;
      }
      
   public void setRegistro(String modificador){
      registro = modificador;
      }
   public String getRegistro(){
      return registro;
      }
   public void setSalario(double modificador){
      salario = modificador;
      }
    public double getSalario(){
      return salario;
      }
   
      
}
      