


import string
from token import STRING
from xml.etree.ElementTree import tostring
from collections import Counter

def BubbleSort(arr):


    for j in range(0, len(arr)+1):
        
        for i in range(0, len(arr)-1):
            if arr[i] > arr[i+1]:
                temp = arr[i]
                temp2 = arr[i+1]
                arr[i+1] = temp
                arr[i] = temp2
                continue
    print(arr)


def pairs(arr):

    socks = []
    pair = 0

    for i in arr:
        if i in socks:
            socks.remove(i)
            pair +=1
            continue
        socks.append(i)
    print("There are " +str(pair) + " pairs")
    print("There are " +str(len(socks))+ " odd socks")

# pairs([1,2,1,2,1,3,2,1])

def fib( a, b, n):

    seq = [a,b]

    for i in range(2, n+2):
        seq.append(seq[i-1] + seq[i-2])
    
    seq.remove(a)
    seq.remove(b)
    print(seq)

# fib(2,3, 6)

def reverse(sentance):

    sent =str(sentance).split(' ')

    final = ''

    for i in sent[::-1]:
        final += i 

    print(final)


reverse("Hello , How are you")
    
