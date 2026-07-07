import tkinter as tk
from tkinter import ttk, messagebox
import mysql.connector
from mysql.connector import Error
import datetime

#############################################
# FUNÇÕES AUXILIARES (conexão, cálculo de slots, verificação de conflitos)
#############################################

def connect_db():
    try:
        connection = mysql.connector.connect(
            host='localhost',
            user='root',
            password='password',  # ajuste conforme necessário
            database='horarioescola'  # ajuste conforme o seu banco
        )
        if connection.is_connected():
            return connection
    except Error as e:
        messagebox.showerror("Erro na Conexão", f"Não foi possível conectar ao MySQL:\n{e}")
    return None

def get_available_slots(conn):
    cursor = conn.cursor()
    cursor.execute("""
        SELECT HorarioInicio, HorarioFim, DuracaoAula, IntervaloInicio, IntervaloFim 
        FROM Periodo LIMIT 1
    """)
    period = cursor.fetchone()
    if not period:
        return []
    inicio_str, fim_str, duracao, intervalo_inicio_str, intervalo_fim_str = period
    try:
        inicio_time = datetime.datetime.strptime(inicio_str, "%H:%M:%S").time()
    except Exception:
        inicio_time = (datetime.datetime.min + inicio_str).time()
    try:
        fim_time = datetime.datetime.strptime(fim_str, "%H:%M:%S").time()
    except Exception:
        fim_time = (datetime.datetime.min + fim_str).time()
    try:
        intervalo_inicio = datetime.datetime.strptime(intervalo_inicio_str, "%H:%M:%S").time()
    except Exception:
        intervalo_inicio = (datetime.datetime.min + intervalo_inicio_str).time()
    try:
        intervalo_fim = datetime.datetime.strptime(intervalo_fim_str, "%H:%M:%S").time()
    except Exception:
        intervalo_fim = (datetime.datetime.min + intervalo_fim_str).time()
    
    inicio_dt = datetime.datetime.combine(datetime.date.today(), inicio_time)
    fim_dt = datetime.datetime.combine(datetime.date.today(), fim_time)
    bloco1_fim = datetime.datetime.combine(datetime.date.today(), intervalo_inicio)
    bloco2_inicio = datetime.datetime.combine(datetime.date.today(), intervalo_fim)
    delta_aula = datetime.timedelta(minutes=duracao)
    
    slots = []
    current = inicio_dt
    while current + delta_aula <= bloco1_fim:
        slots.append((current.time().strftime("%H:%M:%S"), (current + delta_aula).time().strftime("%H:%M:%S")))
        current += delta_aula
    current = bloco2_inicio
    while current + delta_aula <= fim_dt:
        slots.append((current.time().strftime("%H:%M:%S"), (current + delta_aula).time().strftime("%H:%M:%S")))
        current += delta_aula
    return slots

def is_conflict(conn, idProfessor, idTurma, candidate_inicio, candidate_fim, diaSemana):
    cursor = conn.cursor()
    base = datetime.date.today()
    cand_start_dt = datetime.datetime.combine(base, candidate_inicio)
    cand_end_dt = datetime.datetime.combine(base, candidate_fim)
    
    sql = "SELECT HorarioInicio, HorarioFim, idProfessor, idTurma, diaSemana FROM Horario WHERE diaSemana = %s"
    cursor.execute(sql, (diaSemana,))
    horarios = cursor.fetchall()
    for (h_ini, h_fim, prof, turma, dia) in horarios:
        try:
            existing_start = datetime.datetime.combine(base, datetime.datetime.strptime(str(h_ini), "%H:%M:%S").time())
        except Exception:
            existing_start = datetime.datetime.combine(base, (datetime.datetime.min + h_ini).time())
        try:
            existing_end = datetime.datetime.combine(base, datetime.datetime.strptime(str(h_fim), "%H:%M:%S").time())
        except Exception:
            existing_end = datetime.datetime.combine(base, (datetime.datetime.min + h_fim).time())
        if (idProfessor == prof or idTurma == turma):
            if (cand_start_dt < existing_end and cand_end_dt > existing_start):
                return True
    return False

#############################################
# TELAS DO SISTEMA
#############################################

