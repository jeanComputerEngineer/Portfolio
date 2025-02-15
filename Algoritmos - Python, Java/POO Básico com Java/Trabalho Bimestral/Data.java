public class Data{

   private int dia;
   private int mes;
   private int ano;
   
   public Data(int dia, int mes, int ano){
      this.dia = dia;
      this.mes = mes;
      this.ano = ano;
      
   }
   
   public Data(int dia, int mes){
      this.dia = dia;
      this.mes = mes;
   }
   
   // metodos get set //
   
   public void setDia(int modificador){
      if(modificador > 0 && modificador <= 31){   
         dia = modificador;
         }
      else{
         System.out.println("Dia indisponivel");}
         
   }
   public void setMes(int modificador){
      if(mes >= 0 && mes <= 12){   
         mes = modificador;
         }
      else
      {
         System.out.println("Mes indisponivel");
      }
   }
   public void setAno(int modificador){
      if (modificador >= 1922 && modificador <= 2022)
         {
            ano = modificador;
         }
      else{
         System.out.println("Ano invalido");
         }
    }
         
   public int getDias(){
      return dia;
      }
   public int getMes(){
      return mes;
      }
   public int getAno(){
      return ano;
      }
      
   // fim get set //
      
   public String toString(){
      String temp = dia+"/"+ mes+"/"+ano;
      return temp;
   }
}