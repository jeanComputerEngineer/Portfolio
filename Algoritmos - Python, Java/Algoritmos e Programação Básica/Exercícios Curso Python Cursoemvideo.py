# Cell 1
valorCasa = int(input("Qual Ã© o valor da casa? "))
salario = int(input("Qual Ã© o salÃ¡rio do comprador? "))
anos = int(input("Quantos anos ele irÃ¡ pagar? "))
prestaÃ§Ã£oMensal = valorCasa / (anos * 12)
print("VocÃª pagarÃ¡ {} mensalmente pela casa, " .format(prestaÃ§Ã£oMensal))

minimo = salario * 0.3

if prestaÃ§Ã£oMensal > minimo:
  print("O valor da prestaÃ§Ã£o excedeu em 30% o seu salÃ¡rio, logo, nÃ£o poderÃ¡ efetuar o emprÃ©stimo!")
else: print("Voce poderÃ¡ efetuar o emprÃ©stimo!")

# Cell 2
import math

n = int(input("Digite um numero inteiro qualquer "))
conversor = int(input("[1] para converter em binÃ¡rio \n[2] para octal \n[3] para hexadecimal\n "))

if conversor == 1:
  n = bin(n)
  print("O seu equivalente em binÃ¡rio Ã© igual a ", n)
elif conversor == 2:
  n = oct(n)
  print("O seu equivalente octal Ã© igual a ", n)
elif conversor == 3:
  n = hex(n)
  print("O seu equivalente em hexadecimal Ã© igual a", n)

# Cell 3
n = int(input("Digite o primeiro valor "))
p = int(input("Digite o segundo valor "))

if n < p:
  print("O segundo valor Ã© maior")
elif n > p:
  print("O primeiro valor Ã© maior")
else: print("Os dois sÃ£o iguais, nÃ£o existe maior")

# Cell 4
ano = int(input("Digite o seu ano de nascimento: "))
anoAtual = int(input("Em que ano vocÃª se encontra?"))

if anoAtual - ano > 18:
  print("Ja passou do tempo de alistamento")
elif anoAtual - ano == 18:
  print("EstÃ¡ na hora de se alistar 3:)")
else:
  restante = 18 - (anoAtual - ano)
  print("Ainda nÃ£o estÃ¡ na hora de se alistar, restam {} anos para isso. " .format(restante))

# Cell 5
ano = int(input("Digite o seu ano de nascimento: "))
anoAtual = int(input("Qual Ã© o ano atual?"))

if anoAtual - ano <= 9:
  print("O nadador serÃ¡ enquadrado na classe MIRIM")
elif anoAtual - ano > 9 and anoAtual - ano <= 14:
  print("O nadador serÃ¡ enquadrado na classe INFANTIL")
elif anoAtual - ano > 14 and anoAtual - ano <= 19:
  print("O nadador serÃ¡ enquadrado na classe JUNIOR")
elif anoAtual - ano > 19 and anoAtual - ano <=20:
  print("O nadador serÃ¡ enquadrado na classe SÃªNIOR")
elif anoAtual - ano > 20:
  print("O nadador serÃ¡ enquadrado na classe MASTER")
else: print("Ano de nascimento invÃ¡lido!")

# Cell 6
retax = int(input("Digite o comprimento em metros reta x "))
retay = int(input("Digite o comprimento em metros reta y "))
retaz = int(input("Digite o comprimento em metros reta z "))

if retax > abs(retay - retaz) and retax < retay + retaz:
  print("As suas retas formam um triangulo")
  if retax == retay and retay == retaz:
    print("E Ã© um triÃ¢ngulo equilÃ¡tero")
  elif retax != retay and retax != retaz:
    print("E Ã© um triÃ¢ngulo escaleno")
  else: print("Ã‰ um triÃ¢ngulo isosceles")
else: print("As suas retas nÃ£o formam um triangulo")

# Cell 7
peso = float(input("Qual Ã© o seu peso em kilogramas? "))
altura = float(input("Qual Ã© a sua altura em metros? "))

imc = peso / (altura ** 2)

if imc < 18.5:
  print("Abaixo do peso")
elif imc >= 18.5 and imc <=25:
  print("Peso ideal")
elif imc > 25 and imc <= 30:
  print("Sobrepeso")
elif imc > 30 and imc <= 40:
  print("Obesidade")
else:
  print("Obesidade MÃ³rbida")

# Cell 8
preÃ§oNormal = 40
print("O valor do produto Ã© {} reais" .format(preÃ§oNormal))
metodoPagamento = int(input("Selecione o mÃ©todo de pagamento:\n[1] Ã€ Vista\n[2] Ã€ Vista no cartÃ£o\n[3] Em AtÃ© 2x no cartÃ£o\n[4] 3x ou mais no cartÃ£o\n"))


if metodoPagamento == 1:
  preÃ§oNormal = preÃ§oNormal - (preÃ§oNormal * 0.1)
  print("O valor a ser pago serÃ¡ {} reais" .format(preÃ§oNormal))