# --- Etapa 1: Cadastro de Período ---
class PeriodoScreen(tk.Frame):
    def __init__(self, parent, controller):
        tk.Frame.__init__(self, parent)
        self.controller = controller
        lbl = tk.Label(self, text="Etapa 1: Cadastro de Período", font=("Helvetica", 18, "bold"))
        lbl.pack(pady=10)
        
        self.tree = ttk.Treeview(self, columns=("id", "inicio", "fim", "duracao", "intInicio", "intFim"), show="headings")
        for col, txt in [("id", "ID"), ("inicio", "Hora de Início"), ("fim", "Hora de Término"),
                         ("duracao", "Duração (min)"), ("intInicio", "Início do Intervalo"), ("intFim", "Fim do Intervalo")]:
            self.tree.heading(col, text=txt)
        self.tree.pack(fill="both", expand=True, padx=10, pady=10)
        
        btn_frame = tk.Frame(self)
        btn_frame.pack(fill="x", padx=10, pady=10)
        tk.Button(btn_frame, text="Adicionar Período", command=self.adicionar_periodo, width=20).pack(side="left", padx=5)
        tk.Button(btn_frame, text="Editar Período", command=self.editar_periodo, width=20).pack(side="left", padx=5)
        tk.Button(btn_frame, text="Excluir Período", command=self.excluir_periodo, width=20).pack(side="left", padx=5)
        tk.Button(btn_frame, text="Atualizar Lista", command=self.refresh_periodo, width=20).pack(side="left", padx=5)
        
        self.refresh_periodo()
    
    def refresh_periodo(self):
        for item in self.tree.get_children():
            self.tree.delete(item)
        cur = self.controller.conn.cursor()
        cur.execute("SELECT idPeriodo, HorarioInicio, HorarioFim, DuracaoAula, IntervaloInicio, IntervaloFim FROM Periodo")
        for row in cur.fetchall():
            self.tree.insert("", "end", values=row)
    
    def adicionar_periodo(self):
        add_win = tk.Toplevel(self)
        add_win.title("Adicionar Período")
        add_win.geometry("500x300")
        lbls = ["Hora de Início (HH:MM:SS):", "Hora de Término (HH:MM:SS):", "Duração da Aula (min):",
                "Início do Intervalo (HH:MM:SS):", "Fim do Intervalo (HH:MM:SS):"]
        entries = []
        for i, txt in enumerate(lbls):
            tk.Label(add_win, text=txt).grid(row=i, column=0, padx=10, pady=5, sticky="e")
            ent = tk.Entry(add_win, width=40)
            ent.grid(row=i, column=1, padx=10, pady=5)
            entries.append(ent)
        def salvar():
            inicio, fim, duracao_str, intInicio, intFim = [e.get().strip() for e in entries]
            if not (inicio and fim and duracao_str and intInicio and intFim):
                messagebox.showwarning("Atenção", "Preencha todos os campos!")
                return
            try:
                duracao = int(duracao_str)
            except:
                messagebox.showerror("Erro", "Duração deve ser um número inteiro.")
                return
            try:
                datetime.datetime.strptime(inicio, "%H:%M:%S")
                datetime.datetime.strptime(fim, "%H:%M:%S")
                datetime.datetime.strptime(intInicio, "%H:%M:%S")
                datetime.datetime.strptime(intFim, "%H:%M:%S")
            except Exception as e:
                messagebox.showerror("Erro", f"Erro na conversão dos horários: {e}")
                return
            cur = self.controller.conn.cursor()
            try:
                cur.execute("""
                    INSERT INTO Periodo (HorarioInicio, HorarioFim, DuracaoAula, IntervaloInicio, IntervaloFim) 
                    VALUES (%s, %s, %s, %s, %s)
                """, (inicio, fim, duracao, intInicio, intFim))
                self.controller.conn.commit()
                # Mensagem de sucesso removida
                add_win.destroy()
                self.refresh_periodo()
            except Error as e:
                messagebox.showerror("Erro", str(e))
        tk.Button(add_win, text="Gravar Período", command=salvar, width=20).grid(row=5, column=0, columnspan=2, pady=15)
    
    def editar_periodo(self):
        selected = self.tree.selection()
        if not selected:
            messagebox.showwarning("Atenção", "Selecione um período para editar.")
            return
        item = self.tree.item(selected[0])
        id_per, inicio_atual, fim_atual, duracao_atual, intInicio_atual, intFim_atual = item["values"]
        edit_win = tk.Toplevel(self)
        edit_win.title("Editar Período")
        edit_win.geometry("500x300")
        lbls = ["Hora de Início (HH:MM:SS):", "Hora de Término (HH:MM:SS):", "Duração da Aula (min):",
                "Início do Intervalo (HH:MM:SS):", "Fim do Intervalo (HH:MM:SS):"]
        entries = []
        for i, txt in enumerate(lbls):
            tk.Label(edit_win, text=txt).grid(row=i, column=0, padx=10, pady=5, sticky="e")
            ent = tk.Entry(edit_win, width=40)
            if i == 0:
                ent.insert(0, inicio_atual)
            elif i == 1:
                ent.insert(0, fim_atual)
            elif i == 2:
                ent.insert(0, duracao_atual)
            elif i == 3:
                ent.insert(0, intInicio_atual)
            elif i == 4:
                ent.insert(0, intFim_atual)
            ent.grid(row=i, column=1, padx=10, pady=5)
            entries.append(ent)
        def salvar():
            novo_inicio, novo_fim, nova_duracao_str, novo_intInicio, novo_intFim = [e.get().strip() for e in entries]
            if not (novo_inicio and novo_fim and nova_duracao_str and novo_intInicio and novo_intFim):
                messagebox.showwarning("Atenção", "Preencha todos os campos!")
                return
            try:
                nova_duracao = int(nova_duracao_str)
            except:
                messagebox.showerror("Erro", "Duração deve ser um número inteiro.")
                return
            try:
                datetime.datetime.strptime(novo_inicio, "%H:%M:%S")
                datetime.datetime.strptime(novo_fim, "%H:%M:%S")
                datetime.datetime.strptime(novo_intInicio, "%H:%M:%S")
                datetime.datetime.strptime(novo_intFim, "%H:%M:%S")
            except Exception as e:
                messagebox.showerror("Erro", f"Erro na conversão dos horários: {e}")
                return
            cur = self.controller.conn.cursor()
            try:
                cur.execute("""
                    UPDATE Periodo SET HorarioInicio=%s, HorarioFim=%s, DuracaoAula=%s, IntervaloInicio=%s, IntervaloFim=%s
                    WHERE idPeriodo=%s
                """, (novo_inicio, novo_fim, nova_duracao, novo_intInicio, novo_intFim, id_per))
                self.controller.conn.commit()
                # Mensagem de sucesso removida
                edit_win.destroy()
                self.refresh_periodo()
            except Error as e:
                messagebox.showerror("Erro", str(e))
        tk.Button(edit_win, text="Salvar Alterações", command=salvar, width=20).grid(row=5, column=0, columnspan=2, pady=15)
    
    def excluir_periodo(self):
        selected = self.tree.selection()
        if not selected:
            messagebox.showwarning("Atenção", "Selecione um período para excluir.")
            return
        item = self.tree.item(selected[0])
        id_per = item["values"][0]
        if messagebox.askyesno("Confirmar Exclusão", "Confirma a exclusão deste período?"):
            cur = self.controller.conn.cursor()
            try:
                cur.execute("DELETE FROM Periodo WHERE idPeriodo=%s", (id_per,))
                self.controller.conn.commit()
                # Mensagem de sucesso removida
                self.refresh_periodo()
            except Error as e:
                messagebox.showerror("Erro", str(e))


