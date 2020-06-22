import os
tree = os.walk('src/blocks')
tree = list(tree)
include_list = []
for i in tree[1:]:
	block_name = i[0].split('\\')[1]
	prospective_name = block_name + '.pug'
	if prospective_name in i[2]:
		include_link = 'include ../blocks/' + block_name + '/' + prospective_name
		include_list.append(include_link)
try:
	os.remove('src/pug/mixins.pug')
except:
	pass
for i in include_list:
	f = open('src/pug/mixins.pug', 'a')
	f.write(i +'\n')
	f.close()