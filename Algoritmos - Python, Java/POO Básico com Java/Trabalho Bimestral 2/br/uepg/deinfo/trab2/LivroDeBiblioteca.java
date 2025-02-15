package br.uepg.deinfo.trab2;


public class LivroDeBiblioteca extends Livro implements ItemDeBiblioteca {
    private boolean status;
    
    public LivroDeBiblioteca(String nomeLivro, String nomeAutor, int anoEdicao){
        super(nomeLivro, nomeAutor, anoEdicao);
        this.status = true;
    }

    @Override
    public void emprestarItem() throws MinhaExcecao{
         if(status == false)
             throw new MinhaExcecao("\nLivro indisponivel para emprestimo.\n");
         status = false;
         System.out.println("\nLivro emprestado com sucesso!\n");
    }


    public void devolverItem() throws MinhaExcecao{
        if(status)
            throw new MinhaExcecao("\nLivro indisponivel para devolucao.\n");
        status = true;
        System.out.println("\nLivro devolvido com sucesso!\n");
    }


    public String verificarItem() {
        if(status)
            return "Livro disponivel para emprestimo";
        else
            return "Livro indisponivel.";
    }

    @Override
    public String toString(){
        return super.toString() + "\nStatus: " + verificarItem();
    }
    
    public void informar(){
      if (status == true){
         System.out.println("O livro pertence a biblioteca");
      }
    }
}
