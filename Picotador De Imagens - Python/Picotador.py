import sys
from PyQt5.QtWidgets import QApplication, QMainWindow, QLabel, QPushButton, QLineEdit, QVBoxLayout, QWidget, QFileDialog, QHBoxLayout
from PyQt5.QtGui import QPixmap, QFont, QIntValidator
from PyQt5.QtCore import Qt, pyqtSlot
from PIL import Image

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Cortador de Imagens em Quadrados")
        self.setStyleSheet("background-color: white;")

        self.central_widget = QWidget()
        self.setCentralWidget(self.central_widget)

        self.layout = QVBoxLayout()
        self.central_widget.setLayout(self.layout)

        # Título centralizado
        self.label_titulo = QLabel("Picotador de Imagens em Quadrados")
        self.label_titulo.setAlignment(Qt.AlignCenter)
        self.label_titulo.setStyleSheet("font-size: 28pt; font-weight: bold; margin-top: 10px;")
        self.layout.addWidget(self.label_titulo)

        # Subtítulo
        self.label_subtitulo = QLabel()
        self.label_subtitulo.setText('Software Desenvolvido por <a href="https://www.linkedin.com/in/jean-samuel-candido-henrique-6b80581aa/" style="color: #2b93d9; text-decoration: none;">Jean</a> para iniciação científica e uso livre da UEPG.')
        self.label_subtitulo.setAlignment(Qt.AlignCenter)
        self.label_subtitulo.setOpenExternalLinks(True)  # Permite abrir links externos
        self.label_subtitulo.setStyleSheet("font-size: 14pt; margin-top: 5px; margin-bottom: 10px;")
        self.layout.addWidget(self.label_subtitulo)

        self.layout_horizontal_altura = QHBoxLayout()

        self.label_altura = QLabel("Altura em Pixels:")
        self.label_altura.setStyleSheet("font-size: 20pt; margin-top: 30px;")
        self.layout_horizontal_altura.addWidget(self.label_altura)

        self.entry_altura = QLineEdit()
        self.entry_altura.setStyleSheet("font-size: 20pt; background-color: #ebf5ff; margin-top: 30px; ")
        self.entry_altura.setValidator(QIntValidator(0, 999))  # Validação de entrada para números inteiros entre 0 e 999
        self.layout_horizontal_altura.addWidget(self.entry_altura)

        self.layout.addLayout(self.layout_horizontal_altura)

        # Layout horizontal para o label e o QLineEdit da largura
        self.layout_horizontal_largura = QHBoxLayout()

        self.label_largura = QLabel("Largura em Pixels:")
        self.label_largura.setStyleSheet("font-size: 20pt; margin-top: 10px;")
        self.layout_horizontal_largura.addWidget(self.label_largura)

        self.entry_largura = QLineEdit()
        self.entry_largura.setStyleSheet("font-size: 20pt; background-color: #ebf5ff; margin-top: 10px;")
        self.entry_largura.setValidator(QIntValidator(0, 999))  # Validação de entrada para números inteiros entre 0 e 9999
        self.layout_horizontal_largura.addWidget(self.entry_largura)

        self.layout.addLayout(self.layout_horizontal_largura)

        # Layout horizontal para os botões de seleção de imagem e pasta
        self.layout_horizontal_botoes = QHBoxLayout()

        self.botao_selecionar_imagem = QPushButton("Selecionar Imagem")
        self.botao_selecionar_imagem.setStyleSheet("""
            QPushButton {
                font-size: 15pt;
                color: white;
                background: qlineargradient(x1:0, y1:0, x2:1, y2:1, stop:0 #0097b2, stop:1 #7ed957);
                border-radius: 20px;
                height: 60px;
                max-width: 400px;
                margin-top: 20px;
            }
            QPushButton:hover {
                background: qlineargradient(x1:0, y1:0, x2:1, y2:1, stop:0 #02ca8e, stop:1 #23c600);
            }
        """)
        self.botao_selecionar_imagem.clicked.connect(self.selecionar_imagem)
        self.layout_horizontal_botoes.addWidget(self.botao_selecionar_imagem)

        self.botao_selecionar_pasta = QPushButton("Selecionar Pasta de Destino")
        self.botao_selecionar_pasta.setStyleSheet("""
            QPushButton {
                font-size: 15pt;
                color: white;
                background: qlineargradient(x1:0, y1:0, x2:1, y2:1, stop:0 #0097b2, stop:1 #7ed957);
                border-radius: 20px;
                height: 60px;
                max-width: 400px;
                margin-top: 20px;
            }
            QPushButton:hover {
                background: qlineargradient(x1:0, y1:0, x2:1, y2:1, stop:0 #02ca8e, stop:1 #23c600);
            }
        """)
        self.botao_selecionar_pasta.clicked.connect(self.selecionar_pasta_destino)
        self.layout_horizontal_botoes.addWidget(self.botao_selecionar_pasta)

        self.layout.addLayout(self.layout_horizontal_botoes)

        # Labels para exibir os diretórios
        self.label_arquivo_selecionado_imagem = QLabel("Diretório atual da imagem: ")
        self.layout.addWidget(self.label_arquivo_selecionado_imagem)

        self.label_arquivo_selecionado_pasta = QLabel("Diretório atual da pasta de destino: ")
        self.layout.addWidget(self.label_arquivo_selecionado_pasta)

        # Botão para iniciar o processo de cortar a imagem
        self.botao_cortar_imagem = QPushButton("Executar o Software")
        self.botao_cortar_imagem.setStyleSheet("""
            QPushButton {
                font-size: 20pt;
                color: white;
                background: qlineargradient(x1:0, y1:0, x2:1, y2:1, stop:0 #0097b2, stop:1 #7ed957);
                border-radius: 20px;
                height: 60px;
                margin-top: 20px;
                margin-bottom: 0;
                
            }
            QPushButton:hover {
                background: qlineargradient(x1:0, y1:0, x2:1, y2:1, stop:0 #02ca8e, stop:1 #23c600);
            }
        """)
        self.botao_cortar_imagem.clicked.connect(self.cortar_imagem)
        self.layout.addWidget(self.botao_cortar_imagem)

        self.label_status = QLabel("")
        self.layout.addWidget(self.label_status)

        self.imagem_path = ""
        self.pasta_destino = ""
        self.processado = False

    def limpar_status(self):
        self.label_status.setText("")

    def selecionar_imagem(self):
        # Resetar a variável de controle
        self.processado = False
        self.limpar_status()
        # Obter o local da imagem
        self.imagem_path, _ = QFileDialog.getOpenFileName(self, "Selecione a Imagem")
        if self.imagem_path:
            self.label_arquivo_selecionado_imagem.setText("Diretório atual da imagem: " + self.imagem_path)

    def selecionar_pasta_destino(self):
        # Resetar a variável de controle
        self.processado = False
        self.limpar_status()
        # Obter o local de destino para salvar os quadrados
        self.pasta_destino = QFileDialog.getExistingDirectory(self, "Selecione a Pasta de Destino")
        if self.pasta_destino:
            self.label_arquivo_selecionado_pasta.setText("Diretório atual da pasta de destino: " + self.pasta_destino)

    def cortar_imagem(self):
        if self.processado:
            # Verifica se houve mudanças desde a última vez que a mensagem foi exibida
            if self.imagem_path != self.imagem_path_anterior or self.pasta_destino != self.pasta_destino_anterior or \
                    self.entry_altura.text() != self.altura_anterior or self.entry_largura.text() != self.largura_anterior:
                self.processado = False
                self.limpar_status()
            else:
                return

        # Limpar a mensagem de status
        self.label_status.setText("")

        if not self.imagem_path or not self.pasta_destino or not self.entry_altura.text() or not self.entry_largura.text():
            faltando = []
            if not self.imagem_path:
                faltando.append("selecionar a imagem")
            if not self.pasta_destino:
                faltando.append("selecionar a pasta de destino")
            if not self.entry_altura.text():
                faltando.append("preencher a altura dos quadrados")
            if not self.entry_largura.text():
                faltando.append("preencher a largura dos quadrados")
            mensagem = "Você esqueceu de " + ", ".join(faltando) + "."
            self.label_status.setText(mensagem)
            return

        # Abrir a imagem
        imagem = Image.open(self.imagem_path)

        # Obter largura e altura da imagem
        largura, altura = imagem.size

        # Obter o tamanho dos quadrados
        tamanho_quadrado_altura = int(self.entry_altura.text())
        tamanho_quadrado_largura = int(self.entry_largura.text())

        # Dividir a imagem em quadrados
        quadrados = []
        for y in range(0, altura, tamanho_quadrado_altura):
            for x in range(0, largura, tamanho_quadrado_largura):
                quadrado = imagem.crop((x, y, x + tamanho_quadrado_largura, y + tamanho_quadrado_altura))
                quadrados.append(quadrado)

        # Salvar os quadrados
        for i, quadrado in enumerate(quadrados):
            titulo = self.imagem_path.split('/')[-1].split('.')[0]
            # Converter para o modo RGB
            quadrado_rgb = quadrado.convert('RGB')
            quadrado_rgb.save(f'{self.pasta_destino}/{titulo}_Quadrado{str(i).zfill(3)}.jpg')
        # Atualizar a variável de controle
        self.processado = True

        # Armazenar os valores atuais para a próxima verificação
        self.imagem_path_anterior = self.imagem_path
        self.pasta_destino_anterior = self.pasta_destino
        self.altura_anterior = self.entry_altura.text()
        self.largura_anterior = self.entry_largura.text()

        # Mensagem de conclusão
        self.label_status.setText("Imagens cortadas e salvas com sucesso!")


    def closeEvent(self, event):
        # Implementa o fechamento da aplicação ao clicar no X
        event.accept()
        sys.exit()

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec_())