# --- Etapa 2: Gerenciamento de Matérias ---
class MateriaScreen(tk.Frame):
    def __init__(self, parent, controller):
        tk.Frame.__init__(self, parent)
        self.controller = controller
        lbl = tk.Label(self, text="Etapa 2: Gerenciamento de Matérias", font=("Helvetica", 18, "bold"))
        lbl.pack(pady=10)
        
        self.tree = ttk.Treeview(self, columns=("id", "nome"), show="headings")
        for col, txt in [("id", "ID"), ("nome", "Nome da Matéria")]:
            self.tree.heading(col, text=txt)
        self.tree.pack(fill="both", expand=True, padx=10, pady=10)
        
        btn_frame = tk.Frame(self)
        btn_frame.pack(fill="x", padx=10, pady=10)
        tk.Button(btn_frame, text="Adicionar Matéria", command=self.adicionar_materia, width=20).pack(side="left", padx=5)
        tk.Button(btn_frame, text="Editar Matéria", command=self.editar_materia, width=20).pack(side="left", padx=5)
        tk.Button(btn_frame, text="Excluir Matéria", command=self.excluir_materia, width=20).pack(side="left", padx=5)
        tk.Button(btn_frame, text="Atualizar Lista", command=self.refresh_materia, width=20).pack(side="left", padx=5)
        
        self.refresh_materia()
    
    def refresh_materia(self):
        for item in self.tree.get_children():
            self.tree.delete(item)
        cur = self.controller.conn.cursor()
        cur.execute("SELECT idMateria, nomeMateria FROM Materia")
        for row in cur.fetchall():
            self.tree.insert("", "end", values=row)
    
    def adicionar_materia(self):
        add_win = tk.Toplevel(self)
        add_win.title("Adicionar Matéria")
        add_win.geometry("500x150")
        tk.Label(add_win, text="Nome da Matéria:").grid(row=0, column=0, padx=10, pady=10, sticky="e")
        entry_nome = tk.Entry(add_win, width=40)
        entry_nome.grid(row=0, column=1, padx=10, pady=10)
        def salvar():
            nome = entry_nome.get().strip()
            if not nome:
                messagebox.showwarning("Atenção", "Preencha o nome da matéria!")
                return
            cur = self.controller.conn.cursor()
            try:
                cur.execute("INSERT INTO Materia (nomeMateria) VALUES (%s)", (nome,))
                self.controller.conn.commit()
                # Mensagem de sucesso removida
                add_win.destroy()
                self.refresh_materia()
            except Error as e:
                messagebox.showerror("Erro", str(e))
        tk.Button(add_win, text="Salvar", command=salvar, width=15).grid(row=1, column=0, columnspan=2, pady=10)
    
    def editar_materia(self):
        selected = self.tree.selection()
        if not selected:
            messagebox.showwarning("Atenção", "Selecione uma matéria para editar.")
            return
        item = self.tree.item(selected[0])
        id_mat, nome_atual = item["values"]
        edit_win = tk.Toplevel(self)
        edit_win.title("Editar Matéria")
        edit_win.geometry("500x150")
        tk.Label(edit_win, text="Nome da Matéria:").grid(row=0, column=0, padx=10, pady=10, sticky="e")
        entry_nome = tk.Entry(edit_win, width=40)
        entry_nome.insert(0, nome_atual)
        entry_nome.grid(row=0, column=1, padx=10, pady=10)
        def salvar():
            novo_nome = entry_nome.get().strip()
            if not novo_nome:
                messagebox.showwarning("Atenção", "O nome da matéria não pode ficar vazio!")
                return
            cur = self.controller.conn.cursor()
            try:
                cur.execute("UPDATE Materia SET nomeMateria=%s WHERE idMateria=%s", (novo_nome, id_mat))
                self.controller.conn.commit()
                # Mensagem de sucesso removida
                edit_win.destroy()
                self.refresh_materia()
            except Error as e:
                messagebox.showerror("Erro", str(e))
        tk.Button(edit_win, text="Salvar Alterações", command=salvar, width=20).grid(row=1, column=0, columnspan=2, pady=10)
    
    def excluir_materia(self):
        selected = self.tree.selection()
        if not selected:
            messagebox.showwarning("Atenção", "Selecione uma matéria para excluir.")
            return
        item = self.tree.item(selected[0])
        id_mat = item["values"][0]
        if messagebox.askyesno("Confirmar Exclusão", "Confirma a exclusão desta matéria?"):
            cur = self.controller.conn.cursor()
            try:
                cur.execute("DELETE FROM Materia WHERE idMateria=%s", (id_mat,))
                self.controller.conn.commit()
                # Mensagem de sucesso removida
                self.refresh_materia()
            except Error as e:
                messagebox.showerror("Erro", str(e))


