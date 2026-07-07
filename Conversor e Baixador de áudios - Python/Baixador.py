import os
import yt_dlp
import tkinter as tk
from tkinter import ttk
from tkinter import filedialog, messagebox
import sys
import threading

def resource_path(relative_path):
    """Obter o caminho absoluto para um recurso, funciona para desenvolvimento e para PyInstaller."""
    try:
        # PyInstaller cria um diretório temporário e define a variável _MEIPASS
        base_path = sys._MEIPASS
    except Exception:
        base_path = os.path.abspath(".")
    return os.path.join(base_path, relative_path)

def show_alert(message, title="Aviso"):
    """Função para mostrar mensagens ao usuário."""
    messagebox.showinfo(title, message)

class ConversorBaixadorAudio:
    def __init__(self, root):
        self.root = root
        self.root.title("Conversor e Baixador de Áudios")
        self.root.geometry("700x300")
        self.root.resizable(False, False)

        # Estilo
        self.style = ttk.Style()
        self.style.theme_use('vista')  # Você pode escolher outros temas como 'vista', 'alt', etc.
        self.style.configure('Header.TLabel', font=('Segoe UI', 16, 'bold'))

        # Caminho relativo do executável do FFmpeg
        FFMPEG_RELATIVE_PATH = os.path.join('ffmpeg', 'bin', 'ffmpeg.exe')
        self.ffmpeg_path = resource_path(FFMPEG_RELATIVE_PATH)

        # Verificar se o FFmpeg existe no caminho especificado
        if not os.path.isfile(self.ffmpeg_path):
            messagebox.showerror("Erro", f"FFmpeg não encontrado no caminho especificado:\n{self.ffmpeg_path}")
            sys.exit(1)

        # Header
        header = ttk.Label(root, text="Conversor e Baixador de Áudios", style='Header.TLabel')
        header.pack(pady=10)

        # Frame para URL
        url_frame = ttk.Frame(root)
        url_frame.pack(pady=5, padx=20, fill='x')

        url_label = ttk.Label(url_frame, text="URL do Vídeo:")
        url_label.pack(side='left', padx=(0, 10))

        self.url_entry = ttk.Entry(url_frame)
        self.url_entry.pack(side='left', fill='x', expand=True)

        # Frame para Caminho de Download
        download_frame = ttk.Frame(root)
        download_frame.pack(pady=5, padx=20, fill='x')

        download_label = ttk.Label(download_frame, text="Caminho de Download:")
        download_label.pack(side='left', padx=(0, 10))

        self.download_entry = ttk.Entry(download_frame)
        self.download_entry.pack(side='left', fill='x', expand=True, padx=(0, 10))

        browse_button = tk.Button(download_frame, text="Procurar", command=self.selecionar_pasta,
                                  bg="#4682B4", fg="white", activebackground="#87CEEB",
                                  activeforeground="white", cursor="hand2", borderwidth=0,
                                  font=('Segoe UI', 10, 'bold'))
        browse_button.pack(side='left')

        # Barra de Progresso
        progress_frame = ttk.Frame(root)
        progress_frame.pack(pady=10, padx=20, fill='x')

        self.progress = ttk.Progressbar(progress_frame, mode='determinate')
        self.progress.pack(fill='x', expand=True)

        # Botão de Download
        download_button = tk.Button(root, text="Download", command=self.iniciar_download,
                                    bg="#228B22", fg="white", activebackground="green",
                                    activeforeground="white", cursor="hand2", borderwidth=0,
                                    font=('Segoe UI', 12, 'bold'))
        download_button.pack(pady=10)

        # Label de Status
        self.status_label = ttk.Label(root, text="", foreground="blue")
        self.status_label.pack(pady=5)

    def selecionar_pasta(self):
        """Abre uma janela para selecionar a pasta de download."""
        caminho = filedialog.askdirectory()
        if caminho:
            self.download_entry.delete(0, tk.END)
            self.download_entry.insert(0, caminho)

    def baixar_audio(self, url, pasta_destino, ffmpeg_path, caminho_saida):
        """
        Baixa o áudio a partir da URL usando yt-dlp e converte para MP3.

        :param url: URL do vídeo a ser baixado.
        :param pasta_destino: Pasta onde o áudio será salvo.
        :param ffmpeg_path: Caminho completo para o executável do FFmpeg.
        :param caminho_saida: Caminho para o arquivo MP3 de saída.
        :return: Caminho para o arquivo de áudio baixado.
        """
        if not os.path.exists(pasta_destino):
            os.makedirs(pasta_destino)

        # Certifique-se de que o caminho do FFmpeg está correto
        if not os.path.isfile(ffmpeg_path):
            raise FileNotFoundError(f"FFmpeg não encontrado no caminho especificado: {ffmpeg_path}")

        # Definir as opções do yt-dlp, incluindo o hook de progresso
        ydl_opts = {
            'format': 'bestaudio/best',  # Baixa a melhor qualidade de áudio disponível
            'outtmpl': os.path.join(pasta_destino, '%(title)s.%(ext)s'),  # Template para o nome do arquivo
            'noplaylist': True,  # Não baixar playlists
            'quiet': True,  # Modo silencioso
            'no_warnings': True,  # Não exibir avisos
            'ffmpeg_location': os.path.dirname(ffmpeg_path),  # Diretório onde o FFmpeg está localizado
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'mp3',  # Converter para MP3
                'preferredquality': '192',  # Qualidade do MP3
            }],
            'progress_hooks': [self.progress_hook],  # Hook para atualizar a barra de progresso
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info_dict = ydl.extract_info(url, download=True)
            audio_filename = ydl.prepare_filename(info_dict)
            audio_filename = os.path.splitext(audio_filename)[0] + '.mp3'  # Alterar a extensão para .mp3

            if caminho_saida and caminho_saida != audio_filename:
                os.rename(audio_filename, caminho_saida)

            return audio_filename

    def progress_hook(self, d):
        """
        Hook de progresso para atualizar a barra de progresso.

        :param d: Dicionário com informações de progresso.
        """
        if d['status'] == 'downloading':
            total_bytes = d.get('total_bytes') or d.get('total_bytes_estimate')
            downloaded_bytes = d.get('downloaded_bytes', 0)
            if total_bytes:
                percentage = downloaded_bytes / total_bytes * 100
                self.progress['value'] = percentage
                self.status_label.config(text=f"Download: {percentage:.2f}%", foreground="blue")
        elif d['status'] == 'finished':
            self.progress['value'] = 100
            self.status_label.config(text="Download concluído!", foreground="green")

    def iniciar_download(self):
        """Inicia o processo de download em uma thread separada."""
        url = self.url_entry.get().strip()
        pasta_destino = self.download_entry.get().strip() or "downloads"

        if not url:
            show_alert("Por favor, insira a URL do vídeo.")
            return

        # Resetar a barra de progresso e status
        self.progress['value'] = 0
        self.status_label.config(text="Iniciando download...", foreground="blue")

        # Iniciar o download em uma thread separada
        threading.Thread(target=self.converter_url_para_mp3, args=(url, pasta_destino, None), daemon=True).start()

    def converter_url_para_mp3(self, url, pasta_destino, caminho_saida):
        """
        Baixa o áudio a partir de uma URL e converte para MP3.

        :param url: URL do vídeo a ser convertido.
        :param pasta_destino: Pasta onde o áudio será salvo.
        :param caminho_saida: Caminho para o arquivo MP3 de saída.
        """
        try:
            caminho_audio = self.baixar_audio(url, pasta_destino, self.ffmpeg_path, caminho_saida)
            self.status_label.config(text=f"Áudio baixado: {caminho_audio}", foreground="green")
        except FileNotFoundError as fnf:
            self.status_label.config(text=str(fnf), foreground="red")
            messagebox.showerror("Erro", str(fnf))
        except yt_dlp.utils.DownloadError as de:
            self.status_label.config(text=f"Erro no download: {de}", foreground="red")
            messagebox.showerror("Erro no Download", str(de))
        except Exception as e:
            self.status_label.config(text=f"Ocorreu um erro: {e}", foreground="red")
            messagebox.showerror("Erro", str(e))
        finally:
            # Limpar o campo de URL após o download
            self.url_entry.delete(0, tk.END)

def main():
    root = tk.Tk()
    app = ConversorBaixadorAudio(root)
    root.mainloop()

if __name__ == "__main__":
    main()
