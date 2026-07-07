# Cell 1
#ExercÃ­cio 1 - Lista "ExercÃ­cios 2021"

print("Qual Ã© a largura do terreno?")
largura =  float (input())
print("Qual Ã© o comprimento do terreno")
comprimento = float (input())
area = largura * comprimento
print("A Ã¡rea dele Ã© igual a: ", area, "metros quadrados")

# Cell 2
#ExercÃ­cio 2 - lista "ExercÃ­cios 2021"


print("Quantos cavalos foram comprados?")
quantidade = float(input())
ferraduras = quantidade * 4
print("SerÃ¡ necessÃ¡ria a compra de", ferraduras, 'ferraduras')

# Cell 3
#ExercÃ­cio 3 - lista "ExercÃ­cios 2021"


print("Quantos pÃ£es franceses foram vendidos hoje?")
pf = int(input())
print("Quantas broas foram vendidas hoje?")
broas = int(input())

taxaBroas = broas * 0.15
taxaPF = pf * 0.12
totalArrecadado = taxaPF + taxaBroas
poupanÃ§a = (totalArrecadado * 12) / 100

print("O equivale a 12% destinado a poupanÃ§a Ã© de:", poupanÃ§a," reais")

# Cell 4
#ExercÃ­cio 4 - lista "ExercÃ­cios 2021"

print("Qual Ã© a sua idade?")
idade = float(input())
print('Qual o seu nome?')
nome = input()

dias = idade * 365

print("OlÃ¡", nome,"Voce possui", dias, "dias de vida")

# Cell 5
#ExercÃ­cio 5 - lista "ExercÃ­cios 2021"

print("QUal o preÃ§o da gasolina por litro?")
preÃ§o = float(input())
print("Quanto pagarÃ¡ pela gasolina?")
total = float(input())

