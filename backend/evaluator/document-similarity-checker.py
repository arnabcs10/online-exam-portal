import sys
import json
import nltk
import numpy as np
import math
from nltk.corpus import stopwords



arg = sys.argv[1]
docfiles = json.loads(arg)
# print(type(docfiles))
# building vocabulary of all the documents

def build_lexicon(corpus):
	lexicon=set()
	for doc in corpus:
		#word tokenization
		word_token=[word for word in doc.split()]
		lower_word_list=[i.lower() for i in word_token]

		#stemming
		porter=nltk.PorterStemmer()
		stemmed_word=[porter.stem(t) for t in lower_word_list]
		
		#removing stop words
		stop_words=set(stopwords.words('english'))
		filtered_bag_of_word=[w for w in stemmed_word if not w in stop_words]
		lexicon.update(filtered_bag_of_word)
	return lexicon

# all word set
vocabulary=build_lexicon(docfiles)

def tf(term,document):
	return freq(term,document)

def freq(term,document):
	return [word.lower() for word in document.split()].count(term)

doc_term_matrix=[]
# print('\n Our Vocabulary vector is [' + ','.join(list(vocabulary)) + ']')
for doc in docfiles :
	tf_vector=[tf(word,doc) for word in vocabulary ]
	tf_vector_string=','.join(format(freq,'d')for freq in tf_vector)
	# print('\n the tf vector for document %d is [%s]' % ((docfiles.index(doc)+1),tf_vector_string))
	doc_term_matrix.append(tf_vector)

# print('\n All combined here is our master document term matrix: ')
# print(doc_term_matrix)

#Now every document is in the same feature space
#Normalizing vectors to l2 norm
#l2 norm of each vector is 1

def l2_normalizer(vec):
	denom=np.sum([e1**2 for e1 in vec])
	if denom == 0:
		denom = 1
	return [(e1/math.sqrt(denom)) for e1 in vec]

doc_term_matrix_l2=[]
for vec in doc_term_matrix:
	doc_term_matrix_l2.append(l2_normalizer(vec))

# print('\nA regular old document term matrix: ')
# print(np.matrix(doc_term_matrix))
# print('\nA document term matrix with row wise l2 norms of 1: ')
# print(np.matrix(doc_term_matrix_l2))

def numDocsContaining(word,doclist):
	doccount=0
	for doc in doclist:
		if freq(word,doc)>0:
			doccount=+1
	return doccount

def idf(word,doclist):
	n_samples=len(doclist)
	df=numDocsContaining(word,doclist)
	return np.log(n_samples/1+df)

my_idf_vector=[idf(word,docfiles) for word in vocabulary]

# print('our vocabulary vector is[ '+','.join(list(vocabulary))+ ']')

# print('\nThe inverse document frequency vector is [' + ','.join(format(freq,'f')for freq in my_idf_vector))

def build_idf_matrix(idf_vector):
	idf_mat=np.zeros((len(idf_vector),len(idf_vector)))
	np.fill_diagonal(idf_mat,idf_vector)
	return idf_mat

my_idf_matrix=build_idf_matrix(my_idf_vector)
# print('\nIdf matrix is:')
# print(my_idf_matrix)

doc_term_matrix_tfidf=[]

#performing tfidf matrix multiplication

for tf_vector in doc_term_matrix:
	doc_term_matrix_tfidf.append(np.dot(tf_vector,my_idf_matrix))

#normalising
doc_term_matrix_tfidf_l2=[]
for tf_vector in doc_term_matrix_tfidf:
	doc_term_matrix_tfidf_l2.append(l2_normalizer(tf_vector))

# print(vocabulary)
# print(np.matrix(doc_term_matrix_tfidf_l2))

plagiarismVector = [0 for i in range(len(docfiles))]
similarityVector = [0 for i in range(len(docfiles))]
#cosine distance and angle between all the documents pairwisely
for i in range(len(docfiles)):
	for j in range(i+1,len(docfiles)):
		result_nltk=nltk.cluster.util.cosine_distance(doc_term_matrix_tfidf_l2[i],doc_term_matrix_tfidf_l2[j])
		# print('\n Cosine Distance btw doc %d and doc %d:' %(i,j))
		# print(result_nltk)
		cos_sin=1-result_nltk
		# try:
		# 	angle_in_radians=math.acos(cos_sin)
		# except ValueError:
			# print("Here Error")
		plagiarism=int(cos_sin * 100)
		if i == 0:
			similarityVector[j] = plagiarism
		else:
			plagiarismVector[i] = max(plagiarismVector[i], plagiarism);
			plagiarismVector[j] = max(plagiarismVector[j], plagiarism);
            
		# arr[i][j] = plagiarism
		# print('\nPlagiarism = %s' %plagiarism)

result = {
	"plagiarismVector": plagiarismVector,
	"similarityVector": similarityVector
}

print(json.dumps(result))