# --- Etapa 3: Cadastro de Professores (com obrigatoriedade de atribuição de matérias) ---
class ProfessorScreen(tk.Frame):
    def __init__(self, parent, controller):
        tk.Frame.__init__(self, parent)
        self.controller = controller
        lbl = tk.Label(self, text="Etapa 3: Cadastro de Professores", font=("Helvetica", 18, "bold"))
        lbl.pack(pady=10)
        
        # Exibe as matérias já atribuídas (GROUP_CONCAT)
        self.tree = ttk.Treeview(self, columns=("id", "nome", "cpf", "materias"), show="headings")
        for col, txt in [("id", "ID"), ("nome", "Nome"), ("cpf", "CPF"), ("materias", "Matérias")]:
            self.tree.heading(col, text=txt)
        self.tree.pack(fill="both", expand=True, padx=10, pady=10)
        
        btn_frame = tk.Frame(self)
        btn_frame.pack(fill="x", padx=10, pady=10)
        tk.Button(btn_frame, text="Adicionar Professor", command=self.adicionar_professor, width=20).pack(side="left", padx=5)
        tk.Button(btn_frame, text="Editar Professor", command=self.editar_professor, width=20).pack(side="left", padx=5)
        tk.Button(btn_frame, text="Excluir Professor", command=self.excluir_professor, width=20).pack(side="left", padx=5)
        tk.Button(btn_frame, text="Atribuir Matérias", command=self.atribuir_materias, width=20).pack(side="left", padx=5)
        tk.Button(btn_frame, text="Atualizar Lista", command=self.refresh_professores, width=20).pack(side="left", padx=5)
        
        self.refresh_professores()
    
    def refresh_professores(self):
        for item in self.tree.get_children():
            self.tree.delete(item)
        cur = self.controller.conn.cursor()
        cur.execute("""
            SELECT p.idProfessor, p.nomeProfessor, p.cpfProfessor, 
                   IFNULL(GROUP_CONCAT(m.nomeMateria SEPARATOR ', '), '') as materias
            FROM Professor p
            LEFT JOIN MateriaProfessor mp ON p.idProfessor = mp.idProfessor
            LEFT JOIN Materia m ON mp.idMateria = m.idMateria
            GROUP BY p.idProfessor
        """)
        for row in cur.fetchall():
            self.tree.insert("", "end", values=row)
    
    def adicionar_professor(self):
        add_win = tk.Toplevel(self)
        add_win.title("Adicionar Professor")
        add_win.geometry("500x200")
        tk.Label(add_win, text="Nome do Professor:").grid(row=0, column=0, padx=10, pady=10, sticky="e")
        tk.Label(add_win, text="CPF:").grid(row=1, column=0, padx=10, pady=10, sticky="e")
        entry_nome = tk.Entry(add_win, width=40)
        entry_nome.grid(row=0, column=1, padx=10, pady=10)
        entry_cpf = tk.Entry(add_win, width=40)
        entry_cpf.grid(row=1, column=1, padx=10, pady=10)
        def salvar():
            nome = entry_nome.get().strip()
            cpf = entry_cpf.get().strip()
            if not nome or not cpf:
                messagebox.showwarning("Atenção", "Preencha todos os campos!")
                return
            cur = self.controller.conn.cursor()
            try:
                cur.execute("INSERT INTO Professor (nomeProfessor, cpfProfessor) VALUES (%s, %s)", (nome, cpf))
                self.controller.conn.commit()
                # Mensagem de sucesso removida
                add_win.destroy()
                self.refresh_professores()
                # Forçar atribuição de matérias imediatamente
                self.atribuir_materias(prof_id=cur.lastrowid, prof_nome=nome)
            except Error as e:
                messagebox.showerror("Erro", str(e))
        tk.Button(add_win, text="Salvar", command=salvar, width=15).grid(row=2, column=0, columnspan=2, pady=10)
    
    def editar_professor(self):
        selected = self.tree.selection()
        if not selected:
            messagebox.showwarning("Atenção", "Selecione um professor para editar.")
            return
        item = self.tree.item(selected[0])
        id_prof, nome_atual, cpf_atual, _ = item["values"]
        edit_win = tk.Toplevel(self)
        edit_win.title("Editar Professor")
        edit_win.geometry("500x200")
        tk.Label(edit_win, text="Nome do Professor:").grid(row=0, column=0, padx=10, pady=10, sticky="e")
        tk.Label(edit_win, text="CPF:").grid(row=1, column=0, padx=10, pady=10, sticky="e")
        entry_nome = tk.Entry(edit_win, width=40)
        entry_nome.insert(0, nome_atual)
        entry_nome.grid(row=0, column=1, padx=10, pady=10)
        entry_cpf = tk.Entry(edit_win, width=40)
        entry_cpf.insert(0, cpf_atual)
        entry_cpf.grid(row=1, column=1, padx=10, pady=10)
        def salvar():
            novo_nome = entry_nome.get().strip()
            novo_cpf = entry_cpf.get().strip()
            if not novo_nome or not novo_cpf:
                messagebox.showwarning("Atenção", "Preencha todos os campos!")
                return
            cur = self.controller.conn.cursor()
            try:
                cur.execute("UPDATE Professor SET nomeProfessor=%s, cpfProfessor=%s WHERE idProfessor=%s", (novo_nome, novo_cpf, id_prof))
                self.controller.conn.commit()
                # Mensagem de sucesso removida
                edit_win.destroy()
                self.refresh_professores()
            except Error as e:
                messagebox.showerror("Erro", str(e))
        tk.Button(edit_win, text="Salvar Alterações", command=salvar, width=20).grid(row=2, column=0, columnspan=2, pady=10)
    
    def excluir_professor(self):
        selected = self.tree.selection()
        if not selected:
            messagebox.showwarning("Atenção", "Selecione um professor para excluir.")
            return
        item = self.tree.item(selected[0])
        id_prof = item["values"][0]
        if messagebox.askyesno("Confirmar Exclusão", "Confirma a exclusão deste professor?"):
            cur = self.controller.conn.cursor()
            try:
                cur.execute("DELETE FROM Professor WHERE idProfessor=%s", (id_prof,))
                self.controller.conn.commit()
                # Mensagem de sucesso removida
                self.refresh_professores()
            except Error as e:
                messagebox.showerror("Erro", str(e))
    
    def atribuir_materias(self, prof_id=None, prof_nome=None):
        if not prof_id:
            selected = self.tree.selection()
            if not selected:
                messagebox.showwarning("Atenção", "Selecione um professor para atribuir matérias.")
                return
            item = self.tree.item(selected[0])
            prof_id, prof_nome, _, _ = item["values"]
        atrib_win = tk.Toplevel(self)
        atrib_win.title(f"Atribuir Matérias a {prof_nome}")
        atrib_win.geometry("400x200")
        atrib_win.grab_set()  # Modal
        tk.Label(atrib_win, text="Selecione a Matéria:").pack(pady=10)
        cur = self.controller.conn.cursor()
        cur.execute("SELECT idMateria, nomeMateria FROM Materia")
        materias = cur.fetchall()
        combo = ttk.Combobox(atrib_win, values=[f"{m[0]} - {m[1]}" for m in materias])
        combo.pack(pady=5)
        def salvar():
            valor = combo.get()
            if not valor:
                messagebox.showwarning("Atenção", "Selecione uma matéria!")
                return
            idMateria = valor.split(" - ")[0]
            try:
                cur.execute("INSERT INTO MateriaProfessor (idProfessor, idMateria) VALUES (%s, %s)", (prof_id, idMateria))
                self.controller.conn.commit()
                # Mensagem de sucesso removida
                atrib_win.destroy()
                self.refresh_professores()
            except Error as e:
                messagebox.showerror("Erro", str(e))
        tk.Button(atrib_win, text="Salvar", command=salvar, width=15).pack(pady=10)


