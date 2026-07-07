public class Chefe extends Funcionario{
   private String cargo;
   
   public Chefe(String nome, String telefone, Data nascimento, String registro, double salario, String cargo){
      super(nome, telefone, nascimento, registro, salario);
      this.cargo = cargo;
      }
   
   public Chefe(String nome, Data nascimento, String registro, double salario, String cargo){
      super(nome, nascimento, registro, salario);
      this.cargo = cargo;
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
      
    public void setCargo(String modificador){
      cargo = modificador;
      }
      
    public String getCargo(){
      return cargo;
      }
    public String toString(){
      String temp;
      temp = super.toString() + "\nCargo: " + cargo;
      return temp;
      }
}