public class Pessoa{

   private String nome;
   private String telefone;
   private Data nascimento;
   
   // inicio construtores //
   
   public Pessoa(String nome, String telefone, Data nascimento){
      this.nome = nome;
      this.telefone = telefone;
      this.nascimento = nascimento;
      }
   public Pessoa(String nome, Data nascimento){
      this.nome = nome;
      this.nascimento = nascimento;
      }
      
   public void setNascimento(Data nascimento){
      this.nascimento = nascimento;
      }
      
      
      
   public void setTelefone(String modificador){
      telefone = modificador;
   }
      
   public void setNome(String modificador){
      nome = modificador;
   }
   
   public String getTelefone(){
      return telefone;
   }
   
   public String getnome(){
      return nome;
   }
   
   public String toString(){
      String temp = "Nome: "+ nome + "\nTelefone: " + telefone + "\nData de Nascimento: "+ nascimento;
      return temp;
   }
   
   
}