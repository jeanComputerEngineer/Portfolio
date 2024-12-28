import os
import yt_dlp
import tkinter as tk
from tkinter import ttk
from tkinter import filedialog, messagebox
import sys

def resource_path(relative_path):
    """Obter o caminho absoluto para um recurso, funciona para desenvolvimento e para PyInstaller."""
    try:
        # PyInstaller cria um diretório temporário e define a variável _MEIPASS
        base_path = sys._MEIPASS
    except Exception:
        base_path = os.path.abspath(".")

    return os.path.join(base_path, relative_path)

def baixar_audio(url, pasta_destino, ffmpeg_path):
    """
    Baixa o áudio a partir da URL usando yt-dlp e converte para MP3.

    :param url: URL do vídeo a ser baixado.
    :param pasta_destino: Pasta onde o áudio será salvo.
    :param ffmpeg_path: Caminho completo para o executável do FFmpeg.
    :return: Caminho para o arquivo de áudio baixado.
    """
    if not os.path.exists(pasta_destino):
        os.makedirs(pasta_destino)
    
    # Certifique-se de que o caminho do FFmpeg está correto
    if not os.path.isfile(ffmpeg_path):
        raise FileNotFoundError(f"FFmpeg não encontrado no caminho especificado: {ffmpeg_path}")
    
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
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info_dict = ydl.extract_info(url, download=True)
        audio_filename = ydl.prepare_filename(info_dict)
        audio_filename = os.path.splitext(audio_filename)[0] + '.mp3'  # Alterar a extensão para .mp3
        return audio_filename

def converter_url_para_mp3(url, pasta_destino, caminho_saida, ffmpeg_path, status_label):
    """
    Baixa o áudio a partir de uma URL e converte para MP3.

    :param url: URL do vídeo a ser convertido.
    :param pasta_destino: Pasta onde o áudio será salvo.
    :param caminho_saida: Caminho para o arquivo MP3 de saída.
    :param ffmpeg_path: Caminho completo para o executável do FFmpeg.
    :param status_label: Label para exibir mensagens de status.
    """
    try:
        status_label.config(text="Iniciando download...", foreground="blue")
        caminho_audio = baixar_audio(url, pasta_destino, ffmpeg_path)
        status_label.config(text=f"Áudio baixado: {caminho_audio}", foreground="green")
        
        if caminho_saida and caminho_saida != caminho_audio:
            os.rename(caminho_audio, caminho_saida)
            status_label.config(text=f"Arquivo renomeado para: {caminho_saida}", foreground="green")
        
        # Limpar o campo de URL após o download
        url_entry.delete(0, tk.END)
    except FileNotFoundError as fnf:
        status_label.config(text=str(fnf), foreground="red")
        messagebox.showerror("Erro", str(fnf))
    except yt_dlp.utils.DownloadError as de:
        status_label.config(text=f"Erro no download: {de}", foreground="red")
        messagebox.showerror("Erro no Download", str(de))
    except Exception as e:
        status_label.config(text=f"Ocorreu um erro: {e}", foreground="red")
        messagebox.showerror("Erro", str(e))

def selecionar_pasta():
    """
    Abre uma janela para selecionar a pasta de download.
    """
    caminho = filedialog.askdirectory()
    if caminho:
        download_entry.delete(0, tk.END)
        download_entry.insert(0, caminho)

# Caminho relativo do executável do FFmpeg
FFMPEG_RELATIVE_PATH = os.path.join('ffmpeg', 'bin', 'ffmpeg.exe')
FFMPEG_PATH = resource_path(FFMPEG_RELATIVE_PATH)

# Verificar se o FFmpeg existe no caminho especificado
if not os.path.isfile(FFMPEG_PATH):
    messagebox.showerror("Erro", f"FFmpeg não encontrado no caminho especificado:\n{FFMPEG_PATH}")
    sys.exit(1)

# Criar a janela principal
root = tk.Tk()
root.title("Conversor e Baixador de Áudios")
root.geometry("600x250")
root.resizable(False, False)

# Estilo
style = ttk.Style()
style.configure('TButton', font=('Segoe UI', 10))
style.configure('TLabel', font=('Segoe UI', 10))
style.configure('Header.TLabel', font=('Segoe UI', 14, 'bold'))

# Header
header = ttk.Label(root, text="Conversor e Baixador de Áudios", style='Header.TLabel')
header.pack(pady=10)

# Frame para URL
url_frame = ttk.Frame(root)
url_frame.pack(pady=5, padx=10, fill='x')

url_label = ttk.Label(url_frame, text="URL do Vídeo:")
url_label.pack(side='left', padx=(0,5))

url_entry = ttk.Entry(url_frame)
url_entry.pack(side='left', fill='x', expand=True)

# Frame para Caminho de Download
download_frame = ttk.Frame(root)
download_frame.pack(pady=5, padx=10, fill='x')

download_label = ttk.Label(download_frame, text="Caminho de Download:")
download_label.pack(side='left', padx=(0,5))

download_entry = ttk.Entry(download_frame)
download_entry.pack(side='left', fill='x', expand=True, padx=(0,5))

browse_button = ttk.Button(download_frame, text="Procurar", command=selecionar_pasta)
browse_button.pack(side='left')

# Botão de Download
download_button = ttk.Button(root, text="Download", command=lambda: converter_url_para_mp3(
    url_entry.get(),
    download_entry.get() if download_entry.get() else "downloads",
    None,  # Usaremos o mesmo nome do arquivo, não é necessário especificar
    FFMPEG_PATH,
    status_label
))
download_button.pack(pady=10)

# Label de Status
status_label = ttk.Label(root, text="", foreground="blue")
status_label.pack(pady=5)

# Executar a interface
root.mainloop()
