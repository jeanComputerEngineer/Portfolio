package br.uepg.deinfo.trab2;

public class LivroDeLivraria extends Livro{

   private boolean status;
   private double preco;
    
   public LivroDeLivraria(String nomeLivro, String nomeAutor, int anoEdicao, int preco){
      super(nomeLivro, nomeAutor, anoEdicao);
      this.status = true;
      this.preco = preco;
      
    }
        
    public void imprimirPreco(){
      System.out.println("O preco do livro é: "+ preco);
      }
      
     public void comprarLivro(){
      if (status == false)
         // Sem exceção pra ele!
         System.out.println("Livro Disponível para compra!");
      status = false;
      System.out.println("\nLivo Comprado!\n");
         
         }
         
   public String verificarItem() {
      if(status)
          return "Livro disponivel para compra";
      else
          return "Livro comprado.";
    }        
      
    @Override
    
   public String toString(){
      String temp;
      temp = "\nNome do livro:"  + getNomeLivro() + "\nNome do autor"  + getNomeAutor() +
      "\nAno de edicao: "+ getAnoEdicao() + "\nAvaliacao: " + getAvaliacao() + "\nStatus: " + verificarItem();
      return temp;
      }
      
    public void informar(){
      if (status == true){
         System.out.println("O livro pertence a livraria");
         }
      }
      
    
}