quantidade = (total // preÃ§o)
round(quantidade, 1)
print("Voce conseguira colocar", quantidade,"litros de gasolina")

# Cell 6
#ExercÃ­cio 6 - lista "ExercÃ­cios 2021"

print("Quantos quilos e gramas Ã© o peso do prato?")
peso = float(input())
valorTotal = 29 * peso
print("O valor total sera de ",valorTotal,"R$")

# Cell 7
#ExercÃ­cio 7 - lista "ExercÃ­cios 2021"
print("Digite o dia")
dia = int(input())
print("Digite o mÃªs")
mes = int(input())

if(mes == 1):
    print("JÃ¡ se passaram",dia,"dias desde o inÃ­cio do ano")
else:
    mes = mes * 30 - 30
    total = dia + mes
    print("JÃ¡ se passaram",total,"dias desde o inÃ­cio do ano")

# Cell 8
#ExercÃ­cio 8 - lista "ExercÃ­cios 2021"

print("Qual a nota de peso 2?")
peso2 = float(input()) * 2
print("Qual a nota de peso 4?")
peso4 = float(input()) * 4
print("Qual a nota de peso 6?")
peso6 = float(input()) * 6

mediaPonderada = (peso2 + peso4 + peso6) / 12
print("Sua media ponderada Ã© igual a:", mediaPonderada)

# Cell 9
#ExercÃ­cio 9 - lista "ExercÃ­cios 2021"

p = 15
m = 20
g= 35

print("Informe quantas camisetas pequenas foram vendidas hoje:")
qpequena = int(input())
print("Informe quantas camisetas medias foram vendidas hoje:")
qmedia = int(input())
print("Informe quantas camisetas grandes foram vendidas hoje:")
qgrande = int(input())

totalCamisetas= qpequena + qmedia + qgrande
totalArrecadado = (qpequena * p ) + (qmedia * m) + (qgrande * g)

print("A quantidade de camisetas vendidas Ã© igual a:",totalCamisetas,"\nO total arrecadado Ã© igual a:", totalArrecadado,"Reais")

# Cell 10
#ExercÃ­cio 10 - lista "ExercÃ­cios 2021"

print("Qual Ã© o seu salÃ¡rio inicial")
salarioInicial = float(input())
reajuste = (salarioInicial * 15 / 100) + salarioInicial
imposto = reajuste - (reajuste * 8 / 100)
print("Voce receberÃ¡ um aumento de 15%, seu salÃ¡rio reajustado serÃ¡ de:",reajuste,"reais")
print("Entretanto, como o Estado Brasileiro nÃ£o presta, terÃ¡ que pagar 8% do seu salÃ¡rio em impostos, sendo seu salÃ¡rio final igual a:",imposto,"reais")

# Cell 11
#ExercÃ­cio 11 - lista "ExercÃ­cios 2021"

print("Digite um numero intero")
inteiro = int(input())

if(inteiro > 100):
  print("Centena:",inteiro // 100)
  print("Dezena:",inteiro % 100 // (10))
  print("Unidade:",inteiro %10)

elif(inteiro > 10):
  print("Dezena:",inteiro // 10)
  print("Unidade:",inteiro % 10)

else:
  print("Unidade:", inteiro)

# Cell 12
#ExercÃ­cio 12 - lista "ExercÃ­cios 2021"

print("Qual Ã© o raio R da pizza?")
R = float(input())
area =3.14 * R**2
print("Area =",area)

# Cell 13
#ExercÃ­cio 13 - lista "ExercÃ­cios 2021"

print("Digite a entrada de temperatura em graus celsius")
c = float(input())
conversor = c * (9 / 5) + 32

print("A temperatura",c,"graus equivale a",conversor,"graus fahrenheit")

# Cell 14
#ExercÃ­cio 14 - lista "ExercÃ­cios 2021"

print("Qual a quantidade de horas normais trabalhadas no mes?")
horasNormais = int(input())
print("Qual a quantidade de horas extras trabalhadas no mes")
horasExtras = int(input())

preÃ§oHN = horasNormais * 80
preÃ§oHE = horasExtras * 105

salarioBruto = preÃ§oHN + preÃ§oHE
print("O seu salÃ¡rio bruto Ã© igual a",salarioBruto)

salarioLiquido = salarioBruto - (salarioBruto * 10 / 100)

print("O seu salÃ¡rio lÃ­quido Ã© igual a:",salarioLiquido)

# Cell 15
#ExercÃ­cio 15 - lista "ExercÃ­cios 2021"

print("Quantos frangos possuem a fazenda?")
frangos = int(input())
anelAlimento = 7
anelChip = 6.5

preÃ§o = (anelAlimento * frangos) + (anelChip * frangos)
print("A quantidade total gasta com os aneis Ã© de:", preÃ§o,"Reais")

# Cell 16
#ExercÃ­cio 16 - lista "ExercÃ­cios 2021"


print("Quantas moedas de 5 centavos existem no cofrinho?")
q5 = int(input())
print("Quantas moedas de 10 centavos existem no cofrinho?")
q10 = int(input())
print("Quantas moedas de 25 centavos existem no cofrinho?")
q25 = float(input())
print("Quantas moedas de 50 centavos existem no cofrinho?")
q50 = int(input())
print("Quantas moedas de 1 real existem no cofrinho?")
q100 = int(input())

numTotal = (q5 * 0.05) + (q10 * 0.1) + (q25 * 0.25) + (q50 * 0.5) + (q100 * 1)
print("A quantia total em moedas Ã© igual a",numTotal,"reais")

# Cell 17
#ExercÃ­cio 17 - lista "ExercÃ­cios 2021"

print("Digite o numero no qual deseja saber a tabuada:")
numero = int(input())

multiplicador = 0
while(multiplicador >= 0 and multiplicador <= 9):
  multiplicador +=1
  print("a tabuada de", numero,"vezes", multiplicador,"Ã© igual a",numero * multiplicador)

