public class AlunoPos extends Aluno{

   private String orientador;
   
   public AlunoPos(String nome, String telefone, Data nascimento, String ra){
      super(nome, telefone, nascimento, ra);
   }
   
   public AlunoPos(String nome, Data nascimento, String ra){
      super(nome, nascimento, ra);

   }

   public void matricular(int numDisciplinas, String modificadorOrientador){
      matricular(numDisciplinas);
      orientador = modificadorOrientador;
   }
   
    public double getCargaSemanal(){
      double horas;
      horas = getDisciplinas() * 2;
      return horas;
   }
   
   public void setOrientador(String modificador){
      orientador = modificador;
   }
   public String getOrientador(){
      return orientador;
   }
      

   public String toString(){
      String temp = super.toString() + "\nOrientador: " + orientador;
      return temp;
   }
}  
      

   