# --- Etapa 4: Cadastro de Turmas (com obrigatoriedade de atribuição de matérias) ---
class TurmaScreen(tk.Frame):
    def __init__(self, parent, controller):
        tk.Frame.__init__(self, parent)
        self.controller = controller
        lbl = tk.Label(self, text="Etapa 4: Cadastro de Turmas", font=("Helvetica", 18, "bold"))
        lbl.pack(pady=10)
        
        # Exibe as matérias atribuídas à turma (GROUP_CONCAT)
        self.tree = ttk.Treeview(self, columns=("id", "nome", "materias"), show="headings")
        for col, txt in [("id", "ID"), ("nome", "Nome da Turma"), ("materias", "Matérias (qtd)")]:
            self.tree.heading(col, text=txt)
        self.tree.pack(fill="both", expand=True, padx=10, pady=10)
        
        btn_frame = tk.Frame(self)
        btn_frame.pack(fill="x", padx=10, pady=10)
        tk.Button(btn_frame, text="Adicionar Turma", command=self.adicionar_turma, width=20).pack(side="left", padx=5)
        tk.Button(btn_frame, text="Editar Turma", command=self.editar_turma, width=20).pack(side="left", padx=5)
        tk.Button(btn_frame, text="Excluir Turma", command=self.excluir_turma, width=20).pack(side="left", padx=5)
        tk.Button(btn_frame, text="Atribuir Matérias", command=self.atribuir_materias, width=20).pack(side="left", padx=5)
        tk.Button(btn_frame, text="Atualizar Lista", command=self.refresh_turma, width=20).pack(side="left", padx=5)
        
        self.refresh_turma()
    
    def refresh_turma(self):
        for item in self.tree.get_children():
            self.tree.delete(item)
        cur = self.controller.conn.cursor()
        cur.execute("""
            SELECT t.idTurma, t.nomeTurma, 
                   IFNULL(GROUP_CONCAT(CONCAT(m.nomeMateria, ' (', mt.quantidadeAulas, ')') SEPARATOR ', '), '') as materias
            FROM Turma t
            LEFT JOIN MateriaTurma mt ON t.idTurma = mt.idTurma
            LEFT JOIN Materia m ON mt.idMateria = m.idMateria
            GROUP BY t.idTurma
        """)
        for row in cur.fetchall():
            self.tree.insert("", "end", values=row)
    
    def adicionar_turma(self):
        add_win = tk.Toplevel(self)
        add_win.title("Adicionar Turma")
        add_win.geometry("500x150")
        tk.Label(add_win, text="Nome da Turma:").grid(row=0, column=0, padx=10, pady=10, sticky="e")
        entry_nome = tk.Entry(add_win, width=40)
        entry_nome.grid(row=0, column=1, padx=10, pady=10)
        def salvar():
            nome = entry_nome.get().strip()
            if not nome:
                messagebox.showwarning("Atenção", "Informe o nome da turma!")
                return
            cur = self.controller.conn.cursor()
            try:
                cur.execute("INSERT INTO Turma (nomeTurma) VALUES (%s)", (nome,))
                self.controller.conn.commit()
                # Mensagem de sucesso removida
                add_win.destroy()
                self.refresh_turma()
                # Forçar atribuição de matérias
                self.atribuir_materias(turma_id=cur.lastrowid, turma_nome=nome)
            except Error as e:
                messagebox.showerror("Erro", str(e))
        tk.Button(add_win, text="Salvar", command=salvar, width=15).grid(row=1, column=0, columnspan=2, pady=10)
    
    def editar_turma(self):
        selected = self.tree.selection()
        if not selected:
            messagebox.showwarning("Atenção", "Selecione uma turma para editar.")
            return
        item = self.tree.item(selected[0])
        id_turma, nome_atual, _ = item["values"]
        edit_win = tk.Toplevel(self)
        edit_win.title("Editar Turma")
        edit_win.geometry("500x150")
        tk.Label(edit_win, text="Nome da Turma:").grid(row=0, column=0, padx=10, pady=10, sticky="e")
        entry_nome = tk.Entry(edit_win, width=40)
        entry_nome.insert(0, nome_atual)
        entry_nome.grid(row=0, column=1, padx=10, pady=10)
        def salvar():
            novo_nome = entry_nome.get().strip()
            if not novo_nome:
                messagebox.showwarning("Atenção", "Informe o novo nome da turma!")
                return
            cur = self.controller.conn.cursor()
            try:
                cur.execute("UPDATE Turma SET nomeTurma=%s WHERE idTurma=%s", (novo_nome, id_turma))
                self.controller.conn.commit()
                # Mensagem de sucesso removida
                edit_win.destroy()
                self.refresh_turma()
            except Error as e:
                messagebox.showerror("Erro", str(e))
        tk.Button(edit_win, text="Salvar Alterações", command=salvar, width=20).grid(row=1, column=0, columnspan=2, pady=10)
    
    def excluir_turma(self):
        selected = self.tree.selection()
        if not selected:
            messagebox.showwarning("Atenção", "Selecione uma turma para excluir.")
            return
        item = self.tree.item(selected[0])
        id_turma = item["values"][0]
        if messagebox.askyesno("Confirmar Exclusão", "Deseja realmente excluir esta turma?"):
            cur = self.controller.conn.cursor()
            try:
                cur.execute("DELETE FROM Turma WHERE idTurma=%s", (id_turma,))
                self.controller.conn.commit()
                # Mensagem de sucesso removida
                self.refresh_turma()
            except Error as e:
                messagebox.showerror("Erro", str(e))
    
    def atribuir_materias(self, turma_id=None, turma_nome=None):
        if not turma_id:
            selected = self.tree.selection()
            if not selected:
                messagebox.showwarning("Atenção", "Selecione uma turma para atribuir matérias.")
                return
            item = self.tree.item(selected[0])
            turma_id, turma_nome, _ = item["values"]
        atrib_win = tk.Toplevel(self)
        atrib_win.title(f"Atribuir Matérias à Turma {turma_nome}")
        atrib_win.geometry("400x250")
        atrib_win.grab_set()  # Modal
        tk.Label(atrib_win, text="Selecione a Matéria:").pack(pady=5)
        cur = self.controller.conn.cursor()
        cur.execute("SELECT idMateria, nomeMateria FROM Materia")
        materias = cur.fetchall()
        combo = ttk.Combobox(atrib_win, values=[f"{m[0]} - {m[1]}" for m in materias])
        combo.pack(pady=5)
        tk.Label(atrib_win, text="Quantidade de Aulas:").pack(pady=5)
        entry_qtd = tk.Entry(atrib_win)
        entry_qtd.pack(pady=5)
        def salvar():
            valor = combo.get()
            qtd = entry_qtd.get().strip()
            if not valor or not qtd:
                messagebox.showwarning("Atenção", "Preencha todos os campos!")
                return
            try:
                qtd = int(qtd)
            except:
                messagebox.showerror("Erro", "Quantidade de aulas deve ser um número inteiro.")
                return
            idMateria = valor.split(" - ")[0]
            try:
                cur.execute("INSERT INTO MateriaTurma (idMateria, idTurma, quantidadeAulas) VALUES (%s, %s, %s)",
                            (idMateria, turma_id, qtd))
                self.controller.conn.commit()
                # Mensagem de sucesso removida
                atrib_win.destroy()
                self.refresh_turma()
            except Error as e:
                messagebox.showerror("Erro", str(e))
        tk.Button(atrib_win, text="Salvar", command=salvar, width=15).pack(pady=10)


# --- Etapa 5: Resultados – Calendário ---
class ResultadosScreen(tk.Frame):
    def __init__(self, parent, controller):
        tk.Frame.__init__(self, parent)
        self.controller = controller
        lbl = tk.Label(self, text="Etapa 5: Resultados", font=("Helvetica", 18, "bold"))
        lbl.pack(pady=10)
        
        # Botão para gerar horários automaticamente
        tk.Button(self, text="Gerar Horários", command=self.gerar_horarios_automaticos, width=20).pack(pady=5)
        
        # Notebook com abas: "Por Turma" e "Por Professor"
        self.notebook = ttk.Notebook(self)
        self.notebook.pack(fill="both", expand=True, padx=10, pady=10)
        
        # Aba: Horários por Turma
        self.frame_turma = tk.Frame(self.notebook)
        self.notebook.add(self.frame_turma, text="Por Turma")
        tk.Label(self.frame_turma, text="Selecione a Turma:").pack(pady=5)
        self.cb_turma = ttk.Combobox(self.frame_turma, state="readonly")
        self.cb_turma.pack(pady=5)
        tk.Button(self.frame_turma, text="Exibir Calendário", command=self.montar_calendario_turma, width=20).pack(pady=5)
        self.canvas_turma = tk.Canvas(self.frame_turma)
        self.canvas_turma.pack(side="left", fill="both", expand=True)
        self.frame_cal_turma = tk.Frame(self.canvas_turma)
        self.canvas_turma.create_window((0,0), window=self.frame_cal_turma, anchor="nw")
        self.frame_cal_turma.bind("<Configure>", lambda e: self.canvas_turma.configure(scrollregion=self.canvas_turma.bbox("all")))
        
        # Aba: Horários por Professor
        self.frame_prof = tk.Frame(self.notebook)
        self.notebook.add(self.frame_prof, text="Por Professor")
        tk.Label(self.frame_prof, text="Selecione o Professor:").pack(pady=5)
        self.cb_prof = ttk.Combobox(self.frame_prof, state="readonly")
        self.cb_prof.pack(pady=5)
        tk.Button(self.frame_prof, text="Exibir Calendário", command=self.montar_calendario_prof, width=20).pack(pady=5)
        self.canvas_prof = tk.Canvas(self.frame_prof)
        self.canvas_prof.pack(side="left", fill="both", expand=True)
        self.frame_cal_prof = tk.Frame(self.canvas_prof)
        self.canvas_prof.create_window((0,0), window=self.frame_cal_prof, anchor="nw")
        self.frame_cal_prof.bind("<Configure>", lambda e: self.canvas_prof.configure(scrollregion=self.canvas_prof.bbox("all")))
        
        self.carregar_turmas()
        self.carregar_professores()
    
    def gerar_horarios_automaticos(self):
        cur = self.controller.conn.cursor()
        cur.execute("SELECT HorarioInicio, HorarioFim, DuracaoAula, IntervaloInicio, IntervaloFim FROM Periodo LIMIT 1")
        periodo = cur.fetchone()
        if not periodo:
            messagebox.showwarning("Atenção", "Nenhum período cadastrado.")
            return
        inicio_val, fim_val, duracao, intInicio_val, intFim_val = periodo
        try:
            inicio_time = datetime.datetime.strptime(inicio_val, "%H:%M:%S").time()
        except Exception:
            inicio_time = (datetime.datetime.min + inicio_val).time()
        try:
            fim_time = datetime.datetime.strptime(fim_val, "%H:%M:%S").time()
        except Exception:
            fim_time = (datetime.datetime.min + fim_val).time()
        try:
            intInicio_time = datetime.datetime.strptime(intInicio_val, "%H:%M:%S").time()
        except Exception:
            intInicio_time = (datetime.datetime.min + intInicio_val).time()
        try:
            intFim_time = datetime.datetime.strptime(intFim_val, "%H:%M:%S").time()
        except Exception:
            intFim_time = (datetime.datetime.min + intFim_val).time()
        
        inicio_dt = datetime.datetime.combine(datetime.date.today(), inicio_time)
        fim_dt = datetime.datetime.combine(datetime.date.today(), fim_time)
        bloco1_fim = datetime.datetime.combine(datetime.date.today(), intInicio_time)
        bloco2_inicio = datetime.datetime.combine(datetime.date.today(), intFim_time)
        delta_aula = datetime.timedelta(minutes=duracao)
        slots = []
        current = inicio_dt
        while current + delta_aula <= bloco1_fim:
            slots.append((current.time().strftime("%H:%M:%S"), (current + delta_aula).time().strftime("%H:%M:%S")))
            current += delta_aula
        current = bloco2_inicio
        while current + delta_aula <= fim_dt:
            slots.append((current.time().strftime("%H:%M:%S"), (current + delta_aula).time().strftime("%H:%M:%S")))
            current += delta_aula
        if not slots:
            messagebox.showwarning("Atenção", "Não há slots disponíveis no período.")
            return
        
        dias = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"]
        cur.execute("SELECT idTurma FROM Turma")
        turmas = cur.fetchall()
        max_iter = 1000  # Para evitar loop infinito
        # Para cada turma, para cada matéria, verificar quantas aulas já estão agendadas
        for (idTurma,) in turmas:
            cur.execute("SELECT idMateria, quantidadeAulas FROM MateriaTurma WHERE idTurma = %s", (idTurma,))
            materias = cur.fetchall()
            for idMateria, quantidadeAulas in materias:
                # Verifica quantas aulas já foram agendadas para essa matéria nesta turma
                cur.execute("SELECT COUNT(*) FROM Horario WHERE idTurma=%s AND idMateria=%s", (idTurma, idMateria))
                existente = cur.fetchone()[0]
                if existente >= quantidadeAulas:
                    continue
                target_aulas = quantidadeAulas - existente
                cur.execute("SELECT idProfessor FROM MateriaProfessor WHERE idMateria = %s LIMIT 1", (idMateria,))
                professor_data = cur.fetchone()
                if not professor_data:
                    messagebox.showwarning("Aviso", f"Não há professor vinculado à matéria ID {idMateria}.")
                    continue
                idProfessor = professor_data[0]
                aulas_agendadas = 0
                slot_index = 0
                iter_count = 0
                # Loop com wrap-around dos slots
                while aulas_agendadas < target_aulas and iter_count < max_iter:
                    slot_idx = slot_index % len(slots)
                    dia = dias[slot_index % len(dias)]
                    t_inicio = datetime.datetime.strptime(slots[slot_idx][0], "%H:%M:%S").time()
                    t_fim = datetime.datetime.strptime(slots[slot_idx][1], "%H:%M:%S").time()
                    if not is_conflict(self.controller.conn, idProfessor, idTurma, t_inicio, t_fim, dia):
                        try:
                            cur.execute("""
                                INSERT INTO Horario (HorarioInicio, HorarioFim, diaSemana, idTurma, idMateria, idProfessor)
                                VALUES (%s, %s, %s, %s, %s, %s)
                            """, (slots[slot_idx][0], slots[slot_idx][1], dia, idTurma, idMateria, idProfessor))
                            self.controller.conn.commit()
                            aulas_agendadas += 1
                        except Error as e:
                            messagebox.showerror("Erro", str(e))
                    slot_index += 1
                    iter_count += 1
                if aulas_agendadas < target_aulas:
                    messagebox.showwarning("Aviso",
                        f"Não foi possível agendar todas as aulas para a matéria ID {idMateria} na turma ID {idTurma}.")
        # Mensagem de sucesso removida
        self.montar_calendario_turma()
        self.montar_calendario_prof()
    
    def carregar_turmas(self):
        cur = self.controller.conn.cursor()
        cur.execute("SELECT idTurma, nomeTurma FROM Turma")
        turmas = cur.fetchall()
        self.turmas = {f"{t[1]} (ID:{t[0]})": t[0] for t in turmas}
        self.cb_turma['values'] = list(self.turmas.keys())
    
    def carregar_professores(self):
        cur = self.controller.conn.cursor()
        cur.execute("SELECT idProfessor, nomeProfessor FROM Professor")
        profs = cur.fetchall()
        self.profs = {f"{p[1]} (ID:{p[0]})": p[0] for p in profs}
        self.cb_prof['values'] = list(self.profs.keys())
    
    def montar_calendario_turma(self):
        for widget in self.frame_cal_turma.winfo_children():
            widget.destroy()
        dias = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"]
        slots = get_available_slots(self.controller.conn)
        if not slots:
            tk.Label(self.frame_cal_turma, text="Não há slots disponíveis.", fg="red").grid(row=0, column=0)
            return
        # Cabeçalho
        tk.Label(self.frame_cal_turma, text="", borderwidth=1, relief="solid", width=12, height=2).grid(row=0, column=0, sticky="nsew")
        for j, dia in enumerate(dias):
            tk.Label(self.frame_cal_turma, text=dia, borderwidth=1, relief="solid", width=20, height=2).grid(row=0, column=j+1, sticky="nsew")
        turma_str = self.cb_turma.get()
        if not turma_str:
            tk.Label(self.frame_cal_turma, text="Selecione uma turma acima.", fg="blue").grid(row=1, column=0, columnspan=6)
            return
        idTurma = self.turmas[turma_str]
        for i, (slot_inicio, slot_fim) in enumerate(slots):
            tk.Label(self.frame_cal_turma, text=f"{slot_inicio}\n–\n{slot_fim}", borderwidth=1, relief="solid",
                     width=12, height=2).grid(row=i+1, column=0, sticky="nsew")
            for j, dia in enumerate(dias):
                cur = self.controller.conn.cursor()
                cur.execute("""
                    SELECT M.nomeMateria, P.nomeProfessor 
                    FROM Horario H
                    JOIN Materia M ON H.idMateria = M.idMateria
                    JOIN Professor P ON H.idProfessor = P.idProfessor
                    WHERE H.idTurma = %s AND H.HorarioInicio = %s AND H.diaSemana = %s
                """, (idTurma, slot_inicio, dia))
                res = cur.fetchone()
                txt = f"{res[0]}\n({res[1]})" if res else ""
                tk.Label(self.frame_cal_turma, text=txt, borderwidth=1, relief="solid",
                         width=20, height=2, wraplength=150).grid(row=i+1, column=j+1, sticky="nsew")
    
    def montar_calendario_prof(self):
        for widget in self.frame_cal_prof.winfo_children():
            widget.destroy()
        dias = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"]
        slots = get_available_slots(self.controller.conn)
        if not slots:
            tk.Label(self.frame_cal_prof, text="Não há slots disponíveis.", fg="red").grid(row=0, column=0)
            return
        tk.Label(self.frame_cal_prof, text="", borderwidth=1, relief="solid", width=12, height=2).grid(row=0, column=0, sticky="nsew")
        for j, dia in enumerate(dias):
            tk.Label(self.frame_cal_prof, text=dia, borderwidth=1, relief="solid", width=20, height=2).grid(row=0, column=j+1, sticky="nsew")
        prof_str = self.cb_prof.get()
        if not prof_str:
            tk.Label(self.frame_cal_prof, text="Selecione um professor acima.", fg="blue").grid(row=1, column=0, columnspan=6)
            return
        idProfessor = self.profs[prof_str]
        for i, (slot_inicio, slot_fim) in enumerate(slots):
            tk.Label(self.frame_cal_prof, text=f"{slot_inicio}\n–\n{slot_fim}", borderwidth=1, relief="solid",
                     width=12, height=2).grid(row=i+1, column=0, sticky="nsew")
            for j, dia in enumerate(dias):
                cur = self.controller.conn.cursor()
                cur.execute("""
                    SELECT T.nomeTurma, M.nomeMateria 
                    FROM Horario H
                    JOIN Turma T ON H.idTurma = T.idTurma
                    JOIN Materia M ON H.idMateria = M.idMateria
                    WHERE H.idProfessor = %s AND H.HorarioInicio = %s AND H.diaSemana = %s
                """, (idProfessor, slot_inicio, dia))
                res = cur.fetchone()
                txt = f"{res[0]}\n{res[1]}" if res else ""
                tk.Label(self.frame_cal_prof, text=txt, borderwidth=1, relief="solid",
                         width=20, height=2, wraplength=150).grid(row=i+1, column=j+1, sticky="nsew")
    
    def carregar_turmas(self):
        cur = self.controller.conn.cursor()
        cur.execute("SELECT idTurma, nomeTurma FROM Turma")
        turmas = cur.fetchall()
        self.turmas = {f"{t[1]} (ID:{t[0]})": t[0] for t in turmas}
        self.cb_turma['values'] = list(self.turmas.keys())
    
    def carregar_professores(self):
        cur = self.controller.conn.cursor()
        cur.execute("SELECT idProfessor, nomeProfessor FROM Professor")
        profs = cur.fetchall()
        self.profs = {f"{p[1]} (ID:{p[0]})": p[0] for p in profs}
        self.cb_prof['values'] = list(self.profs.keys())


#############################################
# CLASSE PRINCIPAL: MainApp com MENU SUPERIOR
#############################################
class MainApp(tk.Tk):
    def __init__(self):
        tk.Tk.__init__(self)
        self.title("Sistema de Horários - Gerenciamento Completo")
        self.geometry("1200x800")
        self.option_add("*Font", ("Helvetica", 12))
        self.conn = connect_db()
        if not self.conn:
            self.destroy()
            exit(1)
        
        # Menu superior fixo com as etapas:
        menu_frame = tk.Frame(self, bd=2, relief="raised")
        menu_frame.pack(side="top", fill="x")
        tk.Button(menu_frame, text="Etapa 1: Período",
                  command=lambda: self.show_frame("PeriodoScreen")).pack(side="left", padx=5, pady=5)
        tk.Button(menu_frame, text="Etapa 2: Matérias",
                  command=lambda: self.show_frame("MateriaScreen")).pack(side="left", padx=5, pady=5)
        tk.Button(menu_frame, text="Etapa 3: Professores",
                  command=lambda: self.show_frame("ProfessorScreen")).pack(side="left", padx=5, pady=5)
        tk.Button(menu_frame, text="Etapa 4: Turmas",
                  command=lambda: self.show_frame("TurmaScreen")).pack(side="left", padx=5, pady=5)
        tk.Button(menu_frame, text="Etapa 5: Resultados",
                  command=lambda: self.show_frame("ResultadosScreen")).pack(side="left", padx=5, pady=5)
        
        # Container para as telas:
        container = tk.Frame(self)
        container.pack(side="top", fill="both", expand=True)
        container.grid_rowconfigure(0, weight=1)
        container.grid_columnconfigure(0, weight=1)
        
        self.frames = {}
        for F in (PeriodoScreen, MateriaScreen, ProfessorScreen, TurmaScreen, ResultadosScreen):
            frame = F(parent=container, controller=self)
            self.frames[F.__name__] = frame
            frame.grid(row=0, column=0, sticky="nsew")
        
        self.show_frame("PeriodoScreen")
    
    def show_frame(self, name):
        frame = self.frames[name]
        frame.tkraise()

#############################################
# Execução do App
#############################################
if __name__ == "__main__":
    app = MainApp()
    app.mainloop()