elif metodoPagamento == 2:
  preÃ§oNormal = preÃ§oNormal - (preÃ§oNormal * 0.05)
  print("O valor a ser pago serÃ¡ {} reais" .format(preÃ§oNormal))
elif metodoPagamento == 3:
  preÃ§oNormal = preÃ§oNormal
  print("O valor a ser pago serÃ¡ {} reais" .format(preÃ§oNormal))
elif metodoPagamento == 4:
  preÃ§oNormal = preÃ§oNormal + (preÃ§oNormal * 0.2)
  print("O valor a ser pago serÃ¡ {} reais" .format(preÃ§oNormal))

# Cell 9
import random
from time import sleep

opMaquina = ['pedra', 'papel', 'tesoura']
escolha = random.choice(opMaquina)

opHumano = int(input("Qual vocÃª escolhe?\n[1] Pedra\n[2] Papel\n[3] Tesoura\n"))

print("-----------\nJO")
sleep(1)
print("KEN")
sleep(1)
print("PO!!!\n-----------")

if escolha == opMaquina[1]:
  if opHumano == 2:
    print("Empate, ambos escolheram Papel")
  elif opHumano == 1:
    print("VocÃª perdeu, a mÃ¡quina escolheu Papel, e vocÃª, Pedra")
  elif opHumano == 3:
    print("Voce ganhou, a mÃ¡quina escolheu Papel, e vocÃª, Tesoura")

if escolha == opMaquina[0]:
  if opHumano == 1:
    print("Empate, ambos escolheram Pedra")
  elif opHumano == 3:
    print("VocÃª perdeu, a mÃ¡quina escolheu Pedra, e vocÃª, Tesoura")
  elif opHumano == 2:
    print("Voce ganhou, a mÃ¡quina escolheu Pedra, e vocÃª, Papel")

if escolha == opMaquina[2]:
  if opHumano == 3:
    print("Empate, ambos escolheram Tesoura")
  elif opHumano == 2:
    print("VocÃª perdeu, a mÃ¡quina escolheu Tesoura, e vocÃª, Papel")
  elif opHumano == 1:
    print("Voce ganhou, a mÃ¡quina escolheu Tesoura, e vocÃª, Pedra")

# Cell 10
import time
print("Contagem regressiva para o estouro dos fogos!!")
c = 11

for i in range(0,11):
  c-= 1
  print(c)
  sleep(1)
print("COMEÃ‡OUUUUUU!!!!! BOOOOM!!!!")

# Cell 11
for i in range (0,51, 2):
  print(i)

# Cell 12
aux = 0
r = 0

for i in range(0,501,3):
  if i % 2 != 0:
    print(i)
    aux = r + i
    r = aux
print(r)

# Cell 13
n = float(input("Digite qualquer nÃºmero para saber sua tabuada "))


for i in range(0,11):
  r = n * i
  r = round(r, 2)
  print("{0} vezes {1} Ã© igual a {2}" .format(n,i,r))

# Cell 14
n = [int(input("Digite 6 nÃºmeros inteiros:\n")), int(input()), int(input()), int(input()), int(input()), int(input())]
soma = 0
for i in range(0,6):
  if n[i] % 2 == 0:
    soma = soma + n[i]
print("A soma dos nÃºmeros pares Ã© igual a ", soma)

# Cell 15
r = float(input("Digite a razÃ£o da progressÃ£o aritimÃ©tica "))
n1 = float(input("Digite o primeiro termo da progressÃ£o "))
n = 11

for i in range(0,10):
  n = n - 1
  an = n1 + (n - 1) * r
  print(an)
print("Eis os 10 primeiros termos da determina ProgressÃ£o AritimÃ©tica")

# Cell 16
#isso tem mais soluÃ§Ãµes, mas eis apenas duas aqui

n = int(input("Digite um nÃºmero qualquer "))

"""

for i in range(2,n + 1):
  if n % i == 0 and n != 2:
    if i == n or n % 2 == 0:
      print("O seu numero nÃ£o Ã© um nÃºmero primo")
      break
  elif n % i != 0 and n % 3 != 0 and n % 5 != 0:
    if i == n - 1:
      print("Ã‰ um nÃºmero primo")
      break
  elif n == 2 or n == 3:
    print("Ã‰ um nÃºmero primo")
    break

    """


if n == 2:
  print("O seu nÃºmero Ã© primo")
if n == 1:
  print("O seu nÃºmero nÃ£o Ã© primo")

for i in range(2, n):
  if n % i == 0:
    print("O seu nÃºmero nÃ£o Ã© primo")
    break
  elif n % i != 0 and i == n - 1:
    print("O seu nÃºmero Ã© primo")

# Cell 17
from datetime import date

anoNascimento = [int(input("Digite 7 anos de nascimentos diferentes: \n")), int(input()), int(input()), int(input()), int(input()),
int(input()), int(input())]
anoAtual = date.today().year

aux = 0
aux1 = 0
for i in range(0,7):
  if anoAtual - anoNascimento[i]  >= 18:
    aux += 1
  else:
    aux1 += 1

