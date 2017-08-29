# read data and sort it to 'train' and 'test'
import random

r = open('data/reviews.txt','r')
reviews = list(map(lambda x:x[:-1], r.readlines()))
r.close()

l = open('data/labels.txt','r')
labels = list(map(lambda x:x[:-1].upper(), l.readlines()))
l.close()

allData = list(zip(reviews, labels))
fifth_part = int(len(allData) / 5)

random.shuffle(allData)
reviews, labels = zip(*allData)

reviews_test = reviews[:fifth_part]
reviews_train = reviews[fifth_part+1:]

labels_test = labels[:fifth_part]
labels_train = labels[fifth_part+1:]


# text classification
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.naive_bayes import MultinomialNB

from sklearn.pipeline import Pipeline

text_classifier = Pipeline([
	('count_vect', CountVectorizer()),
    ('tf_transformer', TfidfTransformer()),
    ('classifier', MultinomialNB()),
])

text_classifier.fit(reviews_train, labels_train) 


# test text classification results
import json
from sklearn import metrics

prediction_test = text_classifier.predict(reviews_test)

classification = {
	'precision': round(metrics.precision_score(labels_test, prediction_test, average='weighted'), 2),
	'recall': round(metrics.recall_score(labels_test, prediction_test, average='weighted'), 2),
	'f1': round(metrics.f1_score(labels_test, prediction_test, average='weighted'), 2)
}

json_data = json.dumps(classification)


# send data to server
import sys

print(json_data)
sys.stdout.flush()