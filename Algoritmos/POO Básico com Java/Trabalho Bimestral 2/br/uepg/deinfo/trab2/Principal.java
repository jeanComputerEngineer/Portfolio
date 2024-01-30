package br.uepg.deinfo.trab2;

import java.util.InputMismatchException;
import java.util.Scanner;

public class Principal {


   public static void main(String[] args) throws MinhaExcecao{
        

      Livro item[] = new Livro[2];
      LivroDeBiblioteca temp;
      LivroDeLivraria temp1;
        
      item[0] = new LivroDeBiblioteca("1984", "George Orwell", 1949);
      item[1] = new LivroDeLivraria("A Revolucao dos Bichos", "George Orwell", 1949, 300);



         
    
      int entrada=0, livro=0;
      Scanner le = new Scanner(System.in);
  
    
         while(entrada != 5){
            System.out.println("Livro 0 pertence à biblioteca, livro 1 pertence a livraria.");
            System.out.println("------------------------------------------------------------------------------");
            System.out.println("0 - Para saber o preco do livro. (Apenas para livraria)");
            System.out.println("1 - Emprestar Livro. (Apenas para biblioteca)");
            System.out.println("2 - Devolver Livro. (Apenas para biblioteca)");
            System.out.println("3 - Avaliar Livro. (Ambos)"); 
            System.out.println("4 - Comprar livro. (Apenas para livraria)");
            System.out.println("5 - Imprime. (Irá imprimir os livros e seu status(comprado ou emprestado))");
            System.out.println("6 - Sair. ");
            
            try{
                entrada = le.nextInt();
            
                if(entrada > 6 || entrada < 0)
                    throw new MinhaExcecao("\nOpcao invalida.\n");
            
                if(entrada == 6)
                    break;
                if(entrada == 5){
                  
                     temp = (LivroDeBiblioteca)item[0];
                     temp1 = (LivroDeLivraria)item[1];
                     System.out.println(temp.toString() + "\n\n" + temp1.toString() + "\n\n");  
                     break;
                }else{
                    System.out.println("Digite a posicao do vetor do livro (0 a 1): ");
                    livro = le.nextInt();
                
                    if(livro > 1 || livro < 0)
                        throw new MinhaExcecao("\nLivro inexistente.\n");
                
                    if (entrada == 4 && livro == 1){
                     temp1 = (LivroDeLivraria)item[livro];
                     temp1.comprarLivro();
                     }
                     if (entrada == 4 && livro == 0){
                        throw new MinhaExcecao("\nLivro pertence a biblioteca!\n");
                     }
                     
                    if(entrada == 3 && livro == 0){
                        temp = (LivroDeBiblioteca)item[livro];
                        temp.avaliar();
                    }
                    if(entrada == 3 && livro == 1){
                        temp1 = (LivroDeLivraria)item[livro];
                        temp1.avaliar();
                    }               
                    if(entrada == 2 && livro == 0){
                        temp = (LivroDeBiblioteca)item[livro];
                        temp.devolverItem();
                        }
                     if (entrada == 2 && livro == 1){
                        throw new MinhaExcecao("\nLivro pertence a livraria!\n");
                        }
                    if (entrada == 1 && livro == 0){
                        temp = (LivroDeBiblioteca)item[livro];
                        temp.emprestarItem();
                        }
                     if (entrada == 1 && livro == 1){
                        throw new MinhaExcecao("\nLivro pertence a livraria!\n");
                        }
                     if (entrada == 0 && livro == 1){
                        temp1 = (LivroDeLivraria)item[livro];
                        temp1.imprimirPreco();
                        }
                     if (entrada == 0 && livro == 0){
                        throw new MinhaExcecao("\nLivro pertence a biblioteca!\n");
                        }
      
                }
            }catch(MinhaExcecao ex){
                System.out.println(ex.getMessage());
            }catch(InputMismatchException ex){
                System.out.println("\nVoce deve digitar um numero.\n");
                le.next();
            }
            
            
                
        }
        
      }
   
}
