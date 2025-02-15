package br.uepg.deinfo.trab2;

public interface ItemDeBiblioteca {
    void  emprestarItem() throws MinhaExcecao;
    void devolverItem() throws MinhaExcecao;
    String verificarItem(); 
}
