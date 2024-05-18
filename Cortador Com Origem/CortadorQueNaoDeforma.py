import sys
from PyQt5.QtWidgets import QApplication, QMainWindow, QLabel, QPushButton, QLineEdit, QVBoxLayout, QWidget, QFileDialog, QHBoxLayout, QGraphicsView, QGraphicsScene, QRubberBand, QGraphicsProxyWidget, QScrollBar
from PyQt5.QtGui import QMouseEvent, QPixmap, QIntValidator
from PyQt5.QtCore import QRect, QPoint, QSize, QRectF, Qt
from PIL import Image
import webbrowser
import os

class ImageViewer(QGraphicsView):
    def __init__(self, image_path, origem_corte, largura, altura):
        super().__init__()
        self.setWindowTitle("Visualizador de Imagem")
        self.setDragMode(QGraphicsView.ScrollHandDrag)
        self.setScene(QGraphicsScene(self))
        self.image_path = image_path
        self.origem_corte = origem_corte
        self.largura = largura
        self.altura = altura
        self.rubber_band = QRubberBand(QRubberBand.Rectangle, self.viewport())
        self.rubber_band.setGeometry(QRect(self.origem_corte, QSize(self.largura, self.altura)))
        self.rubber_band.show()
        self.mouse_press_pos = None
        self.rubber_band_origin = None

        self.installEventFilter(self)
        self.setCursor(Qt.OpenHandCursor)

        self.show_image()

        self.botao_finalizar_movimentacao = QPushButton("Finalizar Movimentação", self)
        self.botao_finalizar_movimentacao.setStyleSheet("""
            QPushButton {
                padding: 10px;
                font-size: 15pt;
                background-color: #0097b2;
                color: white;
            }
        """)
        self.botao_finalizar_movimentacao.clicked.connect(self.finalizar_movimentacao)
        self.proxy_widget = QGraphicsProxyWidget()
        self.proxy_widget.setWidget(self.botao_finalizar_movimentacao)
        self.scene().addItem(self.proxy_widget)
        self.proxy_widget.setZValue(1)
        self.proxy_widget.setPos(10, 10)  # Position the button at the top-left corner

    def show_image(self):
        self.pixmap = QPixmap(self.image_path)
        self.scene().clear()
        self.scene().addPixmap(self.pixmap)
        self.setSceneRect(QRectF(self.pixmap.rect()))

        screen_size = QApplication.primaryScreen().availableGeometry()
        img_width = self.pixmap.width()
        img_height = self.pixmap.height()

        if img_width > screen_size.width() or img_height > screen_size.height():
            self.resize(screen_size.width() - 100, screen_size.height() - 100)
            self.setHorizontalScrollBarPolicy(Qt.ScrollBarAlwaysOn)
            self.setVerticalScrollBarPolicy(Qt.ScrollBarAlwaysOn)
        else:
            self.setFixedSize(img_width, img_height)
            self.setHorizontalScrollBarPolicy(Qt.ScrollBarAlwaysOff)
            self.setVerticalScrollBarPolicy(Qt.ScrollBarAlwaysOff)

    def eventFilter(self, obj, event):
        if obj is self.viewport():
            if event.type() == QMouseEvent.MouseButtonPress:
                self.mousePressEvent(event)
            elif event.type() == QMouseEvent.MouseMove:
                self.mouseMoveEvent(event)
            elif event.type() == QMouseEvent.MouseButtonRelease:
                self.mouseReleaseEvent(event)
        return super().eventFilter(obj, event)

    def atualizar_area_corte(self, nova_posicao):
        if nova_posicao.x() < 0:
            nova_posicao.setX(0)
        if nova_posicao.y() < 0:
            nova_posicao.setY(0)
        if nova_posicao.x() + self.rubber_band.width() > self.sceneRect().width():
            nova_posicao.setX(int(self.sceneRect().width() - self.rubber_band.width()))
        if nova_posicao.y() + self.rubber_band.height() > self.sceneRect().height():
            nova_posicao.setY(int(self.sceneRect().height() - self.rubber_band.height()))
        nova_geometria = QRect(nova_posicao, self.rubber_band.size())
        self.rubber_band.setGeometry(nova_geometria)
        self.origem_corte = nova_posicao

    def mousePressEvent(self, event):
        if self.rubber_band and event.button() == Qt.LeftButton:
            if self.rubber_band.geometry().contains(event.pos()):
                self.mouse_press_pos = event.pos()
                self.rubber_band_origin = self.rubber_band.geometry().topLeft()
            event.accept()
        else:
            super().mousePressEvent(event)

    def mouseMoveEvent(self, event):
        if self.rubber_band and event.buttons() & Qt.LeftButton and self.mouse_press_pos is not None:
            delta = event.pos() - self.mouse_press_pos
            nova_posicao = self.rubber_band_origin + delta
            self.atualizar_area_corte(nova_posicao)
            event.accept()
        else:
            super().mouseMoveEvent(event)

    def mouseReleaseEvent(self, event):
        if self.rubber_band and event.button() == Qt.LeftButton:
            self.origem_corte = self.rubber_band.geometry().topLeft()
            self.mouse_press_pos = None
            self.rubber_band_origin = None
            event.accept()
        else:
            super().mouseReleaseEvent(event)

    def finalizar_movimentacao(self):
        self.setCursor(Qt.ArrowCursor)
        self.close()

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Cortador de imagens que mantém a proporcionalidade e a qualidade da imagem original") 
        self.setStyleSheet("background-color: white;")

        self.central_widget = QWidget()
        self.setCentralWidget(self.central_widget)

        self.layout = QVBoxLayout()
        self.central_widget.setLayout(self.layout)

        self.label_titulo = QLabel("Cortador que não Deforma")
        self.label_titulo.setAlignment(Qt.AlignCenter)
        self.label_titulo.setStyleSheet("font-size: 28pt; font-weight: bold; margin-top: 0px;")
        self.layout.addWidget(self.label_titulo)

        self.label_subtitulo = QLabel()
        self.label_subtitulo.setText('Software Desenvolvido por <a href="https://www.linkedin.com/in/jean-samuel-candido-henrique-6b80581aa/" style="color: #2b93d9; text-decoration: none;">Jean</a> para iniciação científica e uso livre da UEPG.')
        self.label_subtitulo.setAlignment(Qt.AlignCenter)
        self.label_subtitulo.setOpenExternalLinks(True)  # Permite abrir links externos
        self.label_subtitulo.setStyleSheet("font-size: 14pt; margin-top: 5px; margin-bottom: 10px;")
        self.layout.addWidget(self.label_subtitulo)

        self.layout_horizontal_largura = QHBoxLayout()

        self.label_largura = QLabel("Largura em Pixels:")
        self.label_largura.setStyleSheet("font-size: 20pt; margin-top: 10px;")
        self.layout_horizontal_largura.addWidget(self.label_largura)

        self.entry_largura = QLineEdit()
        self.entry_largura.setStyleSheet("font-size: 20pt; background-color: #ebf5ff; margin-top: 10px;")
        self.entry_largura.setValidator(QIntValidator(0, 9999))
        self.layout_horizontal_largura.addWidget(self.entry_largura)

        self.layout.addLayout(self.layout_horizontal_largura)

        self.layout_horizontal_altura = QHBoxLayout()

        self.label_altura = QLabel("Altura em Pixels:")
        self.label_altura.setStyleSheet("font-size: 20pt; margin-top: 30px;")
        self.layout_horizontal_altura.addWidget(self.label_altura)

        self.entry_altura = QLineEdit()
        self.entry_altura.setStyleSheet("font-size: 20pt; background-color: #ebf5ff; margin-top: 30px;")
        self.entry_altura.setValidator(QIntValidator(0, 9999))
        self.layout_horizontal_altura.addWidget(self.entry_altura)

        self.layout.addLayout(self.layout_horizontal_altura)

        self.layout_horizontal_botoes = QHBoxLayout()

        self.botao_selecionar_imagem = QPushButton("Selecionar Imagem")
        self.botao_selecionar_imagem.setStyleSheet("""
            QPushButton {
                font-size: 15pt;
                color: white;
                background: qlineargradient(x1:0, y1:0, x2:1, y2:1, stop:0 #0097b2, stop:1 #7ed957);
                border-radius: 10px;
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
                border-radius: 10px;
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

        self.label_arquivo_selecionado_imagem = QLabel("Diretório atual da imagem: ")
        self.layout.addWidget(self.label_arquivo_selecionado_imagem)

        self.label_arquivo_selecionado_pasta = QLabel("Diretório atual da pasta de destino: ")
        self.layout.addWidget(self.label_arquivo_selecionado_pasta)

        self.layout_horizontal_nome_arquivo = QHBoxLayout()

        self.label_nome_arquivo = QLabel("Nome do Arquivo:")
        self.label_nome_arquivo.setStyleSheet("font-size: 20pt; margin-top: 10px;")
        self.layout_horizontal_nome_arquivo.addWidget(self.label_nome_arquivo)

        self.entry_nome_arquivo = QLineEdit()
        self.entry_nome_arquivo.setStyleSheet("font-size: 20pt; background-color: #ebf5ff; margin-top: 10px;")
        self.layout_horizontal_nome_arquivo.addWidget(self.entry_nome_arquivo)

        self.layout.addLayout(self.layout_horizontal_nome_arquivo)

        self.botao_desenhar_area = QPushButton("Mover Área de Corte")
        self.botao_desenhar_area.setStyleSheet("""
            QPushButton {
                font-size: 20pt;
                color: white;
                background: qlineargradient(x1:0, y1:0, x2:1, y2:1, stop:0 #0097b2, stop:1 #7ed957);
                border-radius: 10px;
                height: 60px;
                margin-top: 20px;
                margin-bottom: 0;
            }
            QPushButton:hover {
                background: qlineargradient(x1:0, y1:0, x2:1, y2:1, stop:0 #02ca8e, stop:1 #23c600);
            }
        """)
        self.botao_desenhar_area.clicked.connect(self.desenhar_area_corte)
        self.layout.addWidget(self.botao_desenhar_area)

        self.botao_cortar_imagem = QPushButton("Executar o Corte")
        self.botao_cortar_imagem.setStyleSheet("""
            QPushButton {
                font-size: 20pt;
                color: white;
                background: qlineargradient(x1:0, y1:0, x2:1, y2:1, stop:0 #0097b2, stop:1 #7ed957);
                border-radius: 10px;
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
        self.image_viewer = None
        self.rubber_band = None
        self.origem_corte = QPoint()

    def selecionar_imagem(self):
        self.imagem_path, _ = QFileDialog.getOpenFileName(self, "Selecione a Imagem", "", "Images (*.png *.jpg *.bmp *.tif)")
        if self.imagem_path:
            self.label_arquivo_selecionado_imagem.setText("Diretório atual da imagem: " + self.imagem_path)

    def selecionar_pasta_destino(self):
        self.pasta_destino = QFileDialog.getExistingDirectory(self, "Selecione a Pasta de Destino")
        if self.pasta_destino:
            self.label_arquivo_selecionado_pasta.setText("Diretório atual da pasta de destino: " + self.pasta_destino)

    def desenhar_area_corte(self):
        try:
            altura = int(self.entry_altura.text())
            largura = int(self.entry_largura.text())
        except ValueError:
            self.label_status.setStyleSheet("color: red; font-weight: bold;")
            self.label_status.setText("Por favor, insira valores válidos para altura e largura.")
            return

        if not self.imagem_path:
            self.label_status.setStyleSheet("color: red; font-weight: bold;")
            self.label_status.setText("Por favor, selecione uma imagem primeiro.")
            return

        if altura <= 0 or largura <= 0:
            self.label_status.setStyleSheet("color: red; font-weight: bold;")
            self.label_status.setText("Altura e largura devem ser maiores que zero.")
            return

        with Image.open(self.imagem_path) as img:
            if altura > img.height or largura > img.width:
                self.label_status.setStyleSheet("color: red; font-weight: bold;")
                self.label_status.setText("Altura e largura não podem ser maiores que as dimensões da imagem.")
                return

        self.image_viewer = ImageViewer(self.imagem_path, self.origem_corte, largura, altura)
        self.image_viewer.show()

    def cortar_imagem(self):
        if not self.imagem_path or not self.pasta_destino or not self.image_viewer:
            self.label_status.setStyleSheet("color: red; font-weight: bold;")
            self.label_status.setText("Por favor, desenhe a área de corte.")
            return

        nome_arquivo = self.entry_nome_arquivo.text().strip()
        if not nome_arquivo:
            self.label_status.setStyleSheet("color: red; font-weight: bold;")
            self.label_status.setText("O campo 'Nome do Arquivo' não pode estar vazio.")
            return

        try:
            with Image.open(self.imagem_path) as img:
                # Calcular a escala entre a imagem exibida e a imagem original
                escala_x = img.width / self.image_viewer.pixmap.width()
                escala_y = img.height / self.image_viewer.pixmap.height()

                # Ajustar a posição e tamanho do corte com base na escala
                origem_corte = self.image_viewer.mapToScene(self.image_viewer.rubber_band.geometry().topLeft()).toPoint()
                x = int(origem_corte.x() * escala_x)
                y = int(origem_corte.y() * escala_y)
                largura = int(self.image_viewer.rubber_band.width() * escala_x)
                altura = int(self.image_viewer.rubber_band.height() * escala_y)

                img_cortada = img.crop((x, y, x + largura, y + altura))

                # Obter a extensão do arquivo original
                extensao = os.path.splitext(self.imagem_path)[1].lower()
                destino_caminho = os.path.join(self.pasta_destino, nome_arquivo + extensao)

                # Salvar a imagem cortada com a mesma extensão e sem compressão
                if extensao == ".jpg" or extensao == ".jpeg":
                    img_cortada.save(destino_caminho, quality=100)  # JPEG sem compressão
                elif extensao == ".png":
                    img_cortada.save(destino_caminho, compress_level=0)  # PNG sem compressão
                else:
                    img_cortada.save(destino_caminho)

                self.label_status.setStyleSheet("color: green;")
                self.label_status.setText(f"Imagem cortada com sucesso! Salvou em: {destino_caminho}")

                # Abrir imagem cortada em outra aba
                webbrowser.open(destino_caminho)

        except Exception as e:
            self.label_status.setStyleSheet("color: red; font-weight: bold;")
            self.label_status.setText("Erro ao cortar a imagem: " + str(e))

if __name__ == '__main__':
    app = QApplication(sys.argv)
    main_window = MainWindow()
    main_window.show()
    sys.exit(app.exec_())
