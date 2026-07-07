# Cell 1
#ExercÃ­cio 01

def potencia(x, n):
  if n == 0:
    return 1
  else:
    return x * potencia(x, n - 1 )

potencia (2, 3)

# Teste de mesa

# Passo 1: Foi atribuido uma funÃ§Ã£o com dois parÃ¢metros (x,n)
# Passo 2: Logo, duas condicionais, a primeira para encerrar a recursÃ£o da funÃ§Ã£o, e a segunda para realizar a recursÃ£o
# Passo 3: Na segunda condiÃ§Ã£o, x recebe um valor inicial de 2 e multiplica a propria funÃ§Ã£o com o contador n - 1, diminuindo o numero de vezes que a funÃ§Ã£o
#pode ser multiplicada, atÃ© a condiÃ§Ã£o um, que se encerra a recursÃ£o.
# Passo 4: 2 * 2 com n - 1 ->  4 * 2 com n - 2 - > 8 * 1 com n - 3

# Cell 2
#ExercÃ­cio 02

def inteiro(n):
  if n == 0:
    return 0
  else:
    return n, inteiro (n - 1)

inteiro (10)

#Teste de mesa
# n = 10, sendo n / n - 1 -> n - 1 / n - 2 -> n - 2 / n - 3 -> / n - 3 / n - 4 -> n - 4 / n - 5...

# Cell 3
#ExercÃ­cio 03

def soma(n):
  if n == 0:
    return 0
  else:
    return n + soma (n - 1)

soma(10)

#Teste de mesa
#  n = 10 + soma(n - 1) -> n = 9 + soma(n - 2) -> n = 8 + soma(n - 3) -> n = 7 + soma(n - 4)

# Cell 4
#ExercÃ­cio 04

def soma(a, b):
  if a == b:
    return 0
  else:
    return b + soma(a, b - 1)

soma(4 , 6)

#Teste de mesa
# b == 6 + soma(4, b - 1 = 5) - > b == 5 + soma(4, b - 2 = 4) -> b == 4 + soma(4, b - 3 = 3)

# Cell 5
#ExercÃ­cio 05

lista = list (range(10))

def procura(x, vetor):
  for i in range (len(vetor)):
    if vetor[i] == x:
      return vetor[x], 'posiÃ§ao do numero:', x


print(lista)
print(procura(9, lista))


#Teste de mesa
# vetor = 1,2,3,4,5,7,8,9. // x = 9, vetor[i] == 9

# Cell 6
#ExercÃ­cio 06

def inteiros(n):
  if n == 0:
    return 0
  else:
    return n + inteiros(n - 1)

inteiros(5)
#Teste de mesa
# n = 5 + n - 1 -> n = 4 + n - 2 -> n = 3 + n - 3 -> n = 2

# Cell 7
#ExercÃ­cio 07

def fibonacci(n):
  if n == 0 or n == 1:
    return n
  else:
    return fibonacci(n-1) + fibonacci(n-2)

fibonacci(4)

#Teste de mesa
# 1, 1, 2, 3, 5, 8, 13, 21, 34, 55...
# fibonacci (4) = fibonacci(3) + fibonacci(2) - > fibonacci(3) = fibonacci(2) + fibonacci(1) - > fibonacci(2) = fibonacci(1) + fibonacci(0) ->
# -> fibonacci(0) = 0 e fibonacci(1) = 1 -> fibonacci(2) = 1 + 0 -> fibonacci(3) = 1 + 1 -> fibonacci(4) = 1 + 2

# Cell 8
#ExercÃ­cio 08
# Retirado de: https://pt.stackoverflow.com/questions/412524/torre-de-hanoi-como-funciona-essa-solu%C3%A7%C3%A3o-recursiva

def toweOFhanoi(disc,ori,dest,aux):
    if disc == 1:
        print('Move disc {} from tower {} to the tower {}'.format(disc,ori,dest))
        return

    toweOFhanoi(disc - 1,ori,aux,dest)
    print('Move disc {} from tower {} to the tower {}'.format(disc,ori,dest))
    toweOFhanoi(disc - 1,aux,ori,dest)
    print('Move disc {} from tower {} to the tower {}'.format(disc,ori,dest))

toweOFhanoi(2,3,4,2)

