public class Aluno extends Pessoa{

   private String ra;
   private int disciplinas;
   private boolean matricula;
   
   public Aluno(String nome, String telefone, Data nascimento, String ra){
      super(nome, telefone, nascimento);
      this.ra = ra;
   }
   
   public Aluno(String nome, Data nascimento, String ra){
      super(nome, nascimento);
      this.ra = ra;
   }
   
   public void matricular(int numDisciplinas){
      matricula = true;
      disciplinas = numDisciplinas;
   }
   
   public double getCargaSemanal(){
      double horas;
      horas = disciplinas * 4;
      return horas;
   }
   
   public void setRa(String modificador){
      ra = modificador;
   }
   
   public void setDisciplinas(int modificador){
      disciplinas = modificador;
   }
   
   public int getDisciplinas(){
      return disciplinas;
   }
   
   public String getRa(){
      return ra;
   }
   
   public String toString(){
      if(matricula = true){
         String temp = super.toString() + "\nRA: " + ra +"\nNumero de disciplinas: "+ disciplinas;
         return temp;
      }
      else{
         String temp = super.toString() +"Aluno não matriculado!";
         return temp;
      }    
   }
   

}