print("{} pessoas sÃ£o menores de idade" .format(aux1))
print("{} pessoas sÃ£o maiores de idade" .format(aux))

# Cell 18

frase = str(input("Digite uma frase e eu direi se ela Ã© um palÃ­ndromo" )).strip().upper()

frase = frase.split()
frase = "".join(frase)
inverso = ''

for i in range(len(frase) -1, -1, -1):
  inverso += frase[i]
print(inverso, frase)

if inverso == frase:
  print("Ã© um palÃ­ndromo")
else: print("NÃ£o Ã© um palindromo!")

# Cell 19
peso = [float(input("Digite 5 pesos em KGs ")), float(input()), float(input()), float(input()), float(input())]
contador = 0

for i in range(0, 5):
  for j in range(0,5):
    if peso[i] >= peso[j]:
      contador = contador + 1
      if contador == 5:
        print("O maior peso Ã© o de {} kilos ". format(peso[i]))

# Cell 20
idadeTemp = 0
mulheres = 0
homenVelho = ''
idadeLista = [0,0,0,0]

for i in range(0, 4):
  print("PESSOA: \n========")
  nome = str(input("Nome: ")).strip()
  idade = float(input("Idade: "))
  sexo = str(input("Sexo(M ou F): ")).strip().lower()
  idadeLista[i] = idade

  if i == 0 and sexo == "m":
    idadeTemp = idade
    homenVelho = nome
  elif sexo == "m" and idade > idadeTemp:
    idadeTemp = idade
    homenVelho = nome
  if sexo == "f" and idade < 20:
    mulheres = mulheres + 1
    nomeF[i] = nome




media = ( idadeLista[0] + idadeLista[1] + idadeLista[2] + idadeLista[3] ) / 4
print("A media da idade Ã© igual a: ", media, "anos")
print("O homem mais velho Ã© {} e possui {} anos" .format(homenVelho, idadeTemp))
print("Existem {} mulheres com menos de 20 anos".format(mulheres)

# Cell 21
sexo = input("Digite o sexo:"
"\n[M] para masculino"
"\n[F] para feminino\n").lower()
if sexo == 'm' or sexo == 'f':
    print("ParabÃ©ns por saber escrever o que se pede.")

while sexo != 'm' and sexo != 'f':
  print("Digite uma respota vÃ¡lida! FILHO DA PUTA\n--------------------------\n")
  sexo = input("Digite o sexo:"
"\n[M] para masculino"
"\n[F] para feminino\n")
  if sexo == 'm' or sexo == 'f':
    print("ParabÃ©ns por saber escrever o que se pede.")

# Cell 22
import random
contador = 1
n = random.randint(0, 11)
nJogador = int(input("Digite o nÃºmero que o computador advinhou, entre 1 e 10\n"))
if nJogador == n:
  print("Parabens, voce acertou de primeira!!! Foda demais!!!")

while nJogador != n:

  print("Voce errou o nÃºmero! Continue tentando.")
  nJogador = int(input("Digite o nÃºmero que o computador advinhou, entre 1 e 10\n"))
  contador += 1
  if n == nJogador:
    print("ParabÃ©ns, vocÃª acertou, e gastou {} tentativas para acertar!" .format(contador))

# Cell 23
n =[int(input("Digite dois valores na tela\n")), int(input()) ]
print(form.center(40,"="))
print("Escolha a opÃ§Ã£o desejada:\n[1]somar\n[2]multiplicar\n[3]Maior\n[4]Novos NÃºmeros\n[5]Sair\n")
opc = int(input())
form = ''
while opc != 5:
  if opc == 1:
    result = n[0] + n[1]
    print("O resultado Ã© igual a :", result)
    print(form.center(40,"="))
    print("Escolha a opÃ§Ã£o desejada:\n[1]somar\n[2]multiplicar\n[3]Maior\n[4]Novos NÃºmeros\n[5]Sair\n")
    opc = int(input())

  elif opc == 2:
    result = n[0] * n[1]
    print("O resultado Ã© igual a :", result)
    print(form.center(40,"="))
    print("Escolha a opÃ§Ã£o desejada:\n[1]somar\n[2]multiplicar\n[3]Maior\n[4]Novos NÃºmeros\n[5]Sair\n")
    opc = int(input())
  elif opc == 3:
    if n[0] > n[1]:
      print(n[0], "Ã‰ o maior nÃºmero")
      print(form.center(40,"="))
      print("Escolha a opÃ§Ã£o desejada:\n[1]somar\n[2]multiplicar\n[3]Maior\n[4]Novos NÃºmeros\n[5]Sair\n")
      opc = int(input())

    elif n[1] > n[0]:
      print(n[1], "Ã‰ o maior nÃºmero")
      print(form.center(40,"="))
      print("Escolha a opÃ§Ã£o desejada:\n[1]somar\n[2]multiplicar\n[3]Maior\n[4]Novos NÃºmeros\n[5]Sair\n")
      opc = int(input())

    else:
      print("Ambos sÃ£o iguais")
      print(form.center(40,"="))
      print("Escolha a opÃ§Ã£o desejada:\n[1]somar\n[2]multiplicar\n[3]Maior\n[4]Novos NÃºmeros\n[5]Sair\n")
      opc = int(input())

  elif opc == 4:
    n =[int(input("Digite dois novos valores na tela\n")), int(input()) ]
    print(form.center(40,"="))
    print("Escolha a opÃ§Ã£o desejada:\n[1]somar\n[2]multiplicar\n[3]Maior\n[4]Novos NÃºmeros\n[5]Sair\n")
    opc = int(input())
  elif opc >= 6:
    print("OpÃ§Ã£o InvÃ¡lida!\n")
    print(form.center(40,"="))
    print("Escolha a opÃ§Ã£o desejada:\n[1]somar\n[2]multiplicar\n[3]Maior\n[4]Novos NÃºmeros\n[5]Sair\n")
    opc = int(input())

# Cell 24
n = int(input("Digite um numero qualquer para saber seu fatorial\n"))
nVelho = n
aux = n
formataÃ§Ã£o = ''
print(formataÃ§Ã£o.center(40,'='))

while n > 1:
  n -= 1
  r = n * aux
  print("{} vezes {} Ã© igual a {}". format(n, aux, r))
  aux = r

print(formataÃ§Ã£o.center(40,'='))
print("\nO fatorial de {} Ã© igual a {}" .format(nVelho,r))

# Cell 25
r = int(input("Digite a razÃ£o da PA "))
n1 = int(input("Digite o primeiro termo "))
numTerm = 11
contador = 11
while numTerm > 1:
  numTerm -= 1
  n = n1 + (numTerm - 1) * r
  contador -= 1
  print("O {} termo Ã© igual a {}" .format(contador, n))

# Cell 26
r = int(input("Digite a razÃ£o da PA "))
n1 = int(input("Digite o primeiro termo "))
an = 1
form = ''

while an < 11:
  n = n1 + (an - 1) * r
  print(" o {} termo Ã© igual a {}" .format(an,n))
  an+= 1
  if an == 11:
    print(form.center(40,"="))
    resposta = input("VocÃª deseja obter mais termos?\n[S]\n[N]\n").strip().lower()
    print(form.center(40,"="))
    if resposta == 'n':
      print("Ok!")
    elif resposta == 's':
      anNovo = int(input("Digite quantos termos deseja acrescentar: "))
      aux = an + anNovo
      while an < aux:
        n = n1 + (an - 1) * r
        print(" o {} termo Ã© igual a {}" .format(an,n))
        an+= 1

    else: print("Resposta invÃ¡lida!")

# Cell 27
print('-'*30)
nt = (int(input("Quantos termos deseja por na sua sequencia de fibonacci? ")))
t1 = 0
t2 = 1
print(t1)
print(t2)
contador = 3
while contador <= nt:
  t3 = t1 + t2
  print(t3)
  t1 = t2
  t2 = t3
  contador += 1

# Cell 28
contador = -1
aux = - 999
n = 0
while n != 999:
  n = int(input("Digite qualquer nÃºmero: \nNÃ£o vou parar de pedir atÃ© vocÃª digitar 999 "))
  contador+= 1
  soma = n + aux
  aux = soma

print("Voce digitou {} nÃºmeros atÃ© digitar 999 e sua soma desconsiderando o 990, Ã© igual a {} " .format(contador, aux))

# Cell 29
resposta = input("Voce quer digitar um novo valor?\n[NÃ£o]\n[Sim]\n\n").strip().lower()
print("-" * 40)
comparador = menorN = maiorN = contador = aux = 0


while resposta == 'sim':
  n = int(input("Digite um valor inteiro: "))
  print("-" * 40)
  soma = n + aux
  aux = soma
  contador+= 1
  resposta = input("Voce quer digitar um novo valor?\n[NÃ£o]\n[Sim]\n\n").strip().lower()
  print("-" * 40)

  if contador == 1:
    maiorN = menorN = n
  else:
    if n > maiorN:
      maiorN = n
    if n <= menorN:
        menorN = n


if resposta == "nÃ£o" or resposta == "nao":
  print("Programa encerrado!")
  if contador > 0:
    print("A mÃ©dia dos valores ficou {} dividido por {}, que Ã© igual a {}" .format(soma, contador, soma / contador))
    print("E o maior valor entre eles Ã©: ", maiorN)
    print("E o menor valor entre eles Ã©: ", menorN)
else:
  print("Resposta invÃ¡lida")

# Cell 30
x = 23.33333
print(" duas casas decimais: {:.2f}" .format(x))

print(f"a variavel {x} Ã© merda")

# Cell 31
n = int(input("Digite um nÃºmero, [999 para parar] "))
contador = soma = 0

while n != 999:

  soma += n
  contador += 1
  n = int(input("Digite um nÃºmero, [999 para parar] "))

print(f"a soma entre eles Ã© igual a {soma}, e foram digitados {contador} nÃºmeros ")

# Cell 32
tabuada = int(input("Quer ver a tabuada de qual valor? "))
print('-' * 40)
r = n = 0

while n < 11:
  if tabuada < 0:
    print("Programa encerrado!")
    break
  r = tabuada * n
  print(f"{tabuada} vezes {n} Ã© igual a {r}")
  if n == 10:
    print("-" * 40)
    tabuada = int(input("Quer ver a tabuada de qual valor? "))
    n = 0
  n+= 1

# Cell 33
import random
contador = 0
escolha = input("Digite [PAR] ou [IMPAR] para jogar com o pc ").strip().lower()
num = int(input("Digite um nÃºmero escolhido "))

while True:
  opc = random.randint(0,11)
  soma = num + opc
  print("O numero escolhido pelo pc foi {}, {} + {} = {}" .format(opc, num, opc, soma))
  if escolha == "par" and soma % 2 != 0:
    print("VocÃª perdeu!")
    break
  elif escolha == "impar" or escolha == "Ã­mpar" and soma % 2 == 0:
    print("VocÃª perdeu!")
    break
  elif escolha == "par" and opc % 2 == 0:
    print("ParabÃ©ns, vocÃª ganhou!")
    contador += 1
    print("=" * 40)
    escolha = input("Digite [PAR] ou [IMPAR] para jogar com o pc ").strip().lower()
    num = int(input("Digite um nÃºmero escolhido "))
  elif escolha == "impar" or escolha == "Ã­mpar" and opc % 2 != 0:
    print("ParabÃ©ns, vocÃª ganhou!")
    contador += 1
    print("=", * 40)
    escolha = input("Digite [PAR] ou [IMPAR] para jogar com o pc ").strip().lower()
    num = int(input("Digite um nÃºmero escolhido "))
  else:
    print("Digita direito, irmÃ£o!")
    escolha = input("Digite [PAR] ou [IMPAR] para jogar com o pc ").strip().lower()


print(f"VocÃŠ ganhou {contador} vezes consecutivas! ")

# Cell 34
resposta = "sim"
contador = contadorHomens = contadorMulheres = 0

while resposta == "sim":
  print("CADASTRE UMA PESSOA")
  print("-" * 40)
  sexo = input("Qual Ã© o seu sexo?\nDigite [M] para masculino, [F] para feminino ").strip().upper()
  if sexo != "F" and sexo != "M":
    print("Sexo InvÃ¡lido, programa finalizado!")
    break
  idade = int(input("Qual Ã© a sua idade? Digite um nÃºmero inteiro\n"))
  if idade >= 18:
    contador += 1
  if sexo == "M":
    contadorHomens += 1
  if sexo == "F" and idade <= 20:
    contadorMulheres += 1
  resposta = input("VocÃª quer continuar?Digite [SIM] para continuar ou qualquer tecla para finalizar\n")
  print("=" * 40)

print(f"{contador} pessoas possuem mais de 18 anos, {contadorHomens} homens foram cadastrados, e {contadorMulheres}"
" mulheres possuem menos de 20 anos")

# Cell 35
resposta = "sim"
total = contadorP = 0
ProdBar = ""

while resposta == "sim":
  print("Cadastrando um produto")
  print("=" * 40)
  nome = input("Digite o nome do produto")
  preÃ§o = float(input("Digite o preÃ§o do produto"))
  total += preÃ§o
  contadorP+= 1

  if preÃ§o >= 1000:
    contador += 1

  if contadorP == 1:
    menorP = preÃ§o
    prodBar = nome
  elif preÃ§o < menorP:
    menorP = preÃ§o
    prodBar = nome

  resposta = input("VocÃª quer continuar? Digite [Sim] para continuar ou qualquer outra tecla para finalizar").strip().lower()

print(f"O total gasto na compra Ã© {total}, {contador} produtos custam mais de 1000 reais, e {nome} possui o menor preÃ§o")

# Cell 36
saque = int(input("Qual serÃ¡ o valor sacado? -- > "))


ced = 50
totced = 0

while True:
  if saque >= ced:
    saque -= ced
    totced += 1
  else:
    if totced > 0:
      print(f"foram impressas {totced} cÃ©dulas de {ced}")
    if ced == 50:
      ced = 20
    elif ced == 20:
      ced = 10
    elif ced == 10:
      ced = 1
    totced = 0
    if saque == 0:
      break

# Cell 37
tupla = "zero", "um", "dois", "trÃªs", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez","onze","doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove", "vinte"

num = int(input("Digite o nÃºmero que deseja obter por extenso, de 0 atÃ© 20\n"))

while True:
  if num > len(tupla):
    print("Digite um nÃºmero vÃ¡lido")
    num = int(input("Digite o nÃºmero que deseja obter por extenso, de 0 atÃ© 20\n"))
  else:
    print(tupla[num])
    break

# Cell 38
# imprimir os 20 colocados do futebol, vai tomar no cu guanabara

tupla = ("zero", "um", "dois", "trÃªs", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez","onze","doze",
"treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove", "vinte")
i = 0

for i in range(0,5):
  print(f"O {i} colocado Ã© : {tupla[i]}")
for i in range (17, 21):
  print(f"O {i} colocado Ã©: {tupla[i]}")
#Ordem alfabÃ©tica
print("A tupla em ordem alfabÃ©tica Ã© igual a :", sorted(tupla))

# Cell 39
import random
tupla = random.randint(0,99), random.randint(0,99), random.randint(0,99), random.randint(0,99), random.randint(0,99)
menorN = maiorN = 0
print(tupla)

for i in range (0,5):
  if i == 0:
    menorN = maiorN = tupla[i]

  elif tupla[i] < menorN:
    menorN = tupla[i]
  elif tupla[i] > maiorN:
    maiorN = tupla[i]

print(f"O maior nÃºmero Ã© : {maiorN}\ne o menor Ã©: {menorN}")




#  APENAS PARA LISTAS
#tupla = []
#for i in range (0,5):
 # tupla[i] = tupla.append(i)
  #tupla[i] = random.randint(0,99)
  #print(tupla[i])

# Cell 40
tupla = int(input("Digite 4 valores inteiros: \n")), int(input()), int(input()), int(input())
contador = 0

for i in range(0,4):
  if tupla[i] == 9:
    contador+= 1

print(f"O nÃºmero 9 foi encontrado {contador} vezes.")
print("=" * 40)
print("=" * 40)

for i in range(0,4):
  if tupla[i] == 3:
    print(f"O valor {tupla[i]} se encontra na posiÃ§Ã£o {i}")

print("=" * 40)
print("=" * 40)
print("E os nÃºmeros pares foram: ")
for i in range(0,4):
    if tupla[i] % 2 == 0:
      print(tupla[i])
    if tupla[i] % 2 != 0:
      contador+= 1
    if contador == 4:
      print("Nenhum nÃºmero par encontrado.")

# Cell 41
resposta = ''
i = 0
lista = []

while resposta != "sim":
  lista.append(i)
  lista[i] =  input("Digite o nome do produto\n")
  i+= 1
  lista.append(i)
  lista[i] =  input("Digite o seu respectivo preÃ§o\n")
  print("=" * 40)
  resposta = input("Deseja sair? Digite [Sim] se desejar sair, ou qualquer tecla para continuar\n").strip().lower()
  print("=" * 40)

  if resposta == "sim":
    break
  i += 1


print("=" * 40)
print("TABELA IMPRESSA:")
print("|NOME| " + "=" * 10 + " |PREÃ‡O|")
print("=" * 40)
for i in range (0,len(lista)):
  if i % 2 == 0 or i == 0:
    print(f"|{lista[i]}| -------- |{lista[i + 1]}|")

# Cell 42
tupla = "barata", "rato", "gato", "cachorro"


for i in range (0,len(tupla)):

  print(f"A palavra {tupla[i]}:")
  if tupla[i].find("a") >= 0:
    print("Possui a vogal 'A' ")
  if tupla[i].find("e") >= 0:
    print("Possui a vogal 'E' ")
  if tupla[i].find("i") >= 0:
    print("Possui a vogal 'I' ")
  if tupla[i].find("o") >= 0:
    print("Possui a vogal 'O' ")
  if tupla[i].find("u") >= 0:
    print("Possui a vogal 'U' ")

# Cell 43
lista = [int(input("Digite 5 valores inteiros\n")), int(input()), int(input()), int(input()), int(input())]
print("=" * 40)
print("=" * 40)

i = 0

# minimo = min(lista)
maximo = max(lista)
minlista = min(lista)
for i in range(0,len(lista)):
  if maximo == lista[i]:
    print(f"|{maximo}|, que Ã© o maximo, estÃ¡ na(s) posiÃ§Ã£o(Ãµes): |{i}|")
  if minlista == lista[i]:
    print(f"|{minlista}|, que Ã© o mÃ­nimo, estÃ¡ na(s) posiÃ§Ã£o(Ãµes): |{i}|")

# Cell 44
# tudo isso poderia ser resolvido com um if n not in: Digite um novo valor...


import random
resposta = "sim"
i = j = -1
contador = 0
userList = []

while resposta == "sim":
  userList.append(int(input("Digite um valor inteiro\n")))
  resposta = str(input("Digite [Sim] para continuar ou qualquer tecla para sair\n")).strip().lower()
  print("=" * 40)

pcList = [random.randint(1,10), random.randint(1,10), random.randint(1,10), random.randint(1,10), random.randint(1,10)]
sortedUserList = sorted(userList)

print("Lista origninal: ", pcList)
print("Valores digitados em ordem crescente: ", sortedUserList)
print("=" * 40)

for i in range(0, len(userList)):
  pcList.append(userList[i])
  contador += 1
  for j in range(0,len(pcList) - contador):
    if pcList[j] == userList[i]:
      print("Numero", pcList[j], "NÃ£o adicionado por jÃ¡ haver antes.")
      pcList.pop()
      contador -= 1

print("=" * 40)
sortedPcList = sorted(pcList)
print(pcList)
print("Lista final em ordem crescente: ", sortedPcList)

# Cell 45
userList = [int(input("Digite 5 nÃºmeros inteiros\n")), int(input()), int(input()), int(input()), int(input())]
novaLista = []

print("=" * 40)

for i in range(0, len(userList)):
  if i == 0:
    novaLista.append(userList[i])
  elif userList[i] > novaLista[i - 1]:
    novaLista.append(userList[i])
  else:
    for j in range(0, len(novaLista)):
      if userList[i] <= novaLista[j]:
        novaLista.insert(j, userList[i])
        break



print(novaLista)

# Cell 46
resposta = "sim"
userList = []

while resposta == "sim":
  userList.append(int(input("Digite um nÃºmero inteiro\n")))
  print("-" * 40)
  resposta = input("Digite [Sim] para continuar ou qualquer tecla para finalizar").strip().lower()
  print("=" * 40)
  print("=" * 40)


print("A lista digitada Ã©:", userList)
print("A lista possui: ",len(userList), " Elementos")
userList.sort(reverse = True)
print(userList)

if 5 in userList:
  print("O valor 5 foi digitado na lista")

# Cell 47
resposta = 'sim'
i = 0

lista = []
listaPar = []
listaImpar = []

while resposta == "sim":
  lista.append(int(input("Digite um nÃºmero inteiro\n")))
  print("-" * 40)
  resposta = input("Digite [Sim] para continuar ou qualquer tecla para finalizar\n").strip().lower()
  print("=" * 40)
  print("=" * 40)

for i in range(0, len(lista)):
  if lista[i] % 2 == 0 or lista[i] == 0:
    listaPar.append(lista[i])
  else:
    listaImpar.append(lista[i])

print(lista)
print(listaPar)
print(listaImpar)

# Cell 48
expressÃ£o = input("Digite uma expressÃ£o com parÃªnteses que serÃ¡ analisada\n")

contadorOpen = expressÃ£o.count("(")
contadorClosed = expressÃ£o.count(")")

openPar = expressÃ£o.find("(")
closePar = expressÃ£o.find(")")

if contadorOpen == contadorClosed:
  if openPar >= 0:
    if closePar >= openPar:
      print("Sua expressÃ£o Ã© vÃ¡lida!")
    else:
      print("ExpressÃ£o invÃ¡lida!")
else:
  print("ExpressÃ£o invÃ¡lida!")

# Cell 49

lista = [['jean', 'samuel'], ['candido', 'henrique']]

print(lista[0][0])
print(lista[1][1])
print(lista[0][1])
print(lista[1][0])



# galera.append(dado[:]) os dois pontos fazem total diferenÃ§a

# Cell 50
resposta = "sim"
novoJogador = []
jogo = []
jogoDef = []

i = totalGols = contador = j = 0

while resposta == "sim":
  print("=" * 80)
  jogador = {"nome": str(input("Digite o nome do jogador:  ")),"Jogos": int(input("Quantos jogos ele jogou?  "))}
  for i in range(0, jogador["Jogos"]):
    jogador["Gols"] = int(input(f"Quantos gols ele marcou no {i + 1} jogo?  "))
    totalGols+= jogador["Gols"]
    jogo.append(jogador["Gols"])
  jogador["Total de Gols"] = totalGols
  del(jogador["Gols"])
  novoJogador.append(jogador.copy())
  jogoDef.append(jogo[:])
  jogo.clear()
  jogador.clear()
  totalGols = 0
  resposta = str(input("Digite 'SIM' para continuar ou qualquer tecla para sair. \n" )).strip().lower()
  contador+= 1


print(f"\nForam cadastrados {contador} jogadores.")
print("=" * 80)
for i in range(0, contador):
  print(f"|{i}| --- > {novoJogador[i]}")
print("=" * 80)

resposta = "sim"

while resposta == "sim":
  opc = int(input("Digite o nÃºmero do jogador para mais detalhes "))
  print("=" * 80)
  for i in range(0, contador):
    if i == opc:
      for j in range(0, len(jogoDef[i])):
        print(f"O jogador {i + 1} marcou {jogoDef[i][j]} gol(s) no jogo {j + 1}")
      print("=" * 80)
      resposta = str(input("Digite 'SIM' para saber sobre outro jogador ou qualquer tecla para sair. \n" )).strip().lower()

# Cell 51
#Desempacotamento def x(* valores):
def area():
  larg = int(input("Digite a largura  "))
  comp = int(input("Digite o comprimento  "))

  a = larg * comp
  return "A Ã¡rea Ã© igual a {}mÂ²" .format(a)

area()

# Cell 52
##tamanho adaptavel, essa eu nÃ£o sei

def escreva(txt):
  tam = len(txt)
  print("~" * tam)
  print(txt)
  print("~" * tam)


escreva("OLÃ MUNDO")

# Cell 53
import time
def contador(inicio, fim, passo):

  if inicio < fim:
    for i in range(inicio, fim, passo):
      print(i, end=' ')
      time.sleep(0.5)
    print("\n" + "=-"*40)
    return
  if inicio > fim:
    for i in range(inicio, fim, -passo):
      print(i, end=' ')
      time.sleep(0.5)
    print("\n" + "=-"*40)
    return
  else:
    inicio = int(input("Digite o inÃ­cio: "))
    fim = int(input("Digite o fim "))
    passo = int(input("Digite o passo contado:"))
    if inicio < fim:
      for i in range(inicio, fim, passo):
        print(i, end=' ')
        time.sleep(0.5)
      print("\n" + "=-"*40)
      return

    if inicio > fim:
      for i in range(inicio, fim, -passo):
        print(i, end=' ')
        time.sleep(0.5)
      print("\n" + "=-"*40)
      return


contador(0,11,1)
contador(10,0,2)
contador(0,0,0)

# Cell 54
def maior(*valores):
  aux = 0
  print("A lista contem: ")
  for i in range(0, len(valores)):
    if i == 0:
      aux = valores[i]
    if valores[i] > aux:
      aux = valores[i]
    print(valores[i], end=", ")
  print("\nO maior valor Ã©: ", aux)


maior(12312312,12312312,54656,2341267,978765,43534245,6768,78,9765435,34,678,6,754,3,56,78976,57643,5,678,9765,432)

# Cell 55
import random

numeros = []

def sorteia():
  for i in range(0,5):
    numeros.append(random.randint(0,100))
  print(f"Os nÃºmeros sorteados sÃ£o {numeros}:")
def somaPar():
  somapar = 0
  for i in range(0,5):
    if numeros[i] % 2 == 0:
      somapar+= numeros[i]
  print("A soma dos pares Ã© igual a:", somapar)

sorteia()
somaPar()

# Cell 56
def voto(anoNascimento):
    if 2022 - anoNascimento >= 16 and 2022 - anoNascimento < 18:
      print("VocÃª possui voto OPCIONAL nas eleiÃ§Ãµes.")
    elif 2022 - anoNascimento < 16:
      print("VocÃª possui voto NEGADO nas eleiÃ§Ãµes.")
    else:
      print("Voce possui voto OBRIGATORIO nas eleiÃ§Ãµes.")

print("-" * 30)
voto(int(input("Digite o ano do seu nascimentoz\n")))

# Cell 57

def fatorial(num, show = 0):
  r = num
  for i in range (num - 1, 0, -1):
    if show == 1:
      print(f"{r} vezes {i} = {r * i}")
    r = r * i
  return print("O fatorial Ã© igual a: ", r)

fatorial(int(input("Digite o nÃºmero no qual deseja saber o fatorial\n")), int(input("Digite [1] se quiser mostrar as operaÃ§Ãµes\n")))

# Cell 58
def ficha(nome = '', gols = ''):
  print(f"O jogador {nome} fez {gols} gols no campeonato")


nomee = str(input("Digite o nome do jogador: "))
gol = str(input("Digite quantos gols o jogador fez: "))

if gol.isnumeric():
  gol = int(gol)
else:
  gol = "indeterminado"
if nomee.strip() == '':
  ficha(nome = 'desconhecido', gols = gol)
else:
  ficha(nomee, gol)

# Cell 59
def leiaint(num = 0):
  while True:
    if num.isnumeric():
      print("VocÃª digitou o valor: ", num)
      break
    else:
      print("ERRO")
      num = str(input("Digite um valor inteiro VÃLIDO\n"))

leiaint(str(input("Digite um valor inteiro\n")))

# Cell 60
dicionario = dict()

def notas(notas = [], situacao = 0):
  """ vai tomar no cu :)
  """

  soma = escolha = 0
  for i in range(0, len(notas)):
    soma += notas[i]

  for i in range(0,len(notas)):
    print(f"Nota [{i}] Ã© {notas[i]}")

  if situacao == 1:
    escolha = int(input("Digite qual nota deseja saber a situaÃ§Ã£o\n"))
    for i in range(0,len(notas)):
      if escolha == i:
        if notas[i] >= 7:
          print(notas[i], "--> Aprovada")
        if notas[i] < 7:
          print(notas[i], "--> Reprovada")
  media = soma / len(notas)


  print("=" * 40 + "=" * 40)
  dicionario["Quantidade"] = len(notas)
  dicionario["Maior nota"] = max(notas)
  dicionario["Menor nota"] = min(notas)
  dicionario["Media dos alunos"] = media



lista = []
n = 0
while n >= 0 and n <= 10:
  n = float(input("Digite uma nota entre 0 e 10, ou um nÃºmero fora disso para sair\n"))
  if n >= 0 and n <= 10:
    lista.append(n)

notas(lista, int(input("Digite 1 para saber da situaÃ§Ã£o das notas nota\n")))
print(dicionario)

print("=" * 60 + "\n" + "="*60)
help(notas)

