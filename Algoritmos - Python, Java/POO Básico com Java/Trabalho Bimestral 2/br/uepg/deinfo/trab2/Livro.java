package br.uepg.deinfo.trab2;

import java.util.Scanner;

abstract class Livro {
   private String nomeLivro;
   private String nomeAutor;
   private int anoEdicao; 
   private int avaliacao;
    
   public Livro(String nomeLivro, String nomeAutor, int anoEdicao){
       this.nomeLivro = nomeLivro;
       this.nomeAutor = nomeAutor;
       this.anoEdicao = anoEdicao;
   }
    
   public void avaliar() throws MinhaExcecao{
       Scanner le = new Scanner(System.in);
        
       System.out.println("Digite um numero entre 0 a 10 para classificar o livro: ");
       int aux = le.nextInt();  
            
       if(aux < 0 || aux > 10)
           throw new MinhaExcecao("\nValor invalido.\n");
     
       this.avaliacao = aux;
       System.out.println("\nAvaliacao registrada!\n");
   }
    
   public String getNomeLivro(){
      return nomeLivro;
      }
   public String getNomeAutor(){
      return nomeAutor;
      }
   public int getAnoEdicao(){
      return anoEdicao;
      }
   public int getAvaliacao(){
      return avaliacao;
      }
      
      
   public String toString(){
       return "Nome do livro: " + nomeLivro + "\nNome do Autor: " + nomeAutor +"\nAno de edicao: "+ anoEdicao + "\nAvaliacao: " + avaliacao;
   }
    
   abstract void informar();
}
