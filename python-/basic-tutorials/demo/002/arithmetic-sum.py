x1 = 1
d = 3
n = 100
x100 = x1 + (100 - 1) * d
s = 0
while (n > 0):
  s += x1 + (n - 1) * d
  n -= 1

'''
# or
while (n > 0):
  n -= 1
  s += x1 + n * d
'''

print 'x100 = ', x100
print 'sum = ', s
