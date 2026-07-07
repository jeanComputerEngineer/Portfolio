# Cell 1
# ExercÃ­cio 01

def x (a, b):

  if a <= b:
    print(a)
  else:
    print(b)

x(40, 30)

# Cell 2
# ExercÃ­cio 02

def x(n):
  if n <= 0:
    print("Valor negativo")
  else:
    print("Valor positivo")

x(20)
x(-30)

# Cell 3
# ExercÃ­cio 03

def x(n):
  print(n)

x(30)

# Cell 4
# ExercÃ­cio 04

def x(a, b, limite):
  if a + b > limite:
    cond = True
    print(cond)
  else:
    cond = False
    print(cond)

x(20, 30, 40)

# Cell 5
# ExercÃ­cio 05

def x(a, b, limite):
  aux = 0
  aux1 = 0
  if a > limite:
    aux+= 1
    if b > limite:
      aux += 1
  print(aux, ": Ã‰ a quantidade de numeros maiores que o limite")


x(3, 2, 1)

# Cell 6
#ExercÃ­cio 06

def binario(n):
  c = []
  while n > 0:
    b = n % 2
    n = n // 2
    c.insert(0, b)
  c = str(c)
  c = c.replace(',', '')
  print(c)

binario(10)

# Cell 7
#ExercÃ­cio 07

def x(b):
  a = 0
  while (a <= 10000):
    a+=1
    if a % 4 == 0 and b == a
      print(True)
      break
  if  b != a:
    print(False)

x(2000)

# Cell 8
#ExercÃ­cio 08

def soma(n):
  aux = 1
  soma = 0
  while aux <= n:
    soma = soma + aux
    aux = aux + 1
  return soma

soma(5)

# Cell 9
#ExercÃ­cio 09

def funcao_volume(r):
  p = 3.14
  v = (4 / 3) * p * (r ** 3)
  return round(v,2)

funcao_volume(7)

# Cell 10
# ExercÃ­cio 10

def primo(a):
  x = 1
  while x < a - 1:
    x+= 1
    if a % x == 0:
      print("O numero nÃ£o Ã© primo!")
      break
  else:
    print("O numero Ã© primo!")

primo(19)

# Cell 11
#ExercÃ­cio 11

def idade (ano, mes, dia):
  ano = 365 * ano
  mes = 30 * mes

  idade_dias = ano + mes + dia
  print(idade_dias, "dias de vida")

idade(1,1,1)

# Cell 12
#ExercÃ­cio 12

def par(a):
  if a % 2 == 0:
    print(True, "- A funÃ§Ã£o Ã© par")

  else:
     print(False, "- A funÃ§Ã£o Ã© impar")

par(5)

# Cell 13
#ExercÃ­cio 13

def media (n1, n2, n3, n4):
  media = (n1 + n2 + n3 + n4) / 4
  if media >= 7:
    print("Aluno aprovado!")
  elif media >= 6 and media < 7:
    print("Aluno aprovado com exame!")
  else:
    print("Aluno reprovado!")

media(1, 10, 8, 6)

# Cell 14
#ExercÃ­cio 14

def peso_ideal(altura, sexo):
  if sexo == "Masculino":
    peso = 72.7 * altura - 58
  elif sexo == "Feminino":
    peso = 62.1 * altura - 44.7
  return round(peso, 2)

peso_ideal(1.8, "Masculino")

# Cell 15
#ExercÃ­cio 15

def fatorial(n):
  aux = 1
  fatorial = 1
  while aux <= n:
    fatorial = fatorial * aux
    aux = aux + 1
  return fatorial

fatorial(3)

# Cell 16
#ExercÃ­cio 16

def divisor(a):
  soma = 0
  novo = 0
  x = 0
  while x <= a:
    soma = soma + novo
    x = x + 1
    novo = 1 / x
  return round(soma, 2)

divisor(8)

# Cell 17
#ExercÃ­cio 17

def vetor(x):
  pares = 0
  for i in range (len(x)):
    if x[ i ] % 2 == 0:
      pares += 1
  return pares

lista = list (range(10))
print(lista)
print(vetor(lista))

# Cell 18
#ExercÃ­cio 18

dias = ["Zero","Um","Dois","Tres","Quatro","Cinco","Seis","Sete","Oito","Nove", "Dez","Onze","Doze","Treze","Quatorze",
             "Quinze","Dezesseis","Dezessete","Dezoito","Dezenove", "Vinte", "Vinte e um", "Vinte e um", "Vinte e dois", "Vinte e tres", "Vinte e quatro",
        "Vinte e cinco", "Vinte e seis", "Vinte e sete", "Vinte e oito", "Vinte e nova", "Trinta"]
meses = ["", "Janeiro", "Fevereiro", "MarÃ§o", "Abril", "Maio", "Junho","Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]


def diaExtenso(x):
  numero = dias[x]
  return numero
def mesExtenso(x):
  numero = meses[x]
  return numero

def ano (x):
  return x
# Coloque o dia, o mes e o ano entre parenteses nas funÃ§Ãµes indicadas:
print(diaExtenso(28), " de ", mesExtenso(3), " de ", ano(2002))

# Cell 19
#ExercÃ­cio 19

def function(N):
  if N > 0:
    return 'P'
  if N <= 0:
    return 'N'

function(0)

# Cell 20
#ExercÃ­cio 20

def med(n1, n2):
  media = (n1 + n2) / 2
  return media

med(